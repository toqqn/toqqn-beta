import * as types from './mutation-types'

export default {
  [types.CHANGE_CONFIG] (state, confObject) {
    state.type = confObject.hasOwnProperty('type') ? confObject.type : state.type
  },
  [types.UPDATE_PUBLIC_KEY]: (state, value) => {
    if (state.initialiseInfo) {
      state.initialiseInfo.publicKey = value
    }
  },
  [types.LOGIN] (state, value) {
    state.login = value
  },
  [types.LOGIN_SUCCESS] (state, details) {
    state.isLoggedIn = true
    state.userInfo = details
  },
  [types.SIGN_UP] (state, value) {
    state.signup = value
  },
  [types.SIGN_UP_SUCCESS] (state, details) {
    state.isLoggedIn = true
    state.userInfo = details
  },
  [types.INITIALISE]: (state, value) => {
    state.initialise = value
  },
  [types.INITIALISE_SUCCESS]: (state, details) => {
    state.initialiseInfo = details
  },
  [types.INITIALISE_ERROR]: (state) => {
    state.initialiseInfo = ''
  },
  [types.LOGOUT] (state, details) {
    state.isLoggedIn = false
    state.userInfo = ''
  },
  [types.POST_LIST] (state, details) {
    state.postList = details
  },
  [types.POST_DETAILS] (state, details) {
    state.postDetails = details
  },
  [types.POST_ADDED] (state, details) {
    state.postList.data.push(details)
  },
  [types.POST_DELETED] (state, index) {
    state.postList.data.splice(index, 1)
  },
  [types.TOQQN_STATS] (state, details) {
    state.toqqnStats = details
  },
  [types.NEWS_LIST] (state, details) {
    state.newsList = details
  },
  [types.ANNOUNCEMENT_LIST] (state, details) {
    state.announcementList = details
  },
  [types.HALL_OF_FAME_LIST] (state, details) {
    state.hallOfFameList = details
  },
  [types.TRENDING_COMMUNITY_LIST] (state, details) {
    state.trendingCommunityList = details
  },
  [types.COMMUNITY_DETAILS] (state, details) {
    state.communityDetails = details
  },
  [types.COMMUNITY_LIST] (state, details) {
    state.communityList = details
  },
  [types.COMMUNITY_ADDED] (state, details) {
    state.communityList.push(details)
  },
  [types.ERROR_RESPONSE] (state, details) {
    state.loadingStatus = false
  }
}
