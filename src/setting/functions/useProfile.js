import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import { useCreateClient } from "../../_supabase/useCreateClient";
import { storeToRefs } from "pinia";

export const useProfile = defineStore("profile", () => {
  const store = useCreateClient();

  const { signUpUser } = storeToRefs(store);


  const storedUserString = ref(localStorage.getItem("profile"));
  let savedUser = ref({});
  const storingError = ref({});
  if (storedUserString.value) {
    savedUser.value = JSON.parse(storedUserString.value);
  } else {
    savedUser.value = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      socialLink: "",
    };
  }

  const handleProfileDetailValidation = () => {
    const firstName = savedUser.value.firstName;
    const lastName = savedUser.value.lastName;
    const email = savedUser.value.email;
    const phoneNumber = savedUser.value.phoneNumber;

    const isSocialLink =
      /^(https?:\/\/)(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\/?.*$/;

    const socialLink = savedUser.value.socialLink;

    if (!firstName) {
      storingError.value.firstName = "First name is Invalid";
      return false;
    }
    if (!lastName) {
      storingError.value.lastName = "Last name is Invalid";
      return false;
    }
    if (!email) {
      storingError.value.email = "Email is Invalid";
      return false;
    }
    if (isNaN(phoneNumber) || phoneNumber.length !== 11) {
      storingError.value.phoneNumber = "Invalid phone number";
      return false;
    }
    if (isSocialLink.test(socialLink)) {
      storingError.value.socialLink = " Invalid URL";
      return false;
    }

    return true;
  };

  const handleSaveChange = () => {
    console.log("Im clicked");
    if (!handleProfileDetailValidation()) {
      return;
    }

    localStorage.setItem("profile", JSON.stringify(savedUser.value));

    savedUser.value = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      socialLink: "",
    };
  };

  return {
    handleSaveChange,
    savedUser,
    storingError,
  };
});
