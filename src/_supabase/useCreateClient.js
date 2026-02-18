import { defineStore } from "pinia";
import { useLoading } from "vue-loading-overlay";
import { ref, computed } from "vue";
import { toast } from "vue3-toastify";

import { supabase } from ".././_supabase/supabase.js";
import { sendEmail } from "../_supabase/sendEmail.js";
let authListener = null;
let userTableInfo = ref(null);

export const useCreateClient = defineStore("create", () => {
  const loading = ref(false);
  const signUpLoading = ref(false);
  const $loading = useLoading();
  const signUpUserError = ref({});
  const signUpUser = ref(
    JSON.parse(localStorage.getItem("userAcctCreationDetail")) || {
      userName: "",
      email: "",
      password: "",
    },
  );

  function generateAccountNumber() {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  }

  const retrieve = ref(
    JSON.parse(localStorage.getItem("retrieve")) || {
      firstName: "",
      lastName: "",
      email: "",
      social_link: "",
    },
  );

  const handleUserSession = async (session) => {
    if (!session?.user) return;

    try {
      const user = session.user.user_metadata;
      const { full_name, picture, userName } = user;

      const splitFullName = full_name?.split(" ") || [];

      const acctNumberGenerator = generateAccountNumber();

      const { data, error } = await supabase
        .from("users")
        .insert({
          id: session.user.id,
          first_name: splitFullName[0] ?? userName ?? "",
          last_name: splitFullName[1] ?? "",
          email: session.user.email,
          phone_number: "",
          social_link: "",
          image_url: picture ?? "",
          account_number: acctNumberGenerator,
        })
        .select()
        .single();

      if (!error) {
        console.log(data);

       
        userTableInfo.value = data;

        // await sendEmail({
        //   email: session.user.email,
        //   userName: data.first_name,
        //   accountNumber: data.account_number,
        //   loginUrl: "https://synergy-fintech.vercel.app//",
        //   companyName: "SYNERGY",
        // });
      } else if (error.code === "23505") {
        // User already exists → fetch it
        const { data: existingUser } = await supabase
          .from("users")
          .select()
          .eq("id", session.user.id)
          .single();

        // userData = existingUser;
        userTableInfo.value = existingUser;
      } else {
        throw error;
      }

      // 🔥 Now ALWAYS use userData
      // userTableInfo.value = userData;
      // console.log("inside", userTableInfo.value);

      retrieve.value = {
        firstName: userTableInfo.value.first_name ?? "",
        lastName: userTableInfo.value.last_name ?? "",
        email: userTableInfo.value.email ?? "",
        number: userTableInfo.value.phone_number ?? "",
        social_link: userTableInfo.value.social_link ?? "",
      };

      // retrieve.value = {
      //   firstName: userData.first_name ?? "",
      //   lastName: userData.last_name ?? "",
      //   email: userData.email ?? "",
      //   number: userData.phone_number ?? "",
      //   social_link: userData.social_link ?? "",
      // };

      localStorage.setItem("retrieve", JSON.stringify(retrieve.value));
    } catch (error) {
      console.error("handleUserSession error:", error);
    }
  };

  const initAuth = async () => {
    if (authListener) return;

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        // Run in background so UI isn't blocked
        handleUserSession(session).catch((err) =>
          console.error("Handle session error:", err),
        );
      }

      const { data: listener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (
            (event === "SIGNED_IN" || event === "INITIAL_SESSION") &&
            session?.user
          ) {
            handleUserSession(session).catch((err) =>
              console.error("Handle session error:", err),
            );
          }
        },
      );

      authListener = listener.subscription;
    } catch (err) {
      console.error("initAuth error:", err);
    }
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

      toast.success("Account created successfully");
      localStorage.setItem(
        "userAcctCreationDetail",
        JSON.stringify({
          userName: signUpUser.value.userName,
          email: signUpUser.value.email,
        }),
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
      signInError.value.passwordError = "Invalid Password";
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

      toast.success("Redirecting to Homepage");

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
    resetEmail: "",
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
        },
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
      social_link: retrieve.value.social_link,
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
      storingError.value.firstName = "first name is Invalid";
      return false;
    }
    if (!lastName) {
      storingError.value.lastName = "last name is Invalid";
      return false;
    }
    if (!email) {
      storingError.value.email = "email is Invalid";
      return false;
    }
    if (isNaN(phoneNumber) || phoneNumber.length !== 11) {
      storingError.value.phoneNumber = "Invalid phone number";
      return false;
    }

    if (!socialLink) {
      storingError.value.socialLink = "Field is empty";
      return false;
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

    storingError.value = {
      firstName: "",
      lastName: "",
      email: "",
      socialLink: "",
      phoneNumber: "",
    };
    toast.success("Profile updated successfully");
    localStorage.setItem("profile", JSON.stringify(profileStore.value));
  };

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

  const isOpen = ref(false);

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
    handleLogout,
    isOpen,
    userTableInfo,
  };
});
