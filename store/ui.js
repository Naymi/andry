export const state = () => ({
  ui: {
    fz: 18,
    back: '#ffffff',
    textColor: 'black'
  }
})

export const mutations = {
  update(state, payload) {
    state.ui = {
      ...state.ui,
      ...payload
    }
  }
}

export const actions = {
  update({commit}, payload){
    commit('update', payload)
  }
}

export const getters = {
  getUi(state){
    return state.ui
  }
}
