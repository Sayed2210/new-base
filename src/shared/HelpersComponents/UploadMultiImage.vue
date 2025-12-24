<script setup lang="ts">
import { ref, computed } from 'vue'
import UploadImage from '@/shared/icons/UploadImage.vue'
import MultiImagesDialog from './dialog/MultiImagesDialog.vue'

const props = defineProps<{ initialImages?: string[] }>()
const images = ref<string[]>(props.initialImages || [])
const emit = defineEmits(['update:images'])

const handleUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files) return

  images.value = []

  const files = Array.from(target.files)
  files.forEach((file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) images.value.push(e.target.result as string)
    }
    reader.readAsDataURL(file)
  })

  emit('update:images', images.value)
}

const previewImages = computed(() => images.value.slice(0, 3))
const extraCount = computed(() => images.value.length - 3)
</script>


<template>
  <div>
    <label v-if="images.length === 0" class="cursor-pointer inline-block">
      <UploadImage class="image-upload" />
      <input type="file" multiple accept="image/*" class="hidden" @change="handleUpload" />
    </label>

    <MultiImagesDialog :images="images">
      <div v-if="images.length > 1" class="grid grid-cols-2 gap-1 w-15">
        <div v-for="(img, i) in previewImages" :key="i" class="w-full h-full rounded-md overflow-hidden">
          <img :src="img" class="w-15 h-full object-cover" />
        </div>

        <div v-if="images.length >= 4" class="w-full h-full rounded-md overflow-hidden relative cursor-pointer">
          <img :src="images[3]" class="w-15 h-full object-cover" />

          <div class="absolute inset-0 bg-black/50 text-white flex items-center justify-center text-xl font-semibold">
            +{{ extraCount }}
          </div>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 w-15">
        <div v-for="(img, i) in images" :key="i" class="w-full h-full rounded-md overflow-hidden">
          <img :src="img" class="w-15 h-full object-cover" />
        </div>
      </div>
    </MultiImagesDialog>
  </div>
</template>
