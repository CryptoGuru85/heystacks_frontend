<template>
  <div class="w-full">
    <div class="h-40 overflow-hidden">
      <custom-header
        :doc-data="document"
      ></custom-header>
    </div>

    <div id="action-buttons" class="w-full py-1 text-center bg-stone-100">
      <div class="flex justify-between items-center">
        <div>
          <button
            class="text-xl"
            @click="state.frameUrl = '/new-doc-redirect'"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    <div>
      <iframe
        id="new-doc-frame"
        :src="state.frameUrl"
        class="iframe w-full border-2"
      ></iframe>
    </div>
  </div>
</template>

<script lang="ts">

import { reactive, defineComponent, onMounted } from 'vue';
import CustomHeader from '@/components/Layout/CustomHeader.vue';

export default defineComponent({
  components: { 
    CustomHeader
   },
  setup() {
    const state = reactive({
      layoutData: {},
      frameUrl: 'https://docs.new',
      document: {},
    })
    onMounted(() => {
      window.addEventListener('message', data => {
        if (data.origin.includes('google')) console.log(data)
      }, false)
    })
    return {
      state
    }
  },
})
</script>
<style scoped>
  .iframe {
    height: 700px;
  }
</style>
