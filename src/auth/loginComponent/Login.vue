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
        {{ loading ? "Redirecting to Google " : "Continue with Google " }}</span
      >
    </button>

    <div class="flex items-center justify-center gap-2 my-5">
      <div class="w-[230px] h-0.5 bg-gray-400"></div>
      <div class="text-md font-bold">Or</div>
      <div class="w-[230px] h-0.5 bg-gray-400"></div>
    </div>

    <form class="flex flex-col gap-10 my-10" @submit.prevent="handleSubmission">
      <div class="name">
        <div class="flex justify-between mb-1">
          <label for="email" class="text-[15px] font-semibold">Email</label>
          <div>{{ signInError.emailError }}</div>
        </div>

        <input
          type="email"
          v-model="signIn.email"
          class="outline-none w-full border border-[#800080] p-3 rounded"
          required
        />
      </div>
      <div class="name">
        <div class="flex justify-between mb-1">
          <label for="password" class="text-[15px] font-semibold"
            >Password</label
          >
          <div>{{ signInError.passwordError }}</div>
        </div>
        <div
          class="w-full border border-[#800080] p-3 rounded flex justify-between"
        >
          <input
            :type="isPasswordVisible ? 'text' : 'password'"
            class="w-[500px] outline-none"
            v-model="signIn.password"
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
        class="bg-[#800080] text-white w-full p-3 text-[15px] font-semibold rounded cursor-pointer"
        type="submit"
      >
        {{ signInLoading ? "Redirecting..." : " Sign in" }}
      </button>

      <router-link to="reset-password">
        <h1 class="text-center text-[#800080] pt-2 text-[14px] font-semibold">
          Forgot password
        </h1>
      </router-link>
    </form>
    <router-link to="/signup">
      <p
        class="text-center text-[#800080] pt-2 text-[15px] font-semibold cursor-pointer"
      >
        Don't have an acoount , Signup here
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
import { useRouter } from "vue-router";
import { useCreateClient } from "@/_supabase/useCreateClient";
import { storeToRefs } from "pinia";
import { Eye, EyeOff } from "lucide-vue-next";
import { ref } from "vue";

const store = useCreateClient();
const { signInLoading, signInError, signIn, loading } = storeToRefs(store);

const { handleSignIn, handleOnTimeSignIn } = store;
const router = useRouter();
const handleSubmission = async () => {
  await handleSignIn(router);
};

const isPasswordVisible = ref(false);
const handleIsPasswordVisible = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
</script>
