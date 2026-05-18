<script setup lang="ts">
  import QuestionAnswers from '../subComponents/QuestionShow/QuestionAnswers.vue';
  import QuestionClarification from '../subComponents/QuestionShow/QuestionClarification.vue';
  import QuestionHeader from '../subComponents/QuestionShow/QuestionHeader.vue';
  import QuestionInfo from '../subComponents/QuestionShow/QuestionInfo.vue';
import QuestionSolutionHint from '../subComponents/QuestionShow/QuestionSolutionHint.vue';
import QuestionSolutionSteps from '../subComponents/QuestionShow/QuestionSolutionSteps.vue';
</script>

<template>
  <div class="question-show-page">
    <QuestionHeader />
    <QuestionInfo />
    <QuestionAnswers />
    <QuestionClarification />
    <div class="solution-container">
      <QuestionSolutionHint />
      <QuestionSolutionSteps />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .question-show-page {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  .solution-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    
  }
</style>
