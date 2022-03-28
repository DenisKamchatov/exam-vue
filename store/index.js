export const state = () => ({
    salesCount: {
        trucks: 0,
        trains: 0,
        planes: 0,
        ships: 0
    },
    indexText: {
      image: '',
      text: ''
    },
    aboutText: ''
  })
  
  export const mutations = {
    setSalesCount(state, salesCount) {
      state.salesCount = salesCount
    },
    setIndexText(state, text) {
      state.indexText = text
    },
    setAboutText(state, text) {
      state.aboutText = text
    }
  }
  
  export const actions = {
    async nuxtServerInit({dispatch, commit}) {
      const salesCount = await this.$axios.$get('https://demo-api.vsdev.space/api/delivery/left_widget')
      commit('setSalesCount', salesCount)
      const indexText = await this.$axios.$get('https://demo-api.vsdev.space/api/delivery/home_page')
      commit('setIndexText', indexText)
      const aboutText = await this.$axios.$get('https://demo-api.vsdev.space/api/delivery/home_page')
      commit('setAboutText', aboutText.text)
      console.log('nuxtServerInit')
    },
    async refresh({commit}) {
      const salesCount = await this.$axios.$get('https://demo-api.vsdev.space/api/delivery/left_widget')
      commit('setSalesCount', salesCount)
    }
  }
  
  export const getters = {
    salesCount: s => s.salesCount,
    indexText: s => s.indexText,
    aboutText: s => s.aboutText
  }
  