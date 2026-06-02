<script setup lang="ts">
  import { AnswerTypeHelper } from '@/modules/Questions/presentation/subComponents/AnswersTypes/GetAnswerTypeHelper';
  import type { QuestionTypeEnum } from '@/modules/Questions/core/constant/question.type.enum';
  import type AnswerModel from '../../core/models/subModels/answer.model';

  const { questionType, questionData } = defineProps<{
    questionType: QuestionTypeEnum;
    questionData?: AnswerModel[];
  }>();

  const emit = defineEmits(['update:data']);
</script>

<template>
  <component
    :is="AnswerTypeHelper(questionType)"
    :question-data="questionData!"
    @update:data="emit('update:data', $event)"
  />
  <!--  -->
</template>
