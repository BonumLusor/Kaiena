import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store} from 'vuex'

export interface State {
  stage: string
}

export default createStore({
  state: {
    stage: 'Home'
  },
  getters: {
  },
  mutations: {
    setStage (state, stage:string) {
      state.stage = stage
    },
  },
  actions: {
  },
  modules: {
  }
})

export function useStore () {
  return baseUseStore()
}
