import axios from 'axios'
const token = 'cool'

export default () => {
  return axios.create({
    baseURL: `http://localhost:5000`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}