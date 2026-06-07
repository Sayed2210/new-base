<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import ArticleQuestion from "../../../../../shared/icons/ArticleQuestion.vue";
import UpdatedCustomInputSelect from "../../../../../shared/FormInputs/UpdatedCustomInputSelect.vue";
import { ArticleDifficultyEnum } from "../../../core/constant/Article.difficulty.enum";
import TitleInterface from "@/base/Data/Models/titleInterface";
import { ArticleTypeEnum } from "@/modules/Articles/core/constant/Article.type.enum";
import { ArticleStatusEnum } from "@/modules/Articles/core/constant/Article.status.enum";
import QuestionCard from "./QuestionCard.vue";
import type ArticalDetailsModel from "@/modules/Articles/core/models/artical.details.model";
const { t } = useI18n();
const route = useRoute();

const { artical } = defineProps<{
  artical?: ArticalDetailsModel;
}>()

// Reactive State
const word = ref("");
const SelectedDifficulty = ref<TitleInterface<number> | null>(null);
const SelectedType = ref<TitleInterface<number> | null>(null);
const SelectedStatus = ref<TitleInterface<number> | null>(null);

// Static options mapped from ArticleDifficultyEnum
const difficultyOptions = computed<TitleInterface<number>[]>((() => [
  new TitleInterface({
    id: ArticleDifficultyEnum.easy,
    title: t("easy"),
  }),
  new TitleInterface({
    id: ArticleDifficultyEnum.medium,
    title: t("medium"),
  }),
  new TitleInterface({
    id: ArticleDifficultyEnum.hard,
    title: t("hard"),
  }),
]));
// Static options mapped from ArticleStatusEnum
const statusOptions = computed<TitleInterface<number>[]>((() => [
  new TitleInterface({
    id: ArticleStatusEnum.approved,
    title: t("approved"),
  }),
  new TitleInterface({
    id: ArticleStatusEnum.under_review,
    title: t("under_review"),
  }),
  new TitleInterface({
    id: ArticleStatusEnum.rejected,
    title: t("rejected"),
  }),
  new TitleInterface({
    id: ArticleStatusEnum.not_Reviewd,
    title: t("not_reviewd"),
  }),
]));
// Static options mapped from ArticleTypeEnum
const typeOptions = computed<TitleInterface<number>[]>((() => [
  new TitleInterface({
    id: ArticleTypeEnum.mcq,
    title: t("mcq"),
  }),
  new TitleInterface({
    id: ArticleTypeEnum.ranking,
    title: t("ranking"),
  }),
  new TitleInterface({
    id: ArticleTypeEnum.true_false,
    title: t("true_false"),
  }),
  new TitleInterface({
    id: ArticleTypeEnum.complate,
    title: t("complate"),
  }),
  new TitleInterface({
    id: ArticleTypeEnum.matching,
    title: t("matching"),
  }),
]));

const Search = () => {
  console.warn("Searching for:", word.value);
};

const updateData = () => {
  console.log("Selected Difficulty Level:", SelectedDifficulty.value?.id);
};
</script>
<template>
  <div class="article_question">
    <header class="form-header">
      <div class="header-text">
        <div class="icon_article">
          <ArticleQuestion />
        </div>
        <div class="contant">
          <h6>{{ $t('questions') }}</h6>
          <p>{{ $t('questions_linked_to_this_passage') }}</p>
        </div>
      </div>
      <div class="btn-add-question">
        <router-link :to="`/questions/add?article_id=${route.params.id}`" title="add new question" class="btn btn-add">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
            stroke-linecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          {{ $t('add new question') }}
        </router-link>
      </div>
    </header>
    <div class="fillters-search">
      <div class="search-field">
        <span class="search-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </span>
        <input v-model="word" :placeholder="$t('search by id, question title,  type , difficulty')" class="search-input"
          type="text" @input="Search" />
      </div>
      <div class="fillters">
        <div class="input-select">
          <UpdatedCustomInputSelect id="doc-difficulty" v-model="SelectedDifficulty" :label="``"
            :static-options="difficultyOptions" :placeholder="$t('select_difficulty')"
            @update:model-value="updateData" />
        </div>
        <div class="input-select">

          <UpdatedCustomInputSelect id="doc-type" v-model="SelectedType" :label="``" :static-options="typeOptions"
            :placeholder="$t('select_type')" @update:model-value="updateData" />
        </div>
        <div class="input-select">

          <UpdatedCustomInputSelect id="doc-status" v-model="SelectedStatus" :label="``" :static-options="statusOptions"
            :placeholder="$t('select_status')" @update:model-value="updateData" />
        </div>
      </div>
    </div>
    <div class="question_list">
      <!-- v-for="question in article?.articlecard" :key="question.id" -->
      <QuestionCard v-if="artical?.questions" :allquestion="artical.questions" />
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '../../../../../styles/variables' as *;
@use '../../../../../styles/mixins/flex' as *;
</style>