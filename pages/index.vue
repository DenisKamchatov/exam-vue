<template>
  <v-container fluid d-flex>
    <p class="col-6">
      {{ indexText.text }}
    </p>
    <img class="col-6" :src="indexText.image" alt="" />
  </v-container>
</template>

<script>
export default {
  name: "IndexPage",
  computed: {
    indexText() {
      return this.$store.getters.indexText;
    },
  },
};
</script>
