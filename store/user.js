export const state = () => ({
  isLogin: false,
  pass: ''
})

export const mutations = {
  setLogin(state, payload) {
    state.isLogin = !!payload
  },
  setPass(state, payload) {
    state.isLogin = payload
  }
}
