<template>
  <div class="h-full">
    <Document />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Document from '@/components/Doc/Document.vue';

export default defineComponent({
  components: {
    Document
  },
})
</script>
