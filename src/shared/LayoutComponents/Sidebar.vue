<script setup lang="ts">
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import CloseSidebar from '@/shared/icons/CloseSidebar.vue'

import { ref } from 'vue'
import SidebarVector from '@/shared/icons/SidebarVector.vue'
import PermissionBuilder from '@/components/DataStatus/PermissionBuilder.vue'
import { PermissionsEnum } from '@/features/users/Admin/Core/Enum/permission_enum'
import IconSetting from '@/shared/icons/IconSetting.vue'
import { useUserStore } from '@/stores/user'
import { OrganizationTypeEnum } from '@/features/auth/Core/Enum/organization_type'

const isOpen = ref(true)

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const active = ref('0')
const user = useUserStore()
</script>

<template>
  <aside :class="['sidebar', isOpen ? 'open' : 'close']">
    <div class="sidebar-wrapper">
      <div class="logo">
        <img src="@/assets/images/logo.svg" alt="logo" />
        <h2>HSE.Cloud.Ai</h2>
      </div>
      <button class="close-sidebar" @click="toggleSidebar">
        <CloseSidebar />
      </button>


      <div class="links">
        <template v-if="user?.user?.type === OrganizationTypeEnum?.ADMIN">
          <PermissionBuilder :code="[
            PermissionsEnum?.ADMIN_ALL,
            PermissionsEnum?.LANGUAGE_ALL,
            PermissionsEnum?.INDUSTRY_ALL,
            PermissionsEnum?.EQUIPMENT_TYPE_ALL,
            PermissionsEnum?.EQUIPMENT_ALL,
            PermissionsEnum?.HAZARD_TYPE_ALL,
            PermissionsEnum?.ACCIDENTS_TYPE_ALL,
            PermissionsEnum?.FACTORY_ITEM_ALL,
            PermissionsEnum?.FACTORY_ALL,
            PermissionsEnum?.CERTIFICATE_ALL,
            PermissionsEnum?.TEMPLATE_ALL,
            PermissionsEnum?.PROJECT_TYPE_ALL,
            PermissionsEnum?.ORGANIZATION_ALL,
          ]">
            <Accordion value="0">
              <AccordionPanel value="0">
                <AccordionHeader>
                  <div class="links-header">
                    <IconSetting />
                    {{ $t('settings') }}
                  </div>
                </AccordionHeader>

                <AccordionContent>
                  <ul>
                    <PermissionBuilder :code="[
                      PermissionsEnum?.ADMIN,
                      PermissionsEnum?.ADMIN_ALL,
                      PermissionsEnum.ADMIN_CREATE,
                      PermissionsEnum.ADMIN_UPDATE,
                      PermissionsEnum.ADMIN_DETAILS,
                      PermissionsEnum.ADMIN_DELETE,
                      PermissionsEnum.ADMIN_FETCH,
                    ]">
                      <li>
                        <router-link to="/admin/admins">
                          <SidebarVector />
                          <span>{{ $t('admins') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                    <PermissionBuilder :code="[
                      PermissionsEnum?.ADMIN,
                      PermissionsEnum?.LANGUAGE_ALL,
                      PermissionsEnum.LANGUAGE_CREATE,
                      PermissionsEnum.LANGUAGE_UPDATE,
                      PermissionsEnum.LANGUAGE_DETAILS,
                      PermissionsEnum.LANGUAGE_DELETE,
                      PermissionsEnum.LANGUAGE_FETCH,
                    ]">
                      <li>
                        <router-link to="/admin/languages">
                          <SidebarVector />
                          <span>{{ $t('languages') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                    <PermissionBuilder :code="[
                      PermissionsEnum?.ADMIN,
                      PermissionsEnum.INDUSTRY_ALL,
                      PermissionsEnum.INDUSTRY_CREATE,
                      PermissionsEnum.INDUSTRY_DELETE,
                      PermissionsEnum.INDUSTRY_FETCH,
                      PermissionsEnum.INDUSTRY_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/industry">
                          <SidebarVector />
                          <span>{{ $t('industry') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                    <PermissionBuilder :code="[
                      PermissionsEnum?.ADMIN,
                      PermissionsEnum.EQUIPMENT_TYPE_ALL,
                      PermissionsEnum.EQUIPMENT_TYPE_CREATE,
                      PermissionsEnum.EQUIPMENT_TYPE_DELETE,
                      PermissionsEnum.EQUIPMENT_TYPE_FETCH,
                      PermissionsEnum.EQUIPMENT_TYPE_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/equipment-types">
                          <SidebarVector />
                          <span>{{ $t('Equipment Types') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                    <PermissionBuilder :code="[
                      PermissionsEnum?.ADMIN,
                      PermissionsEnum.EQUIPMENT_ALL,
                      PermissionsEnum.EQUIPMENT_CREATE,
                      PermissionsEnum.EQUIPMENT_DELETE,
                      PermissionsEnum.EQUIPMENT_FETCH,
                      PermissionsEnum.EQUIPMENT_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/equipments">
                          <SidebarVector />
                          <span>{{ $t('Equipments') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>

                    <PermissionBuilder :code="[
                      PermissionsEnum.HAZARD_TYPE_ALL,
                      PermissionsEnum.HAZARD_TYPE_CREATE,
                      PermissionsEnum.HAZARD_TYPE_DELETE,
                      PermissionsEnum.HAZARD_TYPE_FETCH,
                      PermissionsEnum.HAZARD_TYPE_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/hazard-type">
                          <SidebarVector />
                          <span>{{ $t('Hazard Types') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>

                    <!-- ObserverationType -->
                    <PermissionBuilder :code="[
                      PermissionsEnum.OBSERVATION_TYPE_ALL,
                      PermissionsEnum.OBSERVATION_TYPE_CREATE,
                      PermissionsEnum.OBSERVATION_TYPE_DELETE,
                      PermissionsEnum.OBSERVATION_TYPE_FETCH,
                      PermissionsEnum.OBSERVATION_TYPE_UPDATE,
                      PermissionsEnum.ADMIN,
                    ]">
                      <li>
                        <router-link to="/admin/observation-type">
                          <SidebarVector />
                          <span>{{ $t('observation_types') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>

                    <!-- healthconditions -->
                    <PermissionBuilder :code="[
                      PermissionsEnum.HEALTH_CONDITION_ALL,
                      PermissionsEnum.HEALTH_CONDITION_CREATE,
                      PermissionsEnum.HEALTH_CONDITION_DELETE,
                      PermissionsEnum.HEALTH_CONDITION_FETCH,
                      PermissionsEnum.HEALTH_CONDITION_UPDATE,
                      PermissionsEnum.ADMIN,
                    ]">
                      <li>
                        <router-link to="/admin/health-conditions">
                          <SidebarVector />
                          <span>{{ $t('health_conditions') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>

                    <!-- Observation -->
                    <!-- <PermissionBuilder
                      :code="[
                        PermissionsEnum.OBSERVATION_ALL,
                        PermissionsEnum.OBSERVATION_CREATE,
                        PermissionsEnum.OBSERVATION_DELETE,
                        PermissionsEnum.OBSERVATION_FETCH,
                        PermissionsEnum.OBSERVATION_UPDATE,
                        PermissionsEnum.ADMIN,
                      ]"
                    >
                      <li>
                        <router-link to="/admin/observation">
                          <SidebarVector />
                          <span>{{ $t('Observation') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder> -->
                    <PermissionBuilder :code="[
                      PermissionsEnum.ACCIDENTS_TYPE_ALL,
                      PermissionsEnum.ACCIDENTS_TYPE_CREATE,
                      PermissionsEnum.ACCIDENTS_TYPE_DELETE,
                      PermissionsEnum.ACCIDENTS_TYPE_FETCH,
                      PermissionsEnum.ACCIDENTS_TYPE_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/accidents-type">
                          <SidebarVector />
                          <span>{{ $t('accidents_types') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>

                    <PermissionBuilder :code="[
                      PermissionsEnum.FACTORY_ITEM_ALL,
                      PermissionsEnum.FACTORY_ITEM_CREATE,
                      PermissionsEnum.FACTORY_ITEM_DELETE,
                      PermissionsEnum.FACTORY_ITEM_FETCH,
                      PermissionsEnum.FACTORY_ITEM_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/factories-items">
                          <SidebarVector />
                          <span>{{ $t('factor_items') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>

                    <PermissionBuilder :code="[
                      PermissionsEnum.FACTORY_ALL,
                      PermissionsEnum.FACTORY_CREATE,
                      PermissionsEnum.FACTORY_DELETE,
                      PermissionsEnum.FACTORY_FETCH,
                      PermissionsEnum.FACTORY_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/factory">
                          <SidebarVector />
                          <span>{{ $t('factors') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>

                    <PermissionBuilder :code="[
                      PermissionsEnum.TEMPLATE_ALL,
                      PermissionsEnum.TEMPLATE_CREATE,
                      PermissionsEnum.TEMPLATE_DELETE,
                      PermissionsEnum.TEMPLATE_FETCH,
                      PermissionsEnum.TEMPLATE_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/template">
                          <SidebarVector />
                          <span>{{ $t('Templates') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                    <!-- <PermissionBuilder :code="[
                      PermissionsEnum.TEMPLATE_ITEM_ALL,
                      PermissionsEnum.TEMPLATE_ITEM_CREATE,
                      PermissionsEnum.TEMPLATE_ITEM_DELETE,
                      PermissionsEnum.TEMPLATE_ITEM_FETCH,
                      PermissionsEnum.TEMPLATE_ITEM_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/template-item">
                          <SidebarVector />
                          <span>{{ $t('Template_Item') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder> -->

                    <!-- <PermissionBuilder
                      :code="[
                        PermissionsEnum.CERTIFICATE_ALL,
                        PermissionsEnum.CERTIFICATE_CREATE,
                        PermissionsEnum.CERTIFICATE_DELETE,
                        PermissionsEnum.CERTIFICATE_FETCH,
                        PermissionsEnum.CERTIFICATE_UPDATE,
                      ]"
                    >
                      <li>
                        <router-link to="/admin/certificate">
                          <SidebarVector />
                          <span>{{ $t('Certificates') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder> -->

                    <PermissionBuilder :code="[
                      PermissionsEnum.PROJECT_TYPE_ALL,
                      PermissionsEnum.PROJECT_TYPE_CREATE,
                      PermissionsEnum.PROJECT_TYPE_DELETE,
                      PermissionsEnum.PROJECT_TYPE_FETCH,
                      PermissionsEnum.PROJECT_TYPE_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/project-types">
                          <SidebarVector />
                          <span>{{ $t('Project Types') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>

                    <PermissionBuilder :code="[
                      PermissionsEnum.ORGANIZATION_ALL,
                      PermissionsEnum.ORGANIZATION_CREATE,
                      PermissionsEnum.ORGANIZATION_DELETE,
                      PermissionsEnum.ORGANIZATION_FETCH,
                      PermissionsEnum.ORGANIZATION_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/organization">
                          <SidebarVector />
                          <span>{{ $t('Organization') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                    <PermissionBuilder :code="[
                      PermissionsEnum.ROLE_ALL,
                      PermissionsEnum.ROLE_CREATE,
                      PermissionsEnum.ROLE_DELETE,
                      PermissionsEnum.ROLE_FETCH,
                      PermissionsEnum.ROLE_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/role">
                          <SidebarVector />
                          <span>{{ $t('roles') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                  </ul>
                </AccordionContent>
              </AccordionPanel>
            </Accordion>
          </PermissionBuilder>
          <PermissionBuilder :code="[PermissionsEnum?.LOCATION_ALL]">
            <Accordion value="1">
              <AccordionPanel value="1">
                <AccordionHeader>
                  <div class="links-header">
                    <IconSetting />
                    {{ $t('location') }}
                  </div>
                </AccordionHeader>
                <AccordionContent>
                  <ul>
                    <PermissionBuilder :code="[
                      PermissionsEnum?.ADMIN,
                      PermissionsEnum?.LOCATION_ALL,
                      PermissionsEnum.LOCATION_CREATE,
                      PermissionsEnum.LOCATION_UPDATE,
                      PermissionsEnum.LOCATION_DETAILS,
                      PermissionsEnum.LOCATION_DELETE,
                      PermissionsEnum.LOCATION_FETCH,
                    ]">
                      <li>
                        <router-link to="/admin/countries">
                          <SidebarVector />
                          <span>{{ $t('country') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                    <PermissionBuilder :code="[
                      PermissionsEnum?.ADMIN,
                      PermissionsEnum.LOCATION_ALL,
                      PermissionsEnum.LOCATION_CREATE,
                      PermissionsEnum.LOCATION_DELETE,
                      PermissionsEnum.LOCATION_FETCH,
                      PermissionsEnum.LOCATION_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/states">
                          <SidebarVector />
                          <span>{{ $t('state') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                    <PermissionBuilder :code="[
                      PermissionsEnum?.ADMIN,
                      PermissionsEnum.LOCATION_ALL,
                      PermissionsEnum.LOCATION_CREATE,
                      PermissionsEnum.LOCATION_DELETE,
                      PermissionsEnum.LOCATION_FETCH,
                      PermissionsEnum.LOCATION_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/cities">
                          <SidebarVector />
                          <span>{{ $t('city') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                    <PermissionBuilder :code="[
                      PermissionsEnum?.ADMIN,
                      PermissionsEnum.LOCATION_ALL,
                      PermissionsEnum.LOCATION_CREATE,
                      PermissionsEnum.LOCATION_DELETE,
                      PermissionsEnum.LOCATION_FETCH,
                      PermissionsEnum.LOCATION_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/areas">
                          <SidebarVector />
                          <span>{{ $t('locations') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                  </ul>
                </AccordionContent>
              </AccordionPanel>
            </Accordion>
          </PermissionBuilder>

          <PermissionBuilder :code="[
            PermissionsEnum?.WEBSITE,
            PermissionsEnum?.CLIENT_OPINION_ALL,
            PermissionsEnum?.HOME_CONTACT_US_ALL,
            PermissionsEnum?.CATEGORY_ALL,
            PermissionsEnum?.SERVICE_ALL,
            PermissionsEnum?.HASHTAG_ALL,
            PermissionsEnum?.TERM_ALL,
            PermissionsEnum?.HEADER_ALL,
            PermissionsEnum?.SERVICE_FEATURE_ALL,
            PermissionsEnum?.SERVICE_SECTION_ALL,
            PermissionsEnum?.POWERFUL_FEATURE_ALL,
            PermissionsEnum?.SYSTEM_WORK_ALL,
            PermissionsEnum?.PRIVACY_ALL,
            PermissionsEnum?.HOME_VIEW_PRICING_ALL,
            PermissionsEnum?.SERVICE_LOG_ALL,
            PermissionsEnum?.BLOG_ALL,
            PermissionsEnum?.HOME_ABOUT_US_ALL,
            PermissionsEnum?.ABOUT_US_FEATURE_ALL,
            PermissionsEnum?.ABOUT_US_CORE_ALL,
            PermissionsEnum?.FAQ_ALL,
            PermissionsEnum?.OUR_SYSTEM_RISK_MANAGEMENT_ALL,
            PermissionsEnum?.OUR_SYSTEM_STEP_ALL,
            PermissionsEnum?.OUR_SYSTEM_FEATURE_ALL,
            PermissionsEnum?.OUR_SYSTEM_RISK_TYPE_ALL,
            PermissionsEnum?.OUR_SYSTEM_COMPONENT_ALL,
          ]">
            <Accordion value="2">
              <AccordionPanel value="2">
                <AccordionHeader>
                  <div class="links-header">
                    <IconSetting />
                    {{ $t('website') }}
                  </div>
                </AccordionHeader>

                <AccordionContent>
                  <ul>
                    <PermissionBuilder :code="[
                      PermissionsEnum?.WEBSITE,
                      PermissionsEnum?.CLIENT_OPINION_ALL,
                      PermissionsEnum.CLIENT_OPINION_CREATE,
                      PermissionsEnum.CLIENT_OPINION_UPDATE,
                      PermissionsEnum.CLIENT_OPINION_DETAILS,
                      PermissionsEnum.CLIENT_OPINION_DELETE,
                      PermissionsEnum.CLIENT_OPINION_FETCH,
                    ]">
                      <li>
                        <router-link to="/admin/client-opinions">
                          <SidebarVector />
                          <span>{{ $t('client_opinion') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                    <PermissionBuilder :code="[
                      PermissionsEnum?.WEBSITE,
                      PermissionsEnum?.HOME_CONTACT_US_ALL,
                      PermissionsEnum.HOME_CONTACT_US_CREATE,
                      PermissionsEnum.HOME_CONTACT_US_UPDATE,
                      PermissionsEnum.HOME_CONTACT_US_DETAILS,
                      PermissionsEnum.HOME_CONTACT_US_DELETE,
                      PermissionsEnum.HOME_CONTACT_US_FETCH,
                    ]">
                      <li>
                        <router-link to="/admin/home-contact-us">
                          <SidebarVector />
                          <span>{{ $t('home_contact_us') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>

                    <PermissionBuilder :code="[
                      PermissionsEnum.CATEGORY_ALL,
                      PermissionsEnum.CATEGORY_CREATE,
                      PermissionsEnum.CATEGORY_DELETE,
                      PermissionsEnum.CATEGORY_FETCH,
                      PermissionsEnum.CATEGORY_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/categories">
                          <SidebarVector />
                          <span>{{ $t('categories') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                    <PermissionBuilder :code="[
                      PermissionsEnum.SERVICE_ALL,
                      PermissionsEnum.SERVICE_CREATE,
                      PermissionsEnum.SERVICE_DELETE,
                      PermissionsEnum.SERVICE_FETCH,
                      PermissionsEnum.SERVICE_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/services">
                          <SidebarVector />
                          <span>{{ $t('services') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                    <PermissionBuilder :code="[
                      PermissionsEnum.HASHTAG_ALL,
                      PermissionsEnum.HASHTAG_CREATE,
                      PermissionsEnum.HASHTAG_DELETE,
                      PermissionsEnum.HASHTAG_FETCH,
                      PermissionsEnum.HASHTAG_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/hashtags">
                          <SidebarVector />
                          <span>{{ $t('hashtags') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                    <!-- Term -->
                    <PermissionBuilder :code="[
                      PermissionsEnum.TERM_ALL,
                      PermissionsEnum.TERM_CREATE_OR_UPDATE,
                      PermissionsEnum.TERM_FETCH,
                    ]">
                      <li>
                        <router-link to="/admin/term/add">
                          <SidebarVector />
                          <span>{{ $t('terms') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                    <PermissionBuilder :code="[
                      PermissionsEnum.HEADER_ALL,
                      PermissionsEnum.HEADER_CREATE,
                      PermissionsEnum.HEADER_DELETE,
                      PermissionsEnum.HEADER_FETCH,
                      PermissionsEnum.HEADER_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/headers">
                          <SidebarVector />
                          <span>{{ $t('headers') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>

                    <PermissionBuilder :code="[
                      PermissionsEnum.SERVICE_FEATURE_ALL,
                      PermissionsEnum.SERVICE_FEATURE_CREATE,
                      PermissionsEnum.SERVICE_FEATURE_DELETE,
                      PermissionsEnum.SERVICE_FEATURE_FETCH,
                      PermissionsEnum.SERVICE_FEATURE_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/service-features">
                          <SidebarVector />
                          <span>{{ $t('service_features') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                    <PermissionBuilder :code="[
                      PermissionsEnum.SERVICE_SECTION_ALL,
                      PermissionsEnum.SERVICE_SECTION_CREATE,
                      PermissionsEnum.SERVICE_SECTION_DELETE,
                      PermissionsEnum.SERVICE_SECTION_FETCH,
                      PermissionsEnum.SERVICE_SECTION_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/service_section">
                          <SidebarVector />
                          <span>{{ $t('service_section') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>

                    <PermissionBuilder :code="[
                      PermissionsEnum.POWERFUL_FEATURE_ALL,
                      PermissionsEnum.POWERFUL_FEATURE_CREATE,
                      PermissionsEnum.POWERFUL_FEATURE_DELETE,
                      PermissionsEnum.POWERFUL_FEATURE_FETCH,
                      PermissionsEnum.POWERFUL_FEATURE_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/powerfull-features">
                          <SidebarVector />
                          <span>{{ $t('powerful_features') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>

                    <PermissionBuilder :code="[
                      PermissionsEnum.SYSTEM_WORK_ALL,
                      PermissionsEnum.SYSTEM_WORK_CREATE,
                      PermissionsEnum.SYSTEM_WORK_DELETE,
                      PermissionsEnum.SYSTEM_WORK_FETCH,
                      PermissionsEnum.SYSTEM_WORK_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/system-works">
                          <SidebarVector />
                          <span>{{ $t('system_works') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>

                    <!-- Privacy -->
                    <PermissionBuilder :code="[
                      PermissionsEnum.PRIVACY_ALL,
                      PermissionsEnum.PRIVACY_CREATE_OR_UPDATE,
                      PermissionsEnum.PRIVACY_FETCH,
                    ]">
                      <li>
                        <router-link to="/admin/privacy/add">
                          <SidebarVector />
                          <span>{{ $t('privacy') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                    <PermissionBuilder :code="[
                      PermissionsEnum.HOME_VIEW_PRICING_ALL,
                      PermissionsEnum.HOME_VIEW_PRICING_CREATE,
                      PermissionsEnum.HOME_VIEW_PRICING_DELETE,
                      PermissionsEnum.HOME_VIEW_PRICING_FETCH,
                      PermissionsEnum.HOME_VIEW_PRICING_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/home-view-pricing">
                          <SidebarVector />
                          <span>{{ $t('homeViewPricing') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                    <PermissionBuilder :code="[
                      PermissionsEnum.SERVICE_LOG_ALL,
                      PermissionsEnum.SERVICE_LOG_CREATE,
                      PermissionsEnum.SERVICE_LOG_DELETE,
                      PermissionsEnum.SERVICE_LOG_FETCH,
                      PermissionsEnum.SERVICE_LOG_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/service_logs">
                          <SidebarVector />
                          <span>{{ $t('service_logs') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>

                    <!-- Blog -->
                    <PermissionBuilder :code="[
                      PermissionsEnum.BLOG_ALL,
                      PermissionsEnum.BLOG_CREATE,
                      PermissionsEnum.BLOG_DELETE,
                      PermissionsEnum.BLOG_FETCH,
                      PermissionsEnum.BLOG_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/blog">
                          <SidebarVector />
                          <span>{{ $t('blogs') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                    <PermissionBuilder :code="[
                      PermissionsEnum.HOME_ABOUT_US_ALL,
                      PermissionsEnum.HOME_ABOUT_US_CREATE,
                      PermissionsEnum.HOME_ABOUT_US_DELETE,
                      PermissionsEnum.HOME_ABOUT_US_FETCH,
                      PermissionsEnum.HOME_ABOUT_US_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/home-about-us">
                          <SidebarVector />
                          <span>{{ $t('home_about_us') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                    <PermissionBuilder :code="[
                      PermissionsEnum.ABOUT_US_FEATURE_ALL,
                      PermissionsEnum.ABOUT_US_FEATURE_CREATE,
                      PermissionsEnum.ABOUT_US_FEATURE_DELETE,
                      PermissionsEnum.ABOUT_US_FEATURE_FETCH,
                      PermissionsEnum.ABOUT_US_FEATURE_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/about-us-features">
                          <SidebarVector />
                          <span>{{ $t('about_us_features') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>

                    <PermissionBuilder :code="[
                      PermissionsEnum.ABOUT_US_CORE_ALL,
                      PermissionsEnum.ABOUT_US_CORE_CREATE,
                      PermissionsEnum.ABOUT_US_CORE_DELETE,
                      PermissionsEnum.ABOUT_US_CORE_FETCH,
                      PermissionsEnum.ABOUT_US_CORE_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/about-us-core">
                          <SidebarVector />
                          <span>{{ $t('about_us_core') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>

                    <!-- Faq -->
                    <PermissionBuilder :code="[
                      PermissionsEnum.FAQ_ALL,
                      PermissionsEnum.FAQ_CREATE,
                      PermissionsEnum.FAQ_DELETE,
                      PermissionsEnum.FAQ_FETCH,
                      PermissionsEnum.FAQ_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/faq">
                          <SidebarVector />
                          <span>{{ $t('faqs') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>

                    <!-- system risk management -->
                    <PermissionBuilder :code="[
                      PermissionsEnum.OUR_SYSTEM_RISK_MANAGEMENT_ALL,
                      PermissionsEnum.OUR_SYSTEM_RISK_MANAGEMENT_CREATE,
                      PermissionsEnum.OUR_SYSTEM_RISK_MANAGEMENT_DELETE,
                      PermissionsEnum.OUR_SYSTEM_RISK_MANAGEMENT_FETCH,
                      PermissionsEnum.OUR_SYSTEM_RISK_MANAGEMENT_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/system-risk-management">
                          <SidebarVector />
                          <span>{{ $t('systemRiskManagement') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                  </ul>
                  <!-- OUR SYSTEM STEP -->
                  <ul>
                    <PermissionBuilder :code="[
                      PermissionsEnum.OUR_SYSTEM_STEP_ALL,
                      PermissionsEnum.OUR_SYSTEM_STEP_CREATE,
                      PermissionsEnum.OUR_SYSTEM_STEP_DELETE,
                      PermissionsEnum.OUR_SYSTEM_STEP_FETCH,
                      PermissionsEnum.OUR_SYSTEM_STEP_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/our-system-step">
                          <SidebarVector />
                          <span>{{ $t('ourSystemStep') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                    <PermissionBuilder :code="[
                      PermissionsEnum.OUR_SYSTEM_BANNER_ALL,
                      PermissionsEnum.OUR_SYSTEM_BANNER_CREATE,
                      PermissionsEnum.OUR_SYSTEM_BANNER_DELETE,
                      PermissionsEnum.OUR_SYSTEM_BANNER_FETCH,
                      PermissionsEnum.OUR_SYSTEM_BANNER_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/system_banner">
                          <SidebarVector />
                          <span>{{ $t('systemBanner') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                    <PermissionBuilder :code="[
                      PermissionsEnum.OUR_SYSTEM_FEATURE_ALL,
                      PermissionsEnum.OUR_SYSTEM_FEATURE_CREATE,
                      PermissionsEnum.OUR_SYSTEM_FEATURE_DELETE,
                      PermissionsEnum.OUR_SYSTEM_FEATURE_FETCH,
                      PermissionsEnum.OUR_SYSTEM_FEATURE_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/system_feature">
                          <SidebarVector />
                          <span>{{ $t('systemFeature') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                    <PermissionBuilder :code="[
                      PermissionsEnum.OUR_SYSTEM_RISK_TYPE_ALL,
                      PermissionsEnum.OUR_SYSTEM_RISK_TYPE_CREATE,
                      PermissionsEnum.OUR_SYSTEM_RISK_TYPE_DELETE,
                      PermissionsEnum.OUR_SYSTEM_RISK_TYPE_FETCH,
                      PermissionsEnum.OUR_SYSTEM_RISK_TYPE_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/system_risk_type">
                          <SidebarVector />
                          <span>{{ $t('systemRiskType') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                    <PermissionBuilder :code="[
                      PermissionsEnum.OUR_SYSTEM_COMPONENT_ALL,
                      PermissionsEnum.OUR_SYSTEM_COMPONENT_CREATE,
                      PermissionsEnum.OUR_SYSTEM_COMPONENT_DELETE,
                      PermissionsEnum.OUR_SYSTEM_COMPONENT_FETCH,
                      PermissionsEnum.OUR_SYSTEM_COMPONENT_UPDATE,
                    ]">
                      <li>
                        <router-link to="/admin/system_components">
                          <SidebarVector />
                          <span>{{ $t('systemComponents') }}</span>
                        </router-link>
                      </li>
                    </PermissionBuilder>
                  </ul>
                </AccordionContent>
              </AccordionPanel>
            </Accordion>
          </PermissionBuilder>
        </template>
        <template v-if="user?.user?.type === OrganizationTypeEnum?.ORGANIZATION">
          <Accordion value="">
            <AccordionPanel value="">
              <AccordionHeader>
                <div class="links-header">
                  <IconSetting />
                  {{ $t('Organization') }}
                </div>
              </AccordionHeader>

              <AccordionContent>
                <ul>
                  <!-- accidents-types -->
                  <PermissionBuilder :code="[
                    PermissionsEnum?.WEBSITE,
                    PermissionsEnum?.ORG_ACCIDENTS_TYPE_ALL,
                    PermissionsEnum?.ORG_ACCIDENTS_TYPE_CREATE,
                    PermissionsEnum?.ORG_ACCIDENTS_TYPE_UPDATE,
                    PermissionsEnum?.ORG_ACCIDENTS_TYPE_DETAILS,
                    PermissionsEnum?.ORG_ACCIDENTS_TYPE_DELETE,
                    PermissionsEnum?.ORG_ACCIDENTS_TYPE_FETCH,
                  ]">
                    <li>
                      <router-link to="/organization/accidents-type">
                        <SidebarVector />
                        <span>{{ $t('Accidents Types') }}</span>
                      </router-link>
                    </li>
                  </PermissionBuilder>
                  <!--
                  <PermissionBuilder
                    :code="[
                      PermissionsEnum?.ORGANIZATION_EMPLOYEE,
                      PermissionsEnum?.ORG_INCEDANT_ALL,
                      PermissionsEnum?.ORG_INCEDANT_CREATE,
                      PermissionsEnum?.ORG_INCEDANT_UPDATE,
                      PermissionsEnum?.ORG_INCEDANT_DETAILS,
                      PermissionsEnum?.ORG_INCEDANT_DELETE,
                      PermissionsEnum?.ORG_INCEDANT_FETCH,
                    ]"
                  >
                    <li>
                      <router-link to="/organization/incedant">
                        <SidebarVector />
                        <span>{{ $t('incedant') }}</span>
                      </router-link>
                    </li>
                  </PermissionBuilder>

                  <PermissionBuilder
                    :code="[
                      PermissionsEnum?.ORGANIZATION_EMPLOYEE,
                      PermissionsEnum?.ORG_INSPECTION_ALL,
                      PermissionsEnum?.ORG_INSPECTION_CREATE,
                      PermissionsEnum?.ORG_INSPECTION_UPDATE,
                      PermissionsEnum?.ORG_INSPECTION_DETAILS,
                      PermissionsEnum?.ORG_INSPECTION_DELETE,
                      PermissionsEnum?.ORG_INSPECTION_FETCH,
                    ]"
                  >
                    <li>
                      <router-link to="/organization/equipment-mangement/inspection">
                        <SidebarVector />
                        <span>{{ $t('inspection') }}</span>
                      </router-link>
                    </li>
                  </PermissionBuilder>
-->
                  <!-- partners -->
                  <PermissionBuilder :code="[
                    PermissionsEnum?.WEBSITE,
                    PermissionsEnum.PARTNER_ALL,
                    PermissionsEnum.PARTNER_CREATE,
                    PermissionsEnum.PARTNER_UPDATE,
                    PermissionsEnum.PARTNER_DETAILS,
                    PermissionsEnum.PARTNER_DELETE,
                    PermissionsEnum.PARTNER_FETCH,
                  ]">
                    <li>
                      <router-link to="/organization/partner">
                        <SidebarVector />
                        <span>{{ $t('partners') }}</span>
                      </router-link>
                    </li>
                  </PermissionBuilder>
                  <!-- <PermissionBuilder :code="[
                    PermissionsEnum.OBJECTIVE_ORG_ALL,
                    PermissionsEnum.OBJECTIVE_ORG_CREATE,
                    PermissionsEnum.OBJECTIVE_ORG_UPDATE,
                    PermissionsEnum.OBJECTIVE_ORG_DETAILS,
                    PermissionsEnum.OBJECTIVE_ORG_DELETE,
                    PermissionsEnum.OBJECTIVE_ORG_FETCH,
                  ]">
                    <li>
                      <router-link to="/organization/objectives">
                        <SidebarVector />
                        <span>{{ $t('objectives') }}</span>
                      </router-link>
                    </li>
                  </PermissionBuilder>
                  <PermissionBuilder
                    :code="[
                      PermissionsEnum.ORG_LOCATION_ALL,
                      PermissionsEnum.ORG_LOCATION_CREATE,
                      PermissionsEnum.ORG_LOCATION_DELETE,
                      PermissionsEnum.ORG_LOCATION_FETCH,
                      PermissionsEnum.ORG_LOCATION_UPDATE,
                    ]"
                  >
                    <li>
                      <router-link to="/organization/organization-locations">
                        <SidebarVector />
                        <span>{{ $t('organization_locations') }}</span>
                      </router-link>
                    </li>
                  </PermissionBuilder>
                  -->
                  <!-- projects -->
                  <PermissionBuilder :code="[
                    PermissionsEnum.PROJECT_ALL,
                    PermissionsEnum.PROJECT_CREATE,
                    PermissionsEnum.PROJECT_DELETE,
                    PermissionsEnum.PROJECT_FETCH,
                    PermissionsEnum.PROJECT_UPDATE,
                  ]">
                    <li>
                      <router-link to="/organization/projects">
                        <SidebarVector />
                        <span>{{ $t('Projects') }}</span>
                      </router-link>
                    </li>
                  </PermissionBuilder>
                  <!-- certificates -->
                  <PermissionBuilder :code="[
                    PermissionsEnum.CERTIFICATE_ALL,
                    PermissionsEnum.CERTIFICATE_CREATE,
                    PermissionsEnum.CERTIFICATE_DELETE,
                    PermissionsEnum.CERTIFICATE_FETCH,
                    PermissionsEnum.CERTIFICATE_UPDATE,
                  ]">
                    <li>
                      <router-link to="/organization/certificate">
                        <SidebarVector />
                        <span>{{ $t('certificates') }}</span>
                      </router-link>
                    </li>
                  </PermissionBuilder>
                  <!-- eQuipment Types -->
                  <PermissionBuilder :code="[
                    PermissionsEnum.ORG_EQUIPMENT_TYPE_ALL,
                    PermissionsEnum.ORG_EQUIPMENT_TYPE_CREATE,
                    PermissionsEnum.ORG_EQUIPMENT_TYPE_DELETE,
                    PermissionsEnum.ORG_EQUIPMENT_TYPE_DETAILS,
                    PermissionsEnum.ORG_EQUIPMENT_TYPE_FETCH,
                    PermissionsEnum.ORG_EQUIPMENT_TYPE_UPDATE,
                  ]">
                    <li>
                      <router-link to="/organization/equipment-types">
                        <SidebarVector />
                        <span>{{ $t('Equipment Types') }}</span>
                      </router-link>
                    </li>
                  </PermissionBuilder>
                  <!-- equipments -->
                  <PermissionBuilder :code="[
                    PermissionsEnum.ORG_EQUIPMENT_ALL,
                    PermissionsEnum.ORG_EQUIPMENT_CREATE,
                    PermissionsEnum.ORG_EQUIPMENT_DELETE,
                    PermissionsEnum.ORG_EQUIPMENT_FETCH,
                    PermissionsEnum.ORG_EQUIPMENT_UPDATE,
                  ]">
                    <li>
                      <router-link to="/organization/equipments">
                        <SidebarVector />
                        <span>{{ $t('Equipments') }}</span>
                      </router-link>
                    </li>
                  </PermissionBuilder>
                  <!-- factories -->
                  <PermissionBuilder :code="[
                    PermissionsEnum.ORG_FACTORY_ALL,
                    PermissionsEnum.ORG_FACTORY_CREATE,
                    PermissionsEnum.ORG_FACTORY_DELETE,
                    PermissionsEnum.ORG_FACTORY_FETCH,
                    PermissionsEnum.ORG_FACTORY_UPDATE,
                  ]">
                    <li>
                      <router-link to="/organization/factory">
                        <SidebarVector />
                        <span>{{ $t('factors') }}</span>
                      </router-link>
                    </li>
                  </PermissionBuilder>
                  <!-- factories-items -->
                  <PermissionBuilder :code="[
                    PermissionsEnum.ORG_FACTORY_ITEM_ALL,
                    PermissionsEnum.ORG_FACTORY_ITEM_CREATE,
                    PermissionsEnum.ORG_FACTORY_ITEM_DELETE,
                    PermissionsEnum.ORG_FACTORY_ITEM_FETCH,
                    PermissionsEnum.ORG_FACTORY_ITEM_UPDATE,
                  ]">
                    <li>
                      <router-link to="/organization/factories-items">
                        <SidebarVector />
                        <span>{{ $t('factor_item') }}</span>
                      </router-link>
                    </li>
                  </PermissionBuilder>
                  <!-- hazard-types -->
                  <PermissionBuilder :code="[
                    PermissionsEnum.ORG_HAZARD_TYPE_ALL,
                    PermissionsEnum.ORG_HAZARD_TYPE_CREATE,
                    PermissionsEnum.ORG_HAZARD_TYPE_DELETE,
                    PermissionsEnum.ORG_HAZARD_TYPE_FETCH,
                    PermissionsEnum.ORG_HAZARD_TYPE_UPDATE,
                  ]">
                    <li>
                      <router-link to="/organization/hazard-type">
                        <SidebarVector />
                        <span>{{ $t('Hazard Types') }}</span>
                      </router-link>
                    </li>
                  </PermissionBuilder>

                  <!-- Investigating -->

                  <PermissionBuilder :code="[
                    // PermissionsEnum.ORG_INVESTIGATING_ALL,
                    // PermissionsEnum.ORG_INVESTIGATING_CREATE,
                    // PermissionsEnum.ORG_INVESTIGATING_DELETE,
                    // PermissionsEnum.ORG_INVESTIGATING_FETCH,
                    // PermissionsEnum.ORG_INVESTIGATING_UPDATE,
                  ]">
                    <!-- <PermissionBuilder
                    :code="[
                      PermissionsEnum.ORG_INVESTIGATING_ALL,
                      PermissionsEnum.ORG_INVESTIGATING_CREATE,
                      PermissionsEnum.ORG_INVESTIGATING_DELETE,
                      PermissionsEnum.ORG_INVESTIGATING_FETCH,
                      PermissionsEnum.ORG_INVESTIGATING_UPDATE,
                    ]"
                  >
                    <li>
                      <router-link to="/organization/investigating">
                        <SidebarVector />
                        <span>{{ $t('Investigating') }}</span>
                      </router-link>
                    </li> -->
                  </PermissionBuilder>

                  <PermissionBuilder :code="[
                    PermissionsEnum.ORG_OBSERVATION_TYPE_ALL,
                    PermissionsEnum.ORG_OBSERVATION_TYPE_CREATE,
                    PermissionsEnum.ORG_OBSERVATION_TYPE_DELETE,
                    PermissionsEnum.ORG_OBSERVATION_TYPE_FETCH,
                    PermissionsEnum.ORG_OBSERVATION_TYPE_UPDATE,
                    PermissionsEnum.ORGANIZATION_EMPLOYEE,
                  ]">
                    <li>
                      <router-link to="/organization/observation-type">
                        <SidebarVector />
                        <span>{{ $t('observation_types') }}</span>
                      </router-link>
                    </li>
                  </PermissionBuilder>

                  <!-- healthconditions -->
                  <PermissionBuilder :code="[
                    PermissionsEnum.ORG_HEALTH_CONDITION_ALL,
                    PermissionsEnum.ORG_HEALTH_CONDITION_CREATE,
                    PermissionsEnum.ORG_HEALTH_CONDITION_DELETE,
                    PermissionsEnum.ORG_HEALTH_CONDITION_FETCH,
                    PermissionsEnum.ORG_HEALTH_CONDITION_UPDATE,
                  ]">
                    <li>
                      <router-link to="/organization/health-conditions">
                        <SidebarVector />
                        <span>{{ $t('health_conditions') }}</span>
                      </router-link>
                    </li>
                  </PermissionBuilder>

                  <!-- Observation -->

                  <PermissionBuilder :code="[
                    PermissionsEnum.ORG_OBSERVATION_ALL,
                    PermissionsEnum.ORG_OBSERVATION_CREATE,
                    PermissionsEnum.ORG_OBSERVATION_DELETE,
                    PermissionsEnum.ORG_OBSERVATION_FETCH,
                    PermissionsEnum.ORG_OBSERVATION_UPDATE,
                  ]">
                    <!-- <PermissionBuilder
                    :code="[
                      PermissionsEnum.ORG_OBSERVATION_ALL,
                      PermissionsEnum.ORG_OBSERVATION_CREATE,
                      PermissionsEnum.ORG_OBSERVATION_DELETE,
                      PermissionsEnum.ORG_OBSERVATION_FETCH,
                      PermissionsEnum.ORG_OBSERVATION_UPDATE,
                    ]"
                    <li>
                      <router-link to="/organization/equipment-mangement/observation">
                        <SidebarVector />
                        <span>{{ $t('Observation') }}</span>
                      </router-link>
                    </li>-->
                  </PermissionBuilder>

                  <!-- templates -->
                  <PermissionBuilder :code="[
                    PermissionsEnum.ORG_TEMPLATE_ALL,
                    PermissionsEnum.ORG_TEMPLATE_CREATE,
                    PermissionsEnum.ORG_TEMPLATE_DELETE,
                    PermissionsEnum.ORG_TEMPLATE_FETCH,
                    PermissionsEnum.ORG_TEMPLATE_UPDATE,
                  ]">
                    <li>
                      <router-link to="/organization/template">
                        <SidebarVector />
                        <span>{{ $t('Templates') }}</span>
                      </router-link>
                    </li>
                  </PermissionBuilder>
                  <!-- Organization Employee -->
                  <PermissionBuilder :code="[
                    PermissionsEnum.ORG_EMPLOYEE_ALL,
                    PermissionsEnum.ORG_EMPLOYEE_CREATE,
                    PermissionsEnum.ORG_EMPLOYEE_DELETE,
                    PermissionsEnum.ORG_EMPLOYEE_FETCH,
                    PermissionsEnum.ORG_EMPLOYEE_UPDATE,
                    PermissionsEnum.ORG_EMPLOYEE_DETAILS,
                  ]">
                    <li>
                      <router-link to="/organization/organization-employee">
                        <SidebarVector />
                        <span>{{ $t('employees') }}</span>
                      </router-link>
                    </li>
                  </PermissionBuilder>
                  <!-- herikaly -->
                  <PermissionBuilder :code="[
                    PermissionsEnum.HERIKALY_ALL,
                    PermissionsEnum.HERIKALY_CREATE,
                    PermissionsEnum.HERIKALY_DELETE,
                    PermissionsEnum.HERIKALY_FETCH,
                    PermissionsEnum.HERIKALY_UPDATE,
                  ]">
                    <li>
                      <router-link to="/organization/herikaly">
                        <SidebarVector />
                        <span>{{ $t('hierarchy') }}</span>
                      </router-link>
                    </li>
                  </PermissionBuilder>
                  <!-- project-zone -->
                  <!-- <PermissionBuilder
                    :code="[
                      PermissionsEnum.PROJECT_ZONE_ALL,
                      PermissionsEnum.PROJECT_ZONE_CREATE,
                      PermissionsEnum.PROJECT_ZONE_DELETE,
                      PermissionsEnum.PROJECT_ZONE_FETCH,
                      PermissionsEnum.PROJECT_ZONE_UPDATE,
                    ]"
                  >
                    <li>
                      <router-link to="/organization/project-zone">
                        <SidebarVector />
                        <span>{{ $t('Zones') }}</span>
                      </router-link>
                    </li>
                  </PermissionBuilder> -->
                  <PermissionBuilder :code="[
                    PermissionsEnum.ORG_METHOD_ALL,
                    PermissionsEnum.ORG_METHOD_CREATE,
                    PermissionsEnum.ORG_METHOD_DELETE,
                    PermissionsEnum.ORG_METHOD_FETCH,
                    PermissionsEnum.ORG_METHOD_UPDATE,
                  ]">
                    <li>
                      <router-link to="/organization/methods">
                        <SidebarVector />
                        <span>{{ $t('methods') }}</span>
                      </router-link>
                    </li>
                  </PermissionBuilder>

                  <PermissionBuilder :code="[
                    PermissionsEnum.ORG_TEAM_ALL,
                    PermissionsEnum.ORG_TEAM_CREATE,
                    PermissionsEnum.ORG_TEAM_DELETE,
                    PermissionsEnum.ORG_TEAM_FETCH,
                    PermissionsEnum.ORG_TEAM_UPDATE,
                  ]">
                    <li>
                      <router-link to="/organization/team">
                        <SidebarVector />
                        <span>{{ $t('team') }}</span>
                      </router-link>
                    </li>
                  </PermissionBuilder>

                  <!-- Contractor -->
                  <PermissionBuilder :code="[
                    PermissionsEnum.ORG_CONTRACTOR_ALL,
                    PermissionsEnum.ORG_CONTRACTOR_CREATE,
                    PermissionsEnum.ORG_CONTRACTOR_DELETE,
                    PermissionsEnum.ORG_CONTRACTOR_FETCH,
                    PermissionsEnum.ORG_CONTRACTOR_UPDATE,
                  ]">
                    <li>
                      <router-link to="/organization/contractor">
                        <SidebarVector />
                        <span>{{ $t('contractors') }}</span>
                      </router-link>
                    </li>
                  </PermissionBuilder>
                  <!-- ALL -->
                  <PermissionBuilder :code="[
                    PermissionsEnum.ORG_EQUIPMENT_MANGEMENT_ALL,
                    PermissionsEnum.ORG_EQUIPMENT_MANGEMENT_CREATE,
                    PermissionsEnum.ORG_EQUIPMENT_MANGEMENT_DELETE,
                    PermissionsEnum.ORG_EQUIPMENT_MANGEMENT_FETCH,
                    PermissionsEnum.ORG_EQUIPMENT_MANGEMENT_UPDATE,
                  ]">
                    <li>
                      <router-link to="/organization/equipment-mangement/all-observatin">
                        <SidebarVector />
                        <span>{{ $t('management') }}</span>
                      </router-link>
                    </li>
                  </PermissionBuilder>

                  <PermissionBuilder :code="[
                    PermissionsEnum.ORG_ROLE_ALL,
                    PermissionsEnum.ORG_ROLE_CREATE,
                    PermissionsEnum.ORG_ROLE_DELETE,
                    PermissionsEnum.ORG_ROLE_FETCH,
                    PermissionsEnum.ORG_ROLE_UPDATE,
                  ]">
                    <li>
                      <router-link to="/organization/role">
                        <SidebarVector />
                        <span>{{ $t('roles') }}</span>
                      </router-link>
                    </li>
                  </PermissionBuilder>
                  <!-- Equipment Mangment -->
                  <!-- <PermissionBuilder :code="[
                    PermissionsEnum.ORG_EQUIPMENT_MANGEMENT_ALL,
                    PermissionsEnum.ORG_EQUIPMENT_MANGEMENT_CREATE,
                    PermissionsEnum.ORG_EQUIPMENT_MANGEMENT_DELETE,
                    PermissionsEnum.ORG_EQUIPMENT_MANGEMENT_FETCH,
                    PermissionsEnum.ORG_EQUIPMENT_MANGEMENT_UPDATE,
                  ]">
                    <li>
                      <router-link to="/organization/equipment-mangement/observation">
                        <SidebarVector />
                        <span>{{ $t('equipment_management') }}</span>
                      </router-link>
                    </li>
                  </PermissionBuilder> -->

                  <PermissionBuilder :code="[PermissionsEnum?.LOCATION_ORG_ALL]">
                    <Accordion value="1">
                      <AccordionPanel value="1">
                        <AccordionHeader>
                          <div class="links-header">
                            <IconSetting />
                            {{ $t('location') }}
                          </div>
                        </AccordionHeader>
                        <AccordionContent>
                          <ul>
                            <PermissionBuilder :code="[
                              PermissionsEnum?.ORGANIZATION_EMPLOYEE,
                              PermissionsEnum?.LOCATION_ORG_ALL,
                              PermissionsEnum.LOCATION_ORG_CREATE,
                              PermissionsEnum.LOCATION_ORG_UPDATE,
                              PermissionsEnum.LOCATION_ORG_DETAILS,
                              PermissionsEnum.LOCATION_ORG_DELETE,
                              PermissionsEnum.LOCATION_ORG_FETCH,
                            ]">
                              <li>
                                <router-link to="/organization/countries">
                                  <SidebarVector />
                                  <span>{{ $t('country') }}</span>
                                </router-link>
                              </li>
                            </PermissionBuilder>
                            <PermissionBuilder :code="[
                              PermissionsEnum?.ORGANIZATION_EMPLOYEE,
                              PermissionsEnum.LOCATION_ORG_ALL,
                              PermissionsEnum.LOCATION_ORG_CREATE,
                              PermissionsEnum.LOCATION_ORG_DELETE,
                              PermissionsEnum.LOCATION_ORG_FETCH,
                              PermissionsEnum.LOCATION_ORG_UPDATE,
                            ]">
                              <li>
                                <router-link to="/organization/states">
                                  <SidebarVector />
                                  <span>{{ $t('state') }}</span>
                                </router-link>
                              </li>
                            </PermissionBuilder>
                            <PermissionBuilder :code="[
                              PermissionsEnum?.ORGANIZATION_EMPLOYEE,
                              PermissionsEnum.LOCATION_ORG_ALL,
                              PermissionsEnum.LOCATION_ORG_CREATE,
                              PermissionsEnum.LOCATION_ORG_DELETE,
                              PermissionsEnum.LOCATION_ORG_FETCH,
                              PermissionsEnum.LOCATION_ORG_UPDATE,
                            ]">
                              <li>
                                <router-link to="/organization/cities">
                                  <SidebarVector />
                                  <span>{{ $t('city') }}</span>
                                </router-link>
                              </li>
                            </PermissionBuilder>
                            <PermissionBuilder :code="[
                              PermissionsEnum?.ORGANIZATION_EMPLOYEE,
                              PermissionsEnum.LOCATION_ORG_ALL,
                              PermissionsEnum.LOCATION_ORG_CREATE,
                              PermissionsEnum.LOCATION_ORG_DELETE,
                              PermissionsEnum.LOCATION_ORG_FETCH,
                              PermissionsEnum.LOCATION_ORG_UPDATE,
                            ]">
                              <li>
                                <router-link to="/organization/areas">
                                  <SidebarVector />
                                  <span>{{ $t('location') }}</span>
                                </router-link>
                              </li>
                            </PermissionBuilder>
                            <PermissionBuilder :code="[
                              PermissionsEnum.PROJECT_ZONE_ALL,
                              PermissionsEnum.PROJECT_ZONE_CREATE,
                              PermissionsEnum.PROJECT_ZONE_DELETE,
                              PermissionsEnum.PROJECT_ZONE_FETCH,
                              PermissionsEnum.PROJECT_ZONE_UPDATE,
                            ]">
                              <li>
                                <router-link to="/organization/project-zone">
                                  <SidebarVector />
                                  <span>{{ $t('zones') }}</span>
                                </router-link>
                              </li>
                            </PermissionBuilder>
                          </ul>
                        </AccordionContent>
                      </AccordionPanel>
                    </Accordion>
                  </PermissionBuilder>
                </ul>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </template>
      </div>
    </div>
  </aside>
</template>

<style scoped></style>
