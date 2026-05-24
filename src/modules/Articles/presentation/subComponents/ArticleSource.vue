<script setup lang="ts">
import TitleInterface from '@/base/Data/Models/titleInterface';
import { DocumentController, IndexDocumentParams } from '@/modules/document';
import UpdatedCustomInputSelect from '@/shared/FormInputs/UpdatedCustomInputSelect.vue';
import { ref, watch } from 'vue';
import ArticleClarificationParams from '../../core/params/subParams/Artical.clarification.params';
import type ArticleDocumentModel from '@/modules/Articles/core/models/subModels/Article.document.model';

const { document, source, documentSource } = defineProps<{
  document?: TitleInterface<number> | null | undefined;
  source?: string | null;
  documentSource?: ArticleDocumentModel | null;
}>();

const emit = defineEmits(['updateData']);
const indexDocumentParams = new IndexDocumentParams();
const documentController = DocumentController.getInstance();
const SelectedSubject = ref<TitleInterface<number> | null>(document ?? null);
const questionSource = ref<string>(source ?? '');

const updateData = () => {
  emit(
    'updateData',
    new ArticleClarificationParams({
      documentId: SelectedSubject.value?.id,
      source: questionSource.value,
    }),
  );
};

watch(() => documentSource, (newValue) => {
  SelectedSubject.value = newValue?.id ? new TitleInterface<number>({ id: newValue.id, title: newValue.title }) : null;
  questionSource.value = newValue?.source || '';
});
</script>

<template>
  <div class="contant_tabs document-tab">
    <div class="form-group">
      <div class="input">
        <UpdatedCustomInputSelect
id="doc-subject" v-model="SelectedSubject" :label="`Document Source`"
          :params="indexDocumentParams" :controller="documentController" placeholder="Document Source"
          @update:model-value="updateData" />
      </div>
      <div class="field-group">
        <label class="field-label" for="name">{{ $t('Article Source') }}</label>
        <div class="input-wrap">
          <input
id="question-source" v-model="questionSource" type="text" :placeholder="$t('Enter article source')"
            class="field-input" @input="updateData" />
        </div>
      </div>
    </div>
  </div>
</template>
