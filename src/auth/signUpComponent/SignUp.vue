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

    <div class="flex items-center justify-center gap-2 my-10">
      <div class="w-[230px] h-0.5 bg-gray-400"></div>
      <div class="text-md font-bold">Or</div>
      <div class="w-[230px] h-0.5 bg-gray-400"></div>
    </div>

    <form class="flex flex-col gap-10 my-10" @submit.prevent="submit">
      <div class="name">
        <div class="flex justify-between mb-1">
          <label for="firstname" class="text-[15px] font-semibold"
            >First Name</label
          >
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
          <label for="email" class="text-[15px] font-semibold">Email</label>
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
          <label for="password" class="text-[15px] font-semibold"
            >Password</label
          >
          <div>{{ signUpUserError.password }}</div>
        </div>
        <div
          class="w-full border border-[#800080] p-3 rounded flex justify-between"
        >
          <input
            :type="isPasswordVisible ? 'text' : 'password'"
            class="w-[500px] outline-none"
            v-model="signUpUser.password"
            required
          />

          <div
            class="cursor-pointer font-semibold"
            @click="handleIsPasswordVisible"
          >
            <component :is="isPasswordVisible ? Eye : EyeOff" />
          </div>
        </div>
      </div>

      <button
        type="submit"
        class="bg-[#800080] text-white w-full p-3 text-[15px] font-semibold rounded cursor-pointer"
      >
        {{ signUpLoading ? " Redirecting ..." : " Create account" }}
      </button>
    </form>
    <router-link to="/login">
      <p class="text-center text-[#800080] pt-2 font-semibold">
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
import { useCreateClient } from "@/_supabase/useCreateClient.js";
import { Eye, EyeOff } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

const store = useCreateClient();
const { loading, signUpLoading, signUpUserError, signUpUser } =
  storeToRefs(store);

const { handleOnTimeSignIn, handleAccountCreation } = store;

const router = useRouter();

const submit = async () => {
  await handleAccountCreation(router);
};
const isPasswordVisible = ref(false);
const handleIsPasswordVisible = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
</script>
