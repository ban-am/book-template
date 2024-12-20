<template>
  <iframe src="javascript:void(0);" ref="iframeRef" style="width: 100%; border: none; height: 100%;"></iframe>
</template>

<script setup lang="ts">
import type { HtmlStore } from '@/utils/HtmlStore';
import { computed, inject, ref, watch } from 'vue';


const iframeRef = ref<HTMLIFrameElement>();
const baseUrl = 'https://www.bookport.cz';

const fixRelativePaths = (html: string): string => {
  const regex = /(["'])\/api\/reader\//g;
  return html.replace(regex, `$1${baseUrl}/api/reader/`);
}

const htmlStore = inject<HtmlStore>('htmlStore')!;

const currentHtmlPage = computed(() => {
  console.log("currentHtmlPage");
    if (htmlStore.htmlParts.value.length === 0 || htmlStore.currentPage.value >= htmlStore.htmlParts.value.length) {
      return '';
    }
    return htmlStore.htmlParts.value[htmlStore.currentPage.value];
  });

watch(() => currentHtmlPage.value, (newVal) => {
  if (!iframeRef.value)
    return;

  const html = fixRelativePaths(newVal);

  iframeRef.value.contentWindow!.document.open();
  iframeRef.value.contentWindow!.document.write(html);
  iframeRef.value.contentWindow!.document.close();
});

  // watch(() => processedHtml, (newVal) => {
  //   if (iframeRef.value) {
  //     iframeRef.value.srcdoc = processedHtml.value;
  //   }
  // });


// const { htmlContent, processedHtml,currentPage,prevPage, nextPage } = useHtmlStore();

// onMounted(() => {
//   const storedFileName = localStorage.getItem('lastLoadedFile');
//   if (storedFileName) {
//     lastLoadedFile.value = storedFileName;
//        //You should implement function to load the file based on name in Local storage
//     //This depends on the way files are stored.
//     //For example if they are stored in some folder you can access and load them
//     //but in many cases it will not be possible, therefore I leave this to you, or please provide detail where you store these files
//       console.log('Last loaded file found in LocalStorage:', lastLoadedFile.value);

//   }
// });
</script>

<style scoped>
/* Add some basic styling if needed */
</style>