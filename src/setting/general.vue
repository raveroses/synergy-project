<template>
  <div class="w-[75%] border-l border-gray-200 pl-5">
    <div class="image-palace flex justify-between">
      <div>
        <img
          src="/images/bene.jpg"
          alt=" user-Image"
          class="w-[100px] rounded-full"
        />
      </div>

      <div class="delete flex items-center gap-3">
        <div class="p-1 rounded border border-gray-200 text-sm">
          <Trash2 />
        </div>
        <div class="flex items-center p-1 gap-1 rounded border border-gray-200">
          <div class="text-sm">
            <Upload />
          </div>
          <p class="text-[15px]">Upload</p>
        </div>
      </div>
    </div>
    <div class="w-full h-0.5 bg-gray-200 my-2"></div>

    <div class="user-detail py-7 flex flex-col gap-5">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="font-semibold text-[16px]">Name</h2>
          <h2>{{ savedUser.lastName + " " + savedUser.firstName }}</h2>
        </div>
        <button class="px-2 rounded border border-gray-200">Edit</button>
      </div>
      <div class="flex justify-between items-center">
        <div>
          <h2 class="font-semibold text-[16px]">Contact</h2>
          <h2>Phone: {{ savedUser.phoneNumber }}</h2>
          <h2>Email :{{ savedUser.email }}</h2>
        </div>
        <button class="px-2 rounded border border-gray-200">Edit</button>
      </div>
      <div class="flex justify-between items-center">
        <div>
          <h2 class="font-semibold text-[16px]">Social Media</h2>
          <h2>Linkdein: {{ savedUser.socialLink }}</h2>
        </div>
        <button class="px-2 rounded border border-gray-200">Edit</button>
      </div>
      <div class="flex justify-between items-center">
        <div>
          <h2 class="font-semibold text-[16px]">Language $ currency</h2>
          <h2>English $ USD</h2>
        </div>
        <button class="px-2 rounded border border-gray-200">Edit</button>
      </div>
      <div class="flex justify-between items-center">
        <div>
          <h2 class="font-semibold text-[16px]">Integration</h2>
          <h2>Google. odekunlewaris@gmail.com</h2>
        </div>
        <div class="flex justify-between items-center">
          <p class="bg-green-400 px-1 rounded-xl flex text-green-600">
            <span><Check class="text-[12px]" /></span>
            <span class="text-[13px]">Connected</span>
          </p>
          <button class="px-2 rounded border border-gray-200">Edit</button>
        </div>
      </div>
    </div>
  </div>

  <form
    class="absolute top-[20%] left-[50%] w-[600px] bg-white rounded-xl p-10 z-40"
    @submit.prevent="handleSaveChange"
  >
    <div class="flex justify-between">
      <h2 class="font-semibold text-xl">Edit personal Information</h2>
      <X />
    </div>

    <div class="flex justify-between items-center my-5">
      <div class="firstname flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <label for="first " class="font-semibold text-[16px]"
            >First name</label
          >
          <p class="error font-semibold text-[14px] text-red-500">
            {{ storingError.firstName }}
          </p>
        </div>
        <input
          type="text"
          placeholder="First Name"
          v-model="savedUser.firstName"
          class="border border-[#800080] w-[250px] py-2 px-2 rounded outline-none"
          required
        />
      </div>

      <div class="secondname flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <label for="lastName  " class="font-semibold text-[16px]"
            >Last name</label
            
          >
          <p class="error font-semibold text-[14px] text-red-500">
            {{ storingError.lastName }}
          </p>
        </div>
        <input
          type="text"
          v-model="savedUser.lastName"
          class="border border-[#800080] w-[250px] py-2 px-2 rounded outline-none"
          placeholder="Last Name"
          required
        />
      </div>
    </div>

    <div class="flex flex-col gap-5">
      <div class="email flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <label for="email" class="font-semibold text-[16px]"
            >Email address</label
          >
          <p class="error font-semibold text-[14px] text-red-500">
            {{ storingError.email }}
          </p>
        </div>
        <input
          type="email"
          v-model="savedUser.email"
          placeholder="info@gmail.com"
          class="border border-[#800080] w-full py-2 px-2 rounded outline-none"
          required
        />
      </div>
      <div class="number flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <label for="email" class="font-semibold text-[16px]"
            >Phone Number</label
          >
          <p class="error font-semibold text-[14px] text-red-500">
            {{ storingError.phoneNumber }}
          </p>
        </div>
        <input
          type="tel"
          v-model="savedUser.phoneNumber"
          placeholder="(0900-345-9997-00)"
          class="border border-[#800080] w-full py-2 px-2 rounded outline-none"
          required
        />
      </div>
      <div class="social flex flex-col gap-2">
        <div class="flex justify-between items-center">
          <label for="email" class="font-semibold text-[16px]"
            >Linkedin Link</label
          >
          <p class="error font-semibold text-[14px] text-red-500">
            {{ storingError.socialLink }}
          </p>
        </div>
        <input
          type="text"
          v-model="savedUser.socialLink"
          placeholder="https://raverose"
          class="border border-[#800080] w-full py-2 px-2 rounded outline-none"
          required
        />
      </div>
    </div>
    <div class="flex justify-end">
      <button
        class="bg-[#800080] text-white p-3 rounded-[5px] font-[15px] my-5 cursor-pointer"
      >
        Save changes
      </button>
    </div>
  </form>
  <!-- <div class="fixed inset-0 bg-black/50 backdrop-blur-sm"></div> -->
</template>

<script setup>
import { Check, Trash2, Upload, X } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { useProfile } from "../setting/functions/useProfile.js";

const store = useProfile();

const { savedUser, storingError } = storeToRefs(store);

const { handleSaveChange } = store;

</script>
