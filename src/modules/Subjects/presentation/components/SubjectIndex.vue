<script setup lang="ts">
  import { onMounted, ref, computed } from 'vue';
  import DataStatusBuilder from '@/shared/DataStatues/DataStatusBuilder.vue';
  import AppTable, { type TableHeader } from '@/shared/HelpersComponents/AppTable.vue';
  import { useRoute } from 'vue-router';
  import SubjectController from '../controllers/subject.controller';
  import IndexSubjectParams from '../../core/params/index.subject.params';
  import { getFullTitlesFromEducationResponse } from '@/shared/GeneralMethods/CreateBranchSubjectTree';
  import type TitleInterface from '@/base/Data/Models/titleInterface';
  import UpdatedCustomInputSelect from '@/shared/FormInputs/UpdatedCustomInputSelect.vue';

  type EducationTreeNode = {
    id?: number;
    title?: string;
    full_title?: string;
    e_c_branch_id?: number;
    e_c_subject_id?: number;
    branches?: EducationTreeNode[];
    subjects?: EducationTreeNode[];
    children?: EducationTreeNode[];
  };

  type FilterNodeType = 'classification' | 'branch' | 'subject';

  type EducationFilterOption = TitleInterface<number> & {
    node: EducationTreeNode;
    nodeType: FilterNodeType;
    rawTitle: string;
    pathTitles: string[];
  };

  const subjectcontroller = SubjectController.getInstance();
  const state = computed(() => subjectcontroller.listState.value);
  const route = useRoute();
  const cacheKey = 'subjects_full_education_classification_tree';

  const headers: TableHeader[] = [{ key: 'title', label: 'name', width: '90%', sortable: true }];

  const perPage = ref(10);
  const word = ref('');
  const TableTitle = ref<TitleInterface<number>[]>([]);
  const educationTree = ref<EducationTreeNode[]>([]);
  const currentFilterOptions = ref<EducationFilterOption[]>([]);
  const selectedFilter = ref<EducationFilterOption | null>(null);
  const selectedPath = ref<EducationFilterOption[]>([]);

  const fetchSubjects = async (page: number = 1, word: string = '') => {
    await subjectcontroller.fetchList(
      new IndexSubjectParams(
        word,
        route.query.page ? Number(route.query.page) : page,
        perPage.value,
        0,
      ),
    );
  };

  const getNodeId = (node: EducationTreeNode): number => {
    return node.e_c_subject_id ?? node.e_c_branch_id ?? node.id ?? 0;
  };

  const getChildNodes = (node: EducationTreeNode): EducationTreeNode[] => {
    return [...(node.branches ?? []), ...(node.children ?? []), ...(node.subjects ?? [])];
  };

  const getNodeType = (node: EducationTreeNode, fallback: FilterNodeType): FilterNodeType => {
    if (node.e_c_subject_id) return 'subject';
    if (node.e_c_branch_id) return 'branch';
    return fallback;
  };

  const toFilterOption = (
    node: EducationTreeNode,
    fallbackType: FilterNodeType,
    parentTitles: string[] = [],
  ): EducationFilterOption => {
    const rawTitle = node.title ?? node.full_title ?? '';
    const pathTitles = [...parentTitles, rawTitle].filter(Boolean);

    return {
      id: getNodeId(node),
      title: pathTitles.join(' -> '),
      full_title: node.full_title,
      node,
      nodeType: getNodeType(node, fallbackType),
      rawTitle,
      pathTitles,
    };
  };

  const getClassificationOptions = (tree: EducationTreeNode[]): EducationFilterOption[] => {
    return tree.map((node) => toFilterOption(node, 'classification')).filter((item) => item.id);
  };

  const getNextOptions = (option: EducationFilterOption): EducationFilterOption[] => {
    return getChildNodes(option.node)
      .map((child) => toFilterOption(child, getNodeType(child, 'branch'), option.pathTitles))
      .filter((item) => item.id);
  };

  const getTableSource = (node?: EducationTreeNode): EducationTreeNode[] => {
    if (!node) return educationTree.value;
    if (node.e_c_subject_id) return [{ branches: [{ subjects: [node] }] }];
    if (node.e_c_branch_id) return [{ branches: [node] }];
    return [node];
  };

  const updateTableFromNode = (node?: EducationTreeNode) => {
    TableTitle.value = getFullTitlesFromEducationResponse(getTableSource(node));
  };

  const syncTreeFromState = () => {
    const data = state.value.data ?? [];
    educationTree.value = data as unknown as EducationTreeNode[];
    sessionStorage.setItem(cacheKey, JSON.stringify(data));
    currentFilterOptions.value = getClassificationOptions(educationTree.value);
    selectedFilter.value = null;
    selectedPath.value = [];
    updateTableFromNode();
  };

  const loadCachedTree = () => {
    const cachedTree = sessionStorage.getItem(cacheKey);
    if (!cachedTree) return;

    try {
      const parsedTree = JSON.parse(cachedTree) as EducationTreeNode[];
      educationTree.value = parsedTree;
      currentFilterOptions.value = getClassificationOptions(parsedTree);
      selectedFilter.value = null;
      selectedPath.value = [];
      updateTableFromNode();
    } catch {
      sessionStorage.removeItem(cacheKey);
    }
  };

  const getSelectedPathTitle = () => {
    return selectedPath.value
      .map((option) => option.rawTitle)
      .filter(Boolean)
      .join(' -> ');
  };

  const updateSelectedFilter = (option: EducationFilterOption | null) => {
    if (!option) {
      selectedFilter.value = null;
      selectedPath.value = [];
      currentFilterOptions.value = getClassificationOptions(educationTree.value);
      updateTableFromNode();
      return;
    }

    selectedPath.value = [...selectedPath.value, option];
    selectedFilter.value = {
      ...option,
      title: getSelectedPathTitle(),
    };
    updateTableFromNode(option.node);
    currentFilterOptions.value = getNextOptions(option);
  };

  const getFilterLabel = () => {
    if (selectedPath.value.length === 0) return 'education_classification';
    if (currentFilterOptions.value.length === 0) {
      return selectedPath.value[selectedPath.value.length - 1]?.nodeType ?? 'branch';
    }

    return currentFilterOptions.value.some((option) => option.nodeType === 'subject')
      ? 'subject'
      : 'branch';
  };

  const getFilterPlaceholder = () => {
    if (selectedPath.value.length === 0) return 'select_classification';
    if (currentFilterOptions.value.length === 0) return 'select_subject';

    return currentFilterOptions.value.some((option) => option.nodeType === 'subject')
      ? 'select_subject'
      : 'select_branch';
  };

  onMounted(async () => {
    if (route.query.word) {
      word.value = String(route.query.word);
    }
    loadCachedTree();
    await fetchSubjects(route.query.page ? Number(route.query.page) : 1, word.value);
    syncTreeFromState();
  });

  const formRoute = computed(() => '/subjects/add');

  const SelectedRow = ref<TitleInterface<number>[]>([]);
  const setSelectef = (items: TitleInterface<number>[]) => {
    SelectedRow.value = items;
  };
</script>

<template>
  <div class="subject-page">
    <div class="index-header">
      <div class="toolbar">
        {{ selectedFilter }}
        <UpdatedCustomInputSelect
          id="education-filter"
          v-model="selectedFilter"
          :label="getFilterLabel()"
          :static-options="currentFilterOptions"
          :placeholder="$t(getFilterPlaceholder())"
          :reload="false"
          @update:model-value="
            (option: EducationFilterOption | null) => updateSelectedFilter(option)
          "
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
              <span class="subject-title-cell">{{ item.title || item.stage_title }}</span>
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
