<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import type ShowArticleModel from '../../core/models/show.Article.model';
import EditArticlesParams from '../../core/params/edit.Articles.params';
import AddArticlesParams from '../../core/params/add.Artical.params';
import BasicArticleDataForm from './FormComponent/BasicArticleDataForm.vue';
import ArticleAnswersDataForm from './FormComponent/ArticleAnswersDataForm.vue';
import { ArticleTypeEnum } from '../../core/constant/Article.type.enum';
import ArticalSourceParams from '../../core/params/subParams/Artical.source.params';

const route = useRoute();
const emit = defineEmits(['updateData']);
const { article } = defineProps<{
  article?: ShowArticleModel;
}>();

const updateData = () => {
  let params: any;
  if (route?.params?.id) {
    params = new EditArticlesParams({
      id: Number(route.params.id),
      title: BasicData.value.title || '',
      image: BasicData.value.image || [],
      articleType: BasicData.value.articleType || ArticleTypeEnum.mcq,
      subjectId: BasicData.value.subjectId ?? null,
      skills: BasicData.value.skills || [],
      difficultyLevel: BasicData.value.difficultyLevel ?? null,
      topics: BasicData.value.topics || [],
      articleSequenceId: BasicData.value.articleSequenceId ?? null,
      articleSource: BasicData.value.articleSource || new ArticalSourceParams({ documentId: 0, source: '' }),
      answers: AnswerData.value.answers || [],
      isArticleClarification: AnswerData.value.isArticleClarification,
      articleClarification: AnswerData.value.articleClarification,
      isArticleSolutionSteps: AnswerData.value.isArticleSolutionSteps,
      articleSolutionSteps: AnswerData.value.articleSolutionSteps,
      isArticleSolutionHint: AnswerData.value.isArticleSolutionHint,
      articleSolutionHint: AnswerData.value.articleSolutionHint,
    });
  } else {
    params = new AddArticlesParams({
      title: BasicData.value.title,
      image: BasicData.value.image,
      articleType: BasicData.value.articleType,
      subjectId: BasicData.value.subjectId,
      skills: BasicData.value.skills,
      difficultyLevel: BasicData.value.difficultyLevel,
      topics: BasicData.value.topics,
      articleSequenceId: BasicData.value.articleSequenceId,
      articleSource: BasicData.value.articleSource,
      answers: AnswerData.value.answers,
      isArticleClarification: AnswerData.value.isArticleClarification,
      articleClarification: AnswerData.value.articleClarification,
      isArticleSolutionSteps: AnswerData.value.isArticleSolutionSteps,
      articleSolutionSteps: AnswerData.value.articleSolutionSteps,
      isArticleSolutionHint: AnswerData.value.isArticleSolutionHint,
      articleSolutionHint: AnswerData.value.articleSolutionHint,
    });
  }
  emit('updateData', params);
};

const BasicData = ref<AddArticlesParams>(new AddArticlesParams({ articleType: ArticleTypeEnum.mcq }));
const GetAllBasicData = (data: AddArticlesParams) => {
  BasicData.value = data;
  updateData();
};

const AnswerData = ref<AddArticlesParams>(new AddArticlesParams({}));
const GetAllAnswers = (data: AddArticlesParams) => {
  AnswerData.value = data;
  updateData();
};

watch(
  () => article,
  (newValue) => {
    if (newValue) {
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="questions-details-form-card">
    <header class="form-header">
      <div class="form-title">
        <div class="header-text">
          <h3>{{ route?.params?.id ? $t('Edit Article') : $t('Add New Article') }}</h3>
        </div>
      </div>
    </header>

    <BasicArticleDataForm :article-data="article" @update-data="GetAllBasicData" />
    <ArticleAnswersDataForm :article-data="article!" :article-type="BasicData.articleType!" @update-data="GetAllAnswers" />
  </div>
</template>
