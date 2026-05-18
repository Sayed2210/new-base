<script setup lang="ts">
  import questionImage from '@/assets/images/question-image.png';
  import ClerificationIcon from '@/shared/icons/Question/ClerificationIcon.vue';

  interface ClarificationInfoItem {
    label: string;
    value: string;
  }

  const clarificationInfo: ClarificationInfoItem[] = [
    {
      label: 'Documents',
      value: 'book.pdf',
    },
    {
      label: 'Source',
      value: 'School Book Page 25',
    },
  ];

  const clarification = {
    description:
      'The center of government and administration hosts government institutions and is considered the most important city in the country.',
    image: questionImage,
  };
</script>

<template>
  <div class="question-clarification-wrapper">
    <div class="card-content">
      <!-- Header -->
      <div class="question-clarification-header">
        <ClerificationIcon />
        <h2>Question Clarification</h2>
      </div>

      <!-- Body -->
      <div class="question-clarification-body">
        <!-- Dynamic Info -->
        <div class="question-clarification-info">
          <div v-for="item in clarificationInfo" :key="item.label" class="info-item">
            <label class="question-clarification-text"> {{ item.label }}: </label>

            <span>
              {{ item.value }}
            </span>
          </div>
        </div>

        <!-- Description -->
        <p class="description">
          {{ clarification.description }}
        </p>

        <!-- Image -->
        <div v-if="clarification.image" class="question-clarification-img">
          <img :src="clarification.image" alt="question clarification" />
        </div>
      </div>
    </div>
  </div>
</template>
