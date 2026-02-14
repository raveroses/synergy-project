<script setup>
import Layout from "../components/Layout.vue";
import { useCreateClient } from "../_supabase/useCreateClient.js";
import { onMounted } from "vue";
import { useTransaction } from "../components/useTransaction.js";

const authStore = useCreateClient();
const transaction = useTransaction();
const { handleFetch } = transaction;


onMounted(() => {
  handleFetch();
});

onMounted(() => {
  // Don't await — let it run in the background
  authStore.initAuth().catch((err) => console.error("Auth init failed:", err));
});
</script>

<template>
  <Layout></Layout>
</template>
