<script setup lang="ts">
  import Accordion from 'primevue/accordion';
  import AccordionPanel from 'primevue/accordionpanel';
  import AccordionHeader from 'primevue/accordionheader';
  import AccordionContent from 'primevue/accordioncontent';
  import Checkbox from 'primevue/checkbox';
  import { ref, watch } from 'vue';
  import HandleFilesUpload from '@/shared/FormInputs/HandleFilesUpload.vue';
  import UploadFileIcon from '@/shared/icons/UploadFileIcon.vue';
  import SolutionStepsParams from '../../core/params/subParams/soluation.steps.params';
  import type SolutionHintModel from '../../core/models/subModels/solution.hint.model';
  import AttachmentsParams from '../../core/params/subParams/attachments.params';

  const emit = defineEmits(['updateData']);
  const { SolutionHintsData, isSolutionHintsData } = defineProps<{
    SolutionHintsData: SolutionHintModel;
    isSolutionHintsData: boolean;
  }>();
  const updateData = () => {
    emit('updateData', {
      isSolutionSteps: isSolutionSteps.value,
      data: new SolutionStepsParams({
        image: file.value?.map(
          (f: any) =>
            new AttachmentsParams({
              file: f,
            }),
        ),
        explanation: description.value,
      }),
    });
  };

  const isSolutionSteps = ref(isSolutionHintsData );
  const description = ref('');
  const file = ref();
  const handleFile = (f: any) => {
    file.value = f[0]?.base64 ? [f[0].base64] : [];
    updateData();
  };
  watch(
    [() => SolutionHintsData, () => isSolutionHintsData],
    ([newSolutionHinrdata, newIsSolution]) => {
      isSolutionSteps.value = newIsSolution || !!newSolutionHinrdata;
      description.value = newSolutionHinrdata?.hint;
      file.value = newSolutionHinrdata?.attachments[0]?.file;
    },
  );
</script>

<template>
  <Accordion
    :pt="{
      root: `question-solution-hints ${isSolutionSteps ? 'active' : ''}`,
    }"
    :value="isSolutionSteps ? 1 : 0"
    @update:value="isSolutionSteps = !isSolutionSteps"
  >
    <AccordionPanel :value="1">
      <AccordionHeader>
        <template #toggleicon>
          <div class="question-solution-hints-header">
            <div>{{ $t('Is there any hints for solution?') }}</div>
            <Checkbox
              v-model="isSolutionSteps"
              :binary="true"
              :input-id="`is-correct`"
              name="is-correct"
            />
          </div>
        </template>
      </AccordionHeader>
      <AccordionContent>
        <div class="input-wrapper">
          <label for="descreption">{{ $t('Description') }}</label>
          <div class="description-container">
            <div class="description-header">
              <span>B / U</span>
              <HandleFilesUpload
                :label="``"
                accept="image/*"
                :multiple="true"
                :index="40"
                :have-content="true"
                :class="`image-input`"
                :file="file"
                @change="(files) => handleFile(files)"
              >
                <template #content>
                  <div class="upload-attachment-container">
                    <UploadFileIcon />
                    <span class="upload-attachment">{{ $t('upload_attachment') }}</span>
                  </div>
                </template>
              </HandleFilesUpload>
            </div>
            <textarea
              id="descreption"
              v-model="description"
              name="descreption"
              @input="updateData"
            ></textarea>
          </div>
        </div>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<style scoped lang="scss">
  @use '../../../../styles/variables' as *;
  @use '../../../../styles/mixins/flex' as *;
  .question-solution-hints {
    border: 1px solid $PrimaryColor;
    border-radius: 50px;
    padding: 10px !important;
    margin-block: 20px !important;
    &.active {
      border-radius: 12px;
    }
    .p-accordionheader {
      padding: 5px 0 !important;
    }
    .p-accordioncontent-content {
      padding: 10px !important;
    }

    .question-solution-hints-header {
      @include flex-row(nowrap, space-between, center);
      gap: 10px;
      width: 100%;
      color: $PrimaryColor;
      padding: 0 !important;
    }

    .form-group {
      padding: 0;
    }
    .input-wrapper {
      @include flex-column(nowrap, flex-start, stretch);
      gap: 5px;
      width: 100%;
      padding: 0 !important;
      .description-container {
        width: 100%;
        border: 1px solid #e6e6e6;
        border-radius: 12px;

        .description-header {
          background-color: #e6e6e6;
          width: 100%;
          border-radius: 12px 12px 0 0;
          padding: 10px;
          color: #000000;
          @include flex-row(nowrap, space-between, center);
        }
        textarea {
          background-color: white !important;
          padding: 10px;
          border: 1px solid #848484;
          width: 100%;
          border: none;
          &:active,
          &:focus {
            border: none;
            outline: none;
            box-shadow: none;
          }
        }
      }
    }
    .image-input {
      :deep(.upload-area) {
        padding: 10px !important;
        border-radius: 50px;
        background-color: white;
      }
      .upload-attachment-container {
        @include flex-row(nowrap, flex-start, center);
        gap: 10px;
        .upload-attachment {
          color: $PrimaryColor;
        }
      }
    }
  }
</style>
