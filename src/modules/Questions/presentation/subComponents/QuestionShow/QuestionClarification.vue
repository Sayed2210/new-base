<script setup lang="ts">
  import questionImage from '@/assets/images/question-image.png';
  import ClerificationIcon from '@/shared/icons/Question/ClerificationIcon.vue';
</script>
<template>
  <div class="question-clarification-wrapper">
    <div class="card-content">
      <div class="question-clarification-header">
        <ClerificationIcon />
        <h2>Question Clarification</h2>
      </div>

      <div class="question-clarification-body">
        <div class="question-clarification-info">
          <div class="info-item">
            <label class="question-clarification-text">Documents :</label>
            <span>book.pdf</span>
          </div>
          <div class="info-item">
            <label class="question-clarification-text">source: :</label>
            <span>school book page 25</span>
          </div>
        </div>

        <p class="description">
          The center of government and administration Hostes government institutions And
          isconsidered the most important city in the country 
        </p>

        <div class="question-clarification-img">
          <img :src="questionImage" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
