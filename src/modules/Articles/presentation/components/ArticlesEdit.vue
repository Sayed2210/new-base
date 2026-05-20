<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import AppButton from '@/shared/HelpersComponents/AppButton.vue';
import IconAccept from '@/shared/icons/IconAccept.vue';
import ArticleController from '../controllers/Article.controller';
import type EditArticlesParams from '../../core/params/edit.Articles.params';
import ShowArticlesParams from '../../core/params/show.Articles.params';
import ArticleNewForm from './ArticleNewForm.vue';

const controller = ArticleController.getInstance();
const route = useRoute();
const formKey = route.fullPath;

const params = ref<EditArticlesParams | null>(null);

/**
 * Update article
 */
const saveArticle = async () => {
  if (!params.value) {
    console.error('No article parameters to save');
    return;
  }

  await controller.update(params.value, undefined, formKey);
};

const updateData = (updatedParams: EditArticlesParams) => {
  params.value = updatedParams;
};

onMounted(async () => {
  await controller.fetchOne(new ShowArticlesParams(Number(route.params.id)));
});
</script>

<template>
  <div class="article-edit-page">
    <ArticleNewForm :article="controller.itemData.value!" :form-key="formKey" @update-data="updateData" />

    <div class="actions">
      <AppButton title="Update Article" size="sm" icon="right" type="submit" @click="saveArticle">
        {{ $t('Update Article') }}
        <template #icon>
          <IconAccept />
        </template>
      </AppButton>
    </div>

    <!-- Error Display -->
    <div v-if="controller.errorMessage.value" class="error-toast">
      {{ controller.errorMessage.value }}
    </div>
  </div>
</template>

<style scoped lang="scss">
// .employee-edit-page {
//   padding: 24px;
//   max-width: 1000px;
//   margin: 0 auto;
// }

.actions {
  margin-top: 24px;
  display: flex;
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
