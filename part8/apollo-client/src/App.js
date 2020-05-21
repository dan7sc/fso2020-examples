import React, { useState } from 'react';
import { useQuery } from '@apollo/client'
import { ALL_PERSONS } from './queries'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'

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
  const [errorMessage, setErrorMessage] = useState(null)

  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm notify={notify} />
    </div>
  )
}

export default App;
