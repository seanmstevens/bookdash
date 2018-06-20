import axios from 'axios'
const token = 'cool'

const Api = axios.create({
  baseURL: `http://localhost:5000/`,
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export default Api