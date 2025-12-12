<template>
  <div>
    <h2 class="text-2xl font-bold text-[#800080]">SYNERGY</h2>
    <h2 class="w-full text-[35px] font-semibold my-10">
      Keep your online business organized
    </h2>

    <button
      class="flex items-center gap-5 border border-[#800080] p-2 w-full justify-center rounded"
    >
      <img src="/images/google.png" alt="google-image" class="w-[30px]" />
      <span class="font-semibold"> Sign in with Google </span>
    </button>

    <div class="flex items-center justify-start gap-2 my-3">
      <div class="w-[230px] h-0.5 bg-gray-400"></div>
      <div class="text-md font-bold">Or</div>
      <div class="w-[230px] h-0.5 bg-gray-400"></div>
    </div>

    <form class="flex flex-col gap-10">
      <div class="name">
        <div class="flex justify-between mb-1">
          <label for="email">Email</label>
          <div>Error</div>
        </div>
        <input
          type="email"
          class="w-full border border-[#800080] p-3 rounded outline-none"
        />
      </div>
      <div class="name">
        <div class="flex justify-between mb-1">
          <label for="password">Password</label>
          <div>Error</div>
        </div>
        <input
          type="password"
          class="w-full border border-[#800080] p-3 rounded outline-none"
        />
      </div>

      <button
        class="bg-[#800080] text-white w-full p-3 text-[15px] font-semibold rounded"
      >
        Sign in
      </button>
    </form>
  </div>

  <div>
    <img
      src="/images/chart.jpeg"
      alt="chart-images"
      class="w-[800px] h-[800px]"
    />
  </div>
</template>
<script setup
></script>