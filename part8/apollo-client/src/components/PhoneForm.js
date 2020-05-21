import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_NUMBER } from '../queries'

const PhoneForm = ({ notify }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const [changeNumber, result] = useMutation(EDIT_NUMBER)

  const submit = async (event) => {
    event.preventDefault()

    changeNumber({ variables: { name, phone } })

    setName('')
    setPhone('')
  }

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      notify('person not found')
    }
  }, [result.data]) // eslint-disable-line

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
