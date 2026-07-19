<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import SupportContactsController from '../controllers/support.controller';
  import type AddSupportContactsParams from '../../core/params/add.support.params';
  import type SupportContactsModel from '../../core/models/support.contatcts.model';
  import { DataSuccess } from '@/base/Core/NetworkStructure/Resources/dataState/dataState';
  import SupportForm from './SupportForm.vue';
  import ShowSupportContactsParams from '../../core/params/show.support.params';

  const controller = SupportContactsController.getInstance();
  const route = useRoute();
  const router = useRouter();

  const formKey = route.fullPath;

  const initialSections = ref<SupportContactsModel[]>([]);
  const formParams = ref<AddSupportContactsParams | null>(null);
  const isLoaded = ref(false);
  const loading = ref(false);

  const saveSupport = async () => {
    if (!formParams.value) return;
    loading.value = true;
    try {
      await controller.update(formParams.value, undefined, formKey);
    } finally {
      loading.value = false;
    }
  };

  const cancel = () => {
    const countryCode = route.params.country_code as string | undefined;
    router.push(countryCode ? `/${countryCode}/support` : '/support');
  };

  const updateData = (params: AddSupportContactsParams) => {
    formParams.value = params;
  };

  onMounted(async () => {
    if (route.params.id) {
      const result = await controller.fetchOne(
        new ShowSupportContactsParams(Number(route.params.id), true),
      );
      if (result instanceof DataSuccess && result.data) {
        initialSections.value = [result.data as SupportContactsModel];
      }
    }
    isLoaded.value = true;
  });
</script>

<template>
  <div class="support-edit-page">
    <SupportForm
      v-if="isLoaded"
      :form-key="formKey"
      :initial-sections="initialSections"
      :loading="loading"
      @update-data="updateData"
    />

    <div v-if="isLoaded" class="edit-actions" :class="{ disabled: loading }">
      <button class="btn btn-primary" type="button" @click="saveSupport">
        {{ $t('save_change') }}
      </button>
      <button class="btn-cancel" type="button" @click="cancel">
        {{ $t('cancel') }}
      </button>
    </div>

    <div v-if="controller.errorMessage.value" class="error-toast">
      {{ controller.errorMessage.value }}
    </div>
  </div>
</template>

<style scoped lang="scss">
  .support-edit-page {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .edit-actions {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 24px;
    width: 100%;

    &.disabled {
      cursor: not-allowed;
      pointer-events: none;
      opacity: 0.7;
    }

    .btn-primary {
      width: 80%;
    }

    .btn-cancel {
      padding: 14px;
      background-color: var(--danger-light-alt);
      color: var(--danger);
      border: 1.5px solid #fecaca;
      border-radius: 50px;
      font-size: 15px;
      font-weight: 600;
      width: 20%;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: var(--danger-light);
      }
    }
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
