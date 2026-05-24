<script setup lang="ts">
  import DeletIcon from '@/shared/icons/DropListIcons/DeletIcon.vue';
  import { onMounted, ref } from 'vue';
  import AddNewAnswerIcon from '@/shared/icons/AddNewAnswerIcon.vue';

  const emit = defineEmits(['update:data']);

  const Answers = ref([
    {
      answer: '',
      rank: 0,
    },
  ]);

  const addNewAnswer = () => {
    Answers.value.push({ answer: '', rank: 0 });

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
</script>

<template>
  <div class="ranking-answers-time-line-container">
    <div
      v-for="(item, index) in Answers"
      :key="index"
      class="timeline-item"
      :style="{ animationDelay: `${index * 0.15}s` }"
    >
      <div class="timeline-content">
        <div class="timeline-form-content">
          <div class="field-group">
            <label class="field-label" :for="`answer-${index}`">{{ $t(`answer`) }}</label>
            <div class="input-wrap">
              <input
                :id="`answer-${index}`"
                v-model="item.answer"
                type="text"
                :placeholder="$t('add_your_answer')"
                class="field-input"
                @input="UpdateData"
              />
            </div>
          </div>

          <div class="ranking-section">
            <input
              :id="`rank-${index}`"
              v-model="item.rank"
              type="number"
              placeholder="ranking"
              @input="UpdateData"
            />
          </div>
          <div v-if="Answers.length > 1" class="delete-icon-container">
            <button type="button" class="delete-btn" @click="DeleteItem(index)">
              <DeletIcon />
            </button>
          </div>
        </div>
      </div>

      <div v-if="Answers.length - 1 == index" class="add-row" @click="addNewAnswer">
        <div class="add-icon">
          <AddNewAnswerIcon />
          <span class="add-text">{{ $t('add_another_answer') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
