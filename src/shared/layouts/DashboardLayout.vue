<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/shared/LayoutComponents/Header.vue'
import Sidebar from '@/shared/LayoutComponents/Sidebar.vue'
import { useUserStore } from '@/stores/user'
import { OrganizationTypeEnum } from '@/features/auth/Core/Enum/organization_type'
import NewSidebar from '../LayoutComponents/NewSidebar.vue'
import BreadCrumb from '../LayoutComponents/BreadCrumb.vue'

const { user } = useUserStore()
const route = useRoute()

const settingQuery = computed<number | undefined>(() => {
  const v = route.query?.setting
  if (v === undefined) return undefined
  return Number(v)
})

const showSidebar = computed(() => {
  if (!user) return false
  if (user.type === OrganizationTypeEnum.ADMIN) return true
  if (route.fullPath !== '/organization') return true
  if (user.type === OrganizationTypeEnum.ORGANIZATION && settingQuery.value === 1) return true
  return false
})
</script>

<template>
  <main class="content">
    <!--  -->
    <!-- <Sidebar  /> -->
    <!-- <div class="sidebar"> -->
    <NewSidebar v-if="user?.type === OrganizationTypeEnum.ADMIN" />
    <!-- </div> -->
    <section class="content-wrapper">

      <Header />
      <div class="main-content">
        <BreadCrumb />
        <slot />
      </div>
    </section>
  </main>
</template>

<style scoped></style>
