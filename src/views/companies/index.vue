<template>
  <div>
    <pure-table :data="products" :columns="columns" stripe v-loading="loading">
      <template #expand="{ row }">
        <div class="m-4">
          <p>{{ row.description }}</p>
        </div>
        <div class="p-4">
          <div class="flex mb-4">
            <el-image
              v-for="(item, index) of row.files"
              style="width: 100px; height: 100px"
              :src="assets(item.directus_files_id)"
              fit="cover"
            />
            <!-- <img :src="assets(item.directus_files_id)" alt="" /> -->
          </div>
          <el-button type="primary" @click="edit(row.id)">編輯商品</el-button>
        </div>
      </template>
    </pure-table>
  </div>
</template>
<script setup>
import { get, assets } from "@/api/request";
import { ref } from "vue";
import { PureTable } from "@pureadmin/table";
import { useRouter } from "vue-router";
const products = ref([]);
const parentBorder = ref(false);
const childBorder = ref(false);
const loading = ref(true);
const router = useRouter();
const columns = [
  // {
  //   type: "expand",
  //   slot: "expand"
  // },
  { label: "名稱", prop: "name" },
  { label: "地址", prop: "address" },
  { label: "進貨價", prop: "phone" },
  { label: "售價", prop: "vat_number" }
];
async function init() {
  const { data } = await get({ collection: "cooperation_companies" });
  products.value = data;
  loading.value = false;
}

async function handleFields() {
  const { data } = await get({
    type: "fields",
    collection: "cooperation_companies"
  });
  console.log(data);
}
function edit(id) {
  router.push({ name: "EditProduct", params: { id } });
}
init();
handleFields();
</script>
