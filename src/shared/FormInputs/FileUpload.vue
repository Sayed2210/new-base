<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import ExcelIcon from '@/assets/images/excel.png'
import IconUploadFile from '@/shared/icons/IconFileUpload.vue'
import PdfIcon from '@/assets/images/pdf.png'
import WordIcon from '@/assets/images/word.png'
import IconVideo from '@/shared/icons/IconVideo.vue'
import IconAudio from '@/shared/icons/IconAudio.vue'
import IconDeleteAttachment from '@/shared/icons/IconDeleteAttachment.vue'
import DwgIcon from '@/assets/images/dwg-file.png'
import RarIcon from '@/assets/images/rar-file.png'
import CloudIcon from '../icons/CloudIcon.vue'
import TrashIcon from '../icons/TrashIcon.vue'

interface Props {
  initialFileData?: string | string[]
  index?: number
  canDelete?: boolean
  accept?: string
  multiable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  initialFileData: () => [],
  canDelete: true,
  accept: '/*',
  multiable: false,
})

const emit = defineEmits<{
  (e: 'update:fileData', file: File | File[] | null, index?: number): void
}>()

// Store both File objects and their preview URLs
const fileData = ref<File[]>([])
const fileUrls = ref<string[]>([])

const placeholderIcons = {
  pdf: PdfIcon,
  word: WordIcon,
  excel: ExcelIcon,
  generic: PdfIcon,
  video: IconVideo,
  audio: IconAudio,
  dwg: DwgIcon,
  rar: RarIcon,
}

function getPlaceholder(file: File): string {
  const extension = file.type
  switch (extension) {
    case 'application/pdf':
      return placeholderIcons.pdf
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return placeholderIcons.word
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return placeholderIcons.excel
    case 'video/mp4':
      return placeholderIcons.video
    case 'audio/mpeg':
      return placeholderIcons.audio
    case 'image/dwg':
      return placeholderIcons.dwg
    case 'application/rar':
    case 'application/x-rar-compressed':
      return placeholderIcons.rar
    default:
      // For images, create object URL
      if (file.type.startsWith('image/')) {
        return URL.createObjectURL(file)
      }
      return placeholderIcons.generic
  }
}

function onFileChange(event: Event) {
  const files = (event.target as HTMLInputElement).files
  if (!files || files.length === 0) return

  const newFiles = Array.from(files)

  if (props.multiable) {
    // Handle multiple files - add to existing files
    fileData.value = [...fileData.value, ...newFiles]

    // Create preview URLs for new files
    const newUrls = newFiles.map((file) => getPlaceholder(file))
    fileUrls.value = [...fileUrls.value, ...newUrls]

    emit('update:fileData', fileData.value, props.index)
  } else {
    // Handle single file - replace existing file
    // Revoke previous object URL if it was an image
    if (fileData.value.length > 0 && fileData.value[0].type.startsWith('image/')) {
      URL.revokeObjectURL(fileUrls.value[0])
    }

    const file = newFiles[0]
    fileData.value = [file]
    fileUrls.value = [getPlaceholder(file)]
    emit('update:fileData', file, props.index)
  }

  // Reset input to allow selecting same files again
  ;(event.target as HTMLInputElement).value = ''
}

// Initialize from props
watch(
  () => props.initialFileData,
  (newValue) => {
    // Clear existing files and URLs
    fileUrls.value.forEach((url, index) => {
      if (fileData.value[index]?.type.startsWith('image/')) {
        URL.revokeObjectURL(url)
      }
    })

    fileData.value = []
    fileUrls.value = []

    if (newValue) {
      // If you need to handle initial file data (URLs), you'll need to convert them
      // This depends on how your initial data is structured
      const urls = Array.isArray(newValue) ? newValue : [newValue]
      fileUrls.value = urls
      // Note: fileData.value will remain empty for initial URLs since we don't have File objects
    }
  },
  { immediate: true },
)

const removeImage = (index: number) => {
  // Revoke object URL to avoid memory leaks
  if (fileData.value[index]?.type.startsWith('image/')) {
    URL.revokeObjectURL(fileUrls.value[index])
  }

  fileUrls.value.splice(index, 1)
  fileData.value.splice(index, 1)

  if (props.multiable) {
    emit('update:fileData', fileData.value.length > 0 ? fileData.value : null, props.index)
  } else {
    emit('update:fileData', null, props.index)
  }
}

const removeAllImages = () => {
  // Revoke all object URLs
  fileUrls.value.forEach((url, index) => {
    if (fileData.value[index]?.type.startsWith('image/')) {
      URL.revokeObjectURL(url)
    }
  })

  fileUrls.value = []
  fileData.value = []
  emit('update:fileData', null, props.index)
}

const handleImageError = (index: number) => {
  // If image fails to load, show generic placeholder
  if (fileData.value[index]) {
    // Revoke the invalid URL first
    if (fileData.value[index].type.startsWith('image/')) {
      URL.revokeObjectURL(fileUrls.value[index])
    }
    fileUrls.value[index] = placeholderIcons.generic
  }
}

// Cleanup on component unmount
onUnmounted(() => {
  fileUrls.value.forEach((url, index) => {
    if (fileData.value[index]?.type.startsWith('image/')) {
      URL.revokeObjectURL(url)
    }
  })
})
</script>

<template>
  <div class="col-span-4 md:col-span-4 multi-image-uploader">
    <!-- Upload Button -->
    <div class="input-image">
      <label :for="`images${index}`" class="input-label-images">
        <CloudIcon />
        <span v-if="multiable">Attach files (up to 10 files, each no larger than 3.5MB)</span>
        <span v-else>Attach a file no larger than 3.5MB.</span>
      </label>

      <input
        type="file"
        :accept="accept"
        :id="`images${index}`"
        class="input"
        :multiple="multiable"
        @change="onFileChange"
      />
    </div>

    <!-- Preview Images -->

    <div class="image-gallery" v-if="fileUrls.length > 0 || fileData.length > 0">
      <div class="image-item" v-for="(url, imgIndex) in fileUrls" :key="imgIndex">
        <img
          class="preview-img"
          :src="url.file || url"
          @error="handleImageError(imgIndex)"
          :alt="`Preview ${imgIndex + 1}`"
        />
        <div v-if="canDelete" class="overlay" @click="removeImage(imgIndex)">
          <TrashIcon />
          <span>Delete</span>
        </div>
      </div>

      <!-- Clear All Button for Multiple Files -->
      <!-- <div v-if="multiable && fileUrls.length > 1 && canDelete" class="clear-all-container">
          <button type="button" class="clear-all-btn" @click="removeAllImages">
            <TrashIcon />
            <span>Clear All</span>
          </button>
        </div> -->
    </div>
  </div>
</template>

<style scoped>
.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.image-item {
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity 0.3s;
  cursor: pointer;
}

.image-item:hover .overlay {
  opacity: 1;
}

.clear-all-container {
  width: 100%;
  margin-top: 1rem;
}

.clear-all-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.clear-all-btn:hover {
  background: #dc2626;
}

.input {
  display: none;
}

.input-label-images {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  /* border: 2px dashed #d1d5db; */
  border-radius: 0.5rem;
  cursor: pointer;
  transition: border-color 0.3s;
}

.input-label-images:hover {
  border-color: #3b82f6;
}
</style>
