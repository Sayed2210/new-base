<script setup lang="ts">
  import EditIcon from '@/shared/icons/Privacy/EditIcon.vue';
</script>

<template>
  <div class="question-info-wrapper">
    <div class="question-show-info">
      <h2 class="question-show-title">Show Question</h2>
    </div>
    <div class="question-show-body">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quas iste qui eum explicabo
      repudiandae quam adipisci, amet voluptates architecto debitis! Mollitia, harum velit optio
      expedita esse quis nisi explicabo.
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
