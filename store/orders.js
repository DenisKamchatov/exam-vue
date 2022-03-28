export const state = () => ({
    sales: []
  })
  
  export const mutations = {
    setSales(state, sales) {
      state.sales = sales
    }
  }
  
  export const actions = {
    async fetch({commit}) {
      const sales = await this.$axios.$get('https://demo-api.vsdev.space/api/delivery/sales')
      commit('setSales', sales)
    }
  }
  
  export const getters = {
    sales: s => {
      console.log('got data')
      return s.sales
    }
  }
  