<script setup lang="ts">
  import AnswerModel from '@/modules/Questions/core/models/subModels/answer.model';

  const { answers } = defineProps<{ answers: AnswerModel[] }>();
</script>
<template>
  <div class="question-answers-wrapper">
    <div class="question-answers-list">
      <div
        class="question-answer-item"
        :class="{ correct: answer?.isCorrect }"
        v-for="answer in answers"
        :key="answer?.id"
      >
        <div class="answer-content">
          <label> Answers No : {{ answer?.id }}</label>
          <h2 class="answer">{{ answer?.answer }}</h2>
        </div>
        <div class="answer-image">
          <img :src="answer?.image" :alt="answer?.answer" />
        </div>
      </div>
    </div>
  </div>
</template>
