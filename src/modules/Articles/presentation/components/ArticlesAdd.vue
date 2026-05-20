<script setup lang="ts">
import { ref } from 'vue';
import AppButton from '@/shared/HelpersComponents/AppButton.vue';
import IconAccept from '@/shared/icons/IconAccept.vue';
import { useRoute } from 'vue-router';
import type AddEmployeeParams from '../../core/params/add.Artical.params';
import ArticleController from '../controllers/Article.controller';
import ArticleNewForm from './ArticleNewForm.vue';

const controller = ArticleController.getInstance();
const route = useRoute();
const formKey = route.fullPath;

const params = ref<AddEmployeeParams | null>(null);

/**
 * Save new article
 */
const saveArticle = async () => {
  try {
    if (!params.value) {
      console.error('No article parameters to save');
      return;
    }

    await controller.create(params.value, undefined, formKey);
  } catch (error) {
    console.error('Error saving article:', error);
  }
};

const updateData = (updatedParams: AddEmployeeParams) => {
  params.value = updatedParams;
};
</script>

<template>
  <div class="artical-add-page">
    <!-- <ArticleForm :form-key="formKey" @update-data="updateData" /> -->
    <ArticleNewForm :form-key="formKey" @update-data="updateData" />

    <div class="actions">
      <AppButton title="Save Article" size="sm" icon="right" type="submit" class="save-emp" @click="saveArticle">
        Save Article
        <template #icon>
          <IconAccept />
        </template>
      </AppButton>
      <button class="btn btn-draft">{{ $t(`Save As draft`) }}</button>
      <button class="btn btn-cancel">{{ $t(`cancel`) }}</button>
    </div>

    <!-- Error Display -->
    <div v-if="controller.errorMessage.value" class="error-toast">
      {{ controller.errorMessage.value }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.btn-cancel {
  background-color: var(--background-btn-outline-color);
  color: var(--danger-color);
  border: 1px solid rgba(245, 194, 192, 1);
  border-radius: 50px;
  width: 20%;

  @media (max-width: 768px) {
    width: 50%;
  }
}

.btn-draft {
  background-color: var(--PrimaryColor-alpha-10);
  color: var(--PrimaryColor);
  border: 1px solid var(--PrimaryColor-alpha-10);
  border-radius: 50px;
  width: 20%;

  @media (max-width: 768px) {
    width: 50%;
  }
}

.save-emp {
  width: 60%;
}

.actions {
  margin-top: 24px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.error-toast {
  margin-top: 20px;
  padding: 12px 16px;
  background-color: var(--error-light);
  color: var(--error-dark);
  border: 1px solid var(--error-border);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
}
</style>
