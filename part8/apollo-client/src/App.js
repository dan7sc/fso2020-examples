import React, { useState, useEffect } from 'react';
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import { ALL_PERSONS, PERSON_ADDED } from './queries'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'

const Notify = ({ errorMessage }) => {
  const style = {
    background: 'red',
    padding: 8
  }

  if (!errorMessage) {
    return null
  }

  return(
    <div style={style}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('phonenumbers-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const updateCacheWith = (addedPerson) => {
    const includedIn = (set, object) => (
      set.map(p => p.id).includes(object.id)
    )

    const dataInStore = client.readQuery({ query: ALL_PERSONS })
    if (!includedIn(dataInStore.allPersons, addedPerson)) {
      client.writeQuery({
        query: ALL_PERSONS,
        data: { allPersons: dataInStore.allPersons.concat(addedPerson) }
      })
    }
  }

  useSubscription(PERSON_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedPerson = subscriptionData.data.personAdded
      notify(`${addedPerson.name} added`)
      updateCacheWith(addedPerson)
    }
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage}/>
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  return (
    <div>
      <button onClick={logout}>logout</button>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} updateCacheWith={updateCacheWith} />
      <PhoneForm notify={notify} />
    </div>
  )
}

export default App;
