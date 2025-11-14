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
          <h2>Odekunle Waris</h2>
        </div>
        <button class="px-2 rounded border border-gray-200">Edit</button>
      </div>
      <div class="flex justify-between items-center">
        <div>
          <h2 class="font-semibold text-[16px]">Contact</h2>
          <h2>Phone: +9024986450</h2>
          <h2>Email :odekunlewaris@gmail.com</h2>
        </div>
        <button class="px-2 rounded border border-gray-200">Edit</button>
      </div>
      <div class="flex justify-between items-center">
        <div>
          <h2 class="font-semibold text-[16px]">Social Media</h2>
          <h2>Linkdein: https//:odekunlewaris</h2>
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
  >
    <div class="flex justify-between">
      <h2 class="font-semibold text-xl">Edit personal Information</h2>
      <X />
    </div>

    <div class="flex justify-between items-center my-5">
      <div class="firstname">
        <div class="flex justify-between items-center">
          <label for="first">First name</label>
          <p class="error">Wrong format</p>
        </div>
        <input
          type="text"
          placeholder="First Name"
          class="border border-[#800080] w-[250px] py-2 px-2 rounded text-white outline-none"
        />
      </div>

      <div class="secondname">
        <div class="flex justify-between items-center">
          <label for="lastName">Last name</label>
          <p class="error">Wrong format</p>
        </div>
        <input
          type="text"
          class="border border-[#800080] w-[250px] py-2 px-2 rounded text-white outline-none"
          placeholder="Last Name"
        />
      </div>
    </div>

    <div class="flex flex-col gap-5">
      <div class="email">
        <div class="flex justify-between items-center">
          <label for="email">Email address</label>
          <p class="error">Wrong format</p>
        </div>
        <input
          type="email"
          placeholder="info@gmail.com"
          class="border border-[#800080] w-full py-2 px-2 rounded text-white outline-none"
        />
      </div>
      <div class="number">
        <div class="flex justify-between items-center">
          <label for="email">Phone Number</label>
          <p class="error">Wrong format</p>
        </div>
        <input
          type="tel"
          placeholder="(0900-345-9997-00)"
          class="border border-[#800080] w-full py-2 px-2 rounded text-white outline-none"
        />
      </div>
      <div class="social">
        <div class="flex justify-between items-center">
          <label for="email">Linkedin Link</label>
          <p class="error">Wrong format</p>
        </div>
        <input
          type="text"
          placeholder="https://raverose"
          class="border border-[#800080] w-full py-2 px-2 rounded text-white outline-none"
        />
      </div>
    </div>
    <div class="flex justify-end">
      <button
        class="bg-[#800080] text-white p-3 rounded-[5px] font-[15px] my-5"
      >
        Save changes
      </button>
    </div>
  </form>
  <!-- <div class="fixed inset-0 bg-black/50 backdrop-blur-sm"></div> -->
</template>

<script setup>
import { Check, Trash2, Upload, X } from "lucide-vue-next";
</script>
