import { defineStore } from "pinia";
import { computed, ref } from "vue";
const baseUrl = 'https://www.bookport.cz';

export class HtmlStore {
  htmlParts = ref<string[]>([]);
  lastLoadedFile = ref<string>();
  currentPage = ref(0);

  loadJsonFromFile(event: Event){
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (!file)
      return;

    console.log(file)

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsedJson = JSON.parse(e.target?.result as string);
        if (Array.isArray(parsedJson)) {
          this.htmlParts.value = parsedJson
        }
        this.currentPage.value = 0;
        this.lastLoadedFile.value = file.name;
        localStorage.setItem('lastLoadedFile', file.name);

      } catch (error) {
        console.error('Error parsing Json file: ', error);
        alert('Failed to load Json file, invalid file');
      }
    };
    reader.readAsText(file);
  };

    
  prevPage() {
    if (this.currentPage.value > 0) {
      this.currentPage.value--;
    }
  };

  nextPage(){
    if (this.currentPage.value < this.htmlParts.value.length - 1) {
      this.currentPage.value++;
    }
  };
  
}
