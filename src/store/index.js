import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  state: {
    stockList: [],
  },
  mutations: {
    setStockList(state, stockList) {
      state.stockList = stockList
    },
    updateStockList(state, newList) {
      for (let i=0; i < newList.length; i++) {
        state.stockList.push(newList[i])
      }
    },
    modifyStockList(state, item) {
      const index = state.stockList.indexOf(item); // Get the index of the item
      if (index !== -1) {
        state.stockList.splice(index, 1); // Remove the item from the array
      }
    },
  },
  actions: {},
  getters: {},
  plugins: [createPersistedState()],
})

export default store
