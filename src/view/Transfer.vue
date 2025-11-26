<!-- @click="handleIsTransfer" -->
<!-- @click="handleIsLoan" -->

<template>
  <div class="flex justify-between items-start w-full relative">
    <div class="w-[60%] flex flex-col gap-6">
      <h2 class="text-2xl font-bold">Welcome, Odekunle Waris</h2>
      <h2 class="text-[15px] font-semibold my-2">Quick actions</h2>
      <div class="flex items-center justify-between">
        <button
          class="flex gap-3 border border-[#800080] p-2 rounded font-semibold text-[#800080] cursor-pointer"
          v-for="item in btnList"
          :key="item.btnName"
          @click="
            item.btnName === 'Save Funds'
              ? handleIsisSavings($event)
              : item.btnName === 'Secure Loan'
              ? handleIsLoan($event)
              : item.btnName === 'Repay Loan'
              ? handleIsRepayment($event)
              : item.btnName === 'Transfer Funds'
              ? handleIsTransferFund($event)
              : null
          "
        >
          <span>
            <component :is="item.btnIcon" />
          </span>
          <span>{{ item.btnName }}</span>
        </button>
      </div>
      <div
        class="balance flex flex-col justify-between gap-5 border border-[#800080] rounded-xl p-6"
      >
        <div class="flex justify-between text-[#800080]">
          <div class="font-semibold">Account Number</div>
          <div class="font-bold text-[18px]">8163700384</div>
        </div>

        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-xl text-[#800080] font-semibold">Balance</h2>
            <h1
              class="text-4xl font-semibold my-3 text-[#800080] flex items-center"
            >
              <span> {{ formattedTotalSaving }} </span>
            </h1>
          </div>

          <div class="flex items-center gap-1 bg-gray-200 rounded p-2">
            <div class="text-white bg-[#800080] rounded-full p-1 text-[15px]">
              <BadgePlus />
            </div>
            <h2 class="text-[#800080] text-md font-medium">Top - up</h2>
          </div>
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

  <div
    class="savings absolute top-20 left-[35%] w-[600px] p-6 rounded-xl bg-white z-20"
    v-show="isSavings"
  >
    <div class="flex gap-40 font-bold my-10">
      <h1 class="text-[#800080] text-[20px]">Synergy</h1>
      <h2 class="text-xl text-center">Save funds</h2>
    </div>
    <form
      class="flex flex-col gap-5"
      @submit.prevent="savingFund.handleSubmission"
    >
      <div>
        <label for="account name" class="text-[14px] font-semibold"
          >Account Number</label
        >
        <input
          type="text"
          class="w-full border border-[#800080] p-3 rounded outline-none"
          v-model="savingFund.accountNumber"
        />
        <div>
          <span>Balance :</span> <span>{{ savingFund.savingsMoney }}</span>
        </div>
      </div>
      <div>
        <label for="account name" class="text-[14px] font-semibold"
          >Account Name</label
        >
        <input
          type="text"
          v-model="savingFund.accountName"
          class="w-full border border-[#800080] p-3 rounded outline-none"
          disabled
        />
        <div>
          Account Name :<span> {{ savingFund.accountName }}</span>
        </div>
      </div>
      <div>
        <label for="account name" class="text-[14px] font-semibold"
          >Amount</label
        >
        <div class="flex items-center gap-1">
          <span class="bg-gray-400 text-white p-3 rounded"><NairaIcon /></span>
          <input
            type="text"
            v-model="savingFund.savingsMoney"
            class="w-full border border-[#800080] p-3 rounded outline-none"
          />
        </div>
      </div>
      <button
        type="submit"
        class="bg-[#800080] text-white text-center p-3 rounded font-semibold"
      >
        Save funds
      </button>
    </form>
  </div>

  <div
    class="loan absolute top-20 left-[35%] w-[600px] p-6 rounded-xl bg-white z-20"
    v-show="isLoan"
  >
    <div class="flex gap-40 font-bold my-10">
      <h1 class="text-[#800080] text-[20px]">Synergy</h1>
      <h2 class="text-xl text-center">Loan Application</h2>
    </div>
    <form
      class="flex flex-col gap-5"
      @submit.prevent="userLoan.handleSubmission"
    >
      <div>
        <label for="account name" class="text-[14px] font-semibold"
          >Account Number</label
        >
        <input
          type="text"
          v-model="userLoan.accountNumber"
          class="w-full border border-[#800080] p-3 rounded outline-none"
        />
        <div>
          <span>Balance :</span> <span>{{ userLoan.amount }}</span>
        </div>
      </div>
      <div>
        <label for="account name" class="text-[14px] font-semibold"
          >Account Name</label
        >
        <input
          type="text"
          v-model="userLoan.accountName"
          class="w-full border border-[#800080] p-3 rounded outline-none"
          disabled
        />
        <div>
          Account Name :<span>{{ userLoan.accountName }}</span>
        </div>
      </div>
      <div>
        <label for="account name" class="text-[14px] font-semibold"
          >Amount</label
        >
        <div class="flex items-center gap-1">
          <span class="bg-gray-400 text-white p-3 rounded"><NairaIcon /></span>
          <input
            type="text"
            v-model="userLoan.loanAmount"
            class="w-full border border-[#800080] p-3 rounded outline-none"
          />
        </div>
      </div>
      <button
        type="submit"
        class="bg-[#800080] text-white text-center p-3 rounded font-semibold"
      >
        Apply Loan
      </button>
    </form>
  </div>
  <div
    class="transferFund absolute top-20 left-[35%] w-[600px] p-6 rounded-xl bg-white z-20"
    v-show="isTransferFund"
  >
    <div class="flex gap-40 font-bold my-10">
      <h1 class="text-[#800080] text-[20px]">Synergy</h1>
      <h2 class="text-xl text-center">Transfer</h2>
    </div>
    <form
      class="flex flex-col gap-5"
      @submit.prevent="handleTransferSubmission"
    >
      <div>
        <label for="account name" class="text-[14px] font-semibold"
          >Account Number</label
        >
        <input
          type="text"
          v-model="transferDetail.accountNumber"
          class="w-full border border-[#800080] p-3 rounded outline-none"
        />
        <div>
          <span>Balance :</span>
          <span>{{ transferDetail.transferAmount }}</span>
        </div>
      </div>
      <div>
        <label for="account name" class="text-[14px] font-semibold"
          >Account Name</label
        >
        <input
          type="text"
          v-model="transferDetail.accountName"
          class="w-full border border-[#800080] p-3 rounded outline-none"
        />
        <div>
          Account Name :<span>{{ transferDetail.accountName }}</span>
        </div>
      </div>
      <div>
        <label for="account name" class="text-[14px] font-semibold"
          >Amount</label
        >
        <div class="flex items-center gap-1">
          <span class="bg-gray-400 text-white p-3 rounded"><NairaIcon /></span>
          <input
            type="text"
            v-model="transferDetail.transferAmount"
            class="w-full border border-[#800080] p-3 rounded outline-none"
          />
        </div>
      </div>
      <button
        type="submit"
        class="bg-[#800080] text-white text-center p-3 rounded font-semibold"
      >
        Send Money
      </button>
    </form>
  </div>
  <div
    class="repayment absolute top-20 left-[35%] w-[600px] p-6 rounded-xl bg-white z-20"
    v-show="isRepayment"
  >
    <div class="flex gap-40 font-bold my-10">
      <h1 class="text-[#800080] text-[20px]">Synergy</h1>
      <h2 class="text-xl text-center">Loan Repayment</h2>
    </div>
    <form
      class="flex flex-col gap-5"
      @submit.prevent="handleRepaymentSubmission"
    >
      <div>
        <label for="account name" class="text-[14px] font-semibold"
          >Account Number</label
        >
        <input
          type="text"
          v-model="repaymentDetail.accountNumber"
          class="w-full border border-[#800080] p-3 rounded outline-none"
        />
        <div>
          <span>Balance :</span> <span>{{ repaymentDetail.amount }}</span>
        </div>
      </div>
      <div>
        <label for="account name" class="text-[14px] font-semibold"
          >Account Name</label
        >
        <input
          type="text"
          v-model="repaymentDetail.accountName"
          class="w-full border border-[#800080] p-3 rounded outline-none"
        />
        <div>
          Account Name :<span>{{ repaymentDetail.accountName }}</span>
        </div>
      </div>
      <div>
        <label for="account name" class="text-[14px] font-semibold"
          >Amount</label
        >
        <div class="flex items-center gap-1">
          <span class="bg-gray-400 text-white p-3 rounded"><NairaIcon /></span>
          <input
            type="text"
            v-model="repaymentDetail.amount"
            class="w-full border border-[#800080] p-3 rounded outline-none"
          />
        </div>
      </div>
      <button
        type="submit"
        class="bg-[#800080] text-white text-center p-3 rounded font-semibold"
      >
        Pay Loan
      </button>
    </form>
  </div>
  <div
    class="absolute inset-0 bg-black/50 backdrop-blur-sm"
    v-show="isSavings || isLoan || isRepayment || isTransferFund"
  ></div>
</template>

<script setup>
import { useTransaction } from "../components/useTransaction";
import { storeToRefs } from "pinia";
import {
  BadgePlus,
  Copy,
  // DollarSign,
  ReceiptText,
  Search,
  Send,
  TabletSmartphone,
} from "lucide-vue-next";
import NairaIcon from "../components/icons/NairaIcon.vue";
import { onMounted } from "vue";
import { onBeforeUnmount, ref } from "vue";
const fundsDetail = useTransaction();
const {
  isSavings,
  isLoan,
  formattedTotalSaving,
  savingFund,
  userLoan,
  isRepayment,
  isTransferFund,
  repaymentDetail,
  transferDetail,
} = storeToRefs(fundsDetail);

const {
  handleIsisSavings,
  handleIsLoan,
  handleIsRepayment,
  handleIsTransferFund,
  handleRepaymentSubmission,
  handleTransferSubmission,
} = fundsDetail;

const btnList = ref([
  {
    btnName: "Save Funds",
    btnIcon: Send,
  },
  {
    btnName: "Secure Loan",
    btnIcon: Send,
  },
  {
    btnName: "Repay Loan",
    btnIcon: Send,
  },
  {
    btnName: "Transfer Funds",
    btnIcon: Send,
  },
]);

onMounted(() => {
  const savings = document.querySelector(".savings");
  const loan = document.querySelector(".loan");
  const repayment = document.querySelector(".repayment");
  const transferFund = document.querySelector(".transferFund");

  console.log(repayment);
  const handleDocumentClick = (e) => {
    const target = e.target;

    if (!(target instanceof Node)) return;

    if (isSavings.value && savings && !savings.contains(target)) {
      isSavings.value = false;
    }

    if (isLoan.value && loan && !loan.contains(target)) {
      isLoan.value = false;
    }
    if (isRepayment.value && repayment && !repayment.contains(target)) {
      isRepayment.value = false;
    }
    if (
      isTransferFund.value &&
      transferFund &&
      !transferFund.contains(target)
    ) {
      isTransferFund.value = false;
    }
  };

  window.addEventListener("click", handleDocumentClick);

  onBeforeUnmount(() => {
    window.removeEventListener("click", handleDocumentClick);
  });
});
</script>
