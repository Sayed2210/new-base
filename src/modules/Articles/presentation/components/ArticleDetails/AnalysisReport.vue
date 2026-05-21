<script setup lang="ts">
import type ArticalDetailsModel from '@/modules/Articles/core/models/artical.details.model';
import UpdatedCustomInputSelect from '@/shared/FormInputs/UpdatedCustomInputSelect.vue';
import AnalysisIcon from '@/shared/icons/AnalysisIcon.vue';

import ProgressBar from 'primevue/progressbar';


const { article } = defineProps<{
    article?: ArticalDetailsModel;
}>();
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
                <UpdatedCustomInputSelect id="doc-subject" :label="``" :params="indexDocumentParams"
                    :controller="documentController" v-model="SelectedSubject" placeholder="Last 30 days"
                    @update:model-value="updateData" />
            </div>
        </div>
        <div class="cards_Exams">
            <div class="items-card" v-for="item in article?.analysisReport" :key="item?.id" :class="{
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
                        <ProgressBar v-if="item?.percentage" :value="item?.percentage || 0"  :showValue="false"></ProgressBar>
                        <p v-if="item?.percentage">{{ item?.percentage }}%</p>
                    </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@use '../../../../../styles/variables' as *;
@use '../../../../../styles/mixins/flex' as *;

.Analysis_Report {
    background-color: var(--background-color-soft-light);
    padding: $MdSize;
    border-radius: $XlSize;
    margin: $MdSize 0;

    .fillter_contant {
        @include flex(row, nowrap, space-between, center);
        gap: $XsSize3;
        margin-bottom: $XlSize;

        .contant {
            @include flex(row, nowrap, start, start);
            gap: $XsSize3;

            h6 {
                font-family: "medium";
                font-size: $MdSize2;
                color: var(--color-gray-soft-1);
                font-weight: $BaseFontSemiBoldWeight;

            }

            p {
                font-family: "medium";
                font-size: $MdSize;
                color: var(--title-header-color);
                font-weight: $BaseFontMediumWeight;
                margin: $XsSize3 0 0 0;
            }
        }

    }

    .cards_Exams {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: $XsSize3;


        .items-card{
            background-color: var(--bg-main);
            border-radius: $XlSize;
            border: 1px solid var(--input-border-color);
            padding: $XsSize3 $MdSize;
            .card {
                @include flex(row, nowrap, space-between, center);
                gap: $XsSize3;
    
                .title_value {
       
                    h6 {
                        font-family: "medium";
                        font-size: $SmSize;
                        color: var(--title-header-color);
                        font-weight: $BaseFontMediumWeight;
                    }
    
                    p {
                        font-family: "medium";
                        font-size: $MdSize;
                        color: var(--color-gray-soft-1);
                        font-weight: $BaseFontSemiBoldWeight;
                    }
                }
                .imge{
                    width: 55px;
                    height: 55px;
                    img{
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                    }
                }
            }
            .progress{
                @include flex(row, nowrap, space-between, center);
                gap: $XsSize3;
                .p-progressbar-determinate{
                    width: 100%;
                }   
            }

        }
        .progress-card{
            background-color: rgba(255, 247, 230, 1);
            .p-progressbar-determinate{
                background-color: white !important;
            }
            .title_value{
                p{
                    color: rgba(217, 145, 0, 1) !important;
                }
            }
            .progress{
                p{
                    font-family: "medium";
                    font-size: $XsSize;
                    color: var(--color-gray-soft-1);
                    font-weight: $BaseFontSemiBoldWeight;
                }
            }
        }
    }
}
:deep(.p-progressbar-value){
    background-color: rgba(217, 145, 0, 1) !important;
}   
</style>