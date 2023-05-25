<template>
  <div>
    <!-- switch parent border: <el-switch v-model="parentBorder" /> switch child
    border: <el-switch v-model="childBorder" /> -->
    <pure-table :data="products" :columns="columns" stripe>
      <template #expand="{ row }">
        <div class="m-4">
          <p>{{ row.description }}</p>
        </div>
      </template>
      <template #description="{ row }"></template>
    </pure-table>
  </div>
</template>
<script setup>
import { get } from "@/api/request";
import { ref } from "vue";
import { PureTable } from "@pureadmin/table";
const products = ref([]);
const parentBorder = ref(false);
const childBorder = ref(false);
const columns = [
  {
    type: "expand",
    slot: "expand"
  },
  { label: "名稱", prop: "name" },
  { label: "進貨價", prop: "purchase_price" },
  { label: "售價", prop: "sell_price" },
  { label: "簡介", prop: "description", slot: "description" }
];
async function init() {
  const { data } = await get({ collection: "products" });
  console.log(data);
  products.value = data;
}
init();
</script>
