<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import PrimaryButton from "@/components/HelpersComponents/PrimaryButton.vue";
import AddEquipmentTypeParams from '@/features/setting/EquipmentType/Core/params/addEquipmentTypeParams.ts'
import type Params from '@/base/core/params/params'
import EquipmentForm from './EquipmentForm.vue'
import AddEquipmentController from '../controllers/addEquipmentController'
import type AddEquipmentParams from '../../Core/params/addEquipmentParams'
import SingleFileUpload from '@/shared/HelpersComponents/SingleFileUpload.vue'

const router = useRouter()
const params = ref<Params | null>(null)

const addEquipmentController = AddEquipmentController.getInstance()

const addEquipment = async () => {
  console.log(params.value, 'params')
  await addEquipmentController.addEquipment(params.value as AddEquipmentParams, router)
}
const setParams = (data: Params) => {
  params.value = data
}


</script>

<template>
  <form class="grid grid-cols-1 md:grid-cols-4 gap-8" @submit.prevent="addEquipment">
    <EquipmentForm @update:data="setParams" />

    <div class="col-span-4 button-wrapper">
      <button type="submit" class="btn btn-primary">Add</button>
    </div>
  </form>
</template>

<style scoped></style>
