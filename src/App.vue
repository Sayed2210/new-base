<script setup lang="ts">
// import LoaderDialog from './base/Presentation/Dialogs/LoaderDialogs/LoaderDialog.vue';
import MainDialog from './base/Presentation/Dialogs/MainDialogs/MainDialog.vue';
import EmailCrudExample from './modules/employee-email/presentation/components/EmailCrudExample.vue';
</script>

<template>
  <EmailCrudExample />
  <MainDialog />
  <!-- <LoaderDialog /> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
