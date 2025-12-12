import { defineStore } from "pinia";
import { createClient } from "@supabase/supabase-js";
import { useLoading } from "vue-loading-overlay";
import { ref } from "vue";
import { useToast } from "vue-toast-notification";

export const useCreateClient = defineStore("createClient", () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const supabase = ref(createClient(supabaseUrl, supabaseKey));
  const loading = ref(false);
  const signUpLoading = ref(false);
  const $loading = useLoading();
  const toast = useToast();

  const handleOnTimeSignIn = async () => {
    loading.value = true;
    const loader = $loading.show({
      color: "#800080",
      backgroundColor: "#ffffff",
    });

    try {
      const { data, error } = await supabase.value.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `http://localhost:5173/`,
        },
      });

      if (error) {
        toast.error(error.message);
        loader.hide();
        loading.value = false;
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      toast.error(error.message || "An error occurred during sign in");
      loader.hide();
      loading.value = false;
      return { data: null, error };
    }
  };

  const signUpUserError = ref({});

  const signUpUser = ref({
    userName: "",
    email: "",
    password: "",
  });

  let isAccountCreationValid = ref(false);

  const handleAccountCreationValidation = () => {
    const userName = signUpUser.value.userName;
    const email = signUpUser.value.email;
    const password = signUpUser.value.password;
    let valid = false;

    signUpUserError.value = {
      userNameError: "",
      emailError: "",
      passwordError: "",
    };

    const signUpUserError = ref({
      userNameError: "",
      emailError: "",
      passwordError: "",
    });
    if (!userName) {
      signUpUserError.value.userNameError = "Invalid Username";
      valid = false;
    }
    if (!email) {
      signUpUserError.value.emailError = "Invalid email";
      valid = false;
    }
    if (!password) {
      signUpUserError.value.userNameError = "Invalid password";
      valid = false;
    }

    isAccountCreationValid.value = valid;

    return valid;
  };

  const handleAccountCreation = async () => {
    signUpLoading.value = true;
    const loader = $loading.show({
      color: "#800080",
      backgroundColor: "#ffffff",
    });

    try {
      if (isAccountCreationValid.value) {
        const { data, error } = await supabase.auth.signUp({
          email: signUpUser.value.email,
          password: signUpUser.value.password,
          options: {
            emailRedirectTo: "http://localhost:5173/login",
            data: {
              userName: signUpUser.value.userName,
            },
          },
        });

        console.log(error);

        if (error) {
          toast.error(error.message);
          loader.hide();
          signUpLoading.value = false;
          return { data: null, error };
        }

        return { data, error: null };
      }
    } catch (error) {
      toast.error(error.message || "An error occurred during sign in");
      loader.hide();
      loading.value = false;
      return { data: null, error };
    }
  };
  console.log("error", signUpUserError.value);
  return {
    supabase,
    handleOnTimeSignIn,
    loading,
    handleAccountCreation,
    signUpLoading,
    signUpUserError,
  };
});
