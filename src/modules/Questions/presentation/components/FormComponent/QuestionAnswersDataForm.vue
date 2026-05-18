<script setup lang="ts">
  import Accordion from 'primevue/accordion';
  import AccordionPanel from 'primevue/accordionpanel';
  import AccordionHeader from 'primevue/accordionheader';
  import AccordionContent from 'primevue/accordioncontent';
  import AccordionToggleIcon from '@/shared/icons/questions/AccordionToggleIcon.vue';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import AddquestionsParams from '@/modules/Questions/core/params/add.question.params';
  import EditquestionsParams from '@/modules/Questions/core/params/edit.question.params';
  import HandleFilesUpload from '@/shared/FormInputs/HandleFilesUpload.vue';
  import UplaodImageInput from '@/shared/icons/UploadImage/UplaodImageInput.vue';
  import SelectionTabs from '../../subComponents/SelectionTabs.vue';
  import type TitleInterface from '@/base/Data/Models/titleInterface';
  import { QuestionTypeEnum } from '@/modules/Questions/core/constant/question.type.enum';
  import QuestionContantTabs from '../../subComponents/QuestionContantTabs.vue';
  import QuestionSource from '../../subComponents/QuestionSource.vue';
  import QuestionSourceParams from '@/modules/Questions/core/params/subParams/question.source.params';
  import type { QuestionDifficultyEnum } from '@/modules/Questions/core/constant/question.difficulty.enum';
  import QuestionSkillParams from '@/modules/Questions/core/params/subParams/question.skills.params';
  import AnswersTimeLine from '../../subComponents/AnswersTimeLine.vue';
  import type AnswersParams from '@/modules/Questions/core/params/subParams/answers.params';

  const emit = defineEmits(['updateData']);
  const route = useRoute();
  const selectedDifficultyLevel = ref<number | null>(null);
  const SelectedSkill = ref<number | null>(null);
  const SelectedTopic = ref<number | null>(null);
  const SelectedQuestionSequence = ref<number | null>(null);
  const SelectedSubject = ref<number | null>(null);
  const title = ref<string>('');

  const { loading } = defineProps<{
    loading?: boolean;
  }>();

  const updateData = () => {
    let params: any;
    if (route.params.id) {
      params = new EditquestionsParams({
        id: Number(route.params.id),
        title: title.value,
        image: UploadedImage.value || [],
        questionType: selectedTab.value as QuestionTypeEnum,
        subjectId: SelectedSubject.value ? SelectedSubject.value : null,
        skills: [
          new QuestionSkillParams({
            percentage: 0,
            skillId: 1,
          }),
        ],
        difficultyLevel: selectedDifficultyLevel.value
          ? (selectedDifficultyLevel.value as QuestionDifficultyEnum)
          : null,
        topics: SelectedTopic.value ? [SelectedTopic.value] : [],
        questionSequenceId: SelectedQuestionSequence.value ? SelectedQuestionSequence.value : null,
        questionSource: new QuestionSourceParams({
          documentId: SelectedDocumet.value || 0,
          source: questionSource.value || '',
        }),
        answers: [],
      });
    } else {
      params = new AddquestionsParams({
        answers: Answers.value,
        
      });
    }
    emit('updateData', params);
  };

  const Answers = ref<AnswersParams[]>([]);
  const GetAnswers = (data: AnswersParams[]) => {
    Answers.value = data;
    updateData();
  };
</script>

<template>
  <Accordion value="0">
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
        <AnswersTimeLine @update:data="GetAnswers" />
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
