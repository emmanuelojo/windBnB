<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import store from "../store";
import axios from "axios";

onMounted(async () => {
  await axios
    .get("http://ip-api.com/json", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      userCountry.value  = res.data
    })
    .catch(() => {
      console.log("Request axios failed");
    });
});

const userCountry = ref<any>();

const showSearchOptions = ref(false);

const searchingLocation = ref(false);

const showDropdown = ref(true);

const addingGuests = ref(false);

const searchTerm = ref("");

const numberOfAdults = ref(0);

const numberOfChildren = ref(0);

const data = ref(store.getters.locations);

const emit = defineEmits(["searchParams"]);

const filteredLocations = computed(() => {
  return data.value.filter((location) => {
    return (
      location.country.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      location.city.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  });
});

const totalGuests = computed(() => {
  if (numberOfAdults.value + numberOfChildren.value < 1) {
    return "Add guests";
  } else {
    return `${numberOfAdults.value + numberOfChildren.value} ${
      numberOfAdults.value + numberOfChildren.value > 1 ? "guests" : "guest"
    }`;
  }
});

const searchLocation = () => {
  searchingLocation.value = true;
  addingGuests.value = false;
};

const addGuests = () => {
  addingGuests.value = true;
  searchingLocation.value = false;
};

const searchDetails = reactive({
  location: searchTerm.value,
  guests: {
    numberOfAdults: numberOfAdults.value,
    numberOfChildren: numberOfChildren.value,
  },
});

const increaseCount = (text: string) => {
  text === "a" ? numberOfAdults.value++ : numberOfChildren.value++;
};

const decreaseCount = (text: string) => {
  if (numberOfAdults.value > 0 && text === "a") numberOfAdults.value--;

  if (numberOfChildren.value > 0 && text !== "a") numberOfChildren.value--;
};

const closeModal = () => {
  showSearchOptions.value = false;
  searchTerm.value = "";
  numberOfAdults.value = 0;
  numberOfChildren.value = 0;
};

const selectCity = (text: string) => {
  searchTerm.value = text;
  showDropdown.value = false;
};

const handleSubmit = () => {
  showSearchOptions.value = false;

  const data = {
    location: searchTerm.value,
    guests: {
      numberOfAdults: numberOfAdults.value,
      numberOfChildren: numberOfChildren.value,
    },
  };

  emit("searchParams", data);
};
</script>

<template>
  <div class="relative">
    <nav class="p-3 grid sm:flex sm:justify-between items-center">
      <div>
        <img src="../assets/logo.svg" alt="Logo" />
      </div>

      <div>
        <div
          @click="showSearchOptions = true"
          class="mt-8 sm:mt-0 mx-auto w-[85%] sm:w-full h-10 flex items-center rounded-xl shadow cursor-pointer"
        >
          <div class="px-3 flex flex-grow items-center">
            <p
              class="text-xs flex items-center"
              :class="searchTerm.length ? 'text-n-black' : 'text-n-grey'"
            >
              {{
                searchTerm.length
                  ? searchTerm + ", Finland"
                  : userCountry !== undefined
                  ? userCountry.city + ", " + userCountry.country
                  : "Abuja, Nigeria"
              }}
            </p>
          </div>
          <div
            class="h-10 px-3 flex flex-grow items-center justify-center border-l border-r border-gray-200"
          >
            <p
              class="text-xs"
              :class="
                numberOfAdults || numberOfChildren
                  ? 'text-n-black'
                  : 'text-n-grey'
              "
            >
              {{
                numberOfAdults || numberOfChildren
                  ? numberOfAdults + numberOfChildren
                  : "Add guests"
              }}
            </p>
          </div>
          <div class="px-3 text-red-500">
            <span class="material-icons text-lg">search</span>
          </div>
        </div>
      </div>
    </nav>

    <div
      v-if="showSearchOptions"
      class="h-fit sm:px-5 sm:pt-2 pb-5 md:py-10 absolute top-0 left-0 right-0 bg-white"
    >
      <div class="flex justify-between items-center p-2 sm:pb-5 md:hidden">
        <p class="text-n-black font-semibold text-sm">Edit your search</p>
        <div @click="closeModal" class="text-n-black cursor-pointer">
          <i class="fa fa-times"></i>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="px-5 sm:px-0">
        <div class="grid sm:grid-cols-n-3 rounded-xl shadow">
          <div @click="searchLocation" class="flex flex-col gap-10">
            <div
              class="flex flex-col pl-3 py-2"
              :class="
                searchingLocation ? 'rounded-2xl border border-black' : ''
              "
            >
              <label for="" class="text-[9px] font-bold uppercase"
                >location</label
              >
              <input
                type="text"
                v-model="searchTerm"
                @focus="showDropdown = true"
                placeholder="Add location"
                class="placeholder:text-gray-400 placeholder:text-[13px] text-[13px] border-none outline-none"
              />
            </div>
          </div>
          <div @click="addGuests" class=" ">
            <div
              class="flex flex-col pl-3 py-2 border-l border-r"
              :class="
                addingGuests
                  ? 'rounded-2xl border border-black'
                  : 'border-n-white'
              "
            >
              <label for="" class="text-[9px] font-bold uppercase"
                >guests</label
              >
              <p
                class="placeholder:text-gray-400 placeholder:text-[13px] text-[13px] border-none outline-none cursor-pointer"
                :class="
                  numberOfAdults + numberOfChildren < 1
                    ? 'text-n-grey'
                    : 'text-n-black'
                "
              >
                {{ totalGuests }}
              </p>
            </div>
          </div>
          <div class="my-1 hidden sm:flex justify-center items-center">
            <div
              @click="handleSubmit"
              class="w-24 h-10 text-white text-xs flex justify-center items-center gap-[6px] bg-red-400 rounded-xl cursor-pointer hover:scale-105"
            >
              <span class="material-icons text-sm">search</span>
              <p class="">Search</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-n-3">
          <div
            class="mt-8 pl-4"
            :class="searchingLocation ? 'sm:visible' : 'invisible'"
          >
            <div v-if="searchTerm.length && showDropdown" class="grid gap-4">
              <div v-for="(location, idx) in filteredLocations" :key="idx">
                <div
                  @click="selectCity(location.city)"
                  class="flex items-center text-n-dark-grey cursor-pointer"
                >
                  <span class="material-icons mr-2"> room</span>
                  <span>{{ location.city + ", " + location.country }} </span>
                </div>
              </div>
            </div>
            <div
              v-if="searchTerm.length && !filteredLocations.length"
              class="flex justify-center items-center w-40 mx-auto"
            >
              <p class="">No data found</p>
            </div>
          </div>

          <div v-if="addingGuests" class="my-10 ml-5 flex flex-col gap-10">
            <div class="flex flex-col gap-2">
              <div>
                <p class="text-sm font-semibold">Adults</p>
                <p class="text-n-grey text-sm">Ages 13 and above</p>
              </div>

              <div class="text-n-grey flex items-center gap-6">
                <div
                  class="w-6 h-6 flex justify-center items-center border border-n-black rounded-md cursor-pointer"
                >
                  <i
                    @click="decreaseCount('a')"
                    class="fa fa-minus text-xs"
                  ></i>
                </div>
                <p class="text-n-black">{{ numberOfAdults }}</p>
                <div
                  class="w-6 h-6 flex justify-center items-center border border-n-black rounded-md cursor-pointer"
                >
                  <i @click="increaseCount('a')" class="fa fa-plus text-xs"></i>
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <div>
                <p class="text-sm font-semibold">Children</p>
                <p class="text-n-grey text-sm">Ages 2 - 12</p>
              </div>

              <div class="text-n-grey flex items-center gap-6">
                <div
                  class="w-6 h-6 flex justify-center items-center border border-n-black rounded-md cursor-pointer"
                >
                  <i
                    @click="decreaseCount('c')"
                    class="fa fa-minus text-xs"
                  ></i>
                </div>
                <p class="text-n-black">{{ numberOfChildren }}</p>
                <div
                  class="w-6 h-6 flex justify-center items-center border border-n-black rounded-md cursor-pointer"
                >
                  <i @click="increaseCount('c')" class="fa fa-plus text-xs"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="sm:hidden my-1 flex justify-center items-center">
          <div
            @click="handleSubmit"
            class="w-24 h-10 text-white text-xs flex justify-center items-center gap-[6px] bg-red-400 rounded-xl cursor-pointer hover:scale-105"
          >
            <span class="material-icons text-sm">search</span>
            <p class="">Search</p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
