<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DataStatus from '@/shared/DataStatues/DataStatusBuilder.vue'
import FormLoader from '@/shared/DataStatues/FormLoader.vue'
import type Params from '@/base/core/params/params'
import EditEquipmentController from '../controllers/editEquipmentController'
import ShowEquipmentParams from '../../Core/params/showEquipmentParams'
import ShowEquipmentController from '../controllers/showEquipmentController'
import EquipmentForm from './EquipmentForm.vue'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const params = ref<Params | null>(null)

const showEquipmentController = ShowEquipmentController.getInstance()
const state = ref(showEquipmentController.state.value)

const fetchEquipmentDetails = async () => {
  const EquipmentParams = new ShowEquipmentParams(Number(id))

  await showEquipmentController.showEquipmentType(EquipmentParams)
}

onMounted(() => {
  fetchEquipmentDetails()
})

const EditEquipment = async (draft: boolean) => {
  if (draft) {
    await EditEquipmentController.getInstance().editEquipment(params.value!, router)
  } else {
    await EditEquipmentController.getInstance().editEquipment(params.value!, router)
  }
}

watch(
  () => showEquipmentController.state.value,
  (newState) => {
    if (newState) {
      console.log(newState)
      state.value = newState
    }
  },
)

const setParams = (data: Params) => {
  params.value = data
}
</script>

<template>
  <DataStatus :controller="state">
    <template #success>
      <!--      <pre>-->
      <!--              {{ state.data?.titles }}-->

      <!--      </pre>-->
      <form class="grid grid-cols-1 md:grid-cols-4 gap-4" @submit.prevent="EditEquipment">
        <EquipmentForm @update:data="setParams" :data="state.data!" />
        <div class="col-span-4 button-wrapper">
          <button type="submit" class="btn btn-primary">Edit</button>
        </div>
      </form>
    </template>
    <template #loader>
      <FormLoader :inputsCount="5" />
    </template>
  </DataStatus>
</template>

<style scoped></style>
