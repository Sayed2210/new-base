<script setup lang="ts">
  import FaqImg from '@/assets/images/faq-image.png';
  import EditIcon from '@/shared/icons/Privacy/EditIcon.vue';

    
</script>

<template>
  <div class="action-row-wrapper">
    <div class="info">
      <img :src="FaqImg" alt="question image" />
      <div class="name">
        <h3>Draft question</h3>
        <p>complete all details of the question and the available procedures to can publish it</p>
      </div>
    </div>
    <div class="question-actions">
      <button class="btn btn-primary"><EditIcon /> {{ $t('edit') }}</button>
      <button class="action-btn delete" title="Delete">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      </button>
    </div>
  </div>
</template>
