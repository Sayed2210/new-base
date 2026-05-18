<script setup lang="ts">
  import HandleFilesUpload from '@/shared/FormInputs/HandleFilesUpload.vue';
  import DeletIcon from '@/shared/icons/DropListIcons/DeletIcon.vue';
  import UploadFileIcon from '@/shared/icons/UploadFileIcon.vue';
  import { onMounted, ref } from 'vue';
  import Checkbox from 'primevue/checkbox';
  import AddNewAnswerIcon from '@/shared/icons/AddNewAnswerIcon.vue';
  import { item } from '@primeuix/themes/aura/breadcrumb';

  const emit = defineEmits(['update:data']);
  const Answers = ref([
    {
      answer: '',
      isCorrect: false,
      file: '',
    },
  ]);

  const addNewAnswer = () => {
    Answers.value.push({ answer: '', isCorrect: false, file: '' });
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

  const setImage = (files: any[], index: number) => {
    Answers.value[index]!.file = files[0]?.base64 ? (files[0]?.base64 as string) : '';
    UpdateData();
  };

  const setCorrect = (index: number) => {
    Answers.value.map((item) => {
      item.isCorrect = false;
    });
    Answers.value[index]!.isCorrect = true;
    UpdateData();

  };
</script>

<template>
  <div class="answers-time-line-container">
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
            <div class="files-input" :class="{ haveImage: item.file }">
              <HandleFilesUpload
                :label="``"
                accept="image/*"
                :multiple="true"
                :index="index + 5"
                :file="item.file"
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
              :model-value="item.isCorrect"
              :input-id="`is-correct-${index}`"
              name="is-correct"
              :value="item.isCorrect"
              @change="setCorrect(index)"
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

<style scoped lang="scss">
  @import '../../../../styles/variables.scss';
  @import '../../../../styles/mixins/flex.scss';
  @import '../../../../styles/mixins/grid.scss';
  .timeline-form-content {
    margin-block: 10px !important;
  }
  .timeline-form-content {
    display: grid;
    grid-template-columns: 75% 20% 5%;
    gap: 10px;
    @media (max-width: 767px) {
      grid-template-columns: 1fr;
      gap: 0px;
    }

    .timeline-content {
      @include flex-row(nowrap, center, center);
    }
    .field-group {
      position: relative;
      .field-label {
        text-transform: none;
      }
      .field-input {
        border-radius: 50px;
        background-color: white;
      }
      .files-input {
        position: absolute;
        bottom: 39%;
        transform: translateY(50%);
        right: 10px;
        border-radius: 50px;
        &.haveImage {
          :deep(.upload-area) {
            display: none !important;
          }
        }
      }

      .image-input {
        width: 100%;

        :deep(.upload-area) {
          background-color: $StandardWhite !important;
          padding: 5px !important;
          border-radius: 50%;
          border: 1px solid $PrimaryColor !important;
        }
        :deep(.preview-item) {
          width: 40px !important;
          height: 40px !important;
          border-radius: 50%;
        }

        .add-imaegs-data {
          @include flex-column(nowrap, center, center);

          gap: $XsSize5;

          .first-text {
            color: $Gray-5;
            font-size: $XsSize;
            font-weight: $BaseFontSemiBoldWeight;

            span {
              color: $PrimaryColor;
              padding-inline: $XsSize5;
            }
          }

          .second-text {
            color: $SecondText;
            font-size: $XsSize;
            font-weight: $BaseFontWeight;
          }
        }
      }
    }
  }
  .is-correct-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    border: 1px solid #e6e6e6;
    border-radius: 50px;
    padding: 10px !important;
    height: 50px;
    margin-top: 23px;
    label {
      color: #121212;
      font-size: 16px;
      font-weight: 500;
      font-family: 'Medium';
      @media (max-width: 767px) {
        font-size: 12px;
      }
    }
    .p-checkbox-box {
      border-radius: 5px !important;
    }
  }

  .add-icon {
    @include flex-row(nowrap, flex-start, center);
    margin-block: 10px;
    cursor: pointer;

    span {
      padding-inline: 5px;
      color: $PrimaryColor;
      font-size: 16px;
      font-weight: 500;
      font-family: 'Medium';
    }
    svg {
      width: 19px;
      height: 19px;
    }
  }
  .delete-icon-container {
    width: 30px;
    height: 30px;
    margin-top: auto;
    margin-bottom: auto;
    border: 1px solid red;
    border-radius: 50%;
    transform: translateY(10px);
    cursor: pointer;
    .delete-btn {
      align-self: center;
      border: none;
      padding: 5px;
    }
  }
</style>
