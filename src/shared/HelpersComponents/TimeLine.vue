<script setup lang="ts" generic="T">
import AddAnswer from '@/shared/icons/AddAnswer.vue'
import DeleteItemAction from '@/shared/icons/DeleteItemAction.vue'
import { onMounted, ref } from 'vue'

const emit = defineEmits(['update:data'])
const props = defineProps<{
  items: T[]
}>()

const Answers = ref<T[]>(props.items)



const addNewAnswer = () => {
  Answers.value.push({
    title: '',
    isDanger: false,
  })
  UpdateData()
}

const DeleteItem = (index: number) => {
  Answers.value.splice(index, 1)
  UpdateData()
}

const UpdateData = () => {
  emit(
    'update:data',
    Answers.value.filter((answer) => answer.title.trim() !== '')
  )
}

onMounted(() => {
  emit(
    'update:data',
    Answers.value.filter((answer) => answer.title.trim() !== '')
  )
})
</script>
<template>
  {{ Answers }}
  <div class="template-container">
    <div class="heirarchy-info">
      <div class="timeline-container">
        <div class="timeline-wrapper">
          <div class="timeline-line"></div>
          <div class="timeline-item" v-for="(item, index) in items" :key="index" :class="{ active: index === 0 }"
            :style="{ animationDelay: `${index * 0.15}s` }">
            <div class="timeline-marker">
              <div class="timeline-dot">
                <div class="timeline-dot-inner"></div>
                <div class="timeline-pulse"></div>
              </div>

              <div class="timeline-icon">
                <DeleteItemAction class="cursor-pointer" v-if="index >= 0 && index !== Answers.length - 1"
                  @click="DeleteItem(index)" />
                <AddAnswer v-else @click="addNewAnswer" class="cursor-pointer" />
              </div>
            </div>

            <div class="timeline-content">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
