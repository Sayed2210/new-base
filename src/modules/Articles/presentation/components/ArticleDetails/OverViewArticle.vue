<script setup lang="ts">
import type ArticalDetailsModel from '@/modules/Articles/core/models/artical.details.model';
import FolderCrudIcon from '@/shared/icons/FolderCrudIcon.vue';
import { useRoute } from 'vue-router';
import CopyIcon from '@/shared/icons/CopyIcon.vue';
import ArticlePencil from '@/shared/icons/ArticlePencil.vue';
import Articlearrow from '@/shared/icons/articlearrow.vue';
import AchiveIcon from '@/shared/icons/AchiveIcon.vue';
import DeletIArticle from '@/shared/icons/DeletIArticle.vue';
import DeleteDialog from '@/shared/HelpersComponents/dialog/DeleteDialog.vue';
import DeleteArticlesParams from '@/modules/Articles/core/params/delet.Articles.params';
import ArticleController from '../../controllers/Article.controller';
import { useRouter } from 'vue-router';

const router = useRouter();
const { artical } = defineProps<{
    artical: ArticalDetailsModel;
}>();

const route = useRoute();

  const controller = ArticleController.getInstance();
const deleteArticle = async (id: number) => {
    await controller.delete(new DeleteArticlesParams(id));
      router.push(`/${route.params.country_code}/articles`);
  };

</script>
<template>
    <div class="All_over_view">
        <header class="form-header">
            <div class="header-text">
                <FolderCrudIcon />
                <h6>{{ $t('artical_details') }}</h6>
            </div>
            <div class="buttons">

                <router-link
:to="`/${route.params.country_code}/articles/edit/${route.params.id}`" title="edit"
                    class="btn btn-edit">
                    <ArticlePencil />
                    {{ $t('Edit') }}
                </router-link>
                <div class="btn btn-action">
                    <AchiveIcon />
                    {{ $t('Archive ') }}
                </div>

                <DeleteDialog @delete="deleteArticle(artical.id!)">
                  <template #Dialog>
                    <button class="btn-delet" title="Delete">
                       <DeletIArticle />
                    </button>
                  </template>
                </DeleteDialog>
                <!-- <router-link
:to="`/${route.params.country_code}/articles/edit/${route.params.id}`" title="edit"
                    class=" btn-delet">
                    <DeletIArticle />
                </router-link> -->
            </div>
        </header>

        <div class="cards_details">
            <div class="card_one">
                <div class="details">
                    <div class="head">
                        <h6>{{ $t('id') }} :</h6>
                        <p>{{ artical?.id }}</p>
                    </div>
                    <div class="head">
                        <h6>{{ $t('created_at') }} : </h6>
                        <p>{{ artical?.created_at }}</p>
                    </div>
                    <div class="head">
                        <h6>{{ $t('Created by') }} : </h6>
                        <p>{{ artical?.created_by?.title }}</p>
                    </div>
                </div>
                <div class="head">
                    <h5 class="title">{{ artical?.question }}</h5>
                </div>
                <div class="head">
                    <p class="description">{{ artical?.Description  || $t('N/A')}}</p>
                </div>
                <div class="head">
                    <h6 class="question">
                        <CopyIcon /> {{ $t('number of questions ') }} :
                    </h6>
                    <p class="number_of_questions">{{ artical?.number_of_questions }}</p>
                </div>
            </div>
            <div class="card_two ">
                <div class="title">
                    <h6>{{ $t('Subjects') }} :</h6>
                </div>
                <!-- <div class="Subjects"  >
                    <div class="contant">
                        <div class="govermental">
                            <p>{{ artical?.subject.title }}</p>
                            <Articlearrow class="arrow-icon" />
                        </div>
                        <div class="govermental">
                            <p>{{ artical?.subject.title }}</p>
                            <Articlearrow class="arrow-icon" />
                        </div>
                        <div class="govermental">
                            <p>{{ artical?.subject.title }}</p>
                        </div>
                    </div>
                    <div class="arrow">
                        <Articlesubject />
                    </div>
                    <div class="sub_subject">
                        <p>{{ artical?.subject.title }}</p>
                    </div>
                </div> -->
                <div class="source" >
                    <div class="title">
                        <h6>{{ $t('artical source') }}</h6>
                    </div>
                    <div class="artical_document" >
                        <h6>{{ $t('Documents') }} :</h6>
                        <p >
                            {{ artical?.document.map((doc: any) => doc?.document_title).join(', ') }}
                        </p>
                        <Articlearrow class="arrow-icon" />
                    </div>
                    <div class="artical_document">
                        <h6>{{ $t('Source') }} :</h6>
                        <p>{{ artical?.document.map((doc: any) => doc?.text).join(', ') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../../../../../styles/variables' as *;
@use '../../../../../styles/mixins/flex' as *;


</style>