<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import AccordionToggleIcon from '@/shared/icons/questions/AccordionToggleIcon.vue';
import { ref, watch } from 'vue';
import AnswersTimeLine from '../../subComponents/AnswersTimeLine.vue';
import type ShowArticleModel from '@/modules/Articles/core/models/show.Article.model';
import type { ArticleTypeEnum } from '@/modules/Articles/core/constant/Article.type.enum';
import AddArticlesParams from '@/modules/Articles/core/params/add.Artical.params';
import ArticleClarificationParams from '@/modules/Articles/core/params/subParams/Artical.clarification.params';
import ArticalSolutionStepsParams from '@/modules/Articles/core/params/subParams/Artical.soluation.steps.params';
import type ArticleClarificationModel from '@/modules/Articles/core/models/subModels/Article.clarification.model';
import ArticleSolutionSteps from '../../subComponents/ArticleSolutionSteps.vue';
import ArticleSolutionHints from '../../subComponents/ArticleSolutionHints.vue';
import ArticleClarification from '../../subComponents/ArticleClarification.vue';
import type ArticleSolutionStepsModel from '@/modules/Articles/core/models/subModels/Article.solution.steps.model';
import type ArticleSolutionHintModel from '@/modules/Articles/core/models/subModels/Article.solution.hint.model';
import type ArticalAnswersParams from '@/modules/Articles/core/params/subParams/Artical.answers.params';

const emit = defineEmits(['updateData']);
const { articleType, articleData } = defineProps<{
  articleType: ArticleTypeEnum;
  articleData: ShowArticleModel;
}>();

const updateData = () => {
  let params: any;
  params = new AddArticlesParams({
    answers: Answers.value,
    isArticleClarification: isArticleClarification.value,
    articleClarification: articleClarification.value!,
    isArticleSolutionSteps: isSolutionSteps.value,
    articleSolutionSteps: articleSolutionSteps.value!,
    isArticleSolutionHint: isSolutionHints.value,
    articleSolutionHint: articleSolutionHints.value!,
  });
  emit('updateData', params);
};

const Answers = ref<ArticalAnswersParams[]>([]);
const GetAnswers = (data: ArticalAnswersParams[]) => {
  Answers.value = data;
  updateData();
};

const isArticleClarification = ref(false);
const articleClarification = ref<ArticleClarificationParams>();
const GetClarification = (data: {
  data: ArticleClarificationParams;
  isClarification: boolean;
}) => {
  isArticleClarification.value = data.isClarification;
  articleClarification.value = new ArticleClarificationParams({
    documentId: data?.data?.documentId,
    source: data?.data?.source,
    clarification: data?.data?.clarification,
    file: data?.data?.file,
  });

  updateData();
};

const isSolutionSteps = ref(false);
const articleSolutionSteps = ref<ArticalSolutionStepsParams>();
const GetSolutionSteps = (data: { data: ArticalSolutionStepsParams; isSolutionSteps: boolean }) => {
  isSolutionSteps.value = data.isSolutionSteps;
  articleSolutionSteps.value = new ArticalSolutionStepsParams({
    image: data.data.image,
    explanation: data.data.explanation,
  });
  updateData();
};

const isSolutionHints = ref(false);
const articleSolutionHints = ref<ArticalSolutionStepsParams>();
const GetSolutionHints = (data: { data: ArticalSolutionStepsParams; isSolutionHints: boolean }) => {
  isSolutionHints.value = data.isSolutionHints;
  articleSolutionHints.value = new ArticalSolutionStepsParams({
    image: data.data.image,
    explanation: data.data.explanation,
  });
  updateData();
};

const ClarificationData = ref<ArticleClarificationModel>();
const isClarification = ref<boolean>(false);
const SolutionStepsData = ref<ArticleSolutionStepsModel>();
const isSolutionStepsData = ref<boolean>(false);
const SolutionHintsData = ref<ArticleSolutionHintModel>();
const isSolutionHintsData = ref<boolean>(false);
watch(
  () => articleData,
  (newValue) => {
    if (newValue) {
      ClarificationData.value = newValue.articleClarification;
      isClarification.value = !!newValue.articleClarification;
      SolutionStepsData.value = newValue.articleSolutionSteps;
      isSolutionStepsData.value = !!newValue.articleSolutionSteps;
      SolutionHintsData.value = newValue.articleSolutionHint;
      isSolutionHintsData.value = !!newValue.articleSolutionHint;
    }
  },
  { immediate: true }
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
        <AnswersTimeLine :question-type="articleType" @update:data="GetAnswers" />
        <ArticleClarification
          :ClarificationData="ClarificationData!"
          :isclarification="isClarification"
          @update-data="GetClarification"
        />
        <ArticleSolutionSteps :SolutionStepsData="SolutionStepsData" :is-solution-steps-data="isSolutionStepsData" @update-data="GetSolutionSteps" />
        <ArticleSolutionHints :SolutionHintsData="SolutionHintsData" :is-solution-hints-data="isSolutionHintsData" @update-data="GetSolutionHints" />
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
