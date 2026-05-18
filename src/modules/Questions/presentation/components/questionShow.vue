<script setup lang="ts">
  import QuestionAnswers from '../subComponents/QuestionShow/QuestionAnswers.vue';
import QuestionHeader from '../subComponents/QuestionShow/QuestionHeader.vue';
  import QuestionInfo from '../subComponents/QuestionShow/QuestionInfo.vue';
</script>

<template>
  <div class="question-show-page">
    <QuestionHeader />
    <QuestionInfo />
    <QuestionAnswers />
  </div>
</template>


<style lang="scss" scoped>
.question-show-page{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
</style>