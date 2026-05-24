<script setup lang="ts">
  import IndexDocumentTypeParams from '@/modules/document/core/params/documntType/index.document.type.params';
  import UpdatedCustomInputSelect from '@/shared/FormInputs/UpdatedCustomInputSelect.vue';
  import DocumentTypeController from '@/modules/document/presentation/controllers/DocumentType/document.type.controller';
  import TitleInterface from '@/base/Data/Models/titleInterface';
  import { ref, watch } from 'vue';
  import { QuestionDifficultyEnum } from '../../core/constant/question.difficulty.enum';
  import AddquestionsParams from '../../core/params/add.question.params';
  import QuestionSkillParams from '../../core/params/subParams/question.skills.params';
  import TopicsParams from '../../core/params/subParams/topics.params';
  import type ShowQuestionsModel from '../../core/models/show.questions.model';
  import SkillsController from '@/modules/Skills/presentation/controllers/skills.controller';
  import IndexSkillsParams from '@/modules/Skills/core/params/index.skills.params';
  const indexDocumentTypeParams = new IndexDocumentTypeParams();
  const documentTypeController = DocumentTypeController.getInstance();
  const emit = defineEmits(['updateData']);
  const { ContentData } = defineProps<{
    ContentData: ShowQuestionsModel;
  }>();

  const SelectedSubject = ref<TitleInterface<number> | null>(null);
  const SelectedQuestionSequence = ref<TitleInterface<number> | null>(null);
  const SelectedTopic = ref<TitleInterface<number>[] | null>(null);
  const SelectedDifficultyLevel = ref<TitleInterface<number> | null>(null);
  const SelectedSkill = ref<TitleInterface<number>[] | null>(null);

  const DifficultLevels = ref<TitleInterface<number>[]>([
    {
      id: QuestionDifficultyEnum.easy,
      title: 'Easy',
    },
    {
      id: QuestionDifficultyEnum.medium,
      title: 'Medium',
    },
    {
      id: QuestionDifficultyEnum.hard,
      title: 'Hard',
    },
  ]);

  const updateData = () => {
    emit(
      'updateData',
      new AddquestionsParams({
        difficultyLevel: SelectedDifficultyLevel.value?.id as QuestionDifficultyEnum,
        skills:
          SelectedSkill.value?.map((item) => {
            return new QuestionSkillParams({
              skillId: item.id,
              percentage: Number(item.subtitle),
            });
          }) || undefined,
        topics: SelectedTopic.value?.map((item) => new TopicsParams({ id: item.id })) || [],
        questionSequenceId: SelectedQuestionSequence.value?.id,
        subjectId: SelectedSubject.value?.id,
      }),
    );
  };

  watch(
    () => ContentData,
    (newData) => {
      SelectedDifficultyLevel.value = new TitleInterface<number>({
        id: newData.difficulty!,
        title: DifficultLevels.value.find((item) => item.id === newData.difficulty)
          ?.title as string,
      });
      SelectedTopic.value = newData.topics!.map(
        (item) => new TitleInterface<number>({ id: item.id!, title: item.title! }),
      );
      SelectedSkill.value = newData.skills!.map(
        (item) =>
          new TitleInterface<number>({
            id: item.id!,
            title: item.skill!,
            subtitle: item.precentage!,
          }),
      );
    },
  );

  const skillsController = SkillsController.getInstance();
  const indexSkillsParams = new IndexSkillsParams();
</script>

<template>
  <div class="contant_tabs">
    <div class="form-group">
      <div class="input">
        <UpdatedCustomInputSelect
          id="subject"
          v-model="SelectedSubject"
          :label="`Subject`"
          :params="indexDocumentTypeParams"
          :controller="documentTypeController"
          placeholder="Subject"
          @update:model-value="updateData"
        />
      </div>
      <div class="input">
        <UpdatedCustomInputSelect
          id="question-sequence"
          v-model="SelectedQuestionSequence"
          :label="`question sequence`"
          :params="indexDocumentTypeParams"
          :controller="documentTypeController"
          placeholder="Question sequence"
          @update:model-value="updateData"
        />
      </div>
      <div class="input">
        <UpdatedCustomInputSelect
          id="topics"
          v-model="SelectedTopic"
          :label="`topics`"
          :params="indexDocumentTypeParams"
          :controller="documentTypeController"
          :type="2"
          placeholder="Topics"
          @update:model-value="updateData"
        />
      </div>
      <div class="input">
        <UpdatedCustomInputSelect
          id="difficulty-level"
          v-model="SelectedDifficultyLevel"
          :label="`Difficulty level`"
          :static-options="DifficultLevels as TitleInterface<number>[]"
          placeholder="Difficulty level"
          @update:model-value="console.log($event, 'eveent')"
        />
      </div>
    </div>
    <div class="new-form-group">
      <UpdatedCustomInputSelect
        id="skills"
        v-model="SelectedSkill"
        :label="`skill`"
        :type="2"
        :params="indexSkillsParams"
        :controller="skillsController"
        v-model="SelectedSkill"
        placeholder="Subject Type"
        @update:model-value="updateData"
      />
      <div v-for="(skill, index) in SelectedSkill" :key="index" class="skill-percentage">
        <label :for="`skill-percentage-${index}`">
          {{ skill.title }}
        </label>
        <input
          :id="`skill-percentage-${index}`"
          v-model="skill.subtitle"
          type="number"
          placeholder="Percentage"
          @input="updateData"
        />
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
