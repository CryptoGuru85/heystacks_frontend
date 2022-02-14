<template>
  <div class="relative">
    <custom-header />
    <div class="w-full text-center pt-16 mb-48">
      <div class="mb-2">
        <button
          @click="unsubscribe('reduce')"
          class="outline-none duration-200 text-gray-500 bg-stone-200 hover:bg-zinc-200 active:bg-zinc-300 h-12 px-4 rounded"
        >
          <i class="far fa-envelope"></i>
          Reduce frequency (one email every two months)
        </button>
      </div>
      <div>
        <button
          @click="unsubscribe('stop')"
          class="outline-none duration-200 text-gray-500 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 h-12 px-4 rounded"
        >
          Unsubscribe
        </button>
      </div>
    </div>
    <div
      v-if="state.snackbar.visible"
      class="snackbar z-20 flex justify-between items-center fixed bg-zinc-800 text-gray-200 px-3 py-2 rounded"
    >
      <span class="whitespace-nowrap mr-6">{{state.snackbar.text}}</span>
      <button
        @click="state.snackbar.visible = false"
        class="px-4 py-2 hover:bg-zinc-700 rounded"
      >
        Close
      </button>
    </div>
    <custom-footer />
  </div>
</template>

<script lang="ts">

import { reactive, defineComponent, onBeforeMount } from 'vue';
import CustomFooter from '@/components/Layout/CustomFooter.vue';
import CustomHeader from '@/components/Layout/CustomHeader.vue';

export default defineComponent({
  components: { 
    CustomFooter,
    CustomHeader
   },
  setup() {
    const state = reactive({
      snackbar: {
        visible: false,
        text: ''
      }
    })
    onBeforeMount(() => {
      localStorage.setItem('notificationModal', 'hide');
    })
    const unsubscribe = (mode) => {
      const params = new URL('https://heystacks.org/unsubscribe' + location.search).searchParams
      fetch('/api/notifications/unsubscribe', {
        method: 'POST',
        body: JSON.stringify({
          id: params.get('id'),
          emailAddress: params.get('email'),
          mode: mode
        })
      }).then(r => {
        if (r.status !== 200) {
          r.json().then(r => alert(r))
        } else {
          state.snackbar.text = mode === 'stop' ? 'Unsubscribe successful' : 'Subscription frequency updated'
          state.snackbar.visible = true
          setTimeout(() => window.location.href = '/', 2000)
        }
      })
    }
    return {
      state,
      unsubscribe
    }
  },
})
</script>
<style scoped>
  .snackbar {
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
  }
</style>