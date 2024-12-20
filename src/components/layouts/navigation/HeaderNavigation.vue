<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const baseRoutes = route.matched[0].children;

// :class="{ 'active':route.matched.some(i => i.name === baseRoute.name)}"
</script>

<template>
  <header class="header">
    <div class="navbar-wrapper">
      <div class="header-container">
        <div class="content">
          <div class="navbar-menu">
            <template v-for="baseRoute of baseRoutes">
              <RouterLink v-if="baseRoute.meta" :to="{ name: baseRoute.name}"
                class="nav-link-item" >
                  {{ baseRoute.meta.title }}
              </RouterLink>
            </template>
          </div>

          <div class="content justify-end">
            
          </div>
        </div>

      </div>
    </div>
  </header>
</template>



<style scoped>
[type=file] {
    background: unset;
    border-color: inherit;
    border-radius: 0;
    border-width: 0;
    font-size: unset;
    line-height: inherit;
    padding: 0
}

[type=file]:focus {
    outline: 1px auto inherit
}

input[type=file]::file-selector-button {
    -webkit-margin-start: -1rem;
    -webkit-margin-end: 1rem;
    background: var(--p-color-info-dark-2);
    border: 0;
    color: #fff;
    cursor: pointer;
    font-size: .875rem;
    font-weight: 500;
    margin-inline-end:1rem;
    margin-inline-start:-1rem;
    padding: .625rem 1rem .625rem 2rem
}

input[type=file]::file-selector-button:hover {
  background: var(--p-color-info);
}

:is([dir=rtl]) input[type=file]::file-selector-button {
    padding-left: 1rem;
    padding-right: 2rem
}

.dark input[type=file]::file-selector-button {
    background: #4b5563;
    color: #fff
}

.dark input[type=file]::file-selector-button:hover {
    background: #6b7280
}
</style>