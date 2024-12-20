<script setup lang="ts">
  import { ref } from 'vue';

  const articles = ref([
  {
    id: 1,
    title: "Grid Layout Adoption",
    content: "CSS Grid Layout revolutionizes web design with powerful layouts.",
    date: "10. 01. 2024"
  },
  {
    id: 2,
    title: "CSS4 New Features",
    content: "CSS4 introduces enhanced selectors and media queries.",
    date: "10. 02. 2024"
  },
  {
    id: 3,
    title: "CSS Variables Standard Tool",
    content: "CSS Variables enable dynamic and maintainable stylesheets.",
    date: "10. 03. 2024"
  },
  {
    id: 4,
    title: "Improved CSS Subgrid Support",
    content: "Browser support for CSS Subgrid allows flexible layouts.",
    date: "10. 04. 2024"
  },
  {
    id: 5,
    title: "CSS Houdini APIs",
    content: "CSS Houdini APIs extend and manipulate CSS capabilities.",
    date: "10. 05. 2024"
  }
]);

</script>

<template>

  <div class="scrollbar sidebar news-sidebar">
    <div class="scrollbar__wrap">
      <div class="news">

        <div class="news-messages">
          <div v-for="(article, index) in articles" :key="article.id" :class="{'border-b border-gray-300 pb-2 mb-2': index !== articles.length - 1}">
            <p class="text-xs text-gray-400">{{ article.date }}</p>
            <h3 class="font-bold">{{ article.title }}</h3>
            <p class="text-sm">{{ article.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
  .news-sidebar {
    width: calc(var(--vp-sidebar-width-small) + 50px);
  }

  .news {
    padding: 12px;
    padding-bottom: 0;
    display: grid;
    grid-template-rows: auto 1fr;
  }

  .news-messages {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.5rem;
    overflow-y: auto;
  }
</style>
