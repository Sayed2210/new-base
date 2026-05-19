<script setup lang="ts">
import DeletIcon from '@/shared/icons/DropListIcons/DeletIcon.vue';
import { onMounted, ref } from 'vue';
import AddNewAnswerIcon from '@/shared/icons/AddNewAnswerIcon.vue';
import SelectionTabs from '../SelectionTabs.vue';
import TitleInterface from '@/base/Data/Models/titleInterface';
import { AnswerEvaluationTypeEnum } from '@/modules/Questions/core/constant/answer.evaluation.type.enum';
const emit = defineEmits(['update:data']);
const selectedTab = ref<number | null>(null);

const Answers = ref([
    {
        answer: '',
        similar: '',
        type: selectedTab.value
    },
]);


const addNewAnswer = () => {
    Answers.value.push({ answer: '', similar: '', type: selectedTab.value });

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

const tabs = ref<TitleInterface<number>[]>([
    {
        id: AnswerEvaluationTypeEnum.typical,
        title: 'typical',
    },
    {
        id: AnswerEvaluationTypeEnum.similar,
        title: 'similar',
    },
    {
        id: AnswerEvaluationTypeEnum.need_correct,
        title: 'needCorrect',
    },

]);

const selectTab = (tab: number) => {
    selectedTab.value = tab;
};
</script>

<template>
    <div class="complate-answers-time-line-container">
        <SelectionTabs class="field-group col-span-2" :tabs="tabs" :selected-tab="selectedTab"
            @update:model-value="selectTab" />
        <div class="timeline-item" v-for="(item, index) in Answers" :key="index"
            :style="{ animationDelay: `${index * 0.15}s` }">
            <div class="timeline-content">
                <div class="timeline-form-content">


                    <div class="matching-section" v-if="selectedTab == AnswerEvaluationTypeEnum.similar">
                        <label :for="`similar-${index}`">{{ $t(`similar_answer`) }}</label>
                        <input :id="`similar-${index}`" v-model="item.similar" type="text"
                            :placeholder="$t('similar_answer')" @input="UpdateData">
                    </div>


                    <div class="matching-section" v-if="selectedTab != AnswerEvaluationTypeEnum.need_correct">
                        <label :for="`answer-${index}`"> {{ $t(`answer`) }}</label>
                        <input :id="`answer-${index}`" type="text" :placeholder="$t('add_your_answer')"
                            v-model="item.answer" @input="UpdateData">
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
