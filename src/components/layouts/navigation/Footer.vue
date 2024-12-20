<script setup lang="ts">
import type { HtmlStore } from '@/utils/HtmlStore';
import { inject } from 'vue';

const htmlStore = inject<HtmlStore>('htmlStore')!;

</script>

<template>
  <div class="footer">
    <div class="navbar-wrapper">
      <div class="h-full w-full flex items-center justify-between">
        <button type="button" class="k-button k-button-md k-rounded-md k-button-outline k-button-outline-primary" @click="() => htmlStore.prevPage()">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" class="w-5 h-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
        </button>

        <div class="flex justify-center overflow-auto">
          <button type="button" 
            v-for="(_, index) of htmlStore.htmlParts.value" 
            class="k-button k-button-md k-rounded-md k-button-link k-button-link-base px-2"
            :class="{ 'k-button-active': htmlStore.currentPage.value === index }">
            {{ index + 1 }}
          </button>
        </div>
        
        <button type="button" class="k-button k-button-md k-rounded-md k-button-outline k-button-outline-primary" @click="() => htmlStore.nextPage()">
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" class="w-5 h-5" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
          </svg>
        </button>

<!--         
        <div style="margin-top: 20px;">
          <button @click="() => htmlStore.prevPage()">Previous</button>
          <span>{{ htmlStore.currentPage.value + 1 }} / {{ htmlStore.htmlContent.value.length }}</span>
          <button  @click="() => htmlStore.nextPage()">Next</button>
        </div> -->

      </div>
    </div>
  </div>
</template>


<style scoped>
.k-button-active {
  background-color: var(--p-color-primary);
  color: white;
}

</style>