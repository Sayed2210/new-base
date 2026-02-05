<template>
  <div class="email-crud-example">
    <h2>Employee Email Management</h2>

    <!-- List of Emails -->
    <div class="email-list" v-if="!controller.isListLoading()">
      <div
        v-if="controller.listData.value && controller.listData.value.length > 0"
      >
        <div
          v-for="email in controller.listData.value"
          :key="email.id"
          class="email-item"
        >
          <span>{{ email.email }}</span>
          <span class="email-type">{{ getEmailTypeName(email.type) }}</span>
          <div class="actions">
            <button @click="editEmail(email)">Edit</button>
            <button @click="deleteEmail(email.id!)">Delete</button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No emails found</p>
      </div>
    </div>

    <div v-else>
      <p>Loading emails...</p>
    </div>

    <!-- Add/Edit Form -->
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
      <div class="form-actions">
        <button @click="saveEmail">
          {{ isEditing ? "Update" : "Create" }}
        </button>
        <button v-if="isEditing" @click="cancelEdit">Cancel</button>
      </div>
    </div>

    <!-- Error Display -->
    <div v-if="controller.errorMessage.value" class="error">
      {{ controller.errorMessage.value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  EmailController,
  EmailParams,
  EmailType,
  getEmailTypeName,
} from "@/modules/employee-email";

// Controller instance
const controller = EmailController.getInstance();

// Form state
const formEmail = ref("");
const formType = ref<EmailType>(EmailType.EMPLOYEE);
const isEditing = ref(false);
const editingId = ref<number | null>(null);

// Fetch emails on component mount
onMounted(async () => {
  await controller.fetchList();
});

/**
 * Save (create or update) email
 */
async function saveEmail() {
  const params = new EmailParams(formEmail.value, formType.value);

  if (isEditing.value && editingId.value) {
    // Update existing email
    await controller.update(editingId.value, params);
  } else {
    // Create new email
    await controller.create(params);
  }

  // Refresh list and reset form
  if (controller.isItemSuccess()) {
    await controller.fetchList();
    resetForm();
  }
}

/**
 * Edit email
 */
function editEmail(email: any) {
  formEmail.value = email.email;
  formType.value = email.type;
  isEditing.value = true;
  editingId.value = email.id;
}

/**
 * Delete email
 */
async function deleteEmail(id: number) {
  if (confirm("Are you sure you want to delete this email?")) {
    await controller.delete(id);

    // Refresh list
    if (controller.isItemSuccess()) {
      await controller.fetchList();
    }
  }
}

/**
 * Cancel edit
 */
function cancelEdit() {
  resetForm();
}

/**
 * Reset form
 */
function resetForm() {
  formEmail.value = "";
  formType.value = EmailType.EMPLOYEE;
  isEditing.value = false;
  editingId.value = null;
}
</script>

<style scoped>
.email-crud-example {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.email-list {
  margin-bottom: 30px;
}

.email-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
}

.email-type {
  color: #666;
  font-size: 0.9em;
}

.actions {
  display: flex;
  gap: 10px;
}

.email-form {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.email-form input,
.email-form select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error {
  margin-top: 20px;
  padding: 10px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}
</style>
