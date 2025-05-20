<template>
  <v-container fluid max-width="1000" class="d-flex align-center justify-center">
    <v-card class="align-center mx-6 my-6" flat height="100vh">
      <v-card-title class="justify-center">Conversor de Moeda</v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-alert border="left" color="red" type="error" v-if="errorMessage">
              {{ errorMessage }}
            </v-alert>
          </v-col>

          <v-col cols="5">
            <v-autocomplete v-model="payload.from" :items="currencies" item-text="label" item-value="value" outlined
              label="Selecione a moeda" flat />
          </v-col>

          <v-col cols="2" class="d-flex justify-center align-center">
            <v-btn @click="invertCurrencies" color="success" class="mb-7">
              <v-icon size="32"> mdi-arrow-left-right-bold </v-icon>
            </v-btn>
          </v-col>

          <v-col cols="5">
            <v-autocomplete v-model="payload.to" :items="currencies" item-text="label" item-value="value" solo
              label="Selecione a moeda" flat outlined />
          </v-col>

          <v-col cols="12">
            <v-text-field v-model="payload.amount" label="Valor" placeholder="0.00" outlined />

            <v-btn @click="getCurrenciesConvert" color="success" class="w100" flat>
              Converter
            </v-btn>
          </v-col>

          <v-col cols="12" class="text-center" v-if="result">
            <v-divider class="mb-4" />
            <h3 class="font-weight-normal">Resultado:</h3>
            <span class="display-1">
              {{ payload.to }}
              {{ (result || 0).toFixed(2) }}
            </span>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import CurrencyAPI from "@/apis/CurrencyAPI";

export default {
  data() {
    return {
      currencies: [],
      result: null,
      errorMessage: null,
      payload: {
        from: null,
        to: null,
        amount: 1,
      },
    };
  },

  async created() {
    await this.getCurrenciesSymbols();
  },

  methods: {
    async getCurrenciesSymbols() {
      try {
        const response = await CurrencyAPI.get("/list");
        const symbols = response.data.currencies;

        this.currencies = Object.keys(symbols).map((key) => ({
          label: `${key} - ${symbols[key]}`,
          value: key,
        }));

        this.payload.to = "BRL";
        this.payload.from = "USD";
      } catch (error) {
        this.errorMessage = "Ocorreu um erro";
      }
    },

    async getCurrenciesConvert() {
      const areCurrenciesSelected = this.payload.to && this.payload.from;

      if (!areCurrenciesSelected) {
        this.errorMessage = "Selecione as moedas";
        return;
      }

      try {
        const response = await CurrencyAPI.get("/convert", {
          params: {
            ...this.payload,
          },
        });

        this.result = response.data.result;
        this.errorMessage = null;
      } catch (error) {
        this.errorMessage = "Ocorreu um erro";
      }
    },

    invertCurrencies() {
      this.payload = {
        ...this.payload,
        to: this.payload.from,
        from: this.payload.to,
      };
    },
  },
};
</script>

<style>
.w100 {
  width: 100%;
}
</style>