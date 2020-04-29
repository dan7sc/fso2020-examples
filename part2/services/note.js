import axios from '../utils/axios'

const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return axios.get(baseUrl)
}

const create = async newObject => {
  return axios.post(baseUrl, newObject, token)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { getAll, create, update, setToken }
