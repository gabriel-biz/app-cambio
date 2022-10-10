<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
// import CurrencyAPI from "@/apis/CurrencyAPI";

export default {
  name: "App",

  data: () => ({
    //
  }),

  // async created() {
  //   const response = await CurrencyAPI.get("/convert", {
  //     params: {
  //       to: "BRL",
  //       from: "USD",
  //       amount: 1,
  //     },
  //   });

  //   console.log(response.data);
  // },
};
</script>
