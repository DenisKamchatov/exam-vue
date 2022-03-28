export const state = () => ({
    orderForm: {}
  })
  
export const mutations = {
setOrderForm(state, orderForm) {
    state.orderForm = orderForm
}
}

    // "type": "truck",
    // "departure_city": "Москва",
    // "departure_address": "ул. Семеновская 26",
    // "destination_city": "Санкт-Петербург",
    // "destination_address": "набережная реки Фонтанки 16",
    // "weight": "150",
    // "volume": "100"
  
  export const actions = {
    async fetch({commit}) {
      const orderForm = await this.$axios.$get('https://demo-api.vsdev.space/api/delivery/sales/form')
      commit('setOrderForm', orderForm)
    },
    async postForm({commit}, payload) {
        const data = new FormData();
        const obj = payload;
        for (const key in obj) {
            data.append(key, obj[key])
        }

        await this.$axios.$post('https://demo-api.vsdev.space/api/delivery/sales', data)
        console.log('success')
    }
  }
  
  export const getters = {
    orderForm: s => s.orderForm
  }
  