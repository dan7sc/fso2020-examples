const throwError = (response) => {
  const [status, statusText] = [response.status, response.statusText]
  const error = `Request failed with status code ${status} (${statusText})`
  throw new Error(error)
}

const get = async (url) => {
  const response = await fetch(url)
  if (!response.ok) throwError(response)
  const json = await response.json()
  return json
}

const post = async (url, data, token) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': token
    },
    body: JSON.stringify(data)
  }
  const response = await fetch(url, options)
  if (!response.ok) throwError(response)
  const json = await response.json()
  return json
}

const put = async (url, data) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data)
  }
  const response = await fetch(url, options)
  if (!response.ok) throwError(response)
  const json = await response.json()
  return json
}

export default { get, post, put }
