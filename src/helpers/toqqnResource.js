import axios from 'axios'

export default {
  get (url, params) {
    return axios
      .get(url, params).then(response => {
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },
  post (url, params, headers) {
    return axios
      .post(url, params, headers).then(response => {
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },
  put (url, params) {
    return axios
      .put(url, params).then(response => {
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },
  delete (url, params) {
    return axios
      .delete(url, params).then(response => {
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }
}
