<script lang="ts" setup>
import AddItemButton from "@/components/HelpersComponents/AddItemButton.vue";
import IndexMailParams from "@/features/dashboard/mail/Core/Params/index_mail_params";
import IndexMailController from "@/features/dashboard/mail/presentation/controllers/index_mail_controller";
import { onMounted, ref, watch } from "vue";
import { debounce } from "@/base/persention/utils/debouced";
import DropList from "@/components/HelpersComponents/DropList.vue";
import DeleteMailParams from "@/features/dashboard/mail/Core/Params/delete_mail_params";
import DeleteMailController from "@/features/dashboard/mail/presentation/controllers/delete_mail_controller";
import Pagination from "@/components/HelpersComponents/Pagination.vue";
import DataStatus from "@/components/DataStatues/DataStatus.vue";
import TableLoader from "@/components/DataStatues/TableLoader.vue";
import DataEmpty from "@/components/DataStatues/DataEmpty.vue";
import DataFailed from "@/components/DataStatues/DataFailed.vue";
import { useRoute, useRouter } from "vue-router";
import TitleInterface from "@/base/Data/Models/title_interface";
import { EmailType } from "../../Core/enums/emil_type";
import CustomSelectInput from "@/components/HelpersComponents/CustomSelectInput.vue";
const indexMailController = IndexMailController.getInstance();
const state = ref(indexMailController.state.value);
const currentPage = ref(1);
const countPerPage = ref(10);
const route = useRoute();
const router = useRouter();
const search = ref("");
const fetchMailCategories = async (
  query: string = "",
  page: number = 1,
  count: number = 10
) => {
  const MailParams = new IndexMailParams(
    query,
    page,
    count,
    1,
    type.value?.id ? type.value.id : undefined
  );

  await indexMailController.getData(MailParams);
};

watch(
  () => indexMailController.state.value,
  (newState) => {
    if (!newState) return;
    state.value = newState;
  }
);

onMounted(() => {
  fetchMailCategories();
});

const searchMailCategories = debounce((_event: InputEvent) => {
  fetchMailCategories(search.value, currentPage.value, countPerPage.value);
});

const deleteMail = async (id: any) => {
  const MailParams = new DeleteMailParams(id);

  await DeleteMailController.getInstance().DeleteMail(MailParams);
  fetchMailCategories();
};

const handleChangePage = (page: number) => {
  currentPage.value = page;
  router.push({
    query: {
      ...route.query, // keep existing queries (if any)
      page: String(page),
    },
  });
};

watch(
  () => route.query.page,
  (newPage) => {
    if (newPage) {
      currentPage.value = Number(newPage);
      fetchMailCategories(search.value, currentPage.value, countPerPage.value);
    } else {
      currentPage.value = 1;
      fetchMailCategories(search.value, currentPage.value, countPerPage.value);
    }
  }
);
// Handle count per page change
const handleCountPerPage = (count: number) => {
  countPerPage.value = count;
  router.push({
    query: {
      ...route.query, // keep existing queries (if any)
      count: String(count),
    },
  });
  fetchMailCategories(search.value, currentPage.value, countPerPage.value);
};

const type = ref<TitleInterface | null>(null);
const types = [
  new TitleInterface({
    id: EmailType.EMPLOYEE,
    title: "Orbit Mail",
  }),
  new TitleInterface({
    id: EmailType.CLIENT,
    title: "Client Mail",
  }),
];

const updateType = (data: TitleInterface) => {
  type.value = data;
  fetchMailCategories(search.value, currentPage.value, countPerPage.value);
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
    <div class="input-search col-span-1">
      <img alt="search" src="@/assets/images/search-normal.png" />
      <input
        :placeholder="'search'"
        class="input"
        type="text"
        v-model="search"
        @input="searchMailCategories"
      />
    </div>
    <div class="input-wrapper col-span-1 md:col-span-1">
      <CustomSelectInput
        id="project"
        :modelValue="type"
        :staticOptions="types"
        label="Type"
        placeholder="Select a type"
        required
        @update:modelValue="updateType"
      />
    </div>
    <div class="col-span-3 flex justify-end">
      <AddItemButton addLink="/mail/add" addText="Add Mail" />
    </div>
  </div>
  <DataStatus :status="state">
    <template #success>
      <div class="table-responsive">
        <table class="main-table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Type</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in state.data" :key="index">
              <td data-label="#">
                <router-link :to="`/mail/edit/${item.id}`">{{
                  item.id
                }}</router-link>
              </td>
              <td data-label="Title">{{ item.title }}</td>
              <td data-label="Type">{{ item.type?.title }}</td>
              <td data-label="Actions">
                <DropList
                  :editLink="`/mail/edit/${item.id}`"
                  editText="Edit Mail"
                  @delete="deleteMail(item.id)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination
        :pagination="state.pagination"
        @changePage="handleChangePage"
        @countPerPage="handleCountPerPage"
      />
    </template>
    <template #failed>
      <DataFailed
        link="/add-mail"
        addText="Add Mail"
        description="Sorry .. You have no Mail .. All your joined customers will appear here when you add your customer data"
        title="..ops! You have No Mail"
      />
    </template>
    <template #empty>
      <DataEmpty
        link="/add-mail"
        addText="Add Mail"
        description="Sorry .. You have no Mail .. All your joined customers will appear here when you add your customer data"
        title="..ops! You have No Mail"
      />
    </template>
    <template #loader>
      <TableLoader :cols="3" :rows="10" />
    </template>
    <template #initial>
      <TableLoader :cols="3" :rows="10" />
    </template>
  </DataStatus>
</template>

<style scoped></style>
