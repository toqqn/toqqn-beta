import axios from 'axios'
import store from '../store'
import app from '../main'
import toqqnStorage from './storageService'

export default function setup () {
  axios.interceptors.request.use(function (config) {
    app.$Progress.start()
    if (store.state.initialiseInfo) {
      config.headers['CLIENT-ID'] = store.state.initialiseInfo.clientId
      config.headers['PUBLIC-KEY'] = store.state.initialiseInfo.publicKey
    }
    return config
  }, function (err) {
    app.$Progress.fail()
    return Promise.reject(err)
  })

  axios.interceptors.response.use(function (response) {
    if (response.headers['public_key']) {
      // update public key value iin both store and local storage
      store.dispatch('updatePulicKey', response.headers['public_key'])
      let initialiseInfo = toqqnStorage.get('initialiseInfo')
      if (initialiseInfo) {
        initialiseInfo.publicKey = response.headers['public_key']
        toqqnStorage.set('initialiseInfo', initialiseInfo)
      }
    }
    app.$Progress.finish()
    return response
  }, function (err) {
    const error = JSON.parse(JSON.stringify(err))
    let customError = ''
    if (error.response) { // api response errors
      switch (error.response.status) {
        case 401 :
          customError = 'Authorization Error: Unauthorized'
          break
        case 403 :
          customError = 'Authorization Error: Forbidden'
          break
        case 404 :
          customError = error.response.data.message ? error.response.data.message : 'Server Error: URL Not Found'
          break
        case 408:
          customError = 'Toqqn key expired'
          toqqnStorage.delete('initialiseInfo')
          window.location.reload(true)
          break
        case 428:
          customError = 'Toqqn key expired'
          toqqnStorage.delete('initialiseInfo')
          window.location.reload(true)
          break
        case 500 :
          customError = 'Internal Server Error'
          break
        case 503 :
          customError = 'Server Error: Service Unavailable'
          break
        default:
          customError = 'Error: Unknown Error'
          break
      }
      return Promise.reject(customError)
    } else { // network error
      app.$Progress.fail()
      customError = 'Error: Network Error'
      return Promise.reject(customError)
    }
  })
}
