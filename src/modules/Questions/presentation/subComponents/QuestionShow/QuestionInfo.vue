<script setup lang="ts">
  import questionImage from '@/assets/images/question-image.png';

  interface QuestionInfoItem {
    label: string;
    value: string;
  }

  const questionInfoList: QuestionInfoItem[] = [
    {
      label: 'Question Type',
      value: 'MCQ',
    },
    {
      label: 'Difficulty',
      value: 'Medium',
    },
    {
      label: 'Marks',
      value: '5 Points',
    },
  ];

  const question = {
    text: 'What is the basic building block of a living organism?',
    image: questionImage,
  };
</script>

<template>
  <div class="question-info-wrapper">
    <!-- Dynamic Info List -->
    <div class="question-info-categories">
      <div v-for="item in questionInfoList" :key="item.label" class="question-info-item">
        <label> {{ item.label }}: </label>

        <p>
          {{ item.value }}
        </p>
      </div>
    </div>

    <!-- Question Body -->
    <div class="question-show-body">
      <div class="question-body-text">
        <label>Question</label>

        <h2>
          {{ question.text }}
        </h2>
      </div>

      <div class="question-body-img">
        <img :src="question.image" :alt="question.text" />
      </div>
    </div>
  </div>
</template>
