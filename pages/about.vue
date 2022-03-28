<template>
  <v-container>
    <h1 class="text-center">О нас</h1>
    <p>{{ aboutText }}</p>
  </v-container>
</template>

<script>
export default {
  name: "InspirePage",
  computed: {
    aboutText() {
      return this.$store.getters.aboutText;
    },
  },
};
</script>
