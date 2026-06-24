<script setup lang="ts">
  import FaqImg from '@/assets/images/faq-image.png';
  import { QuestionStatusEnum } from '@/modules/Questions/core/constant/question.status.enum';
  import EditIcon from '@/shared/icons/Privacy/EditIcon.vue';
  import type ShowQuestionsModel from '@/modules/Questions/core/models/show.questions.model';
  import { useRoute, useRouter } from 'vue-router';
  import questionsController from '../../controllers/questions.controller';
  import DeletequestionsParams from '@/modules/Questions/core/params/delete.question.params';
  const { questionData } = defineProps<{ questionData: ShowQuestionsModel }>();
  const router = useRouter();

  const id = router.currentRoute.value.params.id;

  const getStatusText = (review_status: QuestionStatusEnum) => {
    switch (review_status) {
      case QuestionStatusEnum.PENDING:
        return 'Under Review';
      case QuestionStatusEnum.APPROVED:
        return 'Approved';
      case QuestionStatusEnum.REJECTED:
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  const getStatusDescription = (review_status: QuestionStatusEnum) => {
    switch (review_status) {
      case QuestionStatusEnum.PENDING:
        return 'complete all details of the question and the available procedures to can publish it';
      case QuestionStatusEnum.REJECTED:
        return 'View all details of the question and reason of rejected';
      case QuestionStatusEnum.APPROVED:
        return '';
      default:
        return 'Unknown';
    }
  };

  const Controller = questionsController.getInstance();
  const route = useRoute();
  const DeleteQuestion = async () => {
    const deleteParams = new DeletequestionsParams(Number(route.params.id));
    await Controller.delete(deleteParams);
    router.push({ name: 'Questions' });
  };
</script>

<template>
  <!-- {{ id }} -->
  <div class="action-row-wrapper">
    <div class="info">
      <img :src="FaqImg" alt="question image" />
      <div class="name">
        <h3>{{ getStatusText(questionData?.review_status!) }} Question</h3>
        <p>{{ getStatusDescription(questionData?.review_status!) }}</p>
        <div
          v-if="questionData?.review_status === QuestionStatusEnum.APPROVED"
          class="approved-case-info"
        >
          <h4>
            <span>Approved by :</span>
            {{ questionData.approvedBy }}
          </h4>

          <h4>
            <span>Approved at :</span>
            {{ questionData.createdAt }}
          </h4>
        </div>
      </div>
    </div>
    <div class="question-actions">
      <button
        class="btn btn-primary"
        @click="router.push({ name: 'Edit question', params: { id } })"
      >
        <EditIcon /> {{ $t('edit') }}
      </button>

      <button class="action-btn delete" title="Delete" @click="DeleteQuestion">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      </button>
    </div>
  </div>
</template>
