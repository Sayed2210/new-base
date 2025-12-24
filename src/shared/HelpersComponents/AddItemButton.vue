<script setup lang="ts">
// import { defineProps } from 'vue'

const props = defineProps({
  addLink: {
    type: String,
    default: '',
  },
  addText: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="add-item-button">
    <router-link :to="props.addLink">
      <button class="btn btn-add-item">
        {{ props.addText }}
      </button>
    </router-link>
  </div>
</template>

<style scoped></style>
