<template>
  <div class="w-[75%] border-l border-gray-200 pl-5">
    <div class="image-palace flex justify-between">
      <div>
        <img
          :src="imageGetter"
          alt=" user-Image"
          class="w-[100px] h-[100px] rounded-full object-center object-cover"
        />
      </div>

      <div class="delete flex items-center gap-3">
        <div
          class="p-1 rounded border border-gray-200 text-sm"
          @click="handleDeleteUpload"
        >
          <Trash2 />
        </div>
        <div
          class="flex items-center p-1 gap-1 rounded border border-gray-200"
          @click="openFilePicker"
        >
          <div class="text-sm">
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              name=""
              @change="handleFileChange"
              class="hidden"
              id="fileTrigger"
            />
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
          <h2>{{ profileStore.last_name + " " + profileStore.first_name }}</h2>
        </div>
        <button
          class="px-2 rounded border border-gray-200 cursor-pointer"
          data-id="1"
          data-name="name"
        >
          Edit
        </button>
      </div>
      <div class="flex justify-between items-center">
        <div>
          <h2 class="font-semibold text-[16px]">Contact</h2>
          <h2>Phone: {{ profileStore.phone_number }}</h2>
          <h2>Email :{{ profileStore.email }}</h2>
        </div>
        <button
          class="px-2 rounded border border-gray-200 cursor-pointer"
          data-id="2"
          data-name="contact"
        >
          Edit
        </button>
      </div>
      <div class="flex justify-between items-center">
        <div>
          <h2 class="font-semibold text-[16px]">Social Media</h2>
          <h2>Linkdein: {{ profileStore.social_link }}</h2>
        </div>
        <button
          class="px-2 rounded border border-gray-200 cursor-pointer"
          data-id="3"
          data-name="social-link"
        >
          Edit
        </button>
      </div>
      <div class="flex justify-between items-center">
        <div>
          <h2 class="font-semibold text-[16px]">Language $ currency</h2>
          <h2>English $ USD</h2>
        </div>
        <!-- <button
          class="px-2 rounded border border-gray-200 cursor-pointer"
          data-id="4"
          data-name="currency"
        >
          Edit
        </button> -->
      </div>
      <div class="flex justify-between items-center">
        <div>
          <h2 class="font-semibold text-[16px]">Integration</h2>
          <h2>Google. {{ profileStore.email }}</h2>
        </div>
        <div class="flex justify-between items-center">
          <p class="bg-green-400 px-1 rounded-xl flex text-green-600">
            <span><Check class="text-[12px]" /></span>
            <span class="text-[13px]">Connected</span>
          </p>
        </div>
      </div>
    </div>
  </div>

  <form
    :class="`absolute top-[20%] left-[50%] w-[600px] bg-white rounded-xl p-10 z-40 ${isOpen ? 'block' : 'hidden'}`"
    @submit.prevent="handleSaveChange"
  >
    <div class="flex justify-between">
      <h2 class="font-semibold text-xl">Edit personal Information</h2>
      <div @click="closeBtn" class="cursor-pointer">
        <X />
      </div>
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
          v-model="profileStore.first_name"
          :class="`border border-[#800080] w-full py-2 px-2 rounded outline-none ${
            isBtnName !== 'name' ? 'text-gray-400' : 'text-black'
          }`"
          required
          data-input-id="name"
          :disabled="isBtnName !== 'name'"
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
          v-model="profileStore.last_name"
          :class="`border border-[#800080] w-full py-2 px-2 rounded outline-none ${
            isBtnName !== 'name' ? 'text-gray-400' : 'text-black'
          }`"
          placeholder="Last Name"
          required
          data-input-id="name"
          :disabled="isBtnName !== 'name'"
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
          v-model="profileStore.email"
          placeholder="info@gmail.com"
          class="border border-[#800080] w-full py-2 px-2 rounded outline-none text-gray-400"
          required
          disabled
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
          v-model="profileStore.phone_number"
          placeholder="(0900-345-9997-00)"
          :class="`border border-[#800080] w-full py-2 px-2 rounded outline-none ${
            isBtnName !== 'contact' ? 'text-gray-400' : 'text-black'
          }`"
          required
          data-input-id="contact"
          :disabled="isBtnName !== 'contact'"
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
          v-model="profileStore.social_link"
          placeholder="https://raverose"
          :class="`border border-[#800080] w-full py-2 px-2 rounded outline-none ${
            isBtnName !== 'social-link' ? 'text-gray-400' : 'text-black'
          }`"
          required
          data-input-id="social-link"
          :disabled="isBtnName !== 'social-link'"
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
import { useCreateClient } from "../_supabase/useCreateClient.js";
import { onMounted, ref } from "vue";

const store = useCreateClient();

const { storingError, profileStore, imageGetter } = storeToRefs(store);
const {
  handleSaveChange,
  handleFileChange,
  openFilePicker,
  handleDeleteUpload,
  getImageUrl,
} = store;

const buttons = ref();
const inputs = ref();
const isBtnName = ref("");
const isOpen = ref(false);
onMounted(() => {
  buttons.value = Array.from(document.querySelectorAll("[data-id]"));
  inputs.value = Array.from(document.querySelectorAll("[data-input-id]"));

  buttons.value.forEach((button) => {
    button.addEventListener("click", () => {
      const buttonName = button.dataset.name;
      isOpen.value = true;

      const matchingInput = inputs.value.find(
        (input) => input.dataset.inputId === buttonName
      );

      if (matchingInput) {
        handleEditBtn(buttonName, matchingInput.dataset.inputId);
      }
    });
  });
});

function handleEditBtn(buttonSetName, inputSetName) {
  console.log(buttonSetName);
  if (buttonSetName === inputSetName) {
    console.log("clicked", buttonSetName);
    isBtnName.value = buttonSetName;
  }
}

const closeBtn = () => {
  isOpen.value = false;
};

onMounted(() => {
  getImageUrl();
});

console.log("imageGetter", imageGetter.value);
</script>
