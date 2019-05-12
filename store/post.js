export const state = () => ({
  id: null
})

export const mutations = {
  updateId(state, payload) {
    typeof payload === 'number'
      ? (state.id = payload)
      : new Error('Передан неверный аргумент')
  }
}

export const getters = {
  getId(state) {
    return state.id
  }
}
