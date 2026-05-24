<script setup lang="ts">
import HandleFilesUpload from '@/shared/FormInputs/HandleFilesUpload.vue';
import DeletIcon from '@/shared/icons/DropListIcons/DeletIcon.vue';
import UploadFileIcon from '@/shared/icons/UploadFileIcon.vue';
import { onMounted, ref } from 'vue';
import Checkbox from 'primevue/checkbox';
import AddNewAnswerIcon from '@/shared/icons/AddNewAnswerIcon.vue';

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
    <div class="mcq-answers-time-line-container">
        <div
v-for="(item, index) in Answers" :key="index" class="timeline-item"
            :style="{ animationDelay: `${index * 0.15}s` }">
            <div class="timeline-content">
                <div class="timeline-form-content">
                    <div class="field-group">
                        <label class="field-label" :for="`answer-${index}`">{{ $t(`answer`) }}</label>
                        <div class="input-wrap">
                            <input
:id="`answer-${index}`" v-model="item.answer" type="text"
                                :placeholder="$t('add_your_answer')" class="field-input" @input="UpdateData" />
                        </div>
                        <div class="files-input" :class="{ haveImage: item.file }">
                            <HandleFilesUpload
:label="``" accept="image/*" :multiple="true" :index="index + 5"
                                :file="item.file" :have-content="true" :class="`image-input`"
                                @change="(files) => setImage(files, index)">
                                <template #content>
                                    <UploadFileIcon />
                                </template>
                            </HandleFilesUpload>
                        </div>
                    </div>

                    <div class="is-correct-section">
                        <label :for="`is-correct-${index}`">{{ $t('correct answer') }}</label>
                        <Checkbox
:binary="true" :model-value="item.isCorrect" :input-id="`is-correct-${index}`"
                            name="is-correct" :value="item.isCorrect" @change="setCorrect(index)" />
                    </div>
                    <div v-if="Answers.length > 1" class="delete-icon-container">
                        <button type="button" class="delete-btn" @click="DeleteItem(index)">
                            <DeletIcon />
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="Answers.length - 1 == index" class="add-row" @click="addNewAnswer">
                <div class="add-icon">
                    <AddNewAnswerIcon />
                    <span class="add-text">{{ $t('add_another_answer') }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
