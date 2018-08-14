import * as types from './mutation-types'

export const setConfig = ({ commit }, confObject) => {
  commit(types.CHANGE_CONFIG, confObject)
}

export const updatePulicKey = ({ commit, state }, data) => {
  commit(types.UPDATE_PUBLIC_KEY, data)
}

/** **************************************************** */
//  INITIALISE  ///
/** **************************************************** */

export const initialiseSuccess = ({ commit, state }, data) => {
  commit(types.INITIALISE, 'success')
  commit(types.INITIALISE_SUCCESS, data)
}
export const initialiseError = ({ commit, state }, data) => {
  commit(types.INITIALISE, 'error')
  commit(types.INITIALISE_ERROR)
}

/** **************************************************** */
//  SIGNUP  ///
/** **************************************************** */

export const signupSuccess = ({ commit, state }, data) => {
  commit(types.SIGN_UP, 'success')
  commit(types.SIGN_UP_SUCCESS, data)
}
export const signupError = ({ commit, state }, data) => {
  commit(types.SIGN_UP, 'error')
}

/** **************************************************** */
//  LOGIN  ///
/** **************************************************** */

export const loginSuccess = ({ commit, state }, data) => {
  commit(types.LOGIN, 'success')
  commit(types.LOGIN_SUCCESS, data)
}
export const loginError = ({ commit, state }, data) => {
  commit(types.LOGIN, 'error')
}

/** **************************************************** */
//  LOGOUT  ///
/** **************************************************** */

export const logout = ({ commit, state }) => {
  commit(types.LOGOUT, 'success')
}
export const logoutSuccess = ({ commit, state }, data) => {
  commit(types.LOGOUT, 'success')
}
export const logoutError = ({ commit, state }, data) => {
  commit(types.LOGOUT, 'error')
}

/** **************************************************** */
//  POSTS  ///
/** **************************************************** */

export const postListSuccess = ({ commit, state }, data) => {
  commit(types.POST_LIST, data)
}

export const postDetails = ({ commit, state }, data) => {
  commit(types.POST_DETAILS, data)
}

export const postAdded = ({ commit, state }, data) => {
  commit(types.POST_ADDED, data)
}

export const postDeleted = ({ commit, state }, index) => {
  commit(types.POST_DELETED, index)
}

/** **************************************************** */
//  COMMUNITY  ///
/** **************************************************** */

export const communityDetails = ({ commit, state }, data) => {
  commit(types.COMMUNITY_DETAILS, data)
}

export const communityListSuccess = ({ commit, state }, data) => {
  commit(types.COMMUNITY_LIST, data)
}

export const communityAdded = ({ commit, state }, data) => {
  commit(types.COMMUNITY_ADDED, data)
}
/** **************************************************** */
//  HOME SIDEBAR  ///
/** **************************************************** */

export const newsListSuccess = ({ commit, state }, data) => {
  commit(types.NEWS_LIST, data)
}

export const announcementListSuccess = ({ commit, state }, data) => {
  commit(types.ANNOUNCEMENT_LIST, data)
}

export const hallOfFameListSuccess = ({ commit, state }, data) => {
  commit(types.HALL_OF_FAME_LIST, data)
}

export const trendingCommunitiesListSuccess = ({ commit, state }, data) => {
  commit(types.TRENDING_COMMUNITY_LIST, data)
}

/** **************************************************** */
//  ERROR  ///
/** **************************************************** */

export const toqqnStatsSuccess = ({ commit, state }, data) => {
  commit(types.TOQQN_STATS, data)
}

/** **************************************************** */
//  ERROR  ///
/** **************************************************** */

export const errorResponse = ({ commit, state }, data) => {
  commit(types.ERROR_RESPONSE, data)
}
