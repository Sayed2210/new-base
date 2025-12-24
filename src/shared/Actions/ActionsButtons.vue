<script setup lang="ts">
import { ref } from "vue";
import ActionsSection from "../icons/ActionsSection.vue";
import ChecklistIcon from "../icons/ChecklistIcon.vue";
import DropDownListIcon from "../icons/DropDownListIcon.vue";
import TextAreaIcon from "../icons/TextAreaIcon.vue";
import ListItemsAddition from "../ItemsList/ListItemsAddition.vue";

const props = defineProps<{
  checkboxVisable?: boolean,
  dropdownVisable?: boolean,
  textareaVisable?: boolean
}>()
const CheckedButton = ref(1);
const emit = defineEmits(['update:action'])
const items = ref([])
const UpdateData = () => {

  emit('update:action', CheckedButton.value)
}


UpdateData()

const GetItems = (data) => {
  items.value = data
  console.log(items.value, "data");

}


</script>

<template>
  <div class="actions-buttons">

    <p class="actions-buttons-title">
      <span>Actions</span>
      <ActionsSection />
    </p>
    <div class="actions-container">
      <div class="action-container" v-if="checkboxVisable">
        <input class="action" type="radio" id="checkbox-btn" value="1" v-model="CheckedButton" name="action"
          @change="UpdateData" :checked="CheckedButton === 1">
        <label for="checkbox-btn" class="action-box" :class="CheckedButton == 1 ? 'active' : ''">
          <p class="title">Check Box</p>
          <ChecklistIcon class="icon" />
          <img class="movement-icon" src="@/assets/images/Checklist.gif" alt="">
        </label>
      </div>

      <div class="action-container" v-if="dropdownVisable">
        <input class="action" type="radio" id="drop-down" value="2" v-model="CheckedButton" name="action"
          @change="UpdateData">
        <label for="drop-down" class="action-box" :class="CheckedButton == 2 ? 'active' : ''">
          <p class="title">drop-down list</p>
          <DropDownListIcon class="icon" />
          <img class="movement-icon" src="@/assets/images/Sort.gif" alt="">
        </label>
      </div>

      <div class="action-container" v-if="textareaVisable">
        <input class="action" type="radio" id="text-area" value="3" v-model="CheckedButton" name="action"
          @change="UpdateData">
        <label for="text-area" class="action-box" :class="CheckedButton == 3 ? 'active' : ''">
          <p class="title">Text Area</p>
          <TextAreaIcon class="icon" />
          <img class="movement-icon" src="@/assets/images/TextArea.gif" alt="">
        </label>
      </div>


    </div>

  </div>
  <ListItemsAddition v-show="CheckedButton == 2" @update:items="GetItems" />
</template>
