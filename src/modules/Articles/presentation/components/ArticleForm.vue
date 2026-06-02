<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import type ShowArticleModel from '../../core/models/show.Article.model';
import EditArticlesParams from '../../core/params/edit.Articles.params';
import AddArticlesParams from '../../core/params/add.Artical.params';
import HandleFilesUpload, { type UploadedFile } from '@/shared/FormInputs/HandleFilesUpload.vue';
import UploadFileIcon from '@/shared/icons/UploadFileIcon.vue';
import UpdatedCustomInputSelect from '@/shared/FormInputs/UpdatedCustomInputSelect.vue';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import FolderCrudIcon from '@/shared/icons/FolderCrudIcon.vue';
import Checkbox from 'primevue/checkbox';
import AccordionToggleIcon from '@/shared/icons/questions/AccordionToggleIcon.vue';
import IndexDocumentTypeParams from '@/modules/document/core/params/documntType/index.document.type.params';
import DocumentTypeController from '@/modules/document/presentation/controllers/DocumentType/document.type.controller';
import { DocumentController, IndexDocumentParams } from '@/modules/document';
import AttachmentsParams from '@/modules/Questions/core/params/subParams/attachments.params';

const indexDocumentTypeParams = new IndexDocumentTypeParams();
const documentTypeController = DocumentTypeController.getInstance();

const route = useRoute();
const emit = defineEmits(['updateData']);
const { article } = defineProps<{
  article?: ShowArticleModel;
}>();
const isSolutionSteps = ref(true);
const isSolutionHint = ref(true);
const isExplain = ref(false);
const UploadedImage = ref<string[]>([]);
const explanationAttachments = ref<string[]>([]);

// Document dependencies
const indexDocumentParams = new IndexDocumentParams();
const documentController = DocumentController.getInstance();
const SelectedSubject = ref<any>(null);
const SelectedDocument = ref<any>(null);
const question = ref('');
const articleSource = ref('');
const descriptionArticle = ref('');
const QuestionDescription = ref('');
// const file = ref();
// const handleFile = (files: UploadedFile[]) => {
//   file.value = files[0]?.base64;
//   updateData();
// };

const updateData = () => {
  let params: any;
  if (route?.params?.id) {
    params = new EditArticlesParams({
      id: Number(route.params.id),
      title: BasicData.value?.title,
      image: BasicData.value?.image,
      question_type: BasicData.value?.question_type,
      subjectId: SelectedSubject.value?.id,
      skills: BasicData.value?.skills,
      difficultyLevel: BasicData.value?.difficultyLevel,
      topics: BasicData.value?.topics,
      articleSequenceId: BasicData.value?.articleSequenceId,
      articleSource: BasicData.value?.articleSource,
      answers: AnswerData.value?.answers,
    });
  } else {
    params = new AddArticlesParams({
      question_description: QuestionDescription.value,
      attachments: UploadedImage.value.map((file) => new AttachmentsParams({ alt: '', file })) || [],
      // attachments: BasicData.value?.attachments,
      question: question.value,
      question_type: 5,
      e_c_subject_id: SelectedSubject.value?.id,
      documents: SelectedDocument.value?.id && {
        document_id: SelectedDocument.value?.id,
        text: articleSource.value,
      },
      explanation: {
        explanation: descriptionArticle.value,
        attachments:explanationAttachments.value.map((file) => new AttachmentsParams({ alt: '', file })) || [], 
      },

    });
  }
  emit('updateData', params);
};


const handleImageChange = (file: any) => {
  UploadedImage.value = file[0]?.base64 ? [file[0].base64] : [];
  updateData();
};

const handleExplanationAttachments = (file: any) => {
  explanationAttachments.value = file[0]?.base64 ? [file[0].base64] : [];
  updateData();
};

const BasicData = ref<AddArticlesParams>();
// const GetAllBasicData = (data: AddArticlesParams) => {
//   BasicData.value = data;
//   updateData();
// };

const AnswerData = ref<AddArticlesParams>();
// const GetAllAnswers = (data: AddArticlesParams) => {
//   AnswerData.value = data;
//   updateData();
// };

watch(
  () => article,
  (newValue) => {
    if (newValue) {
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="article-details-form-card">
    <header class="form-header">
      <div class="form-title">
        <div class="header-text">
          <h3>
            <FolderCrudIcon /> {{ route?.params?.id ? $t('Edit Article') : $t('Add New Article') }}
          </h3>
        </div>
      </div>
    </header>
    <Accordion :value="isSolutionSteps ? 1 : 0" :pt="{
      root: `article-solution-steps ${isSolutionSteps ? 'active' : ''}`,
    }" @update:value="isSolutionSteps = !isSolutionSteps">
      <AccordionPanel :value="1">
        <AccordionHeader>
          <template #toggleicon>
            <div class="article-solution-steps-header">
              <div class="toggll-container">
                <div>{{ $t('basic artical data') }}</div>
                <AccordionToggleIcon />
              </div>
              <span class="dashed-border"></span>
              <!-- <Checkbox v-model="isSolutionSteps" :binary="true" :input-id="`is-correct`" name="is-correct" /> -->
            </div>
          </template>
        </AccordionHeader>
        <AccordionContent>
          <div class="input-wrapper">
            <label for="descreption">{{ $t('artical ') }}</label>
            <div class="description-container">
              <div class="description-header">
                <span>B / U</span>
                <HandleFilesUpload :label="``" accept="image/*" :multiple="true" :index="1" :file=UploadedImage
                  :have-content="true" :class="`image-input`" @change="handleImageChange">
                  <template #content>
                    <div class="upload-attachment-container">
                      <UploadFileIcon />
                      <span class="upload-attachment">{{ $t('upload_attachment') }}</span>
                    </div>
                  </template>
                </HandleFilesUpload>
              </div>
              <textarea id="descreption" v-model="QuestionDescription" name="descreption"
                :placeholder="$t('Enter Question clarification')" @input="updateData"></textarea>
            </div>
          </div>
          <div class="document-tab">
            <div class="form-group">
              <div class="field-group">
                <label class="field-label" for="name">{{ $t('title of artical') }}</label>
                <div class="input-wrap">
                  <input id="article-source" v-model="question" type="text"
                    :placeholder="$t('enter title of artical ')" class="field-input" @input="updateData" />
                </div>
              </div>
              <div class="input">

                <UpdatedCustomInputSelect id="doc-subject" v-model="SelectedSubject" :label="`subject`"
                  :params="indexDocumentTypeParams" :controller="documentTypeController" placeholder="select subject"
                  @update:model-value="updateData" />
              </div>

            </div>
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>

    <Accordion :value="isSolutionHint ? 1 : 0" :pt="{
      root: `article-solution-steps ${isSolutionHint ? 'active' : ''}`,
    }" @update:value="isSolutionHint = !isSolutionHint">
      <AccordionPanel :value="1">
        <AccordionHeader>
          <template #toggleicon>
            <div class="article-solution-steps-header">
              <div class="toggll-container">
                <div>{{ $t('artical source') }}</div>
                <AccordionToggleIcon />
              </div>
              <span class="dashed-border"></span>
              <!-- <Checkbox v-model="isSolutionSteps" :binary="true" :input-id="`is-correct`" name="is-correct" /> -->
            </div>
          </template>
        </AccordionHeader>
        <AccordionContent>
          <div class=" document-tab">
            <div class="form-group form-group-grid">
              <div class="input">

                <UpdatedCustomInputSelect id="doc-subject" v-model="SelectedDocument" :label="`Documents`"
                  :params="indexDocumentParams" :controller="documentController" placeholder="select Documents"
                  @update:model-value="updateData" />

              </div>
              <div class="field-group">
                <label class="field-label" for="name">{{ $t('source') }}</label>
                <div class="input-wrap">
                  <input id="article-source" v-model="articleSource" type="text" :placeholder="$t('enter source')"
                    class="field-input" @input="updateData" />
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
    <Accordion :value="isExplain ? 1 : 0" :pt="{
      root: `article-solution-steps-explain ${isExplain ? 'active' : ''}`,
    }" @update:value="isExplain = !isExplain">
      <AccordionPanel :value="1">
        <AccordionHeader>
          <template #toggleicon>
            <div class="article-solution-steps-header-explain">
              <div>{{ $t('Is there any explanation?') }}</div>
              <Checkbox v-model="isExplain" :binary="true" :input-id="`is-correct`" name="is-correct" />
            </div>
          </template>
        </AccordionHeader>
        <AccordionContent>
          <div class="input-wrapper">
            <label for="descreption">{{ $t('Description') }}</label>
            <div class="description-container">
              <div class="description-header">
                <span>B / U</span>
                <HandleFilesUpload :label="``" accept="image/*" :multiple="true" :index="2" :file=explanationAttachments
                  :have-content="true" :class="`image-input`" @change="handleExplanationAttachments">
                  <template #content>
                    <div class="upload-attachment-container">
                      <UploadFileIcon />
                      <span class="upload-attachment">{{ $t('upload_attachment') }}</span>
                    </div>
                  </template>
                </HandleFilesUpload>
              </div>
              <textarea id="descreption" v-model="descriptionArticle" name="descreption" @input="updateData"></textarea>
            </div>
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>

  </div>
</template>

<style scoped lang="scss">
@use '../../../../styles/variables' as *;
@use '../../../../styles/mixins/flex' as *;

.article-solution-steps-explain {
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
}

.article-solution-steps-header-explain {
  @include flex-row(nowrap, space-between, center);
  gap: 10px;
  width: 100%;
  color: $PrimaryColor;
  padding: 0 !important;
}

.article-details-form-card {
  // border: 1px solid $PrimaryColor;
  // border-radius: 50px;
  // padding: 10px !important;
  margin-block: 20px !important;

  .article-solution-steps-header {
    position: relative;
    width: 100%;
  }

  .toggll-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .dashed-border {
    width: 85%;
    height: 1px;
    border-bottom: 1px dashed #d0d0d0;
    position: absolute;
    right: 0;
    bottom: 10px;
  }

  .article-solution-steps-header {

    gap: 5px;
    margin-bottom: $XlSize2;
  }

  .form-header {
    padding-left: 0 !important;
  }

  .field-group {
    margin-bottom: $XlSize ;
  }

  .input {
    margin-bottom: $XlSize ;
  }

  .field-label {
    font-size: $MdSize;
    color: var(--title-header-color) !important;
    text-transform: none;
    font-weight: $BaseFontSemiBoldWeight !important;
    font-family: "medium";
  }

  .input-label {
    font-size: $MdSize;
    color: var(--title-header-color) !important;
    text-transform: none;
    font-weight: $BaseFontSemiBoldWeight !important;
    font-family: "medium";
  }

  .document-tab {
    .form-group-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--md-size);
    }

    .field-input {
      width: 100%;
      background-color: transparent;
      border-radius: 50px;

    }
  }

  &.active {
    border-radius: 12px;
  }

  .p-accordionheader {
    padding: 5px 0 !important;
  }

  .p-accordioncontent-content {
    padding: 0 !important;
  }

  .article-clarification-header {
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
      margin-bottom: $XlSize ;

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
          border: none;
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