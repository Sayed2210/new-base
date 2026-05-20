<script setup lang="ts">
  import DeletIcon from '@/shared/icons/DropListIcons/DeletIcon.vue';
  import { onMounted, ref, watch } from 'vue';
  import AddNewAnswerIcon from '@/shared/icons/AddNewAnswerIcon.vue';
  import MatchingIcon from '@/shared/icons/questions/MatchingIcon.vue';
  import type AnswerModel from '@/modules/Questions/core/models/subModels/answer.model';

  const emit = defineEmits(['update:data']);
  const { questionData } = defineProps<{
    questionData: AnswerModel[];
  }>();

  const Answers = ref<AnswerModel[]>([
    {
      answer: '',
      match: '',
    },
  ]);

  const addNewAnswer = () => {
    Answers.value.push({ answer: '', match: '' });

    UpdateData();
  };

  const DeleteItem = (index: number) => {
    Answers.value.splice(index, 1);
    UpdateData();
  };

  const UpdateData = () => {
    emit('update:data', Answers.value);
  };

  onMounted(() => {
    emit('update:data', Answers.value);
  });

  watch(
    () => questionData,
    (newvalue) => {
      if (newvalue) {
        Answers.value = newvalue;
      }
    },
    {
      deep: true,
      immediate: true,
    },
  );
</script>

<template>
  <div class="matching-answers-time-line-container">
    <div
      class="timeline-item"
      v-for="(item, index) in Answers"
      :key="index"
      :style="{ animationDelay: `${index * 0.15}s` }"
    >
      <div class="timeline-content">
        <div class="timeline-form-content">
          <div class="matching-section">
            <label :for="`answer-${index}`">{{ $t(`answer`) }}</label>
            <input
              :id="`answer-${index}`"
              v-model="item.answer"
              type="text"
              :placeholder="$t('add_your_answer')"
              @input="UpdateData"
            />
          </div>
          <div class="match-icon-container">
            <MatchingIcon />
          </div>

          <div class="matching-section">
            <label :for="`matching-${index}`">matching answer</label>
            <input
              :id="`matching-${index}`"
              type="text"
              placeholder="matching"
              v-model="item.match"
              @input="UpdateData"
            />
          </div>
          <div class="delete-icon-container" v-if="Answers.length > 1">
            <button type="button" class="delete-btn" @click="DeleteItem(index)">
              <DeletIcon />
            </button>
          </div>
        </div>
      </div>

      <div class="add-row" @click="addNewAnswer" v-if="Answers.length - 1 == index">
        <div class="add-icon">
          <AddNewAnswerIcon />
          <span class="add-text">{{ $t('add_another_answer') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
