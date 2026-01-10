import { defineStore } from "pinia";
import { createClient } from "@supabase/supabase-js";
import { useLoading } from "vue-loading-overlay";
import { ref, onMounted, onUnmounted } from "vue";
import { useToast } from "vue-toast-notification";

export const useCreateClient = defineStore("createClient", () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const supabase = ref(createClient(supabaseUrl, supabaseKey));
  const loading = ref(false);
  const signUpLoading = ref(false);
  const $loading = useLoading();
  const toast = useToast();
  const signUpUserError = ref({});

  const signUpUser = ref({
    userName: "",
    email: "",
    password: "",
  });

  let authSubscription = null;
  const handleUserSession = async (session) => {
    try {
      if (!session) return;

      const user = session.user.user_metadata;
      const { full_name, picture, userName } = user;

      const splitFullName = full_name?.split(" ") || [];
      const { data, error } = await supabase.value
        .from("users")
        .upsert(
          {
            id: session.user.id,
            first_name: splitFullName[0] ?? userName ?? "",
            last_name: splitFullName[1] ?? "",
            email: session.user.email,
            phone_number: "",
            social_link: "",
            image_url: picture ?? "",
          },
          { onConflict: "id" }
        )
        .select();
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(async () => {
    try {
      const { data } = await supabase.value.auth.onAuthStateChange(
        (event, session) => {
          setTimeout(async () => {
            if (event === "SIGNED_IN" && session?.user) {
              await handleUserSession(session);
            }
          }, 0);
        }
      );

      authSubscription = data.subscription;
    } catch (error) {
      console.log(error.message);
    }
  });

  onUnmounted(() => {
    authSubscription?.unsubscribe();
  });

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

      signUpUser.value = {
        userName: "",
        email: "",
        password: "",
      };

      return { data, error: null };
    } catch (error) {
      toast.error(error.message || "An error occurred during sign in");
      loader.hide();
      loading.value = false;
      return { data: null, error };
    } finally {
      loader.hide();
      loading.value = false;
    }
  };

  const handleAccountCreationValidation = () => {
    const userName = signUpUser.value.userName;
    const email = signUpUser.value.email;
    const password = signUpUser.value.password;
    let valid = true;

    if (!userName) {
      signUpUserError.value.userNameError = "Invalid Username";
      valid = false;
    }
    if (!email) {
      signUpUserError.value.emailError = "Invalid email";
      valid = false;
    }
    if (!password) {
      signUpUserError.value.passwordError = "Invalid password";
      valid = false;
    }

    return valid;
  };

  const handleAccountCreation = async (router) => {
    if (!handleAccountCreationValidation()) {
      return;
    }
    signUpLoading.value = true;
    const loader = $loading.show({
      color: "#800080",
      backgroundColor: "#ffffff",
    });

    try {
      const { data, error } = await supabase.value.auth.signUp({
        email: signUpUser.value.email,
        password: signUpUser.value.password,

        options: {
          data: {
            userName: signUpUser.value.userName,
          },
        },
      });

      if (error) {
        toast.error(error.message);
        loader.hide();
        signUpLoading.value = false;
        return { data: null, error };
      }

      signUpUser.value = {
        userNameError: "",
        emailError: "",
        passwordError: "",
      };

      setTimeout(() => {
        router.push("/login");
      }, 1500);

      // await userTableCreation(data?.session?.user?.user_metadata);
      return { data, error: null };
    } catch (error) {
      toast.error(error.message || "An error occurred during sign in");
      loader.hide();
      loading.value = false;
      return { data: null, error };
    } finally {
      loader.hide();
      signUpLoading.value = false;
    }
  };

  const signIn = ref({
    email: "",
    password: "",
  });

  let signInError = ref({
    emailError: "",
    passwordError: "",
  });

  let signInLoading = ref(false);
  const handleSignInValidation = () => {
    const signInEmail = signIn.value.email;
    const signInPassword = signIn.value.password;

    signInError.value = {
      emailError: "",
      passwordError: "",
    };

    if (!signInEmail) {
      signInError.value.emailError = "Invalid Email ";
      return false;
    }

    if (!signInPassword) {
      signInPassword.value.passwordError = "Invalid Password";
      return false;
    }

    return true;
  };

  const handleSignIn = async (router) => {
    if (!handleSignInValidation()) {
      return;
    }
    signInLoading.value = true;
    const loader = $loading.show({
      color: "#800080",
      backgroundColor: "#ffffff",
    });

    try {
      const { data, error } = await supabase.value.auth.signInWithPassword({
        email: signIn.value.email,
        password: signIn.value.password,
      });

      if (error) {
        toast.error(error.message);
        loader.hide();
        signInLoading.value = false;
        return { data: null, error };
      }

      signIn.value = {
        email: "",
        password: "",
      };

      setTimeout(() => {
        router.push("/");
      }, 1500);
      return { data, error: null };
    } catch (error) {
      toast.error(error.message || "An error occurred during sign in");
      loader.hide();
      signInLoading.value = false;
      return { data: null, error };
    } finally {
      loader.hide();
      signInLoading.value = false;
    }
  };

  const resetPasswordDetail = ref({
    resetEmail: " ",
  });
  const handleEmailResetValidation = () => {
    const email = resetPasswordDetail.value.resetEmail;

    if (!email) {
      toast.error("Invalid email");
      return false;
    }

    return true;
  };

  const handleEmailSender = async () => {
    if (!handleEmailResetValidation()) {
      return;
    }

    try {
      const { data, error } = await supabase.value.auth.resetPasswordForEmail(
        resetPasswordDetail.value.resetEmail,
        {
          redirectTo: "http://localhost:5173/updatePassword",
        }
      );

      if (error) {
        toast.error(`Error updating password: ${error.message}`);
        return;
      }
      resetPasswordDetail.value = {
        resetEmail: "",
      };

      toast.success("Password reset link sent! Please check your email.");
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  };

  const changePassword = ref({
    newPassword: "",
    confirmPassword: "",
  });
  const handleResetPasswordValidation = () => {
    const newPassword = changePassword.value.newPassword;
    const confirmPassword = changePassword.value.confirmPassword;
    if (!newPassword) {
      toast.error("Invalid Create Password");
      return false;
    }

    if (!confirmPassword) {
      toast.error("Invalid confirm Password");
      return false;
    }

    if (newPassword !== confirmPassword) {
      toast.error(" Password not match");
      return false;
    }

    return true;
  };

  const updateingPassword = ref(false);

  const handlePasswordUpdated = async (router) => {
    if (!handleResetPasswordValidation()) {
      return;
    }

    updateingPassword.value = true;
    const loader = $loading.show({
      color: "#800080",
      backgroundColor: "#ffffff",
    });

    try {
      const { data, error } = await supabase.value.auth.updateUser({
        password: changePassword.value.confirmPassword,
      });

      console.log(error);

      if (error) {
        toast.error(`Error updating password: ${error.message}`);
        loader.hide();
        updateingPassword.value = false;
        return;
      }

      changePassword.value = {
        newPassword: "",
        confirmPassword: "",
      };
      toast.success("Password updated successfully");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (e) {
      loader.hide();
      updateingPassword.value = false;
      console.error(e);
      throw new Error(e.message);
    } finally {
      loader.hide();
      updateingPassword.value = false;
    }
  };

  const isNewPasswordVisible = ref(false);
  const isConfirmPasswordVisible = ref(false);

  const handleIsNewPasswordVisible = () => {
    isNewPasswordVisible.value = !isNewPasswordVisible.value;
  };
  const handleIsConfirmPasswordVisible = () => {
    isConfirmPasswordVisible.value = !isConfirmPasswordVisible.value;
  };

  // const handleRetrieveSession = async () => {
  //   try {
  //     const { data, error } = await supabase.value.auth.getSession();

  //     if (error) {
  //       console.log(error.message);
  //       return;
  //     }

  //     if (!data.session) return;
  //     // console.log("SESSION", data.session.user.user_metadata);
  //     // console.log("METDATA", data.session.user_metadata);

  //     const sessionGetter = data.session.user.user_metadata;
  //     await userTableCreation(sessionGetter);

  //     return sessionGetter;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return {
    supabase,
    handleOnTimeSignIn,
    loading,
    handleAccountCreation,
    signUpLoading,
    signUpUserError,
    signUpUser,
    signIn,
    signInLoading,
    signInError,
    handleSignIn,
    resetPasswordDetail,
    handleEmailSender,
    changePassword,
    handlePasswordUpdated,
    isNewPasswordVisible,
    isConfirmPasswordVisible,
    handleIsNewPasswordVisible,
    handleIsConfirmPasswordVisible,
    updateingPassword,
    // handleRetrieveSession,
  };
});
