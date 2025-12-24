<script setup lang="ts">
import { ref } from 'vue'
import PdfIcon from '@/assets/images/pdf.png'
import WordIcon from '@/assets/images/word.png'
import ExcelIcon from '@/assets/images/excel.png'
import upload from '@/assets/images/upload.png'
// const props = defineProps<{ initialImages?: string[]; index?: number; label?: string }>()
const props = defineProps({
  accept: {
    type: String,
    default: "image/jp2, image/jpeg, image/jpg, image/png, image/webp",
  },
  initialImages: {
    type: Array,
    default: () => [],
  },
  initialFiles: {
    type: Array,
    default: () => [],
  },
  index: {
    type: Number,
    default: 0,
  },
  label: {
    type: String,
    default: '',
  },
})
const emit = defineEmits<{ (e: 'update:images', files: File[], index?: number): void }>()

// Reactive variables to store image previews and file objects
const imagePreviews = ref<string[]>(props.initialImages || [])
const imageFiles = ref<File[]>([])

// Define file type icons
const placeholderIcons = {
  pdf: PdfIcon,
  word: WordIcon,
  excel: ExcelIcon,
  generic: PdfIcon,
};

// Determine file type placeholder
function getPlaceholder(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'pdf':
      return placeholderIcons.pdf;
    case 'doc':
    case 'docx':
      return placeholderIcons.word;
    case 'xls':
    case 'xlsx':
      return placeholderIcons.excel;
    default:
      return placeholderIcons.generic;
  }
}

// Handle file changes
function onFileChange(event: Event) {
  const files = (event.target as HTMLInputElement).files;

  if (files) {
    Array.from(files).forEach((file) => {
      const preview = file.type.startsWith('image/')
        ? URL.createObjectURL(file)
        : getPlaceholder(file.name);

      imagePreviews.value.push(preview);
      imageFiles.value.push(file);
    });
    emit('update:images', imageFiles.value, props.index);
  }
}

// Fallback for broken images
function handleImageError(index: number) {
  imagePreviews.value[index] = placeholderIcons.generic;
}

// Remove an image
function removeImage(index: number) {
  imagePreviews.value.splice(index, 1)
  imageFiles.value.splice(index, 1)
  emit('update:images', imageFiles.value) // Emit updated file list
}
</script>

<template>
  <div class="col-span-4 md:col-span-2 multi-image-uploader">
    <!-- Upload Button -->
    <div class="input-image">

      <label :for="`images${index}`" class="input-label-images">
        <!-- <svg width="30" height="30" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.4"
            d="M36.7291 18.2568H31.5512C27.305 18.2568 23.847 14.7988 23.847 10.5526V5.37467C23.847 4.38926 23.0408 3.58301 22.0554 3.58301H14.4587C8.94038 3.58301 4.47913 7.16634 4.47913 13.5626V29.4368C4.47913 35.833 8.94038 39.4163 14.4587 39.4163H28.5412C34.0595 39.4163 38.5208 35.833 38.5208 29.4368V20.0484C38.5208 19.063 37.7145 18.2568 36.7291 18.2568Z"
            fill="#224499" />
          <path
            d="M28.3083 3.95947C27.5737 3.22489 26.3016 3.72655 26.3016 4.7478V11.0007C26.3016 13.6166 28.5233 15.7845 31.2287 15.7845C32.9308 15.8024 35.2958 15.8024 37.3204 15.8024C38.3416 15.8024 38.8791 14.602 38.1625 13.8853C35.5825 11.2874 30.96 6.61114 28.3083 3.95947Z"
            fill="#224499" />
          <path
            d="M20.6579 22.3418L17.0746 18.7584C17.0567 18.7405 17.0387 18.7405 17.0387 18.7226C16.9312 18.6151 16.7879 18.5255 16.6446 18.4538C16.6267 18.4538 16.6267 18.4538 16.6087 18.4538C16.4654 18.4001 16.3221 18.3822 16.1787 18.3643C16.125 18.3643 16.0892 18.3643 16.0354 18.3643C15.9279 18.3643 15.8025 18.4001 15.695 18.4359C15.6412 18.4538 15.6054 18.4718 15.5696 18.4897C15.4262 18.5613 15.2829 18.633 15.1754 18.7584L11.5921 22.3418C11.0725 22.8613 11.0725 23.7213 11.5921 24.2409C12.1117 24.7605 12.9717 24.7605 13.4912 24.2409L14.7812 22.9509V30.458C14.7812 31.1926 15.3904 31.8018 16.125 31.8018C16.8596 31.8018 17.4687 31.1926 17.4687 30.458V22.9509L18.7587 24.2409C19.0275 24.5097 19.3679 24.6351 19.7083 24.6351C20.0487 24.6351 20.3892 24.5097 20.6579 24.2409C21.1775 23.7213 21.1775 22.8613 20.6579 22.3418Z"
            fill="#224499" />
        </svg> -->
        <img :src="upload" alt="upload">
        <span>
          <!-- <span>Drag files here to upload images or files, or browse files from here</span> -->
          <span>Attach an image no larger than 3.5MB.</span>
          <small style="margin-top: 0.25rem !important;">A maximum of 10MB files are allowed</small>
        </span>
      </label>
      <input type="file" :accept="accept" :id="`images${index}`" class="input" multiple @change="onFileChange" />
    </div>

    <!-- Preview Images -->
    <div class="image-gallery" v-if="imagePreviews.length">
      <div class="image-item" v-for="(img, index) in imagePreviews" :key="index">
        <img :src="img" @error="handleImageError(index)" alt="Previewed Image" />
        <button class="remove-btn" type="button" @click="removeImage(index)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
              stroke="#B91F13" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9.16998 14.8299L14.83 9.16992" stroke="#B91F13" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round" />
            <path d="M14.83 14.8299L9.16998 9.16992" stroke="#B91F13" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
