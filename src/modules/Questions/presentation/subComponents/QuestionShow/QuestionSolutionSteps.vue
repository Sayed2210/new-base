<script setup lang="ts">
  import SolutionStepsIcon from '@/shared/icons/Question/SolutionSteps.vue';
  import questionImage from '@/assets/images/question-image.png';
</script>

<template>
  <div class="question-solution-steps-wrapper">
    <div class="card-content">
      <div class="question-solution-steps-header">
        <SolutionStepsIcon />
        <h2>Solution steps</h2>
      </div>

      <div class="question-solution-steps-body">
        <p class="description">
          The center of government and administration Hostes government institutions And
          isconsidered the most important city in the country
        </p>

        <div class="question-solution-steps-img">
          <img :src="questionImage" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
