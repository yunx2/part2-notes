import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl) // axios http methods return a promise
  return request.then(response => response.data) // still a promise; the .then method of a promise also returns a promise
}

// const getAll = () => {
//   const request = axios.get(baseUrl)
//   const nonExisting = {
//     id: 10000,
//     content: 'This note is not saved to server',
//     date: '2019-05-30T17:30:31.098Z',
//     important: true,
//   }
//   return request.then(response => response.data.concat(nonExisting))
// }

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data) // there's an implicit return in the .then callback
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update }