<script setup lang="ts">
  import { onMounted, ref, computed } from 'vue';
  import DataStatusBuilder from '@/shared/DataStatues/DataStatusBuilder.vue';
  import AppTable, { type TableHeader } from '@/shared/HelpersComponents/AppTable.vue';
  import Pagination from '@/shared/HelpersComponents/Pagination.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { debounce } from '@/base/Presentation/Utils/debouced';
  import { useFormsStore } from '@/stores/formsStore';
  import DeleteDialog from '@/shared/HelpersComponents/dialog/DeleteDialog.vue';
  import SubjectController from '../controllers/subject.controller';
  import IndexSubjectParams from '../../core/params/index.subject.params';
  import DeleteSubjectParams from '../../core/params/delete.subject.params';
  import type StageModel from '@/modules/Stages/core/models/stage.model';
import DropList from '@/shared/HelpersComponents/DropList.vue';
import DeletIcon from '@/shared/icons/DropListIcons/DeletIcon.vue';
import { useI18n } from 'vue-i18n';
import EditIcon from '@/shared/icons/Privacy/EditIcon.vue';
import ShowIcon from '@/shared/icons/ShowIcon.vue';

  // Controller instance
  const controller = SubjectController.getInstance();
  const state = computed(() => controller.listState.value);
  const router = useRouter();
  const route = useRoute();

  // Table headers
  const headers: TableHeader[] = [
    { key: 'title', label: 'Title', width: '90%', sortable: true },


  ];

  // Pagination state
  const perPage = ref(10);
  const word = ref('');

  const fetchSubjects = async (page: number = 1, word: string = '') => {
    await controller.fetchList(
      new IndexSubjectParams(
        word,
        route.query.page ? Number(route.query.page) : page,
        perPage.value,
      ),
    );
  };

  const Search = debounce(() => {
    router.push({
      query: {
        ...route.query,
        page: Number(route.query.page ?? 1),
        word: word.value || undefined,
      },
    });

    fetchSubjects(1, word.value);
  });

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
  });

  const deleteSubject = async (id: number) => {
    await controller.delete(new DeleteSubjectParams(id));
    await fetchSubjects();
  };

  const FormStore = useFormsStore();
  const formRoute = computed(() => '/subjects/add');

  const isDraft = computed(() => {
    const data = FormStore?.formData[formRoute.value] ?? {};
    return Object.keys(data).length === 0 || Object.values(data).every((v) => v == null);
  });
  const SelectedRow = ref<StageModel[]>([]);
  const setSelectef = (items: StageModel[]) => {
    SelectedRow.value = items;
  };

  const deleteSelected = () => {
    SelectedRow.value.forEach((item) => {
      deleteSubject(item.id!);
    });
  };
const {t} = useI18n();
  const actionList = (id: number, deleteSubject: (id: number) => void) => [
    {
      text: t('rename'),
      icon: EditIcon ,
      // action: () => {
      //   router.push({ path: `/subjects/edit/${id}` });
      // },
    },
    {
      text: t('delete'),
      icon: DeletIcon,
      action: () => deleteSubject(id),
    },
        {
      text: t('show_questions'),
      icon: ShowIcon,
      action: () => router.push( `/questions?subjectId=${id}`) ,
    },
  ];
</script>

<template>
  <!-- {{state -->
  <div class="subject-page">
    <div class="index-header">
      <div class="toolbar">
        <div class="search-field">
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
        </div>
      </div>

    </div>

    <!-- ═══ Table ═══ -->
    <DataStatusBuilder :controller="state" :on-retry="async () => await fetchSubjects()">
      <template #success="{ data }">
        <div class="table-frame">
          <AppTable
            :headers="headers"
            :items="data as StageModel[]"
            selectable
            show-index
            hoverable
            striped
            @selection-change="setSelectef"
          >
            <template #cell-title="{ item }">
              {{ item.title }}
            </template>

            <template #actions="{ item }">
              <div class="row-actions">
                <router-link class="action-btn edit" :to="`/stages/edit/${item.id}`" title="Edit">
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
                <DropList
                  :action-list="actionList(item.id, deleteEducationClassification)"
                  :delete-dialog-title="
                    $t('are_you_sure_you_want_to_remove_this_education_classification')
                  "
                  :delete-dialog-message="
                    $t(
                      'Deleting_this_classification_will_remove_all_related_data_including_any_configurations_and_tree_structures_This_action_is_irreversible_and_the_classification_must_be_created_again_if_needed',
                    )
                  "
                />
              </div>
            </template>
          </AppTable>
        </div>

        <Pagination
          :pagination="controller.pagination.value"
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
