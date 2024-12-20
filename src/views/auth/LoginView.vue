<script setup lang="ts">
import { useGoogleAuth } from '@/plugins/auth';
import { useRoute, useRouter } from 'vue-router';

const authProvider = useGoogleAuth();
const router = useRouter();

const signIn = async () => {
  if (!authProvider.client_secret.value)
    return;

  await authProvider.signIn(authProvider.client_secret.value);

  if (authProvider.auth_data) {
    await router.push({ name: 'library' });
  }
};

</script>

<template>
  <div class="middle">
    <div class="bg-white p-4 rounded-lg shadow-md w-96 ">
      <h1 class="text-2xl font-semibold text-center">Login</h1>
      
      <div class="mt-4 flex flex-col gap-4">
        <fieldset>
          <span class="text-sm font-bold">Client secret</span>
          <input class="k-input k-input-md k-input-solid k-rounded-md" v-model="authProvider.client_secret.value" />
        </fieldset>

        <button type="button" class="k-button k-button-md k-rounded-md k-button-outline k-button-outline-primary" 
          @click="signIn">
          Sign In
        </button>
      </div>
    </div>
  </div>
</template>