import axios from '../utils/axios'

const baseUrl = 'http://localhost:3001/notes'

// const getAll = () => {
//     return axios.get(baseUrl)
// }

const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
        id: 10000,
        content: 'This note is not saved to server',
        date: '2019-05-30T17:30:31.098Z',
        important: false
    }
    return request
        .then(response => response.concat(nonExisting))
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { getAll, create, update }
