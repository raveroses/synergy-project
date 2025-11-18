<template>
  <div class="flex justify-between items-start w-full">
    <div class="w-[60%] flex flex-col gap-6">
      <h2 class="text-2xl font-bold">Welcome, Odekunle Waris</h2>
      <h2 class="text-[15px] font-semibold my-2">Quick actions</h2>
      <div>
        <button
          class="flex gap-3 border border-[#800080] p-1 rounded font-semibold text-[#800080]"
        >
          <span>
            <Send />
          </span>
          <span>Send funds</span>
        </button>
      </div>
      <div
        class="balance flex justify-between items-center border border-[#800080] rounded-xl p-6"
      >
        <div>
          <h2 class="text-xl text-[#800080] font-semibold">Balance</h2>
          <h1 class="text-4xl font-semibold my-3 text-[#800080]">$300,000</h1>
        </div>
        <div class="flex items-center gap-1 bg-gray-200 rounded p-2">
          <div class="text-white bg-[#800080] rounded-full p-1 text-[15px]">
            <BadgePlus />
          </div>
          <h2 class="text-[#800080] text-md font-medium">Top - up</h2>
        </div>
      </div>

      <div
        class="w-full flex justify-between items-center bg-gray-200 shadow rounded-xl p-6"
      >
        <div class="w-[40%]">
          <h2 class="text-xl font-medium">
            Get
            <span class="text-[#800080] font-semibold">
              $10 SingX wallet credit
            </span>
            for every friend you refer!
          </h2>
          <div class="flex items-center gap-2">
            <p class="text-[13px]">
              Referral code :
              <span class="bg-gray-300 text-[#800080] p-1 font-bold">
                4241256WE5
              </span>
            </p>
            <div class="bg-gray-200 rounded p-1">
              <Copy class="text-[12px]" />
            </div>
          </div>
        </div>

        <div class="w-[55%]">
          <img src="/images/referral.avif" alt="referral images " />
        </div>
      </div>
      <div class="flex gap-5 items-center">
        <div
          class="top flex justify-between items-center gap-2 bg-gray-200 shadow p-2 rounded"
        >
          <span class="text-semibold text-md font-medium text-[#800080]">
            Mobile Top-up
          </span>
          <span class="text-[14px] text-[#800080]">
            <TabletSmartphone />
          </span>
        </div>
        <div
          class="top flex justify-between items-center gap-2 bg-gray-200 shadow p-2 rounded"
        >
          <span class="text-semibold text-md font-medium text-[#800080]">
            Bill payments
          </span>
          <span class="text-[14px] text-[#800080]">
            <ReceiptText />
          </span>
        </div>
      </div>
    </div>
    <div class="w-[36%] bg-gray-200 p-2 flex flex-col gap-5">
      <h2 class="text-[#800080] font-medium text-[16px]">Latest Transaction</h2>
      <form class="bg-white flex justify-between p-2">
        <input
          type="text"
          class="w-full outline-none"
          placeholder="Search recipient name..."
        />
        <button><Search /></button>
      </form>
      <div class="flex flex-col">
        <div class="user flex items-center justify-between">
          <div class="username-image flex items-center gap-1">
            <div class="">
              <img
                src="/images/bene.jpg"
                alt="user-image"
                class="rounded-full w-12"
              />
            </div>
            <h2 class="text-[18px] font-semibold text-[#800080]">
              Odekunle Waris
            </h2>
          </div>
          <div class="time font-semibold text-[#800080]">18/11/2025</div>
          <div class="font-semibold text-[#800080]">$9000</div>
        </div>
      </div>
      <div>
        <p class="text-[18px] text-[#800080] font-semibold">
          Verify your KYC to increase your account level and limits
        </p>
      </div>
      <div>
        <image
          src="/images/padlock.jpg"
          class="w-full h-[150px] object-center object-cover"
        />
      </div>
    </div>
  </div>

  <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
  <div class="absolute top-20 left-[35%] w-[600px] p-6 rounded-xl bg-white ">
    <div class="flex gap-40 font-bold my-10">
      <h1 class="text-[#800080] text-[20px]">Synergy</h1>
      <h2 class="text-xl text-center">Send funds</h2>
    </div>
    <form class="flex flex-col gap-5">
      <div>
        <label for="account name" class="text-[14px] font-semibold">Account Number</label>
        <input type="text" class="w-full border border-[#800080] p-3 rounded" />
        <div>Balance 300000</div>
      </div>
      <div>
        <label for="account name" class="text-[14px] font-semibold">Account Name</label>
        <input type="text" class="w-full border border-[#800080] p-3 rounded" />
        <div>Account Name :Odekunle waris</div>
      </div>
      <div>
        <label for="account name" class="text-[14px] font-semibold">Amount</label>
        <div class=" flex items-center gap-1">
          <span class="bg-gray-400 text-white p-3 rounded"><DollarSign /></span>
          <input
            type="text"
            class="w-full border border-[#800080] p-3 rounded"
          />
        </div>
      </div>
      <button
        class="bg-[#800080] text-white text-center p-3 rounded font-semibold"
      >
        Send funds
      </button>
    </form>
  </div>
</template>

<script setup>
import {
  BadgePlus,
  Copy,
  DollarSign,
  ReceiptText,
  Search,
  Send,
  TabletSmartphone,
} from "lucide-vue-next";
</script>
