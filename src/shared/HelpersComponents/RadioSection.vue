<script setup lang="ts">
import { ref, watch } from 'vue';
import RadioButton from 'primevue/radiobutton';
import Checkbox from 'primevue/checkbox';

const SelectedOption = ref();
const customize = ref();
const emit = defineEmits(['update:value', "update:Customize"]);

const props = defineProps<{
  title: string
  selections?: string[]
  images_selections?: string[]
  Customize?: boolean
}>();

const UpdateSelect = (data: Event) => {
  const target = data.target as HTMLInputElement;
  SelectedOption.value = target.value;
  emit("update:value", target.value);
};

watch(customize, (newVal) => {
  if (customize.value) {
    SelectedOption.value = "";
  }
  emit('update:Customize', newVal);
});
</script>

<template>
  <div class="radio-selection-containre">
    <div class="radio-selection-header">
      <p class="title">{{ title }}</p>
      <div class="checkbox-header" v-if="Customize">
        <!-- <input type="checkbox" v-model="customize" :id="title.split(' ').join('-')"
          :name="title.split(' ').join('-')" /> -->
        <Checkbox v-model="customize" :id="title.split(' ').join('-')" :name="title.split(' ').join('-')" binary />
        <label class="checkbox-label" @click="customize = !customize" :for="title.split(' ').join('-')">customize</label>
      </div>
    </div>

    <div class="selection-container" v-if="selections && selections.length > 0">
      <div class="selection" :class="[SelectedOption == select ? 'selected' : '', customize ? 'disabled' : '']"
        v-for="(select, index) in selections" :key="index">
        <!-- <input type="radio" :name="title.split(' ').join('-')" :id="`${title.split(' ').join('-')}-${select}`"
          :value="select" v-model="SelectedOption" @change="UpdateSelect"> -->
        <RadioButton v-model="SelectedOption" @change="UpdateSelect"
          :inputId="`${title.split(' ').join('-')}-${select}`" :name="title.split(' ').join('-')" :value="select" />

        <label :for="`${title.split(' ').join('-')}-${select}`">{{ select }}</label>
      </div>
    </div>

    <div class="selection-container selection-image-container "
      v-else-if="images_selections && images_selections.length > 0">
      <div class="selection" :class="SelectedOption == index + 1 ? 'selected' : ''"
        v-for="(img, index) in images_selections" :key="index">
        <input type="radio" :name="title.split(' ').join('-')" :id="`${title.split(' ').join('-')}-img-${index}`"
          :value="index + 1" v-model="SelectedOption" @change="UpdateSelect">
        <label :for="`${title.split(' ').join('-')}-img-${index}`">
          <img :src="img" :alt="`${title}-option-${index}`">
        </label>
      </div>
    </div>
  </div>
</template>
