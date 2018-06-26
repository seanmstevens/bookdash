import axios from 'axios'
const token = 'cool'

export default () => {
  return axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 10000,
    withCredentials: true
  })
}