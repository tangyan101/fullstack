import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  
  const nonExisting = {
    id: 1000000,
    content:'This note is not saved to server',
    date: '2020',
    important: true
  }

  return request.then(response => response.data.concat(nonExisting))
  // return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const del = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response)
}
export default { getAll, create, update, del }
