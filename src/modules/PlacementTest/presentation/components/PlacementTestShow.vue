<script lang="ts" setup>
  import { computed, onMounted } from 'vue';
  import PlacementTestController from '../controllers/placement.test.controller';
  import ShowPlacementTestParams from '../../core/params/show.placement.params';
  import { useRoute } from 'vue-router';
  import DataStatusBuilder from '@/shared/DataStatues/DataStatusBuilder.vue';
  import PlacemnetStudentCard from './subCompnents/PlacemnetStudentCard.vue';

  const controller = PlacementTestController.getInstance();
  const state = computed(() => controller.itemState.value);

  const route = useRoute();
  const FetchDetails = async () => {
    const showPlacementTestParams = new ShowPlacementTestParams(
      route.params.id as unknown as number,
    );
    await controller.fetchOne(showPlacementTestParams);
  };

  onMounted(() => {
    FetchDetails();
  });
</script>
<template>
  <DataStatusBuilder :controller="state">
    <template #success="{ data }">
      <PlacemnetStudentCard :student="data.student" :subjects="data.EducationClassificationSubject" />
    </template>
  </DataStatusBuilder>
</template>
