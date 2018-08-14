import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import mutations from './mutations'
import getters from './getters'
import toqqnStorage from '../helpers/storageService'

Vue.use(Vuex)
export default new Vuex.Store({
  actions,
  state: {
    basePath: process.env.BASE_PATH,
    initialise: 'pending',
    initialiseInfo: toqqnStorage.get('initialiseInfo') || '',
    signup: 'pending',
    login: 'pending',
    isLoggedIn: !!toqqnStorage.get('userInfo'),
    userInfo: toqqnStorage.get('userInfo') || '',
    loadingStatus: false,
    apiBasePath: process.env.API_URL,
    postList: [],
    postDetails: '',
    communityList: [],
    communityDetails: '',
    toqqnStats: '',
    newsList: [],
    announcementList: [],
    hallOfFameList: [],
    trendingCommunityList: []
  },
  mutations,
  getters
})
