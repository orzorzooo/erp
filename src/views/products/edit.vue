<template>
  <div>
    <el-form label-position="right" label-width="100px">
      <el-form-item label="名稱">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="簡介">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
      <el-form-item label="進貨價">
        <el-input-number v-model="form.purchase_price" />
      </el-form-item>
      <el-form-item label="售價">
        <el-input-number v-model="form.sell_price" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { get, post } from "@/api/request";
const input = ref("");
const form = ref({
  name: "",
  description: "",
  purchase_price: 0,
  sell_price: 0
});
async function onSubmit() {
  const { data } = await post({ collection: "products" }, form.value);
  console.log(data);
}
</script>
