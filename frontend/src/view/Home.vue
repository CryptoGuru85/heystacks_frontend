<template>
  <div class="home">
    <Feed :space="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Feed from '@/components/Feeds/Feed.vue';

export default defineComponent({
  components: {
    Feed
  }
})
</script>