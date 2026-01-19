import { defineStore } from "pinia";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useToast } from "vue-toast-notification";

export const useTransaction = defineStore("detail", () => {
  const isSavings = ref(false);
  const isLoan = ref(false);
  const isTransferFund = ref(false);
  const isRepayment = ref(false);
  const toast = useToast();
  const repaymentDetail = ref(
    JSON.parse(localStorage.getItem("repaymentDetail")) || {
      accountName: "",
      accountNumber: null,
      amount: null,
      date: null,
      id: null,
    }
  );

  let acctDetail = ref(
    JSON.parse(localStorage.getItem("acctDetail")) || {
      accountName: "",
      accountNumber: null,
      savingsMoney: null,
      date: null,
      id: null,
    }
  );
  let loanDetail = ref(
    JSON.parse(localStorage.getItem("loanDetail")) || {
      accountName: "",
      accountNumber: null,
      loanAmount: null,
      date: null,
      id: null,
    }
  );

  let transferDetail = ref(
    JSON.parse(localStorage.getItem("transferDetail")) || {
      accountName: "",
      accountNumber: null,
      transferAmount: null,
      date: null,
      id: null,
    }
  );

  const repaymentHistory = ref(
    JSON.parse(localStorage.getItem("repaymentHistory")) || []
  );

  let transactionHistory = ref(
    JSON.parse(localStorage.getItem("history")) || []
  );

  const totalSaving = computed(() => {
    return transactionHistory.value.reduce((acc, item) => {
      if ("savingsMoney" in item) {
        acc += Number(item.savingsMoney) || 0;
      }
      if ("transferAmount" in item) {
        acc -= Number(item.transferAmount) || 0;
      }
      return acc;
    }, 0);
  });

  const totalLoan = computed(() => {
    const totalBorrowed = transactionHistory.value.reduce((acc, item) => {
      if ("loanAmount" in item) {
        return acc + Number(item.loanAmount);
      }
      return acc;
    }, 0);

    const totalRepaid =
      repaymentHistory.value.length > 0
        ? repaymentHistory.value.reduce(
            (accum, cur) => accum + Number(cur.amount),
            0
          )
        : 0;

    if (totalBorrowed - totalRepaid < 0) {
      toast.error("You have no outstanding debt to pay");
      return 0;
    }
    return totalBorrowed - totalRepaid;
  });

  const formattedTotalLoan = computed(() => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(totalLoan.value);
  });
  const formattedTotalSaving = computed(() => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(totalSaving.value);
  });

  const handleIsisSavings = (event) => {
    event.stopPropagation();
    isSavings.value = true;
  };
  const handleIsLoan = (event) => {
    event.stopPropagation();
    isLoan.value = true;
  };
  const handleIsTransferFund = (event) => {
    event.stopPropagation();
    isTransferFund.value = true;
  };
  const handleIsRepayment = (event) => {
    event.stopPropagation();
    isRepayment.value = true;
  };

  const savingFund = ref({
    savingsMoney: null,
    accountNumber: null,
    accountName: "odekunle waris ",
    handleValidation: function () {
      if (isNaN(Number(this.savingsMoney)) || !this.savingsMoney) {
        toast.error("Please, Input valid Amount");
        console.log("Please, Input valid Amount");
        return;
      }

      if (
        isNaN(Number(this.accountNumber)) ||
        !this.accountNumber ||
        !this.accountNumber
      ) {
        toast.error("Please, Input valid Number");
        console.log("Please, Input valid Number");
        return;
      }

      if (Number(this.accountNumber) !== Number(8163700384)) {
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
          accountNumber: this.accountNumber,
          savingsMoney: this.savingsMoney,
          date: new Date().toISOString(),
          id: crypto.randomUUID(),
        };

        transactionHistory.value.push(acctDetail.value);
        localStorage.setItem(
          "history",
          JSON.stringify(transactionHistory.value)
        );

        localStorage.setItem("acctDetail", JSON.stringify(acctDetail.value));
        console.log("Saved:", JSON.parse(JSON.stringify(acctDetail.value)));
        this.accountNumber = "";
        this.savingsMoney = "";
      } catch (e) {
        console.log(e.message);
      }
    },
  });

  function Loans(loanAmount, accountNumber) {
    this.accountName = "odekunle waris ";
    this.accountNumber = accountNumber;
    this.loanAmount = loanAmount;
    this.handleValidation = function () {
      if (isNaN(Number(this.loanAmount)) || !this.loanAmount) {
        toast.error("Please, Input valid Amount");
        console.log("Please, Input valid Amount");
        return;
      }

      if (isNaN(Number(this.accountNumber)) || !this.accountNumber) {
        toast.error("Please, Input valid Number");
        console.log("Please, Input valid Number");
        return;
      }

      if (Number(this.accountNumber) !== 8163700384) {
        toast.error("Please, enter account number on the screen");
        console.log("Please, enter account number on the screen");
        return;
      }

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
          accountName: "odekunle waris",
          accountNumber: this.accountNumber,
          loanAmount: this.loanAmount,
          date: new Date().toISOString(),
          id: crypto.randomUUID(),
        };

        transactionHistory.value.push(loanDetail.value);
        localStorage.setItem(
          "history",
          JSON.stringify(transactionHistory.value)
        );
        localStorage.setItem("loanDetail", JSON.stringify(loanDetail.value));

        this.accountNumber = " ";
        this.loanAmount = " ";
      } catch (e) {
        console.log(e.message);
      }
    };
  }
  const userLoan = ref(new Loans());

  const handleRepaymentValidation = () => {
    if (
      isNaN(Number(repaymentDetail.value.amount)) ||
      !repaymentDetail.value.amount
    ) {
      toast.error("Please, Input valid Amount");
      console.log("Please, Input valid Amount");
      return;
    }

    if (
      !repaymentDetail.value.accountName ||
      repaymentDetail.value.accountName.toLowerCase().trim() !==
        "odekunle waris".toLowerCase().trim()
    ) {
      toast.error("Please, Input valid Account Name");
      console.log("Please, Input valid Account Name");
      return;
    }

    if (
      isNaN(Number(repaymentDetail.value.accountNumber)) ||
      !repaymentDetail.value.accountNumber ||
      !repaymentDetail.value.accountNumber
    ) {
      toast.error("Please, Input valid Number");
      console.log("Please, Input valid Number");
      return;
    }

    if (Number(repaymentDetail.value.accountNumber) !== Number(8163700384)) {
      toast.error("Please, enter account number on the screen");
      console.log("Please, enter account number on the screen");
      return;
    }
    return true;
  };

  const handleRepaymentSubmission = () => {
    try {
      if (!handleRepaymentValidation()) return;

      if (loanDetail.value.loanAmount <= 0) {
        toast.error("You have no debt to pay");
        console.log("You have no debt to pay");
        return;
      }

      repaymentDetail.value = {
        accountName: repaymentDetail.value.accountName,
        accountNumber: repaymentDetail.value.accountNumber,
        amount: repaymentDetail.value.amount,
        date: new Date().toISOString(),
        id: crypto.randomUUID(),
      };

      repaymentHistory.value.push(repaymentDetail.value);
      localStorage.setItem(
        "repaymentHistory",
        JSON.stringify(repaymentHistory.value)
      );

      console.log("Saved:", JSON.parse(JSON.stringify(repaymentDetail.value)));
      repaymentDetail.value = {
        accountName: " ",
        accountNumber: " ",
        amount: " ",
      };
      localStorage.setItem(
        "repaymentDetail",
        JSON.stringify(repaymentDetail.value)
      );
    } catch (e) {
      console.log(e.message);
    }
  };
  const handleTransferValidation = () => {
    if (
      isNaN(Number(transferDetail.value.transferAmount)) ||
      !transferDetail.value.transferAmount
    ) {
      toast.error("Please, Input valid Amount");
      return;
    }

    if (!transferDetail.value.accountName) {
      toast.error("Please, Input valid Account Name");
      return;
    }

    if (
      isNaN(Number(transferDetail.value.accountNumber)) ||
      !transferDetail.value.accountNumber
    ) {
      toast.error("Please, Input valid Number");
      return;
    }

    if (transferDetail.value.accountNumber.trim().length !== 10) {
      toast.error("Invalid Account Number");
      return;
    }
    return true;
  };

  const handleTransferSubmission = () => {
    try {
      if (!handleTransferValidation()) return;

      if (acctDetail.value.savingsMoney <= 0) {
        toast.error(" Insufficient Funds");
        console.log("Insufficient Funds");
        return;
      }

      transferDetail.value = {
        accountName: transferDetail.value.accountName,
        accountNumber: transferDetail.value.accountNumber,
        transferAmount: transferDetail.value.transferAmount,
        date: new Date().toISOString(),
        id: crypto.randomUUID(),
      };

      transactionHistory.value.push(transferDetail.value);
      localStorage.setItem("history", JSON.stringify(transactionHistory.value));

      console.log("Saved:", JSON.parse(JSON.stringify(transferDetail.value)));
      transferDetail.value = {
        accountName: " ",
        accountNumber: " ",
        transferAmount: " ",
      };
      localStorage.setItem(
        "transferDetail",
        JSON.stringify(transferDetail.value)
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  const isLoading = ref(false);
  const allHistory = computed(() => [
    ...repaymentHistory.value,
    ...transactionHistory.value,
  ]);

  let categoryValue = ref("");

  let isCategory = computed({
    get: () => categoryValue.value,
    set: (val) => (categoryValue.value = val),
  });

  const handleCategory = (category) => {
    isCategory.value = category.toLowerCase();
  };
  const formatNaira = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  const billPayment = ref({
    category: " ",
    date: null,
    plans: {},
  });

  const billHistory = ref(JSON.parse(localStorage.getItem("plan")) || []);

  const handlePlan = (eachPlan) => {
    if (!billPayment.value) {
      toast.error("Please,Select your plan");
      return;
    }

    if (isCategory.value && eachPlan) {
      billPayment.value = {
        category: isCategory.value,
        date: new Date().toISOString(),
        plans: eachPlan,
      };
    }
    billHistory.value.push(billPayment.value);
    localStorage.setItem("plan", JSON.stringify(billHistory.value));
  };

  const searchValue = ref("");
  const searchingResult = ref([]);
  const handleSearch = () => {
    isLoading.value = true;
    try {
      if (!searchValue.value) {
        toast.error("Please, enter your input");
        return;
      }

      searchingResult.value = [];

      if (billHistory.value.length > 0) {
        const searchFilter = billHistory.value.filter(
          (plan) =>
            plan.id === searchValue.value ||
            plan.category === searchValue.value ||
            Number(plan.price) === Number(searchValue.value)
        );

        searchingResult.value = searchFilter;
      }
    } catch (error) {
      console.log(error.message);
    } finally {
    }
  };

  return {
    isSavings,
    isLoan,
    acctDetail,
    loanDetail,
    handleIsisSavings,
    handleIsLoan,
    savingFund,
    userLoan,
    formattedTotalLoan,
    formattedTotalSaving,
    handleIsTransferFund,
    handleIsRepayment,
    isRepayment,
    isTransferFund,
    handleRepaymentSubmission,
    repaymentDetail,
    allHistory,
    transferDetail,
    handleTransferSubmission,
    transactionHistory,
    repaymentHistory,
    handleCategory,
    isCategory,
    formatNaira,
    handlePlan,
    billHistory,
    searchValue,
    searchingResult,
    handleSearch,
    isLoading,
  };
});
