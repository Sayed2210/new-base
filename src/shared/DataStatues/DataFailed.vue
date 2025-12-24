<script setup lang="ts">
import { OrganizationTypeEnum } from '@/features/auth/Core/Enum/organization_type';
import { useUserStore } from '@/stores/user';

const {
  title,
  description,
  link = '/',
  addText = 'Home',
} = defineProps<{
  title?: string
  description?: string
  link?: string
  addText?: string
}>()

const { user } = useUserStore()
</script>

<template>
  <div class="data-empty ">
    <img alt="imageFailed" class="data-empty-image" src="@/assets/images/DataFailed.gif" />
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <router-link :to="link || user?.type == OrganizationTypeEnum?.ADMIN ? '/admin' : '/organization'"
      class="btn btn-primary">
      {{ addText }}
    </router-link>
  </div>
</template>

<style scoped></style>
