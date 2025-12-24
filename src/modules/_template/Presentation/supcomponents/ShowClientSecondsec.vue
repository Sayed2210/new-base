<script setup lang="ts">
import AddItemButton from "@/components/HelpersComponents/AddItemButton.vue";
import IndexProjectParams from "@/features/dashboard/projects/project/Core/params/index_projects_params";
import ProjectModel from "@/features/dashboard/projects/project/Data/models/index_projects_model";
import IndexProjectController from "@/features/dashboard/projects/project/Presentation/controllers/index_projects_controller";
import DeleteProjectParams from "@/features/dashboard/projects/project/Core/params/delete_project_params";
import DeleteProjectDashboardController from "@/features/dashboard/projects/project/Presentation/controllers/delete_project_controller";
import ProjectStatusEnum from "@/features/dashboard/projects/project/Data/enums/project_status_enum";
import wordSlice from '@/base/Presentation/utils/word_slice'

import { onMounted, ref, watch } from "vue";
import { debounce } from "@/base/Presentation/utils/debouced";
import DropList from "@/components/HelpersComponents/DropList.vue";
import { useRoute } from "vue-router";
// import type PaginationModel from "@/base/core/Models/pagination_model";
// import Pagination from "@/components/HelpersComponents/Pagination.vue";
import DataStatus from "@/components/DataStatues/DataStatus.vue";
import TableLoader from "@/components/DataStatues/TableLoader.vue";
import DataEmpty from "@/components/DataStatues/DataEmpty.vue";

const route = useRoute();
const projects = ref<ProjectModel[] | null>([]);
const projectType = ref<string>(<string>route.params.type);
// const pagination = ref<PaginationModel | null>(null);
const currentPage = ref(1);
const countPerPage = ref(10);
const indexProjectController = IndexProjectController.getInstance();
const state = ref(indexProjectController.state.value);

const fetchProjects = async (
  query: string = "",
  page: number = 1,
  count: number = 10,
  withPage: number = 1,
  clientId: number = Number(route.params.id),
) => {
  // const projectTypeKey = projectType.value as keyof typeof ProjectStatusEnum;
  // const projectTypeValue = ProjectStatusEnum[projectTypeKey] ?? null;

  const ProjectParams = new IndexProjectParams(
    query,
    page,
    count,
    withPage,
    clientId,
  );

  const response =
    await IndexProjectController.getInstance().getData(ProjectParams);
  projects.value = response.value.data;
  //   pagination.value = response.value.pagination;
};

const handleChangePage = (page: number) => {
  currentPage.value = page;
  fetchProjects("", currentPage.value, countPerPage.value);
};

// Handle count per page change
const handleCountPerPage = (count: number) => {
  countPerPage.value = count;
  fetchProjects("", currentPage.value, countPerPage.value);
};

onMounted(() => {
  fetchProjects();
});

const searchProjects = debounce((event: InputEvent) => {
  fetchProjects((event.target as HTMLInputElement).value);
});

const DeleteProject = async (id: any) => {
  const deleteProjectParams = new DeleteProjectParams(id);

  await DeleteProjectDashboardController.getInstance().deleteProject(
    deleteProjectParams,
  );
  await fetchProjects();
};

// Replace the `statusLabel` computed property with a method
const getStatusLabel = (id: number): string => {
  return ProjectStatusEnum[id] || "Unknown";
};

// I want watch route params type
watch(
  () => route.params.type,
  (newType) => {
    projectType.value = newType;
    fetchProjects();
  },
);

watch(
  () => indexProjectController.state.value,
  (newState) => {
    if (newState) {
      // console.log(newState)
      state.value = newState;
    }
  },
  {
    deep: true,
  },
);
</script>

<template>
  <div class="mt-4">
    <DataStatus :status="state">
      <template #success>
        <div class="table-responsive">
          <table class="main-table project-table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Project Code</th>
                <th scope="col">Customer name</th>
                <th scope="col">Project name</th>
                <th scope="col">Project type</th>
                <th scope="col">Marketer</th>
                <!--            <th scope="col">Project contracted for</th>-->
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in projects" :key="item.id">
                <td data-label="#">
                  <router-link :to="`/edit-project/${item.id}`">{{
                    item.id
                  }}</router-link>
                </td>
                <td data-label="Customer name">{{ item.project_code }}</td>
                <td data-label="Customer name">{{ item.client }}</td>
                <td data-label="Project name">{{ wordSlice(item.title) }}</td>
                <td data-label="Project type">{{ item.project_type }}</td>
                <td data-label="Marketer">
                  {{ item?.marketers[0]?.name ?? "___" }}
                </td>
                <!--            <td data-label="Project contracted for">-->
                <!--              <span v-if="item.design_exist">Design</span>-->
                <!--              <span v-if="item.supervisor_exist">, Supervision</span>-->
                <!--              <span v-if="item.authorty_exist">, Authority</span>-->
                <!--            </td>-->
                <td data-label="Status">
                  <span
                    :class="`status status_${getStatusLabel(item.project_status)}`"
                    >{{ getStatusLabel(item.project_status) }}</span
                  >
                </td>
                <td data-label="Actions">
                  <DropList
                    :lockStatus="item.lock_status === 1"
                    :projectStatus="item.project_status"
                    :isDesign="item.design_exist"
                    :isSupervisor="item.supervisor_exist"
                    :editLink="`/edit-project/${item.id}`"
                    editText="Edit project"
                    @delete="DeleteProject(item.id)"
                    showText="Show project"
                    :showLink="`/project/${item.id}`"
                    supervisorText="Edit supervision"
                    :supervisorLink="`/add-project/${item.id}/supervision`"
                    designText="Edit Design"
                    :designLink="`/add-project/${item.id}/design`"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- <Pagination
        :pagination="pagination"
        @changePage="handleChangePage"
        @countPerPage="handleCountPerPage"
      /> -->
      </template>
      <template #loader>
        <TableLoader :cols="3" :rows="10" />
      </template>
      <template #initial>
        <TableLoader :cols="3" :rows="10" />
      </template>
      <template #empty>
        <DataEmpty
          :link="`/add-project`"
          description="Sorry .. You have no project types .. All your joined customers will appear here when you add your customer data"
          title="..ops! You have No Projects"
          addText="Add Projects"
        />
      </template>
      <template #failed>
        <DataFailed />
      </template>
    </DataStatus>
  </div>
</template>

<style scoped></style>
