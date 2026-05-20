<script setup lang="ts">
  import DeletIcon from '@/shared/icons/DropListIcons/DeletIcon.vue';
  import { onMounted, ref, watch } from 'vue';
  import AddNewAnswerIcon from '@/shared/icons/AddNewAnswerIcon.vue';
  import SelectionTabs from '../SelectionTabs.vue';
  import TitleInterface from '@/base/Data/Models/titleInterface';
  import { AnswerEvaluationTypeEnum } from '@/modules/Questions/core/constant/answer.evaluation.type.enum';
  import type AnswerModel from '@/modules/Questions/core/models/subModels/answer.model';
  const emit = defineEmits(['update:data']);
  const { questionData } = defineProps<{
    questionData: AnswerModel[];
  }>();

  const selectedTab = ref<number | null>(
    questionData[0]?.EvaluationType || AnswerEvaluationTypeEnum.typical,
  );

  const Answers = ref<AnswerModel[]>([
    {
      answer: '',
      similar: '',
      EvaluationType: selectedTab.value as AnswerEvaluationTypeEnum,
    },
  ]);

  const addNewAnswer = () => {
    Answers.value.push({
      answer: '',
      similar: '',
      EvaluationType: selectedTab.value as AnswerEvaluationTypeEnum,
    });

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

  const tabs = ref<TitleInterface<number>[]>([
    {
      id: AnswerEvaluationTypeEnum.typical,
      title: 'typical',
    },
    {
      id: AnswerEvaluationTypeEnum.similar,
      title: 'similar',
    },
    {
      id: AnswerEvaluationTypeEnum.need_correct,
      title: 'needCorrect',
    },
  ]);

  const selectTab = (tab: number) => {
    selectedTab.value = tab;
  };

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
  <div class="complate-answers-time-line-container">
    <SelectionTabs
      class="field-group col-span-2"
      :tabs="tabs"
      :selected-tab="selectedTab"
      @update:model-value="selectTab"
    />
    <div
      class="timeline-item"
      v-for="(item, index) in Answers"
      :key="index"
      :style="{ animationDelay: `${index * 0.15}s` }"
    >
      <div class="timeline-content">
        <div class="timeline-form-content">
          <div class="matching-section" v-if="selectedTab == AnswerEvaluationTypeEnum.similar">
            <label :for="`similar-${index}`">{{ $t(`similar_answer`) }}</label>
            <input
              :id="`similar-${index}`"
              v-model="item.similar"
              type="text"
              :placeholder="$t('similar_answer')"
              @input="UpdateData"
            />
          </div>

          <div class="matching-section" v-if="selectedTab != AnswerEvaluationTypeEnum.need_correct">
            <label :for="`answer-${index}`"> {{ $t(`answer`) }}</label>
            <input
              :id="`answer-${index}`"
              type="text"
              :placeholder="$t('add_your_answer')"
              v-model="item.answer"
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
