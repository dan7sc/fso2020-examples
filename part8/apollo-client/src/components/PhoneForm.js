import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_NUMBER } from '../queries'

const PhoneForm = ({ notify }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const [changeNumber, result] = useMutation(EDIT_NUMBER)

  useEffect(() => {
    if (result.data && !result.data.editNumber) {
      notify('person not found')
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    changeNumber({
      variables: {
        name,
        phone
      }
    })

    if (phone.length < 5) {
      notify('phone number is less than 5 digits')
    }

    setName('')
    setPhone('')
  }

  return (
    <div>
      <h2>change number</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <div>
            phone
            <input
              value={phone}
              onChange={({ target }) => setPhone(target.value)}
            />
          </div>
          <button type='submit'>change number</button>
        </div>
      </form>
    </div>
  )
}

export default PhoneForm
