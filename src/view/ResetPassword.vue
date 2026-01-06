<template>
  <div class="flex flex-col gap-5 justify-center w-full my-[200px]">
    <div class="text-center text-[#800080]">
      <h1 class="text-4xl font-semibold">Reset Password</h1>
      <p>We'll eamil you a link to reset your password</p>
    </div>

    <form class="md:mx-auto flex flex-col gap-6" @submit.prevent="">
      <div class="flex items-center gap-3 bg-[#800080] p-3 rounded w-full">
        <div class="text-white">
          <MailsIcon />
        </div>
        <input
          type="email"
          class="md:w-[400px] w-full outline-none text-white"
          placeholder="Enter your email @ ..."
          v-model="resetPasswordDetail.resetEmail"
          required
        />
      </div>
      <button
        type="submit"
        @click="handleEmailSender"
        class="bg-[#800080] text-[14px] text-white md:w-[500px] w-full p-3 rounded text-center font-semibold cursor-pointer"
      >
        send an email
      </button>

      <router-link to="/login"
        ><div
          class="text-[14px] text-[#800080] flex items-center gap-2 font-semibold justify-center"
        >
          <h1><ChevronLeft /></h1>
          <h1>Go back to Login</h1>
        </div></router-link
      >
    </form>
  </div>
</template>

<script setup>
import { MailsIcon } from "lucide-vue-next";
import { ChevronLeft } from "lucide-vue-next";
import { useCreateClient } from "../_supabase/useCreateClient.js";
import { storeToRefs } from "pinia";

const store = useCreateClient();
const { resetPasswordDetail } = storeToRefs(store);
const { handleEmailSender } = store;
</script>
