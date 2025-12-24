<script setup lang="ts">
import { ref, nextTick, onMounted, watch } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

import UploadAppend from '@/shared/icons/UploadAppend.vue'
import RemoveImageIcon from '../icons/RemoveImageIcon.vue'
import Dialog from 'primevue/dialog'

interface Props {
  modelValue?: string | File
  aspectRatio?: number
  isCrop?: boolean
  maxSize?: number
  returnType?: 'base64' | 'file'
  index?: number | string // ✅ أضفنا index
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  aspectRatio: 1,
  isCrop: false,
  maxSize: 3.5,
  returnType: 'base64',
  index: 0,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | File, index?: number | string): void
  (e: 'remove', index?: number | string): void
}>()

// state
const imageSrc = ref<string | null>(null)
const cropper = ref<Cropper | null>(null)
const visible = ref(false)

// تحويل Base64 → File
function base64ToFile(base64: string, fileName: string): File {
  const arr = base64.split(',')
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png'
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], fileName, { type: mime })
}

// لما يتغير الفايل
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    alert('Please select an image file')
    return
  }
  if (file.size > props.maxSize * 1024 * 1024) {
    alert(`File size exceeds ${props.maxSize} MB`)
    return
  }

  const reader = new FileReader()

  if (props.isCrop) {
    reader.onload = async (e) => {
      imageSrc.value = e.target?.result as string
      visible.value = true

      await nextTick()
      const imageElement = document.getElementById(
        `cropper-image-${props.index}`,
      ) as HTMLImageElement
      if (cropper.value) cropper.value.destroy()
      if (imageElement) {
        cropper.value = new Cropper(imageElement, {
          aspectRatio: +props.aspectRatio,
          viewMode: 1,
          dragMode: 'move',
          cropBoxResizable: false,
        })
      }
    }
    reader.readAsDataURL(file)
  } else {
    if (props.returnType === 'file') {
      emit('update:modelValue', file, props.index)
    } else {
      reader.onload = (e) => {
        emit('update:modelValue', e.target?.result as string, props.index)
      }
      reader.readAsDataURL(file)
    }
  }
}

// crop
const cropImage = () => {
  if (cropper.value) {
    const canvas = cropper.value.getCroppedCanvas()
    const croppedBase64 = canvas.toDataURL('image/webp')

    if (props.returnType === 'file') {
      const croppedFile = base64ToFile(croppedBase64, `cropped-image-${props.index}.webp`)
      emit('update:modelValue', croppedFile, props.index)
    } else {
      emit('update:modelValue', croppedBase64, props.index)
    }

    visible.value = false
  }
}

// remove
const removeImage = () => {
  emit('update:modelValue', '', props.index)
  emit('remove', props.index)
  imageSrc.value = null
}
onMounted(() => {
  emit('update:modelValue', props.modelValue)
})

watch(() => props.modelValue, (val) => {
  emit('update:modelValue', val)
})
</script>

<template>
  <div class="file-append">
    <input type="file" hidden :id="`file-${props.index}`" accept="image/*" @change="handleFileChange" />

    <!-- Upload area -->
    <label :for="`file-${props.index}`" v-if="!modelValue"
      class="flex justify-center gap-4 file-label items-center cursor-pointer">
      <UploadAppend />
      <p class="text-gray-500">Attach an image no larger than {{ props.maxSize }}MB.</p>
    </label>

    <!-- Preview -->
    <div v-if="modelValue" class="file-preview">
      <div class="file-info flex justify-between items-center">
        <div class="file-name text-[#242424]">Image selected</div>
        <RemoveImageIcon @click="removeImage" class="cursor-pointer close-icon" />
      </div>

      <img v-if="typeof modelValue === 'string'" :src="modelValue" alt="Preview" class="mt-2 max-h-48 rounded" />
      <img v-else-if="modelValue instanceof File" :src="URL.createObjectURL(modelValue)" alt="Preview"
        class="mt-2 max-h-48 rounded" />
    </div>

    <!-- Dialog for crop -->
    <Dialog v-if="props.isCrop" v-model:visible="visible" dismissableMask modal :style="{ width: '40rem' }">
      <div>
        <img :id="`cropper-image-${props.index}`" :src="imageSrc" alt="Cropper" class="w-full" />
        <button @click="cropImage" class="btn btn-primary mt-4">Crop</button>
      </div>
    </Dialog>
  </div>
</template>
