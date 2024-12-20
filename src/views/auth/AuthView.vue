<script setup lang="ts">
import { useGoogleAuth } from '@/plugins/auth';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const authProvider = useGoogleAuth();
const router = useRouter();

const redirectSignIn = async () => {
  if (!authProvider.client_secret.value || !authProvider.api_key.value)
    return;

  localStorage.setItem('api_key',authProvider.api_key.value);

  await authProvider.redirectSignIn(authProvider.client_secret.value);

  if (authProvider.auth_data) {
    await router.push({ name: 'library' });
  }
};


const popUpSignIn = async () => {
  if (!authProvider.client_secret.value || !authProvider.api_key.value)
    return;

  localStorage.setItem('api_key',authProvider.api_key.value);
  await authProvider.popUpSignIn(authProvider.client_secret.value);

  if (authProvider.auth_data) {
    await router.push({ name: 'library' });
  }
};

</script>

<template>
  <div class="middle">
    <div class="bg-main p-4 rounded-lg shadow-md w-96 ">
      <h1 class="text-2xl font-semibold text-center">Login</h1>
      
      <div class="mt-4 flex flex-col gap-4">
        <fieldset>
          <span class="text-sm font-bold">Client secret</span>
          <input class="k-input k-input-md k-input-solid k-rounded-md" v-model="authProvider.client_secret.value" />
        </fieldset>

        <fieldset>
          <span class="text-sm font-bold">Api Key</span>
          <input class="k-input k-input-md k-input-solid k-rounded-md" v-model="authProvider.api_key.value"/>
        </fieldset>

        <button type="button" class="k-button k-button-md k-rounded-md k-button-outline k-button-outline-primary"
          :disabled="!authProvider.client_secret.value || !authProvider.api_key.value"
          @click="redirectSignIn">
          Redirect Sign In
        </button>

        <button type="button" class="k-button k-button-md k-rounded-md k-button-outline k-button-outline-primary"
          :disabled="!authProvider.client_secret.value || !authProvider.api_key.value"
          @click="popUpSignIn">
          Pop up sign In
        </button>
      </div>
    </div>
  </div>
</template>