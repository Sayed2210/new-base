<script setup lang="ts">
import { ref, watch } from "vue";
import {
  EmailModel,
  EmailParams,
  EmailType,
} from "@/modules/employee-email";

const emit = defineEmits<{
  updateData: [params: EmailParams];
}>();

const props = defineProps<{
  email?: EmailModel
}>();

const email = props.email;

// Form state
const formEmail = ref("");
const formType = ref<EmailType>(EmailType.EMPLOYEE);
const isEditing = ref(false);
const editingId = ref<number | null>(null);

watch(
  () => email,
  (newEmail) => {
    if (newEmail) {
      formEmail.value = newEmail.email;
      formType.value = newEmail.type;
      editingId.value = newEmail.id ?? null;
      isEditing.value = true;
    }
  },
  { immediate: true }
);

const updateData = () => {
  const params = new EmailParams(
    formEmail.value,
    formType.value,
    editingId.value || undefined
  );
  emit("updateData", params);
};
</script>


<template>
  <div class="email-crud-example">
    <div class="email-form">
      <h3>{{ isEditing ? "Edit Email" : "Add New Email" }}</h3>
      <input
        v-model="formEmail"
        type="email"
        @input="updateData"
        placeholder="Enter email address"
      />
      <select v-model="formType" @change="updateData">
        <option :value="EmailType.EMPLOYEE">Employee</option>
        <option :value="EmailType.PERSONAL">Personal</option>
        <option :value="EmailType.WORK">Work</option>
        <option :value="EmailType.OTHER">Other</option>
      </select>
    </div>
   
  </div>
</template>

<style scoped>

</style>
