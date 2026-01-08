<template>
  <div class="flex md:justify-between md:p-[100px] md:flex-row flex-col p-5">
    <form class="flex flex-col gap-5" @submit.prevent="handleUpdate">
      <div
        class="bg-gray-300 rounded-full w-[50px] h-[50px] flex justify-center items-center"
      >
        <component :is="Lock" class="text-2xl" />
      </div>
      <h1 class="text-2xl font-medium">Change your password</h1>
      <p class="text-[16px] text-gray-500">
        To change your password, please fill in the fields below.
      </p>
      <div class="flex flex-col gap-3">
        <h1 class="text-[15px] font-semibold">create new Password</h1>
        <div
          class="md:w-[600px] w-full border border-[#800080] p-3 rounded flex items-center justify-between"
        >
          <input
            :type="isNewPasswordVisible ? 'text' : 'password'"
            class="w-[500px] outline-none"
            v-model="changePassword.newPassword"
          />
          <div @click="handleIsNewPasswordVisible" class="cursor-pointer font-semibold">
            <component :is="isNewPasswordVisible ? Eye : EyeOff" />
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-3">
        <h1 class="text-[15px] font-semibold">confirm new Password</h1>
        <div
          class="md:w-[600px] w-full border border-[#800080] p-3 rounded flex items-center justify-between"
        >
          <input
            :type="isConfirmPasswordVisible ? 'text' : 'password'"
            class="w-[500px] outline-none"
            v-model="changePassword.confirmPassword"
          />
          <div @click="handleIsConfirmPasswordVisible" class="cursor-pointer font-semibold">
            <component :is="isConfirmPasswordVisible ? Eye : EyeOff" />
          </div>
        </div>
      </div>

      <button
        type="submit"
        class="bg-[#800080] text-white text-[15px] font-semibold p-3 rounded cursor-pointer"
      >
        {{ updateingPassword ? "Updating..." : "Update Password" }}
      </button>
    </form>

    <div class="image w-[600px] h-[600px] md:block hidden">
      <img
        src="/images/padlock.jpg"
        alt="winpenn-image"
        class="w-full h-full rounded-full object-cover"
      />
    </div>
  </div>
</template>

<script setup>
import { Eye, EyeOff, Lock } from "lucide-vue-next";

import { useRouter } from "vue-router";
import { useCreateClient } from "@/_supabase/useCreateClient";
import { storeToRefs } from "pinia";

const store = useCreateClient();
const {
  changePassword,
  isNewPasswordVisible,
  isConfirmPasswordVisible,
  updateingPassword,
} = storeToRefs(store);

const {
  handlePasswordUpdated,
  handleIsNewPasswordVisible,
  handleIsConfirmPasswordVisible,
} = store;
const router = useRouter();
const handleUpdate = async () => {
  console.log("Im clicked");
  await handlePasswordUpdated(router);
};
</script>
