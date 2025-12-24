<script setup lang="ts">
const props = defineProps({
  icon: {
    type: [Object, Boolean],
    default: false,
  },
  number: {
    type: Number,
    default: 1,
  },
  title: {
    type: String,
    default: "",
  },
})
</script>

<template>
  <div class="header-title">
    <div class="icon">
      <component v-if="props.icon" :is="props.icon" />
      <span v-else>{{ props.number }}</span>
    </div>
    <p class="title">{{ props.title }}</p>
  </div>
</template>