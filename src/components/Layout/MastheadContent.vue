<template>
  <div
    ref="masthead-content"
    class="masthead-content py-4 px-2"
  >
    <a
      :href="docData.url"
      class="text-white"
      :title="docData.title"
      target="_blank"
    >
      <h1 class="inline-block header-font-1 text-3xl font-medium mb-0 mt-1 flex items-center max-w-800">
        <DocIcon
          :url="docData.url"
          class="mr-1 w-22"
        />
        {{ (docData.title || '').substring(0, 200) }}
        <span v-if="docData.hallOfFame" class="hall-of-fame">
            <router-link
              v-for="(award, aid) in docData.hallOfFame"
              :key="'award-' + aid"
              :to="{ path: '/hall-of-fame' }"
              title="Hall of fame"
              class="fade-on-hover color-primary mx-0 flex no-underline w-6"
              v-on:click.stop
              v-on:contextmenu.stop
            >
                <i class="text-orange-600 text-2xl fas fa-medal"></i>
            </router-link>
          </span>
      </h1>
    </a>
    <h2 class="mt-5 masthead-explainer header-font-2 font-normal text-2xl">
      {{ (docData.description || '').split('\n')[0].substring(0, 400) }}
    </h2>
    <div class="mt-5 mx-auto text-lightgray max-w-800">
      <div
        v-for="(tag, tid) in (docData.tags || '').replace(/\'/g, '').split(', ')"
        :key="'tag-' + tid"
        class="inline-block text-xl"
      >
        <a
          :href="'/?tags=' + tag"
          class="text-lightgray"
        >{{tag}}</a>
        <span v-if="tid < (docData.tags || '').split(', ').length - 1" class="mx-1.5 dot">
            •
          </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DocIcon from '@/components/Atoms/DocIcon.vue'

export default defineComponent({
  components: {
    DocIcon
  },
  props: {
    docData: { type: Object }
  }
})

</script>

<style scoped>
  .dot {
    width: 11px;
  }

  .masthead-explainer {
    line-height: 1.4em; 
    max-width: 800px; 
    opacity: 0.9;
  }

  .hall-of-fame {
    min-width: 24px;
  }

  .max-w-800 {
    max-width: 800px;
  }

  .w-22 {
    width: 22px;
  }
</style>
