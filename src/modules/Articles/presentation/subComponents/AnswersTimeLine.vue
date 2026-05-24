<script setup lang="ts">
import { AnswerTypeHelper } from './AnswersTypes/GetAnswerTypeHelper';
import { type ArticleTypeEnum } from '../../core/constant/Article.type.enum';

const { questionType } = defineProps<{
  questionType: ArticleTypeEnum
}>();

const emit = defineEmits(['update:data']);
</script>

<template>
  <component :is="AnswerTypeHelper(questionType)" @update:data="emit('update:data', $event)" />
</template>

