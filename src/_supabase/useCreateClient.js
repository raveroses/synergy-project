import { defineStore } from "pinia";
import { createClient } from "@supabase/supabase-js";
import { useLoading } from "vue-loading-overlay";
import { ref, onMounted, onUnmounted, computed, watch, watchEffect } from "vue";
import { useToast } from "vue-toast-notification";

export const useCreateClient = defineStore("createClient", () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const supabase = createClient(supabaseUrl, supabaseKey);
  const loading = ref(false);
  const signUpLoading = ref(false);
  const $loading = useLoading();
  const toast = useToast();
  const signUpUserError = ref({});
  const signUpUser = ref(
    JSON.parse(localStorage.getItem("userAcctCreationDetail")) || {
      userName: "",
      email: "",
      password: "",
    }
  );
  const shouldProfilePersistent = ref(true);

  let authSubscription = null;
  let hasHandledSession = false;

  const retrieve = ref(
    JSON.parse(localStorage.getItem("retrieve")) || {
      firstName: "",
      lastName: "",
      email: "",
      social_link: "",
    }
  );

  const handleUserSession = async (session) => {
    if (!session?.user) return;
    if (hasHandledSession) return;
    console.log(session);

    hasHandledSession = true;

    try {
      const user = session.user.user_metadata;
      const { full_name, picture, userName } = user;

      const splitFullName = full_name?.split(" ") || [];

      const { data: existingUser } = await supabase
        .from("users")
        .select()
        .eq("id", session.user.id)
        .maybeSingle();

      if (!existingUser) {
        await supabase.from("users").insert({
          id: session.user.id,
          first_name: splitFullName[0] ?? userName ?? "",
          last_name: splitFullName[1] ?? "",
          email: session.user.email,
          phone_number: "",
          social_link: "",
          image_url: picture ?? "",
        });
      }

      console.log("existingUser", existingUser);

      retrieve.value = {
        firstName: splitFullName[0] || userName,
        lastName: splitFullName[1],
        email: session.user.email,
        number: session.user.phone,
        social_link: existingUser.social_link,
      };

      localStorage.setItem("retrieve", JSON.stringify(retrieve.value));
    } catch (error) {
      console.error("handleUserSession error:", error);
    }
  };

  const initAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      await handleUserSession(session);
    }

    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth event:", event);

      if (event === "INITIAL_SESSION") {
        return;
      }

      if (event === "SIGNED_IN" && session?.user) {
        await handleUserSession(session);
      }

      // if (event === "SIGNED_OUT") {
      // }
    });
  };

  const handleOnTimeSignIn = async () => {
    loading.value = true;
    const loader = $loading.show({
      color: "#800080",
      backgroundColor: "#ffffff",
    });

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
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
    } finally {
      loader.hide();
      loading.value = false;
    }
  };

  const handleAccountCreationValidation = () => {
    const userName = signUpUser.value.userName.trim();
    const email = signUpUser.value.email.trim();
    const password = signUpUser.value.password.trim();
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
      const { data, error } = await supabase.auth.signUp({
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

      localStorage.setItem(
        "userAcctCreationDetail",
        JSON.stringify({
          userName: signUpUser.value.userName,
          email: signUpUser.value.email,
        })
      );

      setTimeout(() => {
        router.push("/login");
      }, 1500);

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
    const signInEmail = signIn.value.email.trim();
    const signInPassword = signIn.value.password.trim();

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
      const { data, error } = await supabase.auth.signInWithPassword({
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
      const { data, error } = await supabase.auth.resetPasswordForEmail(
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
      const { data, error } = await supabase.auth.updateUser({
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

  // const profileStore = computed(() => ({
  //   first_name: signUpUser.value.userName || retrieve.value.firstName || "",
  //   last_name: retrieve.value.lastName || "",
  //   email: signUpUser.value.email || retrieve.value.email || "",
  //   phone_number: retrieve.value.number || "",
  //   social_link: "",
  // } ));

  const profileStore = computed(() => {
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      return JSON.parse(savedProfile);
    }

    return {
      first_name: signUpUser.value.userName || retrieve.value.firstName || "",
      last_name: retrieve.value.lastName || "",
      email: signUpUser.value.email || retrieve.value.email || "",
      phone_number: retrieve.value.number || "",
      social_link: "",
    };
  });

  const storingError = ref({});

  const handleProfileDetailValidation = () => {
    const firstName = profileStore.value.first_name?.trim();
    const lastName = profileStore.value.last_name?.trim();
    const email = profileStore.value.email?.trim();
    const phoneNumber = profileStore.value.phone_number?.trim();

    const isSocialLink =
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9\-_%]+\/?$/;

    const socialLink = profileStore.value.social_link;

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

    if (!socialLink) {
      storingError.value.socialLink = " Field is empty";
      return;
    }
    if (!isSocialLink.test(socialLink)) {
      storingError.value.socialLink = " Invalid URL";
      return false;
    }

    return true;
  };

  const handleSaveChange = async () => {
    if (!handleProfileDetailValidation()) {
      return;
    }

    const { data, error } = await supabase.auth.getSession();

    if (error || !data?.session?.user?.id) {
      toast.error("Session error");
      return;
    }

    const userId = data.session.user.id;

    const { data: fetchData, error: fetchError } = await supabase
      .from("users")
      .update(profileStore.value)
      .eq("id", userId)
      .select();

    if (fetchError) {
      toast.error("Failed to update profile: " + fetchError.message);
      console.error(fetchError);
      return;
    }

    toast.success("Profile updated successfully");
    localStorage.setItem("profile", JSON.stringify(profileStore.value));
  };
  console.log("profileStore", profileStore.value);
  // console.log("siginUpUser", signUpUser.value);
  // console.log("session", retrieve.value);

  const openFilePicker = () => {
    const fileDom = document.getElementById("fileTrigger");
    fileDom.click();
  };

  const selectedFile = ref(null);

  let imageGetter = ref("");
  const uploading = ref(false);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    selectedFile.value = file;

    if (imageGetter.value) {
      URL.revokeObjectURL(imageGetter.value);
    }

    imageGetter.value = URL.createObjectURL(file);

    uploadProfileImage();
  };

  const uploadProfileImage = async () => {
    if (!selectedFile.value) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const extensions = ["jpg", "jpeg", "png", "webp"];
    const oldFiles = extensions.map((e) => `${user.id}/avatar.${e}`);

    await supabase.storage.from("synergyUserImage").remove(oldFiles);

    uploading.value = true;

    const fileName = `${user.id}/avatar.${selectedFile.value.name.split(".").pop()}`;

    const { error } = await supabase.storage
      .from("synergyUserImage")
      .upload(fileName, selectedFile.value, {
        upsert: true,
      });

    uploading.value = false;

    if (error) {
      console.error(error);
    }
  };

  const handleDeleteUpload = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userId = user.id;

    const { data: files, error: listError } = await supabase.storage
      .from("synergyUserImage")
      .list(userId, {
        limit: 100,
        offset: 0,
      });

    // const fileName = `${user.id}/avatar.jpg`;

    if (listError) {
      console.error("Error listing files:", listError);
    } else if (files && files.length > 0) {
      console.log(files);

      const filePaths = files.map((file) => `${userId}/${file.name}`);
      console.log("FilePath", filePaths);

      const { data: removeData, error: removeError } = await supabase.storage
        .from("synergyUserImage")
        .remove(filePaths);

      if (removeError) {
        console.error("Error removing files:", removeError);
      } else {
        console.log("Successfully deleted files and folder:", removeData);
      }
    }
  };

  const getImageUrl = async () => {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error("No user found:", authError);
      return;
    }

    const { data: listData, error: listError } = await supabase.storage
      .from("synergyUserImage")
      .list(user.id, { limit: 100 });

    if (listError) {
      console.error("Error listing files:", listError.message);
      return;
    }

    if (!listData || listData.length === 0) {
      console.log("No images found for this user");
      return;
    }

    const latestFile = listData[listData.length - 1];
    const filePath = `${user.id}/${latestFile.name}`;

    const { data: urlData } = supabase.storage
      .from("synergyUserImage")
      .getPublicUrl(filePath);

    if (!urlData?.publicUrl) return;

    imageGetter.value = urlData.publicUrl;
  };

  const handleLogout = async (router) => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      return;
    }

    localStorage.removeItem("profile");
    localStorage.removeItem("retrieve");
    localStorage.removeItem("userAcctCreationDetail");
    router.push("/");
  };

 

  // const isDashBoardOpen= ref(false)

  // han
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
    initAuth,
    handleSaveChange,
    storingError,
    profileStore,
    handleFileChange,
    openFilePicker,
    imageGetter,
    handleDeleteUpload,
    getImageUrl,
    imageGetter,
    handleLogout,
  };
});
