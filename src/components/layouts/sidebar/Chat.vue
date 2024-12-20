<script setup lang="ts">
  import { ref } from 'vue';

  const messages = ref([
    { id: 1, text: 'How can I help you today?', isUser: false },
    { id: 2, text: 'Please, tell me about C#.', isUser: true },
    { id: 3, text: 'C# is a modern, object-oriented programming language developed by Microsoft as part of its .NET initiative. It is designed for building a wide range of applications, from web and mobile apps to games and enterprise software.', isUser: false },
  ]);

  const inputText = ref('');

  function sendMessage() {
    if (inputText.value.trim() !== '') {
      messages.value.push({ id: Date.now(), text: inputText.value, isUser: true });
      messages.value.push({ id: Date.now(), text: inputText.value, isUser: false });
      inputText.value = '';
    }
  }
</script>

<template>
  <div class="scrollbar sidebar chat-sidebar">
    <div class="scrollbar__wrap">
      <div class="chat">

        <div class="flex flex-col p-2 border-b">
          <div class="font-bold">AI assistant</div>
          <div class="text-sm">Your personal assistant available 24/7 to help you.</div>
        </div>

        <div class="chat-messages">
          <div v-for="message in messages" :key="message.id" :class="{'self-end':message.isUser }">
            <div
            :class="{'message': message.isUser, 'response': !message.isUser}"
            class="inline-block word-break rounded-md px-2 py-1 text-sm"
            >
              {{ message.text }}
              </div>
          </div>
        </div>

        <div class="p-2 border-t border-gray-300 flex gap-2">
          <!-- <Input
            type="text"
            :value="inputText"
            v-model="inputText" :size="'small'"
            placeholder="Type a message..." /> -->

          <!-- <KButton :svg-icon="paperPlaneIcon" :fill-mode="'solid'" @click="sendMessage"></KButton> -->
        </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
  .chat-sidebar {
    width: calc(var(--vp-sidebar-width-small) + 50px);
  }

  .chat {
    padding: 12px;
    padding-bottom: 0;
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
  }

  .chat-messages {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.5rem 0;
    overflow-y: auto;

  }

  .chat-messages .response {
      background-color: var(--p-color-info-light-9);
  }
  .chat-messages .message {
      background-color: var(--p-color-primary-light-9);
  }
</style>
