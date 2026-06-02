<script setup lang="ts">
  import Accordion from 'primevue/accordion';
  import AccordionPanel from 'primevue/accordionpanel';
  import AccordionHeader from 'primevue/accordionheader';
  import AccordionContent from 'primevue/accordioncontent';
  import Checkbox from 'primevue/checkbox';
  import { ref, watch } from 'vue';
  import QuestionSource from './QuestionSource.vue';
  import QuestionClarificationParams from '../../core/params/subParams/question.clarification.params';
  import HandleFilesUpload from '@/shared/FormInputs/HandleFilesUpload.vue';
  import UploadFileIcon from '@/shared/icons/UploadFileIcon.vue';
  import type QuestionClarificationModel from '../../core/models/subModels/question.clarification.model';
  import QuestionDocumentModel from '../../core/models/subModels/question.document.model';
  import AttachmentsParams from '../../core/params/subParams/attachments.params';

  const { ClarificationData, isclarification } = defineProps<{
    ClarificationData: QuestionClarificationModel;
    isclarification: boolean;
  }>();
  const isClarification = ref(isclarification);

  const emit = defineEmits(['updateData']);
  const updateData = () => {
    console.log(file.value, 'file.value');
    emit('updateData', {
      isClarification: isClarification.value,
      data: new QuestionClarificationParams({
        documentId: SelectedDocumet.value!,
        source: questionSource.value!,
        file: file.value?.map(
          (f: any) =>
            new AttachmentsParams({
              file: f,
              alt: '',
            }),
        ),
        clarification: description.value,
      }),
    });
  };

  const questionSource = ref<string>('');
  const SelectedDocumet = ref<number | null>(null);
  const GetQuestionSource = (data: QuestionClarificationParams) => {
    SelectedDocumet.value = data.documentId!;
    questionSource.value = data.source!;
    updateData();
  };
  const description = ref('');
  const file = ref();

  const handleFile = (f: any) => {
    file.value = f[0]?.base64 ? [f[0].base64] : [];
    updateData();
  };
  const DocumentSource = ref<QuestionDocumentModel | null>(null);

  watch([() => ClarificationData, () => isclarification], ([newValue, neIsClarification]) => {
    DocumentSource.value = new QuestionDocumentModel({
      id: newValue?.documents?.id,
      title: newValue?.documents?.title,
      source: newValue?.source,
    });
    description.value = newValue.clarification!;
    file.value = newValue.attachments?.map((a) => a.file).filter(Boolean) as string[];
    isClarification.value = neIsClarification || !!newValue;
  });
</script>

<template>
  <Accordion
    :value="isClarification ? 1 : 0"
    :pt="{
      root: `question-clarification ${isClarification ? 'active' : ''}`,
    }"
    @update:value="
      isClarification = !isClarification;
      updateData();
    "
  >
    <AccordionPanel :value="1">
      <AccordionHeader>
        <template #toggleicon>
          <div class="question-clarification-header">
            <div>{{ $t('Is there any Question clarification?') }}</div>
            <Checkbox
              v-model="isClarification"
              :binary="true"
              :input-id="`is-correct`"
              name="is-correct"
            />
          </div>
        </template>
      </AccordionHeader>
      <AccordionContent>
        <QuestionSource :document-source="DocumentSource" @update-data="GetQuestionSource" />

        <div class="input-wrapper">
          <label for="descreption">{{ $t('Description') }}</label>
          <div class="description-container">
            <div class="description-header">
              <span>B / U</span>
              <HandleFilesUpload
                :label="``"
                accept="image/*"
                :multiple="true"
                :index="20"
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

  .question-clarification {
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
      padding: 0 !important;
    }

    .question-clarification-header {
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
