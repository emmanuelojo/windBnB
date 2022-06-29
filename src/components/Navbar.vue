<script setup lang="ts">
import { ref,reactive, computed } from 'vue';
import store from '../store';

const showSearchOptions = ref(false)

const searchTerm = ref('')

const numberOfAdults = ref(0)

const numberOfChildren = ref(0)

const data = ref(store.getters.locations)

const filteredLocations = computed(() => {
    return data.value.filter(location => {
        // if(location.country.toLowerCase().includes(searchTerm.value.toLowerCase()) || location.city.toLowerCase().includes(searchTerm.value.toLowerCase())) return location
    return location.country.toLowerCase().includes(searchTerm.value.toLowerCase()) || location.city.toLowerCase().includes(searchTerm.value.toLowerCase())
    })
})

const totalGuests = computed(() => `${numberOfAdults.value + numberOfChildren.value} guests`)

const searchDetails = reactive({
    location: searchTerm.value,
    guests:{
        numberOfAdults: numberOfAdults.value,
        umberOfChildren: numberOfChildren.value
    } 
})

const increaseCount = (text: string) => {
  text === 'a' ? numberOfAdults.value++ : numberOfChildren.value++
};

const decreaseCount = (text: string) => {
  if (numberOfAdults.value > 0 && text === 'a' )  numberOfAdults.value--

  if(numberOfChildren.value > 0 && text !== 'a') numberOfChildren.value--
};

const handleSubmit = () => {

}

</script>

<template>
    <div class="relative">
        <nav class="p-3 flex justify-between items-center">
            <div>
                <img src="../assets/logo.svg" alt="Logo">
            </div>

            <div>
                <div @click="showSearchOptions= true" class="h-10 flex items-center rounded-xl shadow cursor-pointer">
                    <div class="px-3">
                        <p class="text-xs">Lagos, Nigeria</p>
                    </div>
                    <div class="h-10 px-3 flex items-center justify-center border-l border-r border-gray-200">
                        <p class="text-xs text-gray-300"> Add guests</p>
                    </div>
                    <div class="px-3 text-red-500 ">
                        <span class="material-icons text-lg">search</span>
                    </div>
                </div>
            </div>
        </nav>

        <div v-if="showSearchOptions" class="h-fit px-5 py-10 absolute top-0 left-0 right-0 bg-white">
            <form @submit.prevent="handleSubmit" class="grid grid-cols-n-3 rounded-xl shadow">
                <div class="flex flex-col gap-10">
                    <div class="flex flex-col pl-3 py-2 border border-black rounded-2xl">
                        <label for="" class="text-[9px] font-bold uppercase">location</label>
                        <input type="text" v-model="searchTerm" placeholder="Add location" class="placeholder:text-gray-400 placeholder:text-[13px] text-[13px] border-none outline-none">
                    </div>

                    <div v-if="searchTerm.length">
                        <div v-for="(location, idx) in filteredLocations" :key="idx">
                            <div class="flex items-center ">  <span class="material-icons "> room</span> <span>{{location.city + ', ' + location.country}} </span></div>
                        </div>
                    </div>
                    <div v-if="searchTerm.length && !filteredLocations.length" class="-mt-5 pb-10 flex justify-center items-center">
                        <p>No data found</p>
                    </div>
                </div>
                <div class=" ">
                    <div class="flex flex-col pl-3 py-2">
                        <label for="" class="text-[9px] font-bold uppercase">guests</label>
                        <input type="text" v-model="totalGuests" placeholder="Add guests" class="placeholder:text-gray-400 placeholder:text-[13px] text-[13px] border-none outline-none">
                    </div>

                    <div class="my-10 grid gap-10">
                        <div class="flex flex-col gap-2">
                            <div>
                                <p class="text-sm font-semibold"> Adults</p>
                                <p class="text-n-grey text-sm">Ages 13 and above</p>
                            </div>

                            <div class="text-n-grey flex items-center gap-6">
                                <div class="w-6 h-6 flex justify-center items-center border border-n-black rounded-md cursor-pointer">
                                 <i @click="decreaseCount('a')" class="fa fa-minus text-xs"></i>
                                </div>
                                <p class="text-n-black">{{ numberOfAdults}} </p>
                                <div class="w-6 h-6 flex justify-center items-center border border-n-black rounded-md cursor-pointer">
                                    <i @click="increaseCount('a')" class="fa fa-plus text-xs"></i>
                                </div>
                            </div>
                        </div>

                        <div  class="flex flex-col gap-2">
                            <div>
                                <p class="text-sm font-semibold"> Children</p>
                                <p class="text-n-grey text-sm">Ages 2 - 12</p>
                            </div>

                            <div  class="text-n-grey flex items-center gap-6">
                                <div class="w-6 h-6 flex justify-center items-center border border-n-black rounded-md cursor-pointer">
                                    <i @click="decreaseCount('c')" class="fa fa-minus text-xs"></i>
                                </div>
                                <p class="text-n-black">{{ numberOfChildren}} </p>
                                <div class="w-6 h-6 flex justify-center items-center border border-n-black rounded-md cursor-pointer">
                                    <i @click="increaseCount('c')" class="fa fa-plus text-xs"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="h-8 my-1 flex justify-center items-center  ">                    
                    <div @click="handleSubmit" class="w-20 h-8 text-white text-xs flex justify-center items-center gap-[6px] bg-red-400 rounded-xl cursor-pointer hover:scale-105">
                        <span class="material-icons text-sm">search</span>
                        <p class="">Search</p>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>