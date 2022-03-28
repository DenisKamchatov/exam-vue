<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class="left_widget">
        Наша компания ежедневно осуществляет десятки перевозок на фурах,
        поездах, кораблях и самолетах
      </div>
      <p class="left_widget">Количество отправлений:</p>
      <div class="left_widget">
        Фуры : {{ salesCount.trucks }} <br />
        Поезда: {{ salesCount.trains }} <br />
        Самолёты: {{ salesCount.planes }} <br />
        Корабли: {{ salesCount.ships }} <br />
      </div>
      <img src="@/static/left_widget_img.jpg" alt="" />
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <h4>Деловая колбаса</h4>
      <v-toolbar-title class="ml-8" v-text="title" />
      <v-spacer />
      <div></div>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<style scoped>
.left_widget {
  padding: 10px;
}
</style>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Главная",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "О нас",
          to: "/about",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Заказы",
          to: "/orders",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Камчатов Денис Сергеевич, группа 201-321",
    };
  },
  computed: {
    salesCount() {
      return this.$store.getters.salesCount;
    },
  },
};
</script>
