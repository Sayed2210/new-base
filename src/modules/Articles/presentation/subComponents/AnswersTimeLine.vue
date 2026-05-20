<script setup lang="ts">
import { AnswerTypeHelper } from '@/modules/Questions/presentation/subComponents/AnswersTypes/GetAnswerTypeHelper';
import type { QuestionTypeEnum } from '@/modules/Questions/core/constant/question.type.enum';

const { questionType } = defineProps<{
  questionType: QuestionTypeEnum
}>();

const emit = defineEmits(['update:data']);
</script>

<template>
  <component :is="AnswerTypeHelper(questionType)" @update:data="emit('update:data', $event)" />
</template>
