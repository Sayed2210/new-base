<script setup lang="ts">
import IndexDocumentTypeParams from '@/modules/document/core/params/documntType/index.document.type.params';
import UpdatedCustomInputSelect from '@/shared/FormInputs/UpdatedCustomInputSelect.vue';
import DocumentTypeController from '@/modules/document/presentation/controllers/DocumentType/document.type.controller';
import TitleInterface from '@/base/Data/Models/titleInterface';
import { ref, watch } from 'vue';
import { ArticleDifficultyEnum } from '../../core/constant/Article.difficulty.enum';
import AddArticlesParams from '../../core/params/add.Artical.params';
import ArticalSkillParams from '../../core/params/subParams/Artical.skills.params';
import type ShowArticleModel from '../../core/models/show.Article.model';
const indexDocumentTypeParams = new IndexDocumentTypeParams();
const documentTypeController = DocumentTypeController.getInstance();
const emit = defineEmits(['updateData']);
const { ContentData } = defineProps<{
  ContentData: ShowArticleModel
}>()

const SelectedSubject = ref<TitleInterface<number> | null>(null);
const SelectedQuestionSequence = ref<TitleInterface<number> | null>(null);
const SelectedTopic = ref<TitleInterface<number>[] | null>(null);
const SelectedDifficultyLevel = ref<TitleInterface<number> | null>(null);
const SelectedSkill = ref<TitleInterface<number>[] | null>(null);

const DifficultLevels = ref<TitleInterface<number>[]>([
  {
    id: ArticleDifficultyEnum.easy,
    title: 'Easy',
  },
  {
    id: ArticleDifficultyEnum.medium,
    title: 'Medium',
  },
  {
    id: ArticleDifficultyEnum.hard,
    title: 'Hard',
  },
]);

const updateData = () => {
  emit(
    'updateData',
    new AddArticlesParams({
      difficultyLevel: SelectedDifficultyLevel.value?.id as ArticleDifficultyEnum,
      skills:
        SelectedSkill.value?.map((item) => {
          return new ArticalSkillParams({
            skillId: item.id,
            percentage: Number(item.subtitle),
          });
        }) || [],
      topics: SelectedTopic.value?.map((item) => item.id) || [],
      articleSequenceId: SelectedQuestionSequence.value?.id,
      subjectId: SelectedSubject.value?.id,
    }),
  );
};

watch(() => ContentData, (newData) => {
  if (newData) {
    SelectedDifficultyLevel.value = new TitleInterface<number>({ id: newData.difficulty!, title: DifficultLevels.value.find((item) => item.id === newData.difficulty)?.title as string })
    SelectedTopic.value = newData.topics?.map((item) => new TitleInterface<number>({ id: item.id!, title: item.title! })) || []
    SelectedSkill.value = newData.articleSkills?.map((item) => new TitleInterface<number>({ id: item.id!, title: item.skill!, subtitle: item.precentage! })) || []
  }
})
</script>

<template>
  <div class="contant_tabs">
    <div class="form-group">
      <div class="input">
        <UpdatedCustomInputSelect id="subject" :label="`Subject`" :params="indexDocumentTypeParams"
          :controller="documentTypeController" v-model="SelectedSubject" placeholder="Subject"
          @update:model-value="updateData" />
      </div>
      <div class="input">
        <UpdatedCustomInputSelect id="question-sequence" :label="`question sequence`" :params="indexDocumentTypeParams"
          :controller="documentTypeController" v-model="SelectedQuestionSequence" placeholder="Question sequence"
          @update:model-value="updateData" />
      </div>
      <div class="input">
        <UpdatedCustomInputSelect id="topics" :label="`topics`" :params="indexDocumentTypeParams"
          :controller="documentTypeController" v-model="SelectedTopic" :type="2" placeholder="Topics"
          @update:model-value="updateData" />
      </div>
      <div class="input">
        <UpdatedCustomInputSelect id="difficulty-level" :label="`Difficulty level`"
          :static-options="DifficultLevels as TitleInterface<number>[]"
          v-model="SelectedDifficultyLevel as TitleInterface<number>" placeholder="Difficulty level"
          @update:model-value="updateData" />
      </div>
    </div>
    <div class="new-form-group">
      <UpdatedCustomInputSelect id="skills" :label="`skill`" :type="2" :params="indexDocumentTypeParams"
        :controller="documentTypeController" v-model="SelectedSkill" placeholder="Subject Type"
        @update:model-value="updateData" />
      <div class="skill-percentage" v-for="(skill, index) in SelectedSkill" :key="index">
        <label :for="`skill-percentage-${index}`">
          {{ skill.title }}
        </label>
        <input :id="`skill-percentage-${index}`" type="number" v-model="skill.subtitle" placeholder="Percentage"
          @input="updateData" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.skill-percentage {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  margin-block: 10px;

  & label {
    width: 80%;
    border: 1px solid #e6e6e6;
    padding: 10px;
    border-radius: 10px;
  }

  & input {
    width: 20%;
    padding: 10px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    background-color: white;
    color: black;
    border-radius: 10px;

    &:focus {
      outline: none;
      border: 1px solid #e6e6e6;
    }
  }
}
</style>
