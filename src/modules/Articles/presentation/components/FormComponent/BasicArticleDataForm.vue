<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import AccordionToggleIcon from '@/shared/icons/questions/AccordionToggleIcon.vue';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AddArticlesParams from '@/modules/Articles/core/params/add.Artical.params';
import EditArticlesParams from '@/modules/Articles/core/params/edit.Articles.params';
import HandleFilesUpload from '@/shared/FormInputs/HandleFilesUpload.vue';
import UplaodImageInput from '@/shared/icons/UploadImage/UplaodImageInput.vue';
import SelectionTabs from '../../subComponents/SelectionTabs.vue';
import type TitleInterface from '@/base/Data/Models/titleInterface';
import ArticleContantTabs from '../../subComponents/ArticleContantTabs.vue';
import ArticleSource from '../../subComponents/ArticleSource.vue';
import ArticalSourceParams from '@/modules/Articles/core/params/subParams/Artical.source.params';
import { ArticleDifficultyEnum } from '@/modules/Articles/core/constant/Article.difficulty.enum';
import ArticalSkillParams from '@/modules/Articles/core/params/subParams/Artical.skills.params';
import type ArticleClarificationParams from '@/modules/Articles/core/params/subParams/Artical.clarification.params';
import ArticleDocumentModel from '@/modules/Articles/core/models/subModels/Article.document.model';
import ShowArticleModel from '@/modules/Articles/core/models/show.Article.model';
import { ArticleTypeEnum } from '@/modules/Articles/core/constant/Article.type.enum';

const emit = defineEmits(['updateData']);
const route = useRoute();
const selectedDifficultyLevel = ref<number | null>(null);
const SelectedSkill = ref<ArticalSkillParams[] | null>(null);
const SelectedTopic = ref<number[] | null>(null);
const SelectedQuestionSequence = ref<number | null>(null);
const SelectedSubject = ref<number | null>(null);
const title = ref<string>('');

const { loading, articleData } = defineProps<{
  loading?: boolean;
  articleData?: ShowArticleModel;
}>();

const updateData = () => {
  let params: any;
  if (route.params.id) {
    params = new EditArticlesParams({
      id: Number(route.params.id),
      title: title.value,
      image: UploadedImage.value || [],
      articleType: selectedTab.value as ArticleTypeEnum,
      subjectId: SelectedSubject.value ? SelectedSubject.value : null,
      skills: SelectedSkill.value || [],
      difficultyLevel: selectedDifficultyLevel.value
        ? (selectedDifficultyLevel.value as ArticleDifficultyEnum)
        : null,
      topics: SelectedTopic.value ? SelectedTopic.value : [],
      articleSequenceId: SelectedQuestionSequence.value ? SelectedQuestionSequence.value : null,
      articleSource: new ArticalSourceParams({
        documentId: SelectedDocumet.value || 0,
        source: questionSource.value || '',
      }),
      answers: [], // to be populated by ArticleAnswersDataForm in parent
    });
  } else {
    params = new AddArticlesParams({
      title: title.value,
      image: UploadedImage.value || [],
      articleType: selectedTab.value as ArticleTypeEnum,
      subjectId: SelectedSubject.value ? SelectedSubject.value : null,
      skills: SelectedSkill.value || [],
      difficultyLevel: selectedDifficultyLevel.value
        ? (selectedDifficultyLevel.value as ArticleDifficultyEnum)
        : null,
      topics: SelectedTopic.value ? SelectedTopic.value : [],
      articleSequenceId: SelectedQuestionSequence.value ? SelectedQuestionSequence.value : null,
      articleSource: new ArticalSourceParams({
        documentId: SelectedDocumet.value || 0,
        source: questionSource.value || '',
      }),
    });
  }
  emit('updateData', params);
};
const UploadedImage = ref<string[]>([]);

const handleImageChange = (file: any) => {
  UploadedImage.value = file[0]?.base64 ? [file[0].base64] : [];
  updateData();
};

const tabs = ref<TitleInterface<number>[]>([
  {
    id: ArticleTypeEnum.mcq,
    title: 'MCQ',
  },
  {
    id: ArticleTypeEnum.true_false,
    title: 'trueAndFalse',
  },
  {
    id: ArticleTypeEnum.ranking,
    title: 'ranking',
  },
  {
    id: ArticleTypeEnum.complate,
    title: 'complete',
  },
  {
    id: ArticleTypeEnum.matching,
    title: 'matching',
  },
]);

const selectedTab = ref<number | null>(ArticleTypeEnum.mcq);
const selectTab = (tab: number) => {
  selectedTab.value = tab;
  updateData();
};

const getQuestionCOntent = (data: AddArticlesParams) => {
  selectedDifficultyLevel.value = data.difficultyLevel!;
  SelectedSkill.value = data.skills!.map((item) => {
    return new ArticalSkillParams({
      skillId: item.skillId,
      percentage: item?.percentage,
    });
  });
  SelectedTopic.value = data.topics!;
  SelectedQuestionSequence.value = data.articleSequenceId!;
  SelectedSubject.value = data.subjectId!;
  updateData();
};

const questionSource = ref<string>('');
const SelectedDocumet = ref<number | null>(null);
const GetQuestionSource = (data: ArticleClarificationParams) => {
  SelectedDocumet.value = data.documentId!;
  questionSource.value = data.source!;
  updateData();
};
onMounted(() => {
  updateData();
});

const ContentData = ref<ShowArticleModel | null>(null);
const DocumentSource = ref<ArticleDocumentModel | null>(null);
watch(
  () => articleData,
  (newValue) => {
    if (newValue) {
      title.value = newValue?.articleTitle || '';
      UploadedImage.value = newValue?.articleImage ? [newValue?.articleImage] : [];
      selectedTab.value = newValue?.articleType || null;
      SelectedSubject.value = newValue?.subjectTree?.id || null;
      SelectedSkill.value =
        newValue?.articleSkills?.map((item) => {
          return new ArticalSkillParams({
            skillId: item.id!,
            percentage: item.precentage!,
          });
        }) || [];
      selectedDifficultyLevel.value = newValue?.difficulty || null;
      SelectedTopic.value = newValue?.topics?.map((item) => item.id) || [];
      SelectedQuestionSequence.value = newValue?.sequenceTree?.id || null;
      SelectedDocumet.value = newValue?.articleDocuments?.id || null;
      questionSource.value = newValue?.articleDocuments?.source || '';
      ContentData.value = new ShowArticleModel({
        articleType: newValue?.articleType,
        difficulty: newValue?.difficulty,
        topics: newValue?.topics,
        subjectTree: newValue?.subjectTree,
        sequenceTree: newValue?.sequenceTree,
        articleDocuments: newValue?.articleDocuments,
        articleSkills: newValue?.articleSkills,
      });
      DocumentSource.value = new ArticleDocumentModel({
        id: newValue?.articleDocuments?.id,
        title: newValue?.articleDocuments?.title,
        source: newValue?.articleDocuments?.source,
      });
    }
  },
  { immediate: true }
);
</script>

<template>
  <Accordion :pt="{
    'root': 'basic-data-form'
  }" value="0" :lazy="true">
    <AccordionPanel value="0">
      <AccordionHeader>
        <template #toggleicon>
          <div class="toggll-container">
            <div>{{ $t('basic article data') }}</div>
            <AccordionToggleIcon />
          </div>
          <span class="dashed-border"></span>
        </template>
      </AccordionHeader>
      <AccordionContent>
        <div class="form-fields">
          <div class="field-group col-span-2" :class="{ disabled: loading }">
            <label class="field-label" for="name">{{ $t('article title') }}</label>
            <div class="input-wrap">
              <input id="title" v-model="title" type="text" :placeholder="$t('Enter article title')" class="field-input"
                @input="updateData" />
            </div>
          </div>

          <div class="field-group col-span-2" :class="{ disabled: loading }">
            <HandleFilesUpload :label="`upload image`" accept="image/*" :multiple="false" :index="1"
              :file="UploadedImage" :have-content="true" :class="`image-input`" @change="handleImageChange">
              <template #content>
                <div class="add-imaegs-data">
                  <UplaodImageInput />
                  <p class="first-text"><span>{{ 'Click to upload' }}</span>{{ $t('or drag and drop') }}</p>
                  <p class="second-text">{{ $t('JPG, JPEG, PNG less than 1MB') }}</p>
                </div>
              </template>
            </HandleFilesUpload>
          </div>

          <SelectionTabs class="field-group col-span-2" :tabs="tabs" :selected-tab="selectedTab"
            @update:model-value="selectTab" />
          <ArticleContantTabs :ContentData="ContentData!" class="field-group col-span-2"
            @updateData="getQuestionCOntent" />
          <ArticleSource :documentSource="DocumentSource" @updateData="GetQuestionSource"
            class="field-group col-span-2" />
        </div>
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
  width: 85%;
  height: 1px;
  border-bottom: 1px dashed #d0d0d0;
}

.p-accordionpanel:last-child>.p-accordionheader {
  padding-left: 0 !important;
}
</style>
