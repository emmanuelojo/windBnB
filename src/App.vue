<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Navbar from "./components/Navbar.vue";
import store from "./store";

onMounted(() => {
  data.value;
});

const searchTerm = ref("");

const data = ref(store.getters.locations);

const search = () => {};
</script>

<template>
  <div class="lg:w-[85%] lg:mx-auto">
    <Navbar @searchParams="search" />

    <div class="mt-10 flex flex-col gap-8 mb-20 px-4 md:px-6">
      <div class="flex items-end justify-between">
        <p class="font-bold text-2xl">All</p>

        <p class="text-xs">12+ stays</p>
      </div>

      <div
        class="grid sm:grid-cols-n-2 lg:grid-cols-n-3 place-content-center gap-10 sm:gap-6 lg:gap-9"
      >
        <div
          v-for="(location, idx) in data"
          :key="idx"
          class="w-full grid gap-3 cursor-pointer"
        >
          <img
            :src="location.photo"
            alt="Photo"
            class="h-52 w-full object-cover rounded-xl"
          />
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div
                v-if="location.superHost"
                class="border border-black rounded-2xl w-24 h-7 flex justify-center items-center hover:bg-n-black hover:text-n-white"
              >
                <p class="text-[13px] uppercase font-bold">super host</p>
              </div>

              <div>
                <p class="text-gray-400 text-sm">{{ location.type }}</p>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <span class="material-icons text-red-500"> star</span>
              <p class="font-normal">{{ location.rating }}</p>
            </div>
          </div>

          <div>
            <p class="font-semibold">{{ location.title }}</p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="mt-60 mb-4 flex justify-center items-center text-xs text-gray-500 font-semibold attribution"
    >
      created by
      <a href="https://jekon-dev.netlify.app/" class="ml-1">Jekon</a> -
      <a href="https://devchallenges.io/" target="_blank" class="ml-1">
        devChallenges.io</a
      >
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Mulish:wght@300;400&display=swap");

#app {
  font-family: "Mulish";
}
</style>
