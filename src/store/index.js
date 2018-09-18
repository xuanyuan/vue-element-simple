import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const config = {
  state: {
    token: undefined,
    userId: undefined,
    projectId: undefined
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USERID(state, userId) {
      state.userId = userId
    },
    SET_PROJECTID(state, projectId) {
      state.projectId = projectId
    }
  },
  getters: {
    GET_TOKEN: state => state.token,
    GET_USERID: state => state.userId,
    GET_PROJECTID: state => state.projectId
  },
  actions: {
    SET_AUTH(context, data) {
      context.commit('SET_TOKEN', data.token);
      context.commit('SET_USERID', data.userId);
    },
    SET_PROJECTID(context, data) {
      context.commit('SET_PROJECTID', data);
    }
  }
}
export default new Vuex.Store(config)
