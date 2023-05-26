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

      <el-form-item>
        <el-upload
          v-model:file-list="fileList"
          list-type="picture-card"
          class="upload-demo"
          name="file"
          action="https://panda.api.orzorzooo.com/files"
          multiple
          with-credentials
          :headers="header"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="3"
          :on-exceed="handleExceed"
          :on-success="handleSuccess"
        >
          <!-- <el-button type="primary">Click to upload</el-button>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500KB.
            </div>
          </template> -->
        </el-upload>
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
import { getToken } from "@/utils/auth";
const props = defineProps(["update", "id", "product"]);
const collection = "products";
const router = useRouter();
const form = ref({
  name: "",
  description: "",
  purchase_price: 0,
  sell_price: 0
});
const token = getToken();
const header = { Authorization: `Bearer ${token.accessToken}` };
const fileList = ref([]);
if (props.product) {
  form.value = props.product;
  const test = form.value.files.map(item => {
    return {
      name: "fuck",
      url: assets(item.directus_files_id)
    };
  });
  fileList.value = test;
}

function handleSuccess(res) {
  form.value.files.push({ directus_files_id: res.data.id });

  console.log(form.value.files);
}

async function onSubmit() {
  console.log(form.value);
  const { data } = props.product
    ? await patch({ collection, id: props.product.id }, form.value)
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
