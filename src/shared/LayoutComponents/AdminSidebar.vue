<script setup lang="ts">
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import { ref, watch } from 'vue'
import PermissionBuilder from '@/components/DataStatus/PermissionBuilder.vue'
import { PermissionsEnum } from '@/features/users/Admin/Core/Enum/permission_enum'
import IconSetting from '@/shared/icons/IconSetting.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

interface Routes {
  link: string
  name: string
  permissions: PermissionsEnum[]
}

const SettingsRoutes = ref<Routes[]>([
  {
    link: '/admin/admins',
    name: 'admins',
    permissions: [
      PermissionsEnum?.ADMIN,
      PermissionsEnum?.ADMIN_ALL,
      PermissionsEnum.ADMIN_CREATE,
      PermissionsEnum.ADMIN_UPDATE,
      PermissionsEnum.ADMIN_DETAILS,
      PermissionsEnum.ADMIN_DELETE,
      PermissionsEnum.ADMIN_FETCH,
    ],
  },
  {
    link: '/admin/languages',
    name: 'languages',
    permissions: [
      PermissionsEnum?.ADMIN,
      PermissionsEnum?.LANGUAGE_ALL,
      PermissionsEnum.LANGUAGE_CREATE,
      PermissionsEnum.LANGUAGE_UPDATE,
      PermissionsEnum.LANGUAGE_DETAILS,
      PermissionsEnum.LANGUAGE_DELETE,
      PermissionsEnum.LANGUAGE_FETCH,
    ],
  },
  {
    link: '/admin/industry',
    name: 'industry',
    permissions: [
      PermissionsEnum?.ADMIN,
      PermissionsEnum.INDUSTRY_ALL,
      PermissionsEnum.INDUSTRY_CREATE,
      PermissionsEnum.INDUSTRY_DELETE,
      PermissionsEnum.INDUSTRY_FETCH,
      PermissionsEnum.INDUSTRY_UPDATE,
    ],
  },
  {
    link: '/admin/equipment-types',
    name: 'Equipment Types',
    permissions: [
      PermissionsEnum?.ADMIN,
      PermissionsEnum.EQUIPMENT_TYPE_ALL,
      PermissionsEnum.EQUIPMENT_TYPE_CREATE,
      PermissionsEnum.EQUIPMENT_TYPE_DELETE,
      PermissionsEnum.EQUIPMENT_TYPE_FETCH,
      PermissionsEnum.EQUIPMENT_TYPE_UPDATE,
    ],
  },
  {
    link: '/admin/equipments',
    name: 'Equipments',
    permissions: [
      PermissionsEnum?.ADMIN,
      PermissionsEnum.EQUIPMENT_ALL,
      PermissionsEnum.EQUIPMENT_CREATE,
      PermissionsEnum.EQUIPMENT_DELETE,
      PermissionsEnum.EQUIPMENT_FETCH,
      PermissionsEnum.EQUIPMENT_UPDATE,
    ],
  },
  {
    link: '/admin/hazard-type',
    name: 'Hazard Types',
    permissions: [
      PermissionsEnum.HAZARD_TYPE_ALL,
      PermissionsEnum.HAZARD_TYPE_CREATE,
      PermissionsEnum.HAZARD_TYPE_DELETE,
      PermissionsEnum.HAZARD_TYPE_FETCH,
      PermissionsEnum.HAZARD_TYPE_UPDATE,
    ],
  },
  {
    link: '/admin/observation-type',
    name: 'observation_types',
    permissions: [
      PermissionsEnum.OBSERVATION_TYPE_ALL,
      PermissionsEnum.OBSERVATION_TYPE_CREATE,
      PermissionsEnum.OBSERVATION_TYPE_DELETE,
      PermissionsEnum.OBSERVATION_TYPE_FETCH,
      PermissionsEnum.OBSERVATION_TYPE_UPDATE,
      PermissionsEnum.ADMIN,
    ],
  },
  // {
  //   link: '/admin/health-conditions',
  //   name: 'health_conditions',
  //   permissions: [
  //     PermissionsEnum.HEALTH_CONDITION_ALL,
  //     PermissionsEnum.HEALTH_CONDITION_CREATE,
  //     PermissionsEnum.HEALTH_CONDITION_DELETE,
  //     PermissionsEnum.HEALTH_CONDITION_FETCH,
  //     PermissionsEnum.HEALTH_CONDITION_UPDATE,
  //     PermissionsEnum.ADMIN,
  //   ],
  // },
  {
    link: '/admin/accidents-type',
    name: 'accidents_types',
    permissions: [
      PermissionsEnum.ACCIDENTS_TYPE_ALL,
      PermissionsEnum.ACCIDENTS_TYPE_CREATE,
      PermissionsEnum.ACCIDENTS_TYPE_DELETE,
      PermissionsEnum.ACCIDENTS_TYPE_FETCH,
      PermissionsEnum.ACCIDENTS_TYPE_UPDATE,
    ],
  },
  {
    link: '/admin/factories-items',
    name: 'factor_items',
    permissions: [
      PermissionsEnum.FACTORY_ITEM_ALL,
      PermissionsEnum.FACTORY_ITEM_CREATE,
      PermissionsEnum.FACTORY_ITEM_DELETE,
      PermissionsEnum.FACTORY_ITEM_FETCH,
      PermissionsEnum.FACTORY_ITEM_UPDATE,
    ],
  },
  {
    link: '/admin/factory',
    name: 'factors',
    permissions: [
      PermissionsEnum.FACTORY_ALL,
      PermissionsEnum.FACTORY_CREATE,
      PermissionsEnum.FACTORY_DELETE,
      PermissionsEnum.FACTORY_FETCH,
      PermissionsEnum.FACTORY_UPDATE,
    ],
  },
  {
    link: '/admin/template',
    name: 'Templates',
    permissions: [
      PermissionsEnum.TEMPLATE_ALL,
      PermissionsEnum.TEMPLATE_CREATE,
      PermissionsEnum.TEMPLATE_DELETE,
      PermissionsEnum.TEMPLATE_FETCH,
      PermissionsEnum.TEMPLATE_UPDATE,
    ],
  },
  {
    link: '/admin/project-types',
    name: 'Project Types',
    permissions: [
      PermissionsEnum.PROJECT_TYPE_ALL,
      PermissionsEnum.PROJECT_TYPE_CREATE,
      PermissionsEnum.PROJECT_TYPE_DELETE,
      PermissionsEnum.PROJECT_TYPE_FETCH,
      PermissionsEnum.PROJECT_TYPE_UPDATE,
    ],
  },
  {
    link: '/admin/organization',
    name: 'Organization',
    permissions: [
      PermissionsEnum.ORGANIZATION_ALL,
      PermissionsEnum.ORGANIZATION_CREATE,
      PermissionsEnum.ORGANIZATION_DELETE,
      PermissionsEnum.ORGANIZATION_FETCH,
      PermissionsEnum.ORGANIZATION_UPDATE,
    ],
  },
  {
    link: '/admin/role',
    name: 'roles',
    permissions: [
      PermissionsEnum.ROLE_ALL,
      PermissionsEnum.ROLE_CREATE,
      PermissionsEnum.ROLE_DELETE,
      PermissionsEnum.ROLE_FETCH,
      PermissionsEnum.ROLE_UPDATE,
    ],
  },
])

const LocationRoutes = ref<Routes[]>([
  {
    link: '/admin/countries',
    name: 'country',
    permissions: [
      PermissionsEnum?.ADMIN,
      PermissionsEnum?.LOCATION_ALL,
      PermissionsEnum.LOCATION_CREATE,
      PermissionsEnum.LOCATION_UPDATE,
      PermissionsEnum.LOCATION_DETAILS,
      PermissionsEnum.LOCATION_DELETE,
      PermissionsEnum.LOCATION_FETCH,
    ],
  },
  {
    link: '/admin/states',
    name: 'state',
    permissions: [
      PermissionsEnum?.ADMIN,
      PermissionsEnum.LOCATION_ALL,
      PermissionsEnum.LOCATION_CREATE,
      PermissionsEnum.LOCATION_DELETE,
      PermissionsEnum.LOCATION_FETCH,
      PermissionsEnum.LOCATION_UPDATE,
    ],
  },
  {
    link: '/admin/cities',
    name: 'city',
    permissions: [
      PermissionsEnum?.ADMIN,
      PermissionsEnum.LOCATION_ALL,
      PermissionsEnum.LOCATION_CREATE,
      PermissionsEnum.LOCATION_DELETE,
      PermissionsEnum.LOCATION_FETCH,
      PermissionsEnum.LOCATION_UPDATE,
    ],
  },
  {
    link: '/admin/areas',
    name: 'locations',
    permissions: [
      PermissionsEnum?.ADMIN,
      PermissionsEnum.LOCATION_ALL,
      PermissionsEnum.LOCATION_CREATE,
      PermissionsEnum.LOCATION_DELETE,
      PermissionsEnum.LOCATION_FETCH,
      PermissionsEnum.LOCATION_UPDATE,
    ],
  },
])

const WebsiteRoutes = ref<Routes[]>([
  {
    link: '/admin/client-opinions',
    name: 'client_opinion',
    permissions: [
      PermissionsEnum?.WEBSITE,
      PermissionsEnum?.CLIENT_OPINION_ALL,
      PermissionsEnum.CLIENT_OPINION_CREATE,
      PermissionsEnum.CLIENT_OPINION_UPDATE,
      PermissionsEnum.CLIENT_OPINION_DETAILS,
      PermissionsEnum.CLIENT_OPINION_DELETE,
      PermissionsEnum.CLIENT_OPINION_FETCH,
    ],
  },
  {
    link: '/admin/home-contact-us',
    name: 'home_contact_us',
    permissions: [
      PermissionsEnum?.WEBSITE,
      PermissionsEnum?.HOME_CONTACT_US_ALL,
      PermissionsEnum.HOME_CONTACT_US_CREATE,
      PermissionsEnum.HOME_CONTACT_US_UPDATE,
      PermissionsEnum.HOME_CONTACT_US_DETAILS,
      PermissionsEnum.HOME_CONTACT_US_DELETE,
      PermissionsEnum.HOME_CONTACT_US_FETCH,
    ],
  },
  {
    link: '/admin/categories',
    name: 'categories',
    permissions: [
      PermissionsEnum.CATEGORY_ALL,
      PermissionsEnum.CATEGORY_CREATE,
      PermissionsEnum.CATEGORY_DELETE,
      PermissionsEnum.CATEGORY_FETCH,
      PermissionsEnum.CATEGORY_UPDATE,
    ],
  },
  {
    link: '/admin/services',
    name: 'services',
    permissions: [
      PermissionsEnum.SERVICE_ALL,
      PermissionsEnum.SERVICE_CREATE,
      PermissionsEnum.SERVICE_DELETE,
      PermissionsEnum.SERVICE_FETCH,
      PermissionsEnum.SERVICE_UPDATE,
    ],
  },
  {
    link: '/admin/hashtags',
    name: 'hashtags',
    permissions: [
      PermissionsEnum.HASHTAG_ALL,
      PermissionsEnum.HASHTAG_CREATE,
      PermissionsEnum.HASHTAG_DELETE,
      PermissionsEnum.HASHTAG_FETCH,
      PermissionsEnum.HASHTAG_UPDATE,
    ],
  },
  {
    link: '/admin/term/add',
    name: 'terms',
    permissions: [
      PermissionsEnum.TERM_ALL,
      PermissionsEnum.TERM_CREATE_OR_UPDATE,
      PermissionsEnum.TERM_FETCH,
    ],
  },
  {
    link: '/admin/headers',
    name: 'headers',
    permissions: [
      PermissionsEnum.HEADER_ALL,
      PermissionsEnum.HEADER_CREATE,
      PermissionsEnum.HEADER_DELETE,
      PermissionsEnum.HEADER_FETCH,
      PermissionsEnum.HEADER_UPDATE,
    ],
  },
  {
    link: '/admin/service-features',
    name: 'service_features',
    permissions: [
      PermissionsEnum.SERVICE_FEATURE_ALL,
      PermissionsEnum.SERVICE_FEATURE_CREATE,
      PermissionsEnum.SERVICE_FEATURE_DELETE,
      PermissionsEnum.SERVICE_FEATURE_FETCH,
      PermissionsEnum.SERVICE_FEATURE_UPDATE,
    ],
  },
  {
    link: '/admin/service_section',
    name: 'service_section',
    permissions: [
      PermissionsEnum.SERVICE_SECTION_ALL,
      PermissionsEnum.SERVICE_SECTION_CREATE,
      PermissionsEnum.SERVICE_SECTION_DELETE,
      PermissionsEnum.SERVICE_SECTION_FETCH,
      PermissionsEnum.SERVICE_SECTION_UPDATE,
    ],
  },
  {
    link: '/admin/powerfull-features',
    name: 'powerful_features',
    permissions: [
      PermissionsEnum.POWERFUL_FEATURE_ALL,
      PermissionsEnum.POWERFUL_FEATURE_CREATE,
      PermissionsEnum.POWERFUL_FEATURE_DELETE,
      PermissionsEnum.POWERFUL_FEATURE_FETCH,
      PermissionsEnum.POWERFUL_FEATURE_UPDATE,
    ],
  },
  {
    link: '/admin/system-works',
    name: 'system_works',
    permissions: [
      PermissionsEnum.SYSTEM_WORK_ALL,
      PermissionsEnum.SYSTEM_WORK_CREATE,
      PermissionsEnum.SYSTEM_WORK_DELETE,
      PermissionsEnum.SYSTEM_WORK_FETCH,
      PermissionsEnum.SYSTEM_WORK_UPDATE,
    ],
  },
  {
    link: '/admin/privacy/add',
    name: 'privacy',
    permissions: [
      PermissionsEnum.PRIVACY_ALL,
      PermissionsEnum.PRIVACY_CREATE_OR_UPDATE,
      PermissionsEnum.PRIVACY_FETCH,
    ],
  },
  {
    link: '/admin/home-view-pricing',
    name: 'homeViewPricing',
    permissions: [
      PermissionsEnum.HOME_VIEW_PRICING_ALL,
      PermissionsEnum.HOME_VIEW_PRICING_CREATE,
      PermissionsEnum.HOME_VIEW_PRICING_DELETE,
      PermissionsEnum.HOME_VIEW_PRICING_FETCH,
      PermissionsEnum.HOME_VIEW_PRICING_UPDATE,
    ],
  },
  {
    link: '/admin/service_logs',
    name: 'service_logs',
    permissions: [
      PermissionsEnum.SERVICE_LOG_ALL,
      PermissionsEnum.SERVICE_LOG_CREATE,
      PermissionsEnum.SERVICE_LOG_DELETE,
      PermissionsEnum.SERVICE_LOG_FETCH,
      PermissionsEnum.SERVICE_LOG_UPDATE,
    ],
  },
  {
    link: '/admin/blog',
    name: 'blogs',
    permissions: [
      PermissionsEnum.BLOG_ALL,
      PermissionsEnum.BLOG_CREATE,
      PermissionsEnum.BLOG_DELETE,
      PermissionsEnum.BLOG_FETCH,
      PermissionsEnum.BLOG_UPDATE,
    ],
  },
  {
    link: '/admin/home-about-us',
    name: 'home_about_us',
    permissions: [
      PermissionsEnum.HOME_ABOUT_US_ALL,
      PermissionsEnum.HOME_ABOUT_US_CREATE,
      PermissionsEnum.HOME_ABOUT_US_DELETE,
      PermissionsEnum.HOME_ABOUT_US_FETCH,
      PermissionsEnum.HOME_ABOUT_US_UPDATE,
    ],
  },
  {
    link: '/admin/about-us-features',
    name: 'about_us_features',
    permissions: [
      PermissionsEnum.ABOUT_US_FEATURE_ALL,
      PermissionsEnum.ABOUT_US_FEATURE_CREATE,
      PermissionsEnum.ABOUT_US_FEATURE_DELETE,
      PermissionsEnum.ABOUT_US_FEATURE_FETCH,
      PermissionsEnum.ABOUT_US_FEATURE_UPDATE,
    ],
  },
  {
    link: '/admin/about-us-core',
    name: 'about_us_core',
    permissions: [
      PermissionsEnum.ABOUT_US_CORE_ALL,
      PermissionsEnum.ABOUT_US_CORE_CREATE,
      PermissionsEnum.ABOUT_US_CORE_DELETE,
      PermissionsEnum.ABOUT_US_CORE_FETCH,
      PermissionsEnum.ABOUT_US_CORE_UPDATE,
    ],
  },
  {
    link: '/admin/faq',
    name: 'faqs',
    permissions: [
      PermissionsEnum.FAQ_ALL,
      PermissionsEnum.FAQ_CREATE,
      PermissionsEnum.FAQ_DELETE,
      PermissionsEnum.FAQ_FETCH,
      PermissionsEnum.FAQ_UPDATE,
    ],
  },
  {
    link: '/admin/system-risk-management',
    name: 'systemRiskManagement',
    permissions: [
      PermissionsEnum.OUR_SYSTEM_RISK_MANAGEMENT_ALL,
      PermissionsEnum.OUR_SYSTEM_RISK_MANAGEMENT_CREATE,
      PermissionsEnum.OUR_SYSTEM_RISK_MANAGEMENT_DELETE,
      PermissionsEnum.OUR_SYSTEM_RISK_MANAGEMENT_FETCH,
      PermissionsEnum.OUR_SYSTEM_RISK_MANAGEMENT_UPDATE,
    ],
  },
  {
    link: '/admin/our-system-step',
    name: 'ourSystemStep',
    permissions: [
      PermissionsEnum.OUR_SYSTEM_STEP_ALL,
      PermissionsEnum.OUR_SYSTEM_STEP_CREATE,
      PermissionsEnum.OUR_SYSTEM_STEP_DELETE,
      PermissionsEnum.OUR_SYSTEM_STEP_FETCH,
      PermissionsEnum.OUR_SYSTEM_STEP_UPDATE,
    ],
  },
  {
    link: '/admin/system_banner',
    name: 'systemBanner',
    permissions: [
      PermissionsEnum.OUR_SYSTEM_BANNER_ALL,
      PermissionsEnum.OUR_SYSTEM_BANNER_CREATE,
      PermissionsEnum.OUR_SYSTEM_BANNER_DELETE,
      PermissionsEnum.OUR_SYSTEM_BANNER_FETCH,
      PermissionsEnum.OUR_SYSTEM_BANNER_UPDATE,
    ],
  },
  {
    link: '/admin/system_feature',
    name: 'systemFeature',
    permissions: [
      PermissionsEnum.OUR_SYSTEM_FEATURE_ALL,
      PermissionsEnum.OUR_SYSTEM_FEATURE_CREATE,
      PermissionsEnum.OUR_SYSTEM_FEATURE_DELETE,
      PermissionsEnum.OUR_SYSTEM_FEATURE_FETCH,
      PermissionsEnum.OUR_SYSTEM_FEATURE_UPDATE,
    ],
  },
  {
    link: '/admin/system_risk_type',
    name: 'systemRiskType',
    permissions: [
      PermissionsEnum.OUR_SYSTEM_RISK_TYPE_ALL,
      PermissionsEnum.OUR_SYSTEM_RISK_TYPE_CREATE,
      PermissionsEnum.OUR_SYSTEM_RISK_TYPE_DELETE,
      PermissionsEnum.OUR_SYSTEM_RISK_TYPE_FETCH,
      PermissionsEnum.OUR_SYSTEM_RISK_TYPE_UPDATE,
    ],
  },
  {
    link: '/admin/system_components',
    name: 'systemComponents',
    permissions: [
      PermissionsEnum.OUR_SYSTEM_COMPONENT_ALL,
      PermissionsEnum.OUR_SYSTEM_COMPONENT_CREATE,
      PermissionsEnum.OUR_SYSTEM_COMPONENT_DELETE,
      PermissionsEnum.OUR_SYSTEM_COMPONENT_FETCH,
      PermissionsEnum.OUR_SYSTEM_COMPONENT_UPDATE,
    ],
  },
])

const SelectedSettingsRoute = ref<string>('')
const SelectedLocationRoute = ref<string>('')
const SelectedWebsiteRoute = ref<string>('')

watch(
  () => route.path,
  (newPath) => {
    SelectedSettingsRoute.value = SettingsRoutes.value.find(item => item.link === newPath)?.name || ''
    SelectedLocationRoute.value = LocationRoutes.value.find(item => item.link === newPath)?.name || ''
    SelectedWebsiteRoute.value = WebsiteRoutes.value.find(item => item.link === newPath)?.name || ''
  }
)

const settingsAccordion = ref<string | null>('0')
const locationAccordion = ref<string | null>('1')
const websiteAccordion = ref<string | null>('2')
</script>

<template>
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
    <Accordion v-model:value="settingsAccordion">
      <AccordionPanel value="0">
        <AccordionHeader>
          <div class="links-header">
            <IconSetting />
            {{ $t('settings') }}
          </div>
        </AccordionHeader>

        <AccordionContent>
          <ul>
            <PermissionBuilder v-for="(route, index) in SettingsRoutes" :key="index" :code="route.permissions">
              <li>
                <router-link :to="route.link" :class="route?.fullPath?.includes(route.link) ? '' : ''">
                  <span>{{ $t(route.name) }}</span>
                </router-link>
              </li>
            </PermissionBuilder>
          </ul>
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel class="active-panel-out" v-if="SelectedSettingsRoute && !settingsAccordion">
        <span>{{ SelectedSettingsRoute }}</span>
      </AccordionPanel>
    </Accordion>
  </PermissionBuilder>

  <PermissionBuilder :code="[PermissionsEnum?.LOCATION_ALL]">
    <Accordion v-model:value="locationAccordion">
      <AccordionPanel value="1">
        <AccordionHeader>
          <div class="links-header">
            <IconSetting />
            {{ $t('location') }}
          </div>
        </AccordionHeader>
        <AccordionContent>
          <ul>
            <PermissionBuilder v-for="(route, index) in LocationRoutes" :key="index" :code="route.permissions">
              <li>
                <router-link :to="route.link">
                  <span>{{ $t(route.name) }}</span>
                </router-link>
              </li>
            </PermissionBuilder>
          </ul>
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel class="active-panel-out" v-if="SelectedLocationRoute && !locationAccordion">
        <span>{{ SelectedLocationRoute }}</span>
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
    <Accordion v-model:value="websiteAccordion">
      <AccordionPanel value="2">
        <AccordionHeader>
          <div class="links-header">
            <IconSetting />
            {{ $t('website') }}
          </div>
        </AccordionHeader>

        <AccordionContent>
          <ul>
            <PermissionBuilder v-for="(route, index) in WebsiteRoutes" :key="index" :code="route.permissions">
              <li>
                <router-link :to="route.link">
                  <span>{{ $t(route.name) }}</span>
                </router-link>
              </li>
            </PermissionBuilder>
          </ul>
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel class="active-panel-out" v-if="SelectedWebsiteRoute && !websiteAccordion">
        <span>{{ SelectedWebsiteRoute }}</span>
      </AccordionPanel>
    </Accordion>
  </PermissionBuilder>
</template>
