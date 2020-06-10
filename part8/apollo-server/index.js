const {
  ApolloServer, UserInputError, AuthenticationError, gql, PubSub
} = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('./config')
const Person = require('./models/person')
const User = require('./models/user')

const JWT_SECRET = config.JWT_SECRET
const MONGODB_URI = config.MONGODB_URI

const pubsub = new PubSub()

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB', error)
  })

const typeDefs = gql`
type Address {
  street: String!
  city: String!
}

type Person {
  name: String!
  phone: String
  address: Address!
  friendOf: [User!]!
  id: ID!
}

type User {
  username: String!
  friends: [Person!]!
  id: ID!
}

type Token {
  value: String!
}

type Mutation {
  addPerson(
    name: String!
    phone: String
    street: String!
    city: String!
  ): Person
  editNumber(
    name: String!
    phone: String!
  ): Person
  createUser(
    username: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
  addAsFriend(
    name: String!
  ): User
}

type Query {
  personCount: Int!
  allPersons(phone: YesNo): [Person!]!
  findPerson(name: String!): Person
  me: User
}

type Subscription {
  personAdded: Person!
}

enum YesNo {
  YES
  NO
}
`

const resolvers = {
  Query: {
    personCount: () => Person.collection.countDocuments(),
    allPersons: (root, args) => {
      if (!args.phone) {
        return Person.find({}).populate('friendOf')
      }
      return Person.find({ phone: { $exists: args.phone === 'YES' }})
        .populate('friendOf')
    },
    findPerson: (root, args) => (
      Person.findOne({ name: args.name }).populate('friendOf')
    ),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      }
    }
  },
  Mutation: {
    addPerson: async (root, args, context) => {
      const person = new Person({ ...args })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      try {
        person.friendOf = person.friendOf.concat(currentUser)
        await person.save()
        currentUser.friends = currentUser.friends.concat(person)
        await currentUser.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      pubsub.publish('PERSON_ADDED', { personAdded: person})

      return person
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name })
      if (person && args.phone.length >= 5) {
        person.phone = args.phone
        try {
          await person.save()
        } catch(error) {
          throw new UserInputError(error.message, {
            invalidARgs: args
          })
        }
      }
      return person
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidARgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET)}
    },
    addAsFriend: async (root, args, { currentUser }) => {
      const nonFriendAlready = person => (
        !currentUser.friends.map(f => f._id).includes(person._id)
      )
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const person = await Person.findOne({ name: args.name })
      if (nonFriendAlready(person)) {
        currentUser.friends = currentUser.friends.concat(person)
        person.friendOf = person.friendOf.concat(currentUser)
      }

      await currentUser.save()
      await person.save()

      return currentUser
    }
  },
  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterator(['PERSON_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
