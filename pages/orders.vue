<template>
  <div>
    <v-btn v-on:click="refresh">Обновить список</v-btn>
    <v-btn class="ml-5" color="primary" dark @click.stop="dialog = true">
      Сделать заказ
    </v-btn>

    <ul>
      <Order v-bind:sales="sales" />
    </ul>

    <v-dialog v-model="dialog" max-width="900">
      <v-card class="pa-10">
        <form
          accept-charset="UTF-8"
          v-on:submit.prevent="onSubmit()"
          method="POST"
        >
          <div
            class="form-line"
            v-for="(field, propertyName, index) in orderForm.fields"
            :key="index"
          >
            <label>
              {{ field.title }}
              <input
                v-model="departure_address"
                v-if="propertyName === 'departure_address'"
                placeholder="Введите значение"
              />
              <input
                v-model="destination_address"
                v-if="propertyName === 'destination_address'"
                placeholder="Введите значение"
              />
              <input
                v-model="weight"
                v-if="propertyName === 'weight'"
                placeholder="Введите вес товара"
              />
              <input
                v-model="volume"
                v-if="propertyName === 'volume'"
                placeholder="Введите объем товара"
              />

              <select v-model="type" v-if="propertyName === 'type'">
                <option
                  v-for="(value, valueKey) in field.values"
                  :key="valueKey"
                >
                  {{ value }}
                </option>
              </select>

              <select
                v-model="departure_city"
                v-if="propertyName === 'departure_city'"
              >
                <option
                  v-for="(value, valueKey) in field.values"
                  :key="valueKey"
                >
                  {{ value }}
                </option>
              </select>

              <select
                v-model="destination_city"
                v-if="propertyName === 'destination_city'"
              >
                <option
                  v-for="(value, valueKey) in field.values"
                  :key="valueKey"
                >
                  {{ value }}
                </option>
              </select>
            </label>
          </div>
          <button class="submit-btn" type="submit" @click.stop="dialog = false">
            Отправить
          </button>
          <v-btn
            color="submit-btn error mt-3"
            dark
            @click.stop="dialog = false"
          >
            Закрыть
          </v-btn>
        </form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Order from "@/components/Order";

export default {
  components: { Order },
  data() {
    return {
      dialog: false,
      type: "",
      departure_city: "",
      departure_address: "",
      destination_city: "",
      destination_address: "",
      weight: "",
      volume: "",
    };
  },
  async fetch({ store }) {
    if (store.getters["orders/sales"].length === 0) {
      await store.dispatch("orders/fetch");
    }
  },

  async fetch({ store }) {
    await store.dispatch("orderForm/fetch");
  },

  computed: {
    sales() {
      return this.$store.getters["orders/sales"];
    },

    orderForm() {
      return this.$store.getters["orderForm/orderForm"];
    },
  },

  methods: {
    async refresh() {
      await this.$store.dispatch("orders/fetch");
      await this.$store.dispatch("refresh");
    },

    async onSubmit() {
      const data = {
        type: this.type,
        departure_city: this.departure_city,
        departure_address: this.departure_address,
        destination_city: this.destination_city,
        destination_address: this.destination_address,
        weight: this.weight,
        volume: this.volume,
      };
      if (
        data.type === "" ||
        data.departure_city === "" ||
        data.departure_address === "" ||
        data.destination_city === "" ||
        data.destination_address === "" ||
        data.weight === "" ||
        data.volume === ""
      ) {
        alert("Заполните все поля формы");
      } else {
        await this.$store.dispatch("orderForm/postForm", data);
        await this.$store.dispatch("refresh");
      }
    },
  },
};
</script>


<style scoped>
.submit-btn {
  background: #fefefe;
  padding: 10px;
  color: #000;
  border-radius: 10px;
}

select {
  background: #fff;
  padding: 5px;
  width: 100%;
  border-radius: 10px;
}

.form-line {
  margin-bottom: 15px;
}

input {
  background: #fff;
  color: #000;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
}

form {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
}
</style>
