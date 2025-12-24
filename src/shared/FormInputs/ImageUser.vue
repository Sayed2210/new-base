<script setup lang="ts">
import { ref, nextTick } from "vue";
import Cropper from "cropperjs";

import Dialog from "primevue/dialog";
import IconTrash from "../icons/IconTrash.vue";
import IconUpload from "../icons/IconFileUpload.vue";

const props = withDefaults(defineProps<{
  initialImage?: string;
  index?: string;
  aspectRatio?: number;
  label?: string;
}>(), {
  index: "",
  aspectRatio: 1,
  label: ""
});
const emit = defineEmits<{
  (e: "update:image", croppedBase64: string | null): void;
  (e: "update:cropped", croppedBase64: string): void;
}>();

// Reactive variables
const imageSrc = ref<string | ArrayBuffer | null>(props.initialImage || null);
const croppedImage = ref<string | null>(null);
const cropper = ref<Cropper | null>(null);
const visible = ref(false);
const fileData = ref<any | null>(null);

// Event handler for file input change
const onFileChangeCrop = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0]; // Get the selected file
  if (file) {
    fileData.value = file;
    const reader = new FileReader();
    reader.onload = async (event) => {
      imageSrc.value = event.target?.result || null;
      visible.value = true; // Make cropper visible
      await nextTick(); // Ensure DOM is updated before initializing cropper
      if (cropper.value) {
        cropper.value.destroy();
      }
      const imageElement = document.getElementById(
        "cropper-image"
      ) as HTMLImageElement;
      if (imageElement) {
        cropper.value = new Cropper(imageElement, {
          aspectRatio: props.aspectRatio || 1, // Adjust as needed
          viewMode: 1,
        });
      }
    };
    reader.readAsDataURL(file);

    // Emit the selected file to the parent components
    // emit('update:image', croppedImage.value)
  } else {
    imageSrc.value = null;
    fileData.value = null;
    emit("update:image", null);
  }
};

// Method to crop the image
const cropImage = () => {
  if (cropper.value) {
    const canvas = cropper.value.getCroppedCanvas();
    croppedImage.value = canvas.toDataURL("image/webp"); // Convert cropped image to Base64
    emit("update:image", croppedImage.value); // Emit the Base64 cropped image to the parent
    // console.log(croppedImage.value, 'adass')
    // console.log(props.aspectRatio, 'www')
    visible.value = false;
  }
};

const deleteImage = () => {
  imageSrc.value = "";
  imageSrc.value = null;
  emit("update:image", null);
};

</script>

<template>
  <div class="col-span-1 input-image-user">
    <label :for="`image${index}`" class="input-label">
      {{ props.label || $t("image") }}
    </label>
    <label :for="`image${index}`" class="input-label">
      <span class="image" v-if="imageSrc">
        <img :src="croppedImage" class="preview-img" alt="Previewed Image" />
      </span>
      <span class="image" v-else>
        <img src="@/assets/images/user-image.png" alt="user" />
      </span>
    </label>
    <!-- <span> {{ $t("select_image_to_upload") }} </span> -->
    <input
      type="file"
      :id="`image${index}`"
      class="input"
      accept="image/jp2, image/jpeg, image/jpg, image/png, image/webp"
      @change="onFileChangeCrop"
    />
    <div class="flex flex-col">
      <div class="actions">
        <label :for="`image${index}`" class="btn btn-primary">
          {{ $t("uploadImage") }}
          <IconUpload /></label
        ><button
          type="button"
          class="btn btn-danger"
          v-if="imageSrc"
          @click="deleteImage"
        >
          Delete Image
          <IconTrash />
        </button>
      </div>
      <p>{{ $t("please_upload_image_dont_upto_3_mega") }}</p>
    </div>
    <Dialog
      dismissableMask
      modal
      v-model:visible="visible"
      :syle="{ width: '50rem' }"
    >
      <div>
        <img
          id="cropper-image"
          :src="imageSrc"
          alt="Cropper"
          class="w-[50rem]"
        />
        <button @click="cropImage" class="btn btn-primary mt-md">
          {{ $t("crop") }}
        </button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
/* Add styles if needed */
</style>
