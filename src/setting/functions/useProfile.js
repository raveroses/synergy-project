import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import { createClient } from "@supabase/supabase-js";
import { useCreateClient } from "../../_supabase/useCreateClient";
import { storeToRefs } from "pinia";

export const useProfile = defineStore("profile", () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const supabase = ref(createClient(supabaseUrl, supabaseKey));
  const store = useCreateClient();

  const { signUpUser } = storeToRefs(store);

  let profileStore = ref({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    socialLink: "",
  });

  const storingError = ref({});

  const handleProfileFetch = async () => {
    try {
      const { data, error } = await supabase.value.auth.getSession();

      const userId = data?.session?.user?.id;

      const { data: userDetailFilter, error: filterError } =
        await supabase.value
          .from("users")
          .select("*")
          .eq("id", userId)
          .single();

      if (!userId) {
        console.warn("No user session yet");
        return;
      }

      // console.log("USERID", userId);
      // console.log(error);
      // console.log("profileData", userDetailFilter);
      if (filterError) {
        console.error("PROFILE FETCH ERROR:", filterError.message);
      }

      profileStore.value = {
        firstName: userDetailFilter?.first_name || "",
        lastName: userDetailFilter?.last_name || "",
        email: userDetailFilter?.email || null,
        phoneNumber: userDetailFilter?.phone_number || null,
        socialLink: userDetailFilter?.social_link || null,
      };
    } catch (error) {
      console.log(error.message);
    }
  };

  onMounted(async () => {
    await handleProfileFetch();
  });

  const handleProfileDetailValidation = () => {
    const firstName = profileStore.value.firstName;
    const lastName = profileStore.value.lastName;
    const email = profileStore.value.email;
    const phoneNumber = profileStore.value.phoneNumber;

    const isSocialLink =
      /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

    const socialLink = profileStore.value.socialLink;

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

  const handleSaveChange = async () => {
    console.log("Im clicked");
    if (!handleProfileDetailValidation()) {
      return;
    }

    const { data, error } = await supabase.value.auth.getSession();

    const userId = data?.session?.user?.id;

    const { data: fetchData, error: fetchError } = await supabase.value
      .from("users")
      .update({
        first_name: profileStore.value.firstName,
        last_name: profileStore.value.lastName,
        email: profileStore.value.email,
        phone_number: profileStore.value.phoneNumber,
        social_link: profileStore.value.socialLink,
      })
      .eq("id", userId)
      .select();

    localStorage.setItem("profile", JSON.stringify(profileStore.value));
  };

  return {
    handleSaveChange,
    // savedUser,
    storingError,
    profileStore,
  };
});
