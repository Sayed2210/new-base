<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import AccordionToggleIcon from '@/shared/icons/questions/AccordionToggleIcon.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AddquestionsParams from '@/modules/Questions/core/params/add.question.params';
import EditquestionsParams from '@/modules/Questions/core/params/edit.question.params';
import AnswersTimeLine from '../../subComponents/AnswersTimeLine.vue';
import type AnswersParams from '@/modules/Questions/core/params/subParams/answers.params';
import QuestionClarification from '../../subComponents/QuestionClarification.vue';
import QuestionClarificationParams from '@/modules/Questions/core/params/subParams/question.clarification.params';
import QuestionSolutionSteps from '../../subComponents/QuestionSolutionSteps.vue';
import SolutionStepsParams from '@/modules/Questions/core/params/subParams/soluation.steps.params';
import QuestionSolutionHints from '../../subComponents/QuestionSolutionHints.vue';
import { QuestionTypeEnum } from '@/modules/Questions/core/constant/question.type.enum';
import type ShowQuestionsModel from '@/modules/Questions/core/models/show.questions.model';
import type QuestionClarificationModel from '@/modules/Questions/core/models/subModels/question.clarification.model';
import type SolutionStepsModel from '@/modules/Questions/core/models/subModels/solution.steps.model';
import type SolutionHintModel from '@/modules/Questions/core/models/subModels/solution.hint.model';

const emit = defineEmits(['updateData']);
const route = useRoute();
const { questionType, questionData } = defineProps<{
  questionType: QuestionTypeEnum;
  questionData: ShowQuestionsModel;
}>();
const updateData = () => {
  let params: any;
  if (route.params.id) {
    params = new EditquestionsParams({
      id: Number(route.params.id),
      answers: Answers.value,
      isQuestionClarification: isQuestionClarification.value,
      questionClarification: QuestionClarifications.value!,
      isSolutionSteps: isSolutionSteps.value,
      solutionSteps: SolutionSteps.value!,
      isSolutionHint: isSolutionHints.value,
      solutionHint: SolutionHints.value!,
    });
  } else {
    params = new AddquestionsParams({
      answers: Answers.value,
      isQuestionClarification: isQuestionClarification.value,
      questionClarification: QuestionClarifications.value!,
      isSolutionSteps: isSolutionSteps.value,
      solutionSteps: SolutionSteps.value!,
      isSolutionHint: isSolutionHints.value,
      solutionHint: SolutionHints.value!,
    });
  }
  emit('updateData', params);
};

const Answers = ref<AnswersParams[]>([]);
const GetAnswers = (data: AnswersParams[]) => {
  Answers.value = data;
  updateData();
};

const isQuestionClarification = ref(false);
const QuestionClarifications = ref<QuestionClarificationParams>();
const GetClarification = (data: {
  data: QuestionClarificationParams;
  isClarification: boolean;
}) => {
  isQuestionClarification.value = data.isClarification;
  QuestionClarifications.value = new QuestionClarificationParams({
    documentId: data?.data?.documentId,
    source: data?.data?.source,
    clarification: data?.data?.clarification,
    file: data?.data?.file,
  });

  updateData();
};

const isSolutionSteps = ref(false);
const SolutionSteps = ref<SolutionStepsParams>();
const GetSolutionSteps = (data: { data: SolutionStepsParams; isSolutionSteps: boolean }) => {
  isSolutionSteps.value = data.isSolutionSteps;
  SolutionSteps.value = new SolutionStepsParams({
    image: data.data.image,
    explanation: data.data.explanation,
  });
  updateData();
};

const isSolutionHints = ref(false);
const SolutionHints = ref<SolutionStepsParams>();
const GetSolutionHints = (data: { data: SolutionStepsParams; isSolutionHints: boolean }) => {
  isSolutionHints.value = data.isSolutionHints;
  SolutionHints.value = new SolutionStepsParams({
    image: data.data.image,
    explanation: data.data.explanation,
  });
  updateData();
};

const ClarificationData = ref<QuestionClarificationModel>();
const isClarification = ref<boolean>(false);
const SolutionStepsData = ref<SolutionStepsModel>();
const isSolutionStepsData = ref<boolean>(false);
const SolutionHintsData = ref<SolutionHintModel>();
const isSolutionHintsData = ref<boolean>(false);
watch(
  () => questionData,
  (newValue) => {
    ClarificationData.value = newValue.questionClarification!;
    isClarification.value = newValue.isClarification!
    SolutionStepsData.value = newValue.solutionSteps!
    isSolutionStepsData.value = newValue.isQusetionSteps!
    SolutionHintsData.value = newValue.solutionHint!
    isSolutionHintsData.value = newValue.isQusetionHints!
  },
);
</script>

<template>
  <Accordion value="0" :pt="{ root: 'answers-data-form' }">
    <AccordionPanel value="0">
      <AccordionHeader>
        <template #toggleicon>
          <div class="toggll-container">
            <div>answers</div>
            <AccordionToggleIcon />
          </div>
          <span class="dashed-border"></span>
        </template>
      </AccordionHeader>
      <AccordionContent>
        <AnswersTimeLine :questionType="questionType" @update:data="GetAnswers" />
        <QuestionClarification
          :ClarificationData="ClarificationData!"
          :isclarification="isClarification"
          @update-data="GetClarification"
        />
        <QuestionSolutionSteps :SolutionStepsData="SolutionStepsData" :isSolutionStepsData="isSolutionStepsData" @update-data="GetSolutionSteps" />
        <QuestionSolutionHints :SolutionHintsData="SolutionHintsData" :isSolutionHintsData="isSolutionHintsData" @update-data="GetSolutionHints" />
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<style scoped>
.toggll-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
}

.dashed-border {
  width: 90%;
  height: 1px;
  border-bottom: 1px dashed #d0d0d0;
}

.p-accordionpanel:last-child > .p-accordionheader {
  padding-left: 0 !important;
}
</style>
