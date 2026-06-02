<script setup lang="ts">
  import TitleInterface from '@/base/Data/Models/titleInterface';
  import { DocumentController, IndexDocumentParams } from '@/modules/document';
  import UpdatedCustomInputSelect from '@/shared/FormInputs/UpdatedCustomInputSelect.vue';
  import { ref, watch } from 'vue';
  import QuestionClarificationParams from '../../core/params/subParams/question.clarification.params';
  import type QuestionDocumentModel from '@/modules/Questions/core/models/subModels/question.document.model';

  const { document, source, documentSource } = defineProps<{
    document?: TitleInterface<number> | null | undefined;
    source?: string | null;
    documentSource?: QuestionDocumentModel | null;
  }>();

  const emit = defineEmits(['updateData']);
  const indexDocumentParams = new IndexDocumentParams();
  const documentController = DocumentController.getInstance();
  const SelectedSubject = ref<TitleInterface<number> | null>(document ?? null);
  const questionSource = ref<string>(source ?? '');

  const updateData = () => {
    emit(
      'updateData',
      new QuestionClarificationParams({
        documentId: SelectedSubject.value?.id,
        source: questionSource.value,
      }),
    );
  };

  watch(
    () => documentSource,
    (newValue) => {
      
      SelectedSubject.value = newValue?.id
        ? new TitleInterface<number>({ id: newValue.id, title: newValue.title })
        : null;
      questionSource.value = newValue?.source || '';
    },
  );
</script>

<template>
  <div class="contant_tabs document-tab">
    <div class="form-group">
      <div class="input">
        <UpdatedCustomInputSelect
          id="doc-subject"
          v-model="SelectedSubject as TitleInterface<number>"
          :label="`Document Source`"
          :params="indexDocumentParams"
          :controller="documentController"
          placeholder="Document Source"
          @update:model-value="updateData"
        />
      </div>
      <div class="field-group">
        <label class="field-label" for="name">{{ $t(`Question Source`) }}</label>
        <div class="input-wrap">
          <input
            id="question-source"
            v-model="questionSource"
            type="text"
            placeholder="Enter question source"
            class="field-input"
            @input="updateData"
          />
        </div>
      </div>
    </div>
  </div>
</template>
