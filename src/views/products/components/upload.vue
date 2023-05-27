<template>
  <el-upload
    v-model:file-list="fileList"
    list-type="picture-card"
    class="upload-file"
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
    <el-icon><Plus /></el-icon>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import { get, post, patch, remove, assets } from "@/api/request";
import { getToken } from "@/utils/auth";
import { Plus } from "@element-plus/icons-vue";
const props = defineProps(["update", "id", "product", "files"]);
const emit = defineEmits(["onFileUploaded", "onFileRemoved"]);
const token = getToken();
const fileList = ref([]);
const header = { Authorization: `Bearer ${token.accessToken}` };
const dialogImageUrl = ref("");
const dialogVisible = ref(false);

function mapFiles() {
  const result = props.files.map(item => {
    return {
      name: item.directus_files_id,
      url: assets(item.directus_files_id)
    };
  });
  fileList.value = result;
}

function handleSuccess(res) {
  emit("onFileUploaded", res.data.id);
}

function handlePreview(uploadFile) {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
}

function handleRemove(item) {
  console.log(props.files);
  const fileList = props.files;
  const files = fileList.filter(file => file.directus_files_id != item.name);
  console.log("nowfile", files);
  emit("onFileRemoved", files);
}

mapFiles();
</script>
