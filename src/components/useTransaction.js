import { defineStore } from "pinia";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useToast } from "vue-toast-notification";

export const useTransaction = defineStore("detail", () => {
  const isTransfer = ref(false);
  const isLoan = ref(false);
  const toast = useToast();
  let transactionHistory = ref(
    JSON.parse(localStorage.getItem("history")) || []
  );

  const totalSaving = computed(() => {
    return transactionHistory.value.reduce((acc, item) => {
      if ("savingsMoney" in item) {
        return acc + Number(item.savingsMoney || 0);
      }
      return acc;
    }, 0);
  });

  const totalLoan = computed(() => {
    return transactionHistory.value.reduce((acc, item) => {
      if ("loanAmount" in item) {
        return acc + Number(item.loanAmount || 0);
      }
      return acc;
    }, 0);
  });

  console.log(totalLoan.value);

  let acctDetail = ref(
    JSON.parse(localStorage.getItem("acctDetail")) || {
      accountName: "",
      acctNumber: "",
      savingsMoney: "",
      savingsDate: null,
    }
  );
  let loanDetail = ref(
    JSON.parse(localStorage.getItem("loanDetail")) || {
      acctName: "",
      acctNumber: "",
      loanAmount: "",
      loanDate: null,
    }
  );
  const handleIsTransfer = (event) => {
    event.stopPropagation();
    isTransfer.value = true;
  };
  const handleIsLoan = (event) => {
    event.stopPropagation();
    isLoan.value = true;
  };

  const savingFund = ref({
    savingsMoney: null,
    acctNumber: "",
    accountName: "",
    handleValidation: function () {
      if (isNaN(Number(this.savingsMoney)) || !this.savingsMoney) {
        toast.error("Please, Input valid Amount");
        console.log("Please, Input valid Amount");
        return;
      }

      if (!this.accountName) {
        toast.error("Please, Input valid Account Name");
        console.log("Please, Input valid Account Name");
        return;
      }

      if (
        isNaN(Number(this.acctNumber)) ||
        !this.acctNumber ||
        !this.acctNumber
      ) {
        toast.error("Please, Input valid Number");
        console.log("Please, Input valid Number");
        return;
      }

      if (Number(this.acctNumber) !== Number(8163700384)) {
        toast.error("Please, enter account number on the screen");
        console.log("Please, enter account number on the screen");
        return;
      }
      return true;
    },

    handleSubmission: function () {
      try {
        if (!this.handleValidation()) return;

        acctDetail.value = {
          accountName: this.accountName,
          acctNumber: this.acctNumber,
          savingsMoney: this.savingsMoney,
          savingsDate: new Date(),
        };

        transactionHistory.value.push(acctDetail.value);
        localStorage.setItem(
          "history",
          JSON.stringify(transactionHistory.value)
        );

        localStorage.setItem("acctDetail", JSON.stringify(acctDetail.value));
        console.log("Saved:", JSON.parse(JSON.stringify(acctDetail.value)));
        this.accountName = "";
        this.acctNumber = "";
        this.savingsMoney = "";
      } catch (e) {
        console.log(e.message);
      }
    },
  });

  function Loans(acctName, loanAmount, acctNumber) {
    this.acctName = acctName;
    this.acctNumber = acctNumber;
    this.loanAmount = loanAmount;
    this.handleValidation = function () {
      if (isNaN(Number(this.loanAmount)) || !this.loanAmount) {
        toast.error("Please, Input valid Amount");
        console.log("Please, Input valid Amount");
        return;
      }

      if (!this.acctName) {
        toast.error("Please, Input valid Account Name");
        console.log("Please, Input valid Account Name");
        return;
      }

      if (isNaN(Number(this.acctNumber)) || !this.acctNumber) {
        toast.error("Please, Input valid Number");
        console.log("Please, Input valid Number");
        return;
      }

      if (Number(this.acctNumber) !== 8163700384) {
        toast.error("Please, enter account number on the screen");
        console.log("Please, enter account number on the screen");
        return;
      }

      // eligibility

      const saving = Number(totalSaving.value);
      const loan = Number(this.loanAmount);

      if (loan > 100000) {
        toast.error("Sorry, we can't borrow you more than 100,000");
        return;
      }

      if (loan >= 50000 && saving < 10000) {
        toast.error(
          "Eligibility failed. You must have at least ₦10,000 in savings."
        );
        return;
      }

      if (loan > 50000 && saving < 20000) {
        toast.error(
          "Eligibility failed. You must have at least ₦20,000 in savings."
        );
        return;
      }

      return true;
    };
    this.handleSubmission = function () {
      try {
        if (!this.handleValidation()) return;
        loanDetail.value = {
          acctName: this.acctName,
          acctNumber: this.acctNumber,
          loanAmount: this.loanAmount,
          loanDate: new Date(),
        };

        // localStorage.setItem("loanstore", JSON.stringify(loanDetail.value));

        transactionHistory.value.push(loanDetail.value);
        localStorage.setItem(
          "history",
          JSON.stringify(transactionHistory.value)
        );
        localStorage.setItem("loanDetail", JSON.stringify(loanDetail.value));

        console.log("Saved:", JSON.parse(JSON.stringify(loanDetail.value)));
        this.acctName = "";
        this.acctNumber = "";
        this.loanAmount = "";
      } catch (e) {
        console.log(e.message);
      }
    };
  }
  const userLoan = ref(new Loans());

  return {
    isTransfer,
    isLoan,
    totalSaving,
    acctDetail,
    loanDetail,
    handleIsTransfer,
    handleIsLoan,
    savingFund,
    userLoan,
    totalLoan,
  };
});
