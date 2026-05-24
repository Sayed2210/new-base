<script setup lang="ts">
import type ArticalDetailsModel from '@/modules/Articles/core/models/artical.details.model';
import FolderCrudIcon from '@/shared/icons/FolderCrudIcon.vue';
import { useRoute } from 'vue-router';
import CopyIcon from '@/shared/icons/CopyIcon.vue';
import ArticlePencil from '@/shared/icons/ArticlePencil.vue';
import Articlearrow from '@/shared/icons/articlearrow.vue';
import Articlesubject from '@/shared/icons/articlesubject.vue';
import AchiveIcon from '@/shared/icons/AchiveIcon.vue';
import DeletIArticle from '@/shared/icons/DeletIArticle.vue';

const { article } = defineProps<{
    article?: ArticalDetailsModel;
}>();

const route = useRoute();




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
                <router-link
:to="`/${route.params.country_code}/articles/edit/${route.params.id}`" title="edit"
                    class="btn btn-action">
                    <AchiveIcon />
                    {{ $t('Archive ') }}
                </router-link>
                <router-link
:to="`/${route.params.country_code}/articles/edit/${route.params.id}`" title="edit"
                    class=" btn-delet">
                    <DeletIArticle />
                </router-link>
            </div>
        </header>

        <div class="cards_details">
            <div class="card_one">
                <div class="details">

                    <div class="head">
                        <h6>{{ $t('id') }} :</h6>
                        <p>{{ article?.id }}</p>
                    </div>
                    <div class="head">
                        <h6>{{ $t('created_at') }} : </h6>
                        <p>{{ article?.createdAt }}</p>
                    </div>
                    <div class="head">
                        <h6>{{ $t('Created by') }} : </h6>
                        <p>{{ article?.createdBy }}</p>
                    </div>
                </div>
                <div class="head">
                    <h5 class="title">{{ article?.title }}</h5>
                </div>
                <div class="head">
                    <p class="description">{{ article?.Description }}</p>
                </div>
                <div class="head">
                    <h6 class="question">
                        <CopyIcon /> {{ $t('number of questions ') }} :
                    </h6>
                    <p class="number_of_questions">{{ article?.NumberOfQuestions }}</p>
                </div>
            </div>
            <div class="card_two">
                <div class="title">
                    <h6>{{ $t('Subjects') }} :</h6>
                </div>
                <div class="Subjects">
                    <div class="contant">
                        <div class="govermental">
                            <p>{{ article?.subject.curriculum }}</p>
                            <Articlearrow class="arrow-icon" />
                        </div>
                        <div class="govermental">
                            <p>{{ article?.subject.cycle }}</p>
                            <Articlearrow class="arrow-icon" />
                        </div>
                        <div class="govermental">
                            <p>{{ article?.subject.grade }}</p>
                        </div>
                    </div>
                    <div class="arrow">
                        <Articlesubject />
                    </div>
                    <div class="sub_subject">
                        <p>{{ article?.subject.subSubject }}</p>
                    </div>
                </div>
                <div class="source">
                    <div class="title">
                        <h6>{{ $t('artical source') }}</h6>
                    </div>
                    <div class="artical_document">
                        <h6>{{ $t('Documents') }} :</h6>
                        <p>{{ article?.articleDocument }}</p>
                        <Articlearrow class="arrow-icon" />
                    </div>
                    <div class="artical_document">
                        <h6>{{ $t('Source') }} :</h6>
                        <p>{{ article?.articlesource }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../../../../../styles/variables' as *;
@use '../../../../../styles/mixins/flex' as *;

.All_over_view {
    background-color: var(--background-color-soft-light);
    padding: $MdSize;
    border-radius: $XlSize;

    .buttons {
        @include flex(row, nowrap, start, center);
        gap: $XsSize2;
    }
    .form-header {
        .btn-action{
            background-color: var(--input-border-color);
            color: rgba(26, 26, 26, 1);
            border: none;
              border-radius: $XlSize4;
        }
        .btn-delet{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid var(--input-border-color);
        }
        .btn-edit {
            background: white;
            border: 1px solid var(--primary-green);
            color: var(--primary-green);
            border-radius: $XlSize4;
            &:hover {
                background-color: var(--primary-green) !important;
                color: white !important;

                :deep(svg) {
                    color: white;
                }

                :deep(path) {
                    stroke: white;
                }
            }
        }

        .header-text {
            @include flex(row, nowrap, start, center);
            gap: $XsSize3;

            h6 {
                font-family: "medium";
                font-size: $XlSize;
                color: var(--title-color);
                font-weight: $BaseFontSemiBoldWeight;
            }


        }
    }

    .cards_details {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: $MdSize;

        .card_one {
            border: 1px solid var(--input-border-color);
            background-color: var(--bg-header);
            border-radius: $XlSize;
            padding: $MdSize;

            .details {
                @include flex(row, nowrap, start, center);
                gap: $XlSize2;
            }

            .head {
                @include flex(row, nowrap, start, center);
                gap: $XsSize4;

                h6 {
                    color: var(--bread-crumb-color-span);
                    font-family: "medium";
                    font-size: $SmSize;
                    font-weight: $BaseFontMediumWeight;
                }

                p {
                    font-family: "medium";
                    font-size: $SmSize;
                    font-weight: $BaseFontMediumWeight;
                    color: var(--blue-opacit);
                }

                .title {
                    font-family: "bold";
                    font-size: $XlSize2;
                    font-weight: $BaseFontWeightBold;
                    color: var(--table-header-color);
                    margin: $XsSize4 0;
                }

                .description {
                    font-family: "medium";
                    font-size: $MdSize;
                    font-weight: $BaseFontMediumWeight;
                    color: var(--table-data-color);
                    margin-bottom: $XsSize4;
                }

                .question {
                    @include flex(row, nowrap, start, center);
                    gap: $XsSize4;
                }

                .number_of_questions {
                    color: var(--primary-green);
                    background-color: var(--PrimaryColor-alpha-10);
                    padding: $XsSize5 $XsSize4;
                    border-radius: $XsSize4;
                    font-family: "bold";
                    font-size: $MdSize;
                    font-weight: $BaseFontWeightBold;
                }
            }

        }

        .card_two {
            border: 1px solid var(--input-border-color);
            background-color: var(--bg-header);
            border-radius: $XlSize;
            padding: $MdSize;

            .title {
                h6 {
                    font-family: "medium";
                    font-size: $XlSize;
                    color: var(--bread-crumb-color-span);
                    font-weight: $BaseFontMediumWeight;
                }
            }

            .Subjects {
                @include flex(row, nowrap, space-between, center);

                .sub_subject {
                    color: var(--primary-green);
                    font-family: "bold";
                    font-size: $SmSize;
                    color: var(--primary-green);
                    font-weight: $BaseFontWeightBold;
                }

                .contant {
                    padding: $XsSize;

                    .govermental {
                        position: relative;
                        margin: $XsSize2 0;

                        p {
                            font-family: "medium";
                            font-size: $XsSize;
                            color: var(--table-data-color);
                            font-weight: $BaseFontWeight;
                        }

                        .arrow-icon {
                            position: absolute;
                            top: 130%;
                            left: -7%;
                            transform: translate(-50%, -50%);
                            z-index: 1;

                        }
                    }
                }
            }

            .source {
                border-top: 1px solid var(--input-border-color);
                padding-top: $XsSize;

                .title {
                    margin-bottom: $XsSize4;

                    h6 {
                        font-family: "medium";
                        font-size: $SmSize;
                        color: var(--bread-crumb-color-span);
                        font-weight: $BaseFontSemiBoldWeight;
                    }
                }

                .artical_document {
                    @include flex(row, nowrap, start, center);
                    position: relative;
                    margin-bottom: $XsSize3;
                    padding: 0 var(--xs-size);

                    .arrow-icon {
                        position: absolute;
                        top: 25px;
                        left: 8px;
                        transform: translate(-50%, -50%);
                        z-index: 1;

                    }

                    h6 {
                        font-family: "medium";
                        font-size: $XsSize;
                        color: var(--bread-crumb-color-span);
                        font-weight: $BaseFontMediumWeight;
                    }

                    p {
                        font-family: "medium";
                        font-size: $XsSize;
                        color: var(--table-data-color);
                        font-weight: $BaseFontSemiBoldWeight;
                    }

                }
            }
        }
    }
}
</style>