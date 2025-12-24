<script setup lang="ts">
import PrimaryButton from "@/components/HelpersComponents/PrimaryButton.vue";
import type ShowClientModel from "../../Data/models/equipmentDetailsModel.ts";

const props = defineProps<{ data: Array<ShowClientModel> | null }>();
</script>

<template>
  <div class="Practical-information">
    <div class="right">
      <div class="head">
        <h4>Practical employee information</h4>
      </div>
      <div
        class="client-details grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3"
      >
        <div class="main-details col-span-1">
          <h4>Name of sponsor</h4>
          <p>Muhammad Hussein</p>
        </div>
        <div class="card-client col-span-1">
          <h4>client sponsorship</h4>
          <p>External warranty</p>
        </div>
        <div class="end-date col-span-1">
          <h4>Employee status</h4>
          <p>Active</p>
        </div>
        <div class="end-date col-span-1">
          <h4>Specialization</h4>
          <div class="all-btn">
            <PrimaryButton :title="'consultation '" :type="'submit'" />
            <PrimaryButton :title="'Finishes'" :type="'submit'" />
          </div>
        </div>
        <div class="end-date col-span-1">
          <h4>Section</h4>
          <p>Active</p>
        </div>
        <div class="end-date col-span-1">
          <h4>Employee code</h4>
          <p>Active</p>
        </div>
      </div>
    </div>
    <div class="left">
      <div class="head">
        <h4>Login data to the system</h4>
      </div>
      <div
        class="client-details grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3"
      >
        <div class="main-details col-span-1">
          <h4>e-mail</h4>
          <p>{{ data?.email }}</p>
        </div>
        <div class="card-client col-span-1">
          <h4>Password</h4>
          <p>***********</p>
        </div>
        <div class="end-date col-span-1">
          <h4>User permissions</h4>
          <div class="all-btn">
            <PrimaryButton :title="'Add a project'" :type="'submit'" />
            <PrimaryButton :title="'Add a client'" :type="'submit'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
