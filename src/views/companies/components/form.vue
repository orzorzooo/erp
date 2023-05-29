<template>
  <div>
    <el-form label-position="right" label-width="100px" :model="form">
      <el-form-item label="名稱">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="簡介">
        <el-input
          v-model="form.description"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 6 }"
        />
      </el-form-item>
      <el-form-item label="進貨價">
        <el-input-number v-model="form.purchase_price" />
      </el-form-item>
      <el-form-item label="售價">
        <el-input-number v-model="form.sell_price" />
      </el-form-item>

      <el-form-item width="100%">
        <el-button type="primary" @click="onSubmit">{{
          product ? "更新" : "新增"
        }}</el-button>
        <el-button @click="router.push({ name: 'Products' })">取消</el-button>
        <el-popconfirm title="確定刪除？" @confirm="onDelete">
          <template #reference>
            <el-button type="danger" class="absolute right-0">Delete</el-button>
          </template>
        </el-popconfirm>
      </el-form-item>
      <el-form-item class=""> </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { get, post, patch, remove, assets } from "@/api/request";
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
// import upload from "./upload.vue";
const props = defineProps(["company"]);
const collection = "company";
const router = useRouter();
const form = ref({
  name: "",
  description: "",
  purchase_price: 0,
  sell_price: 0
});
if (props.product) {
  form.value = props.product;
}

function onFileUploaded(id) {
  form.value.files.push({ directus_files_id: id });
}

function onFileRemoved(files) {
  form.value.files = files;
  console.log("fuck", form.value.files);
}

async function onSubmit() {
  console.log(form.value);
  const { data } = props.product
    ? await patch({ collection, id: props.company.id }, form.value)
    : await post({ collection }, form.value);
  if (!data) {
    message("失敗", { type: "error" });
    return;
  }
  message("成功", { type: "success" });
  router.push({ name: "Products" });
}

async function onDelete() {
  const { data } = await remove({ collection, id: props.product.id });
  console.log("d", data);
  message("成功", { type: "success" });
  router.push({ name: "Products" });
}
</script>
