<script setup lang="ts">
  import { onMounted, ref, computed } from 'vue';
  import DataStatusBuilder from '@/shared/DataStatues/DataStatusBuilder.vue';
  import AppTable, { type TableHeader } from '@/shared/HelpersComponents/AppTable.vue';
  import Pagination from '@/shared/HelpersComponents/Pagination.vue';
  import { useRoute, useRouter } from 'vue-router';
  import SubjectController from '../controllers/subject.controller';
  import IndexSubjectParams from '../../core/params/index.subject.params';
  import { getFullTitlesFromEducationResponse } from '@/shared/GeneralMethods/CreateBranchSubjectTree';
  import type TitleInterface from '@/base/Data/Models/titleInterface';
  import UpdatedCustomInputSelect from '@/shared/FormInputs/UpdatedCustomInputSelect.vue';

  const subjectcontroller = SubjectController.getInstance();
  const state = computed(() => subjectcontroller.listState.value);
  const router = useRouter();
  const route = useRoute();

  // Table headers
  const headers: TableHeader[] = [{ key: 'title', label: 'name', width: '90%', sortable: true }];

  // Pagination state
  const perPage = ref(10);
  const word = ref('');
  const TableTitle = ref<TitleInterface<number>[]>([]);

  const fetchSubjects = async (page: number = 1, word: string = '') => {
    await subjectcontroller.fetchList(
      new IndexSubjectParams(
        word,
        route.query.page ? Number(route.query.page) : page,
        perPage.value,
      ),
    );
  };

  const onPageChange = (page: number) => {
    fetchSubjects(page);
    router.push({
      query: {
        ...route.query,
        page: String(page),
        word: word.value,
      },
    });
  };

  const onPerPageChange = (count: number) => {
    perPage.value = count;
    fetchSubjects(1);
  };

  // Fetch emails on component mount
  onMounted(async () => {
    if (route.query.word) {
      word.value = String(route.query.word);
    }
    await fetchSubjects(route.query.page ? Number(route.query.page) : 1, word.value);
    TableTitle.value = state.value.data ? getFullTitlesFromEducationResponse(state.value.data) : [];
  });

  const formRoute = computed(() => '/subjects/add');

  const SelectedRow = ref<TitleInterface<number>[]>([]);
  const setSelectef = (items: TitleInterface<number>[]) => {
    SelectedRow.value = items;
  };

  const SelctedFilter = ref<TitleInterface<number>>();
  const UpdateSelctFIlter = () => {};
  const SubjectParams = ref<IndexSubjectParams>(new IndexSubjectParams(''));
</script>

<template>
  <div class="subject-page">
    <div class="index-header">
      <div class="toolbar">
        <!-- <div class="search-field">
          <span class="search-icon">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </span>
          <input
            v-model="word"
            placeholder="Search by country name or code…"
            class="search-input"
            type="text"
            @input="Search"
          />
        </div> -->
        <UpdatedCustomInputSelect
          id="classification-filter"
          v-model="SelctedFilter"
          :label="`classification`"
          :controller="subjectcontroller"
          :params="SubjectParams"
          placeholder="select subject"
          @update:model-value="UpdateSelctFIlter"
        />
      </div>
    </div>

    <DataStatusBuilder :controller="state">
      <template #success>
        <div class="table-frame">
          <AppTable
            :headers="headers"
            :items="TableTitle"
            selectable
            show-index
            hoverable
            striped
            @selection-change="setSelectef"
          >
            <template #cell-title="{ item }">
              <span class="subject-title-cell">{{ item.title }}</span>
            </template>

            <template #actions="{ item }">
              <div class="row-actions">
                <router-link class="action-btn edit" :to="`/subjects/edit/${item.id}`" title="Edit">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </router-link>
              </div>
            </template>
          </AppTable>
        </div>

        <Pagination
          :pagination="subjectcontroller.pagination.value"
          @change-page="onPageChange"
          @count-per-page="onPerPageChange"
        />
      </template>
      <template #empty>
        <div class="empty-state">
          <svg
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <h3>No emails yet</h3>
          <p>Add the first employee email to get started</p>
          <router-link :to="formRoute" class="btn-add empty-cta">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>Add Email</span>
          </router-link>
        </div>
      </template>
    </DataStatusBuilder>
  </div>
</template>
