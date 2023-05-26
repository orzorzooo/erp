<template>
  <div>
    <pure-table :data="products" :columns="columns" stripe v-loading="loading">
      <template #expand="{ row }">
        <div class="m-4">
          <p>{{ row.description }}</p>
        </div>
        <div class="p-4">
          <el-button type="primary" @click="edit(row.id)">編輯商品</el-button>
        </div>
      </template>
    </pure-table>
  </div>
</template>
<script setup>
import { get } from "@/api/request";
import { ref } from "vue";
import { PureTable } from "@pureadmin/table";
import { useRouter } from "vue-router";
const products = ref([]);
const parentBorder = ref(false);
const childBorder = ref(false);
const loading = ref(true);
const router = useRouter();
const columns = [
  {
    type: "expand",
    slot: "expand"
  },
  { label: "名稱", prop: "name" },
  { label: "進貨價", prop: "purchase_price" },
  { label: "售價", prop: "sell_price" }
];
async function init() {
  const { data } = await get({ collection: "products" });
  products.value = data;
  loading.value = false;
}
function edit(id) {
  router.push({ name: "EditProduct", params: { id } });
}
init();
</script>
