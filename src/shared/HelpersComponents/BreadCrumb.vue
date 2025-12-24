<script setup lang="ts">
import ArrowIcons from '../icons/ArrowIcons.vue'

const { BreadCramps } = defineProps<{
  BreadCramps: { title: string; link: string }[]
}>()
</script>

<template>
  <div class="breadcrumbs">
    <ul>
      <li v-for="(item, index) in BreadCramps" :key="index">
        <span>{{ item.title }}</span> <ArrowIcons v-if="index < BreadCramps.length - 1" />
      </li>
    </ul>
  </div>
</template>
