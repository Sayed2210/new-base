<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import lottie from "lottie-web";
import animationData from "@/assets/images/Craftsman.json"; // your lottie JSON
import dotsLoader from "@/assets/images/DotsLoader.json";

const lottieContainer = ref<HTMLDivElement | null>(null);
const dotsLoaderContainer = ref<HTMLDivElement | null>(null);
let animation: any;
let dotsLoaderAnimation: any;

onMounted(() => {
  if (lottieContainer.value) {
    animation = lottie.loadAnimation({
      container: lottieContainer.value,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData,
    });
  }
  if (dotsLoaderContainer.value) {
    animation = lottie.loadAnimation({
      container: dotsLoaderContainer.value,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: dotsLoader,
    });
  }
});

onBeforeUnmount(() => {
  animation?.destroy();
  dotsLoaderAnimation?.destroy();
});
</script>
<template>
  <dialog class="loader-dialog">
    <div class="loader-container">
      <div ref="lottieContainer" class="w-40 h-40"></div>
      <div
        ref="dotsLoaderContainer"
        class="w-20 flex justify-center items-center"
      ></div>
    </div>
  </dialog>
</template>

<style scoped></style>
