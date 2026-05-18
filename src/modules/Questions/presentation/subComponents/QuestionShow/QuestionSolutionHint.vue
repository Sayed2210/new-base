<script setup lang="ts">
  import SolutionHintIcon from '@/shared/icons/Question/SolutionHint.vue';
  import questionImage from '@/assets/images/question-image.png';
</script>

<template>
  <div class="question-solution-hint-wrapper">
    <div class="card-content">
      <div class="question-solution-hint-header">
        <SolutionHintIcon />
        <h2>Solution Hint</h2>
      </div>

      <div class="question-solution-hint-body">
        <p class="description">
          The center of government and administration Hostes government institutions And
          isconsidered the most important city in the country
        </p>

        <div class="question-solution-hint-img">
          <img :src="questionImage" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
