<script lang="ts" setup>
import PermissionHandler from '@/base/Presentation/utils/permission_handler'
import type { PermissionsEnum } from '@/features/users/Admin/Core/Enum/permission_enum'

// import PermissionHandler from "@/base/Presentation/utils/permission_handler";
// import { PermissionsEnum } from "@/features/users/employee/Core/Enum/permission_enum";

const { code } = defineProps<{
  code: PermissionsEnum[]
}>()
</script>

<template>
  <slot v-if="PermissionHandler.Instance.handle(code)" />
  <slot v-else name="notPermitted" />
</template>

<style scoped></style>
