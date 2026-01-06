<template>
  <div>
    <h2 class="md:text-2xl text-xl font-bold text-[#800080]">SYNERGY</h2>
    <h2 class="w-full md:text-[35px] text-[25px] font-semibold my-10">
      Keep your online business organized
    </h2>

    <button
      class="flex items-center gap-5 border border-[#800080] p-2 w-full justify-center rounded cursor-pointer"
      @click="handleOnTimeSignIn"
    >
      <img src="/images/google.png" alt="google-image" class="w-[30px]" />
      <span class="font-semibold">
        {{ loading ? "Redirecting to Google..." : "Continue with Google" }}
      </span>
    </button>

    <div class="flex items-center justify-center gap-2 my-3">
      <div class="w-[230px] h-0.5 bg-gray-400"></div>
      <div class="text-md font-bold">Or</div>
      <div class="w-[230px] h-0.5 bg-gray-400"></div>
    </div>

    <form class="flex flex-col gap-10" @submit.prevent="submit">
      <div class="name">
        <div class="flex justify-between mb-1">
          <label for="firstname">First Name</label>
          <div>{{ signUpUserError.userName }}</div>
        </div>
        <input
          type="text"
          v-model="signUpUser.userName"
          required
          class="w-full border border-[#800080] p-3 rounded outline-none"
        />
      </div>
      <div class="name">
        <div class="flex justify-between mb-1">
          <label for="email">Email</label>
          <div>{{ signUpUserError.email }}</div>
        </div>
        <input
          type="email"
          v-model="signUpUser.email"
          required
          class="w-full border border-[#800080] p-3 rounded outline-none"
        />
      </div>
      <div class="name">
        <div class="flex justify-between mb-1">
          <label for="password">Password</label>
          <div>{{ signUpUserError.password }}</div>
        </div>
        <input
          type="password"
          v-model="signUpUser.password"
          required
          class="w-full border border-[#800080] p-3 rounded outline-none"
        />
      </div>

      <button
        type="submit"
        class="bg-[#800080] text-white w-full p-3 text-[15px] font-semibold rounded"
      >
        {{ signUpLoading ? " Redirecting ..." : " Create account" }}
      </button>
    </form>
    <router-link to="/login">
      <p class="text-center text-[#800080] pt-2">
        Already have account , Login here
      </p>
    </router-link>
  </div>

  <div class="md:block hidden">
    <img
      src="/images/chart.jpeg"
      alt="chart-images"
      class="w-[800px] h-[800px]"
    />
  </div>
</template>

<script setup>
import { useCreateClient } from "@/_supabase/useCreateClient";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const store = useCreateClient();
const { loading, signUpLoading, signUpUserError, signUpUser } =
  storeToRefs(store);

const { handleOnTimeSignIn, handleAccountCreation } = store;

const router = useRouter();

const submit = async () => {
  await handleAccountCreation(router);
};
</script>
