<script setup lang="ts">
  import HandleFilesUpload from '@/shared/FormInputs/HandleFilesUpload.vue';
  import UploadFileIcon from '@/shared/icons/UploadFileIcon.vue';
  import { onMounted, ref, watch } from 'vue';
  import Checkbox from 'primevue/checkbox';
  import type AnswerModel from '@/modules/Questions/core/models/subModels/answer.model';

  const emit = defineEmits(['update:data']);
  const { questionData } = defineProps<{
    questionData: AnswerModel[];
  }>();

  const Answers = ref<AnswerModel[]>([
    {
      answer: '',
      is_right_answer: false,
      image: '',
    },
    {
      answer: '',
      is_right_answer: false,
      image: '',
    },
  ]);

  const UpdateData = () => {
    emit('update:data', Answers.value);
  };

  onMounted(() => {
    emit('update:data', Answers.value);
  });

  const setImage = (files: any[], index: number) => {
    Answers.value[index]!.image = files[0]?.base64 ? (files[0]?.base64 as string) : '';
    UpdateData();
  };

  const setCorrect = (index: number) => {
    Answers.value.map((item) => {
      item.is_right_answer = false;
    });
    Answers.value[index]!.is_right_answer = true;
    UpdateData();
  };
  watch(
    () => questionData,
    (newValue) => {
      Answers.value = newValue;
    },
    { immediate: true },
  );
</script>

<template>
  <div class="true-false-answers-time-line-container">
    <div
      class="timeline-item"
      v-for="(item, index) in Answers"
      :key="index"
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
            <div class="files-input" :class="{ haveImage: item.image }">
              <HandleFilesUpload
                :label="``"
                accept="image/*"
                :multiple="true"
                :index="index + 5"
                :file="item.image"
                :have-content="true"
                :class="`image-input`"
                @change="(files) => setImage(files, index)"
              >
                <template #content>
                  <UploadFileIcon />
                </template>
              </HandleFilesUpload>
            </div>
          </div>

          <div class="is-correct-section">
            <label :for="`is-correct-${index}`">{{ $t('correct answer') }}</label>
            <Checkbox
              :binary="true"
              :model-value="item.is_right_answer"
              :input-id="`is-correct-${index}`"
              name="is-correct"
              :value="item.is_right_answer"
              @change="setCorrect(index)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
