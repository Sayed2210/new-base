<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ActionsSection from '../icons/ActionsSection.vue';
import ItemAddIcon from '../icons/ItemAddIcon.vue';
import RemoveItemIcon from '../icons/RemoveItemIcon.vue';

const emit = defineEmits(['update:items'])
interface Item {
  title: string
}
const items = ref<Item[]>([])

const createNewItem = (): Item => ({
  title: '',
})

onMounted(() => {
  items.value.push(createNewItem())
})

const addItem = () => {
  items.value.push(createNewItem())
  emit('update:items', items.value)
}
const removeItem = (index: number) => {
  if (items.value.length > 1) {
    items.value.splice(index, 1)
    emit('update:items', items.value)
  }
}

const UpdateItem = (data, index) => {
  items.value[index].title = data.target.value
  emit('update:items', items.value)

}
</script>

<template>
  <div class="col-span-4 border border-gray-200 !p-3 rounded items-list-container">

    <div class="flex items-center justify-between  gap-4 mb-4 items-list-header">
      <div class="flex items-center justify-start gap-4 mb-4">
        <h3 class="font-bold text-lg">{{ $t('Drop-down items') }}</h3>
        <ActionsSection />
      </div>
      <button type="button" class="add-item " @click="addItem">
        <ItemAddIcon class="icon" />
      </button>
    </div>

    <div v-for="(item, index) in items" :key="index"
      class="flex items-center justify-between gap-4 mb-4 !my-2 !p-3 rounded">

      <div class="input-wrapper input-item ">
        <label for="item" class="flex items-center gap-3">
          <span> Title Item {{ index + 1 }}</span>
          <ActionsSection />
        </label>
        <input type="text" id="item" class="input item-title bg-white" placeholder="add your list item here.."
          v-model="item.title" @input="UpdateItem($event, index)">
      </div>

      <div class=" items-actions">
        <!-- v-if="items.length > 1" -->
        <button type="button" class="remove-item" @click="removeItem(index)">
          <RemoveItemIcon />
        </button>
      </div>

    </div>
  </div>


</template>
