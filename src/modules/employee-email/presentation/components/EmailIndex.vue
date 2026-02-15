<script setup lang="ts">
import { onMounted } from "vue";
import {
  EmailController,
  getEmailTypeName,
} from "@/modules/employee-email";

// Controller instance
const controller = EmailController.getInstance();



// Fetch emails on component mount
onMounted(async () => {
  await controller.fetchList();
});


</script>

<template>
  <div class="email-crud-example">
    <h2>Employee Email Management</h2>

    <!-- List of Emails -->
    <div class="email-list" v-if="!controller.isListLoading()">
      <div v-if="controller.listData.value && controller.listData.value.length > 0">
        <div v-for="email in controller.listData.value" :key="email.id" class="email-item">
          <span>{{ email.email }}</span>
          <span class="email-type">{{ getEmailTypeName(email.type) }}</span>
          <div class="actions">
            <!-- <button @click="ShowEditForm = email.id">Edit</button>
            <button @click="deleteEmail(email.id!)">Delete</button> -->
          </div>
          <!-- <EmailEdit v-if="email.id == ShowEditForm" /> -->
        </div>
      </div>
      <div v-else>
        <p>No emails found</p>
      </div>
    </div>

    <div v-else>
      <p>Loading emails...</p>
    </div>

    
  </div>
</template>


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
