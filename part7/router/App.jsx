import React, { useState } from 'react'

const Home = () => {
  return (
    <div>
      <h2>TKTL notes app</h2>
    </div>
  )
}

const Notes = () => {
  return (
    <div>
      <h2>Notes</h2>
    </div>
  )
}

const Users = () => {
  return (
    <div>
      <h2>Users</h2>
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('home')

  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  const content = () => {
    if (page === 'home')
      return <Home />
    else if (page === 'notes')
      return <Notes />
    else if (page === 'users')
      return <Users />
  }

  const padding = {
    padding: 5
  }

  return (
    <div>
      <div>
        {/* eslint-disable-next-line */}
        <a href='#' onClick={toPage('home')} style={padding}>
          home
        </a>
        {/* eslint-disable-next-line */}
        <a href='#' onClick={toPage('notes')} style={padding}>
          notes
        </a>
        {/* eslint-disable-next-line */}
        <a href='#' onClick={toPage('users')} style={padding}>
          users
        </a>
      </div>

      {content()}
    </div>
  )
}

export default App
