<script setup lang="ts">
import { ref } from "vue";
import {
  EmailModel,
  EmailParams,
  EmailType,
} from "@/modules/employee-email";


const emit = defineEmits<{
  updateData: [params: EmailParams];
}>();

const { email } = defineProps({
  email: EmailModel,
});

// Form state
const formEmail = ref(email ? email.email : "");
const formType = ref<EmailType>(email ? email.type : EmailType.EMPLOYEE);
const isEditing = ref(!!email);
const editingId = ref<number | null>(email && email.id ? email.id : null);


const updateData = () => {
    const params: EmailParams = new EmailParams(
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
        placeholder="Enter email address"
      />
      <select v-model="formType">
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
