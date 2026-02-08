<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import EditMailParams from "../../Core/Params/edit_mail_params";
import EditMailController from "@/features/dashboard/mail/presentation/controllers/edit_mail_controller";
import PrimaryButton from "@/components/HelpersComponents/PrimaryButton.vue";
import ShowMailParams from "../../Core/Params/show_mail_params";
import ShowMailController from "@/features/dashboard/mail/presentation/controllers/show_mail_controller";
import TitleInterface from "@/base/Data/Models/title_interface";
import { EmailType } from "../../Core/enums/emil_type";
import CustomSelectInput from "@/components/HelpersComponents/CustomSelectInput.vue";

const route = useRoute();
const router = useRouter();
const title = ref<string>("");
const id = ref<number>(Number(<string>route.params.id));
const type = ref<TitleInterface | null>(null);
const types = [
  new TitleInterface({
    id: EmailType.EMPLOYEE,
    title: "Employee Mail",
  }),
  new TitleInterface({
    id: EmailType.CLIENT,
    title: "Client Mail",
  }),
];

const fetchMailDetails = async () => {
  const MailParams = new ShowMailParams(id.value);

  const response = await ShowMailController.getInstance().ShowMail(MailParams);

  const data = response?.value?.data;

  // title
  title.value = data?.title ?? "";
  type.value = data?.type ? data?.type : null;
};

onMounted(() => {
  fetchMailDetails();
});

const EditMail = async () => {
  const MailParams = new EditMailParams(id.value, title.value);

  // const missingFields = validateRequiredFields(MailCategoryParams);

  // if (Object.keys(missingFields).length > 0) {
  //   const validationMode = validationEnum.BOTH; // Choose your mode: "dialog", "inline", or "both"
  //   validationDialogService.validate(missingFields, validationMode);
  //   return;
  // }

  await EditMailController.getInstance().editMail(MailParams, router);
};

const updateType = (data: TitleInterface) => {
  type.value = data;
};
</script>

<template>
  <form
    class="grid grid-cols-1 md:grid-cols-4 gap-4"
    @submit.prevent="EditMail"
  >
    <div class="col-span-4 md:col-span-2 input-wrapper">
      <label class="input-label" for="title">Title</label>
      <input
        id="title"
        v-model="title"
        class="input"
        placeholder="Enter title"
        type="text"
      />
    </div>
    <div class="input-wrapper col-span-4 md:col-span-2">
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

    <div class="col-span-4 button-wrapper">
      <PrimaryButton :title="'Update'" :type="'submit'" />
    </div>
  </form>
</template>

<style scoped></style>
