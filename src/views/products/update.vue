<template>
  <div>
    <eform :product="product" v-if="product"></eform>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { get, post } from "@/api/request";
import eform from "./components/form.vue";
const props = defineProps(["id"]);
const product = ref(null);

async function init() {
  const { data } = await get({ collection: `products/${props.id}` });
  console.log("product", data);
  product.value = data;
}
init();
</script>
