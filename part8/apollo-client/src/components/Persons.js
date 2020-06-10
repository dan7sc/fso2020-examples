import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client'
import { FIND_PERSON, ADD_AS_FRIEND } from '../queries'

const Persons = ({ setError, persons }) => {
  const [person, setPerson] = useState(null)
  const [getPerson, result] = useLazyQuery(FIND_PERSON)
  const [addAsFriend] = useMutation(ADD_AS_FRIEND, {
    onError: error => {
      setError(error.message)
    }
  })

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson)
    }
  }, [result.data])

  const showPerson = name => {
    getPerson({ variables: { nameToSearch: name } })
  }

  const clearPerson = () => {
    getPerson({ variables: { nameToSearch: '' } })
    setPerson(null)
  }

  const addFriend = name => {
    addAsFriend({ variables: { friendName: name } })
  }

  if (person) {
    return (
      <div>
        <h2>{person.name}</h2>
        <div>{person.address.street} {person.address.city}</div>
        <div>{person.phone}</div>
        <button onClick={() => addFriend(person.name)}>
          add as friend
        </button>
        <br />
        <button onClick={() => clearPerson()}>
          close
        </button>
      </div>
    )
  }

  return (
      <div>
      <h2>Persons</h2>
      {persons.map(p => (
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => showPerson(p.name)}>
            show address
          </button>
        </div>
      ))}
    </div>
  )
}

export default Persons;
