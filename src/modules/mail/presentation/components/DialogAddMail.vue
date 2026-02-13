<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import AddMailParams from "../../Core/Params/add_mail_params";
import AddMailController from "@/features/dashboard/mail/presentation/controllers/add_mail_controller";
import PrimaryButton from "@/components/HelpersComponents/PrimaryButton.vue";
import TitleInterface from "@/base/Data/Models/title_interface";
import { EmailType } from "../../Core/enums/emil_type";
import CustomSelectInput from "@/components/HelpersComponents/CustomSelectInput.vue";
import Dialog from "primevue/dialog";

const { showDialog } = defineProps<{ showDialog: boolean }>();
const emit = defineEmits<{
  (e: "close", value: boolean): void;
}>();

watch(
  () => showDialog,
  (newVal) => {
    visible.value = newVal;
  }
);
const visible = ref<boolean>(false);
const title = ref<string>("");
const router = useRouter();

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

const closeDialog = () => {
  visible.value = false;
  emit("close", false);
};

const addMail = async () => {
  const MailParams = new AddMailParams(title.value, type.value?.id!);

  await AddMailController.getInstance().addMail(MailParams, router, true);
  closeDialog();
};

const updateType = (data: TitleInterface) => {
  type.value = data;
};
</script>

<template>
  <Dialog
    v-model:visible="visible"
    :style="{ width: '50vw' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    header="Add Mail"
    @hide="closeDialog"
    :modal="true"
  >
    <form
      @submit.prevent="addMail"
      class="grid grid-cols-1 md:grid-cols-4 gap-4"
    >
      <div class="col-span-4 md:col-span-2 input-wrapper">
        <label for="title" class="input-label">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Enter title "
          class="input"
          v-model="title"
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
        <PrimaryButton :title="'Save'" :type="'submit'" />
      </div>
    </form>
  </Dialog>
</template>

<style scoped></style>
