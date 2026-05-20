<script setup lang="ts">
  import Accordion from 'primevue/accordion';
  import AccordionPanel from 'primevue/accordionpanel';
  import AccordionHeader from 'primevue/accordionheader';
  import AccordionContent from 'primevue/accordioncontent';
  import AccordionToggleIcon from '@/shared/icons/questions/AccordionToggleIcon.vue';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import type { QuestionDifficultyEnum } from '@/modules/Questions/core/constant/question.difficulty.enum';
  import QuestionSkillParams from '@/modules/Questions/core/params/subParams/question.skills.params';
  import AnswersTimeLine from '../../subComponents/AnswersTimeLine.vue';
  import type AnswersParams from '@/modules/Questions/core/params/subParams/answers.params';
import ArticalSourceParams from '@/modules/Articles/core/params/subParams/Artical.source.params';
import AddArticlesParams from '@/modules/Articles/core/params/add.Artical.params';
import EditArticlesParams from '@/modules/Articles/core/params/edit.Articles.params';
import type { QuestionTypeEnum } from '@/modules/Questions/core/constant/question.type.enum';

  const emit = defineEmits(['updateData']);
  const route = useRoute();
  const selectedDifficultyLevel = ref<number | null>(null);
  const SelectedSkill = ref<number | null>(null);
  const SelectedTopic = ref<number | null>(null);
  const SelectedArticleSequence = ref<number | null>(null);
  const SelectedSubject = ref<number | null>(null);
  const title = ref<string>('');

  const { loading } = defineProps<{
    loading?: boolean;
  }>();

  const updateData = () => {
    let params: any;
    if (route.params.id) {
      params = new EditArticlesParams({
        id: Number(route.params.id),
        title: title.value,
        image: UploadedImage.value || [],
        articleType: selectedTab.value as QuestionTypeEnum,
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
        articleSequenceId: SelectedArticleSequence.value ? SelectedArticleSequence.value : null,
        articleSource: new ArticalSourceParams({
          documentId: SelectedDocumet.value || 0,
          source: questionSource.value || '',
        }),
        answers: [],
      });
    } else {
      params = new AddArticlesParams({
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
