<script setup lang="ts">
import { ref } from 'vue';
import { DocumentController, IndexDocumentParams } from '@/modules/document';
import UpdatedCustomInputSelect from '@/shared/FormInputs/UpdatedCustomInputSelect.vue';
import AnalysisIcon from '@/shared/icons/AnalysisIcon.vue';

import ProgressBar from 'primevue/progressbar';
import type ShowQuestionsModel from '@/modules/Questions/core/models/show.questions.model';


const { artical } = defineProps<{
    artical: ShowQuestionsModel;
}>();

const indexDocumentParams = new IndexDocumentParams();
const documentController = DocumentController.getInstance();
const SelectedSubject = ref<any>(null);

const emit = defineEmits(['updateData']);
const updateData = () => {
    emit('updateData', SelectedSubject.value);
};
</script>
<template>
    <div class="Analysis_Report">
        <div class="fillter_contant">
            <div class="contant">
                <div class="icon">
                    <AnalysisIcon />
                </div>
                <div class="text">
                    <h6> {{ $t('Analysis Report') }}</h6>
                    <p>{{ $t('From the Testing and Training Department, last 30 days') }}</p>
                </div>

            </div>
            <div class="input_box">
                <UpdatedCustomInputSelect id="doc-subject" v-model="SelectedSubject" :label="``"
                    :params="indexDocumentParams" :controller="documentController" placeholder="Last 30 days"
                    @update:model-value="updateData" />
            </div>
        </div>
        <div class="cards_Exams">
            <div v-for="item in artical?.analysisReport" :key="item?.id" class="items-card" :class="{
                'progress-card': item?.percentage,
            }">
                <div class="card">
                    <div class="title_value">
                        <h6>{{ item?.title }}</h6>
                        <p>{{ item?.count }}</p>
                    </div>
                    <div class="imge">
                        <img :src="item?.imageUrl" alt="img">
                    </div>
                </div>
                <div class="progress">
                    <ProgressBar v-if="item?.percentage" :value="item?.percentage || 0" :show-value="false">
                    </ProgressBar>
                    <p v-if="item?.percentage">{{ item?.percentage }}%</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@use '../../../../../styles/variables' as *;
@use '../../../../../styles/mixins/flex' as *;

:deep(.p-progressbar-value) {
    background-color: rgba(217, 145, 0, 1) !important;
}
</style>