<script setup lang="ts">
  import { ref } from 'vue';
  import questionImage from '@/assets/images/question-image.png';

  const answers = ref([
    {
      id: 1,
      text: 'Lungs',
      img: questionImage,
      isCorrect: false,
    },
    {
      id: 2,
      text: 'Heart',
      img: questionImage,
      isCorrect: true,
    },
    {
      id: 3,
      text: 'Kidneys',
      img: questionImage,
      isCorrect: false,
    },
    {
      id: 4,
      text: 'Liver',
      img: questionImage,
      isCorrect: false,
    },
  ]);
</script>
<template>
  <div class="question-answers-wrapper">
    <div class="question-answers-list">
      <div
        class="question-answer-item"
        :class="{ correct: answer.isCorrect }"
        v-for="answer in answers"
        :key="answer.id"
      >
        <div class="answer-content">
          <label> Answers No : {{ answer.id }}</label>
          <h2 class="answer">{{ answer.text }}</h2>
        </div>
        <div class="answer-image">
          <img :src="answer.img" :alt="answer.text" />
        </div>
      </div>
    </div>
  </div>
</template>
