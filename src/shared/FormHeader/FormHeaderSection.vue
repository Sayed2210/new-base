<script setup lang="ts">
import HeaderEditIcon from '../icons/HeaderEditIcon.vue';

const props = defineProps<{
  title: string,
  subtitle: string,
  editLink: string
}>()
</script>

<template>
  <div class="form-header-container">
    <div class="form-header">
      <p class="title">{{ title }}</p>
      <p class="subtiltle">{{ subtitle }}</p>
    </div>
    <router-link :to="editLink" class="edit">
      <HeaderEditIcon class="icon" />
      <span>Edit</span>
    </router-link>
  </div>
</template>
<style scoped>
.form-header-container {
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  background-image: url("../../assets/images/HeaderBack.png");
}
</style>
