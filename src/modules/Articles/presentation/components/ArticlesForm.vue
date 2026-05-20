<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { useFormsStore } from '@/stores/formsStore';
import type ShowArticleModel from '../../core/models/show.Article.model';
import type AddArticlesParams from '../../core/params/add.Artical.params';
import BasicArticleDataForm from './FormComponent/BasicArticleDataForm.vue';
import ArticleAnswersDataForm from './FormComponent/ArticleAnswersDataForm.vue';

const emit = defineEmits(['updateData']);

const { employee, formKey } = defineProps<{
  employee?: ShowArticleModel;
  formKey?: string;
}>();

const FormStore = useFormsStore();
onBeforeRouteLeave((to, from) => {
  const savedData = FormStore.getFormData(formKey!);
  if (savedData && to.path !== from.path) {
    FormStore.showReturnWarning(formKey!);
  }
});

// Form state
const name = ref<string>('');
const email = ref<string>('');
const phone = ref<string>('');
const password = ref<string>('');
const image = ref<string>('');
const isSuperadmin = ref<boolean>(false);
const role_id = ref<number>(1);
const employeeType = ref<number>(1);
const lastName = ref<string>('');
const employeeId = ref('');
const UploadedImage = ref<string[]>([]);
// const checked = ref(false); //employee status

watch(
  () => employee,
  (newEmployee) => {
    if (newEmployee) {
    }
  },
  { immediate: true },
);

const route = useRoute();

const updateData = () => {
  const data = {
    email: email.value,
    EmployeeRef: employeeId.value,
    firstname: name.value,
    image: String(UploadedImage.value),
    lastname: lastName.value,
    phone: phone.value,
    password: password.value,
  };

  FormStore.setFormData(formKey!, data);

  let params: any;
  // if (route.params.id) {
  //   params = new EditquestionsParams({
  //     id: Number(route.params.id),
  //     ...data,
  //   });
  // } else {
  //   params = new AddquestionsParams(data);
  // }
  emit('updateData', params);
};

const resetForm = () => {
  name.value = '';
  email.value = '';
  phone.value = '';
  password.value = '';
  image.value = '';
  isSuperadmin.value = false;
  role_id.value = 1;
  employeeType.value = 1;
  lastName.value = '';
  employeeId.value = '';
};

onMounted(() => {
  const saved = FormStore.getFormData(formKey!);
  if (saved) {
    name.value = saved.name;
    email.value = saved.email;
    phone.value = saved.phone;
    password.value = saved.password;
    image.value = saved.image;
    isSuperadmin.value = saved.isSuperadmin;
    role_id.value = saved.role_id;
    employeeType.value = saved.employeeType;
    lastName.value = saved.lastName;
    employeeId.value = saved.employeeId;
    updateData();
  } else if (!employee) {
    resetForm();
  }
});

const GetAllBasicData = (data: AddArticlesParams) => {
  console.log(data, 'GetAllBasicData');
};
</script>

<template>
  <div class="artical-details-form-card">
    <header class="form-header">
      <div class="form-title">
        <div class="header-text">
          <h3>{{ route.params.id ? 'Edit Artical' : 'Add New Artical' }}</h3>
        </div>
      </div>
    </header>


    <BasicArticleDataForm @updateData="GetAllBasicData" />
    <ArticleAnswersDataForm :article-data="employee!" :article-type="1" />
  </div>
</template>
