<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
// import QuickSearch from "@/components/HelpersComponents/QuickSearch.vue";

const route = useRoute();
const quickSearchActive = ref(false);

const menuItems = ref([
  { text: "Offers", icon: "ticket-outline", route: "/projects/All" },
  { text: "Clients", icon: "person-circle-outline", route: "/users" },
  { text: "Home", icon: "home-outline", route: "/" },
  // { text: "Departments", icon: "grid-outline", route: "/departments" },
  { text: "Add Offer", icon: "add-circle-outline", route: "/add-project" },
]);

const isActive = (itemRoute: string) => {
  if (quickSearchActive.value) {
    return false; // QuickSearch is active, so no other menu item should be highlighted
  }
  const found = menuItems.value.some(item => item.route === route.path);
  return found ? route.path === itemRoute : itemRoute === "/";
};
</script>

<template>
  <div class="navigation">
    <ul>
      <li
          v-for="(item, index) in menuItems"
          :key="index"
          :class="{ list: true, active: isActive(item.route) }"
      >
        <router-link :to="item.route">
          <span class="icon">
            <ion-icon :name="item.icon"></ion-icon>
          </span>
          <span class="text">{{ item.text }}</span>
        </router-link>
      </li>
<!--      <li class="list" :class="{ active: quickSearchActive }">-->
<!--        <QuickSearch @toggle="quickSearchActive = $event" />-->
<!--      </li>-->
      <div class="indicator"></div>
    </ul>
  </div>
</template>
