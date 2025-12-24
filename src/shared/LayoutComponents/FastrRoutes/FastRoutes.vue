<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import FilesOrganization from '@/assets/images/FilesOrganization.png'
import OrganizationSettingIcon from '@/assets/images/OrganizationSettingIcon.png'
import PersonalData from '@/assets/images/PersonalData.png'
import SettingLocation from '@/assets/images/SettingLocation.png'

import { RouterEnum } from '@/features/Home/SettingEnum/SettingEnum'
import { PermissionsEnum } from '@/features/users/Admin/Core/Enum/permission_enum'
import PermissionBuilder from '@/components/DataStatus/PermissionBuilder.vue'

const route = useRoute()
const router = useRouter()

interface OrganizationSettingItem {
  id: RouterEnum
  title: string
  icon: string
  description: string
  routes: {
    route: string
    Name: string
    permissions: PermissionsEnum[]
  }[]
}

/* =========================
   🔹 FAST ROUTES CONFIG (SOURCE OF TRUTH)
   ========================= */
const OrganizationSetting = ref<OrganizationSettingItem[]>([
  {
    id: RouterEnum.ORGANIZATION,
    title: 'organization setting',
    icon: FilesOrganization,
    description:
      'partners . projects . certifications . template . contractors . management . roles',
    routes: [
      {
        route: '/organization/partner',
        Name: 'partners',
        permissions: [
          PermissionsEnum.WEBSITE,
          PermissionsEnum.PARTNER_ALL,
          PermissionsEnum.PARTNER_CREATE,
          PermissionsEnum.PARTNER_UPDATE,
          PermissionsEnum.PARTNER_DETAILS,
          PermissionsEnum.PARTNER_DELETE,
          PermissionsEnum.PARTNER_FETCH,
        ],
      },
      {
        route: '/organization/projects',
        Name: 'projects',
        permissions: [
          PermissionsEnum.PROJECT_ALL,
          PermissionsEnum.PROJECT_CREATE,
          PermissionsEnum.PROJECT_DELETE,
          PermissionsEnum.PROJECT_FETCH,
          PermissionsEnum.PROJECT_UPDATE,
        ],
      },
      {
        route: '/organization/certificate',
        Name: 'certifications',
        permissions: [
          PermissionsEnum.CERTIFICATE_ALL,
          PermissionsEnum.CERTIFICATE_CREATE,
          PermissionsEnum.CERTIFICATE_DELETE,
          PermissionsEnum.CERTIFICATE_FETCH,
          PermissionsEnum.CERTIFICATE_UPDATE,
        ],
      },
      {
        route: '/organization/template',
        Name: 'templates',
        permissions: [
          PermissionsEnum.ORG_TEMPLATE_ALL,
          PermissionsEnum.ORG_TEMPLATE_CREATE,
          PermissionsEnum.ORG_TEMPLATE_DELETE,
          PermissionsEnum.ORG_TEMPLATE_FETCH,
          PermissionsEnum.ORG_TEMPLATE_UPDATE,
        ],
      },
      {
        route: '/organization/contractor',
        Name: 'contractors',
        permissions: [
          PermissionsEnum.ORG_CONTRACTOR_ALL,
          PermissionsEnum.ORG_CONTRACTOR_CREATE,
          PermissionsEnum.ORG_CONTRACTOR_DELETE,
          PermissionsEnum.ORG_CONTRACTOR_FETCH,
          PermissionsEnum.ORG_CONTRACTOR_UPDATE,
        ],
      },
      {
        route: '/organization/equipment-mangement/all-observatin',
        Name: 'management',
        permissions: [
          PermissionsEnum.ORG_EQUIPMENT_MANGEMENT_ALL,
          PermissionsEnum.ORG_EQUIPMENT_MANGEMENT_CREATE,
          PermissionsEnum.ORG_EQUIPMENT_MANGEMENT_DELETE,
          PermissionsEnum.ORG_EQUIPMENT_MANGEMENT_FETCH,
          PermissionsEnum.ORG_EQUIPMENT_MANGEMENT_UPDATE,
        ],
      },
      {
        route: '/organization/role',
        Name: 'roles',
        permissions: [
          PermissionsEnum.ORG_ROLE_ALL,
          PermissionsEnum.ORG_ROLE_CREATE,
          PermissionsEnum.ORG_ROLE_DELETE,
          PermissionsEnum.ORG_ROLE_FETCH,
          PermissionsEnum.ORG_ROLE_UPDATE,
        ],
      },
      {
        route: '/organization/injury',
        Name: 'injury',
        permissions: [
          PermissionsEnum.INJURY_ALL,
          PermissionsEnum.INJURY_CREATE,
          PermissionsEnum.INJURY_DELETE,
          PermissionsEnum.INJURY_FETCH,
          PermissionsEnum.INJURY_UPDATE,
        ],
      },
      {
        route: '/organization/scope',
        Name: 'Scope',
        permissions: [
          PermissionsEnum.SCOPE_ALL,
          PermissionsEnum.SCOPE_CREATE,
          PermissionsEnum.SCOPE_DELETE,
          PermissionsEnum.SCOPE_FETCH,
          PermissionsEnum.SCOPE_UPDATE,
        ],
      },
      {
        route: '/organization/accidents-type',
        Name: 'Accidents Types',
        permissions: [
          PermissionsEnum.WEBSITE,
          PermissionsEnum.ORG_ACCIDENTS_TYPE_ALL,
          PermissionsEnum.ORG_ACCIDENTS_TYPE_CREATE,
          PermissionsEnum.ORG_ACCIDENTS_TYPE_UPDATE,
          PermissionsEnum.ORG_ACCIDENTS_TYPE_DETAILS,
          PermissionsEnum.ORG_ACCIDENTS_TYPE_DELETE,
          PermissionsEnum.ORG_ACCIDENTS_TYPE_FETCH,
        ],
      },
    ],
  },
  {
    id: RouterEnum.OPERATION,
    title: 'operation setting',
    icon: OrganizationSettingIcon,
    description: 'hazard type . observation . hazard . factor . factor items',
    routes: [
      {
        route: '/organization/hazard-type',
        Name: 'hazard-type',
        permissions: [
          PermissionsEnum.ORG_HAZARD_TYPE_ALL,
          PermissionsEnum.ORG_HAZARD_TYPE_CREATE,
          PermissionsEnum.ORG_HAZARD_TYPE_DELETE,
          PermissionsEnum.ORG_HAZARD_TYPE_FETCH,
          PermissionsEnum.ORG_HAZARD_TYPE_UPDATE,
        ],
      },
      {
        route: '/organization/equipment-mangement/observation',
        Name: 'observation',
        permissions: [
          PermissionsEnum.ORG_OBSERVATION_ALL,
          PermissionsEnum.ORG_OBSERVATION_CREATE,
          PermissionsEnum.ORG_OBSERVATION_DELETE,
          PermissionsEnum.ORG_OBSERVATION_FETCH,
          PermissionsEnum.ORG_OBSERVATION_UPDATE,
        ],
      },
      {
        route: '/organization/equipment-mangement/hazard',
        Name: 'hazard',
        permissions: [
          PermissionsEnum.ORG_HAZARD_ALL,
          PermissionsEnum.ORG_HAZARD_CREATE,
          PermissionsEnum.ORG_HAZARD_DELETE,
          PermissionsEnum.ORG_HAZARD_FETCH,
          PermissionsEnum.ORG_HAZARD_UPDATE,
        ],
      },
      {
        route: '/organization/factory',
        Name: 'factor',
        permissions: [
          PermissionsEnum.ORG_FACTORY_ALL,
          PermissionsEnum.ORG_FACTORY_CREATE,
          PermissionsEnum.ORG_FACTORY_DELETE,
          PermissionsEnum.ORG_FACTORY_FETCH,
          PermissionsEnum.ORG_FACTORY_UPDATE,
        ],
      },
      {
        route: '/organization/factories-items',
        Name: 'factor-item',
        permissions: [
          PermissionsEnum.ORG_FACTORY_ITEM_ALL,
          PermissionsEnum.ORG_FACTORY_ITEM_CREATE,
          PermissionsEnum.ORG_FACTORY_ITEM_DELETE,
          PermissionsEnum.ORG_FACTORY_ITEM_FETCH,
          PermissionsEnum.ORG_FACTORY_ITEM_UPDATE,
        ],
      },
    ],
  },
  {
    id: RouterEnum.EMPLOYEES,
    title: 'employees',
    icon: PersonalData,
    description: 'organization employee . hierarchy . team',
    routes: [
      {
        route: '/organization/organization-employee',
        Name: 'employees',
        permissions: [
          PermissionsEnum.ORG_EMPLOYEE_ALL,
          PermissionsEnum.ORG_EMPLOYEE_CREATE,
          PermissionsEnum.ORG_EMPLOYEE_DELETE,
          PermissionsEnum.ORG_EMPLOYEE_FETCH,
          PermissionsEnum.ORG_EMPLOYEE_UPDATE,
          PermissionsEnum.ORG_EMPLOYEE_DETAILS,
        ],
      },
      {
        route: '/organization/herikaly',
        Name: 'hierarchy',
        permissions: [
          PermissionsEnum.HERIKALY_ALL,
          PermissionsEnum.HERIKALY_CREATE,
          PermissionsEnum.HERIKALY_DELETE,
          PermissionsEnum.HERIKALY_FETCH,
          PermissionsEnum.HERIKALY_UPDATE,
        ],
      },
      {
        route: '/organization/team',
        Name: 'team',
        permissions: [
          PermissionsEnum.ORG_TEAM_ALL,
          PermissionsEnum.ORG_TEAM_CREATE,
          PermissionsEnum.ORG_TEAM_DELETE,
          PermissionsEnum.ORG_TEAM_FETCH,
          PermissionsEnum.ORG_TEAM_UPDATE,
        ],
      },
    ],
  },
  {
    id: RouterEnum.LOCATION,
    title: 'location setting',
    icon: SettingLocation,
    description: 'state . country . city . location . zones',
    routes: [
      {
        route: '/organization/countries',
        Name: 'countries',
        permissions: [
          PermissionsEnum.LOCATION_ORG_ALL,
          PermissionsEnum.LOCATION_ORG_CREATE,
          PermissionsEnum.LOCATION_ORG_UPDATE,
          PermissionsEnum.LOCATION_ORG_DETAILS,
          PermissionsEnum.LOCATION_ORG_DELETE,
          PermissionsEnum.LOCATION_ORG_FETCH,
        ],
      },
      {
        route: '/organization/states',
        Name: 'states',
        permissions: [
          PermissionsEnum.LOCATION_ORG_ALL,
          PermissionsEnum.LOCATION_ORG_CREATE,
          PermissionsEnum.LOCATION_ORG_UPDATE,
          PermissionsEnum.LOCATION_ORG_DETAILS,
          PermissionsEnum.LOCATION_ORG_DELETE,
          PermissionsEnum.LOCATION_ORG_FETCH,
        ],
      },
      {
        route: '/organization/cities',
        Name: 'cities',
        permissions: [
          PermissionsEnum.LOCATION_ORG_ALL,
          PermissionsEnum.LOCATION_ORG_CREATE,
          PermissionsEnum.LOCATION_ORG_UPDATE,
          PermissionsEnum.LOCATION_ORG_DETAILS,
          PermissionsEnum.LOCATION_ORG_DELETE,
          PermissionsEnum.LOCATION_ORG_FETCH,
        ],
      },
      {
        route: '/organization/areas',
        Name: 'locations',
        permissions: [
          PermissionsEnum.LOCATION_ORG_ALL,
          PermissionsEnum.LOCATION_ORG_CREATE,
          PermissionsEnum.LOCATION_ORG_UPDATE,
          PermissionsEnum.LOCATION_ORG_DETAILS,
          PermissionsEnum.LOCATION_ORG_DELETE,
          PermissionsEnum.LOCATION_ORG_FETCH,
        ],
      },
      {
        route: '/organization/project-zone',
        Name: 'zones',
        permissions: [
          PermissionsEnum.PROJECT_ZONE_ALL,
          PermissionsEnum.PROJECT_ZONE_CREATE,
          PermissionsEnum.PROJECT_ZONE_DELETE,
          PermissionsEnum.PROJECT_ZONE_FETCH,
          PermissionsEnum.PROJECT_ZONE_UPDATE,
        ],
      },
    ],
  },
])

/* =========================
   🔹 RESOLVE TYPE FROM FAST ROUTES
   ========================= */
const resolveTypeFromPath = (path: string): RouterEnum | null => {
  for (const section of OrganizationSetting.value) {
    for (const r of section.routes) {
      if (path.startsWith(r.route)) {
        return section.id
      }
    }
  }
  return null
}

/* =========================
   🔹 AUTO ADD type QUERY
   ========================= */
watch(
  () => route.fullPath,
  () => {
    // exclusions
    if (route.path === '/organization' || route.path === '/organization/setting') {
      return
    }

    if (route.query.type) return

    const resolvedType = resolveTypeFromPath(route.path)

    if (resolvedType !== null) {
      router.replace({
        path: route.path,
        query: {
          ...route.query,
          type: resolvedType,
        },
      })
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="fast-route-container">
    <div
      class="fast-route"
      v-for="item in OrganizationSetting.filter((item) => item.id === Number(route.query.type))"
      :key="item.id"
    >
      <PermissionBuilder
        v-for="routeItem in item.routes"
        :key="routeItem.route"
        class="w-full"
        :code="routeItem.permissions"
      >
        <div class="route" :class="route.path.startsWith(routeItem.route) ? 'active' : ''">
          <router-link
            class="w-full"
            :to="{ path: routeItem.route, query: { type: route.query.type } }"
          >
            {{ routeItem.Name }}
          </router-link>
        </div>
      </PermissionBuilder>
    </div>
  </div>
</template>
