<script setup lang="ts">
  import { useFileProvider } from '@/plugins/file';

  const fileProvider = useFileProvider();
</script>

<template>
  
  <div class="mt-4 flex flex-col gap-4">
    <div class="content shadow-md">
      <div class="content__container flex items-center">
                  
          <div class="grow"></div>
          <button type="button" class="k-button k-button-md k-rounded-md k-button-link with-underline">
            <span class="k-button-text">Close</span>
          </button>

          <button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary px-6">
            Open
          </button>
      </div>
    </div>

    <div class="content shadow-md">
      
      <div class="content__container">
          <pre>
            <!-- {{ fileProvider.selectedFile.value?.content }} -->
          </pre>
      </div>
    </div>
  </div>
</template>