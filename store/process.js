export const state = () => ({
  process: !1
})

export const mutations = {
  processOn(state){
    state.process = true
  },
  processOff(state){
    state.process = false
  },
}
