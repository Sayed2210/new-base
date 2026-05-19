<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import type ShowQuestionsModel from '../../core/models/show.questions.model';
import AddquestionsParams from '../../core/params/add.question.params';
import BasicQuestionDataForm from './FormComponent/BasicQuestionDataForm.vue';
import QuestionAnswersDataForm from './FormComponent/QuestionAnswersDataForm.vue';
import EditquestionsParams from '../../core/params/edit.question.params';

const route = useRoute();
const emit = defineEmits(['updateData']);
const { question } = defineProps<{
  question?: ShowQuestionsModel;
}>();

const updateData = () => {
  let params: any;
  if (route.params.id) {
    params = new EditquestionsParams({
      id: Number(route.params.id),
      title: BasicData.value?.title,
      image: BasicData.value?.image,
      questionType: BasicData.value?.questionType,
      subjectId: BasicData.value?.subjectId,
      skills: BasicData.value?.skills,
      difficultyLevel: BasicData.value?.difficultyLevel,
      topics: BasicData.value?.topics,
      questionSequenceId: BasicData.value?.questionSequenceId,
      questionSource: BasicData.value?.questionSource,
      answers: AnswerData.value?.answers,
      isQuestionClarification: AnswerData.value?.isQuestionClarification,
      questionClarification: AnswerData.value?.questionClarification,
      isSolutionSteps: AnswerData.value?.isSolutionSteps,
      solutionSteps: AnswerData.value?.solutionSteps,
      isSolutionHint: AnswerData.value?.isSolutionHint,
      solutionHint: AnswerData.value?.solutionHint,
    });
  } else {
    params = new AddquestionsParams({
      title: BasicData.value?.title,
      image: BasicData.value?.image,
      questionType: BasicData.value?.questionType,
      subjectId: BasicData.value?.subjectId,
      skills: BasicData.value?.skills,
      difficultyLevel: BasicData.value?.difficultyLevel,
      topics: BasicData.value?.topics,
      questionSequenceId: BasicData.value?.questionSequenceId,
      questionSource: BasicData.value?.questionSource,
      answers: AnswerData.value?.answers,
      isQuestionClarification: AnswerData.value?.isQuestionClarification,
      questionClarification: AnswerData.value?.questionClarification,
      isSolutionSteps: AnswerData.value?.isSolutionSteps,
      solutionSteps: AnswerData.value?.solutionSteps,
      isSolutionHint: AnswerData.value?.isSolutionHint,
      solutionHint: AnswerData.value?.solutionHint,
    });
  }

  console.log(params, "params")
  emit('updateData', params);
};



const BasicData = ref<AddquestionsParams>();
const GetAllBasicData = (data: AddquestionsParams) => {
  BasicData.value = new AddquestionsParams({
    title: data.title,
    image: data.image,
    questionType: data.questionType,
    subjectId: data.subjectId,
    skills: data.skills,
    difficultyLevel: data.difficultyLevel,
    topics: data.topics,
    questionSequenceId: data.questionSequenceId,
    questionSource: data.questionSource,
  });
  updateData();
};

const AnswerData = ref<AddquestionsParams>();
const GetAllAnswers = (data: AddquestionsParams) => {
  AnswerData.value = new AddquestionsParams({
    answers: data.answers,
    isQuestionClarification: data.isQuestionClarification,
    questionClarification: data.questionClarification,
    isSolutionSteps: data.isSolutionSteps,
    solutionSteps: data.solutionSteps,
    isSolutionHint: data.isSolutionHint,
    solutionHint: data.solutionHint,
  });
  updateData();
};


watch(
  () => question,
  (newquestion) => {
    if (newquestion) {
    }
  },
  { immediate: true },
);

</script>

<template>
  <pre>
    {{ question }}
  </pre>
  <div class="questions-details-form-card">
    <header class="form-header">
      <div class="form-title">
        <div class="header-text">
          <h3>{{ route.params.id ? 'Edit Question' : 'Add New Question' }}</h3>
        </div>
      </div>
    </header>

    <BasicQuestionDataForm :questionData="question" @updateData="GetAllBasicData" />
    <QuestionAnswersDataForm :questionType="BasicData?.questionType!" @updateData="GetAllAnswers" />
  </div>
</template>
