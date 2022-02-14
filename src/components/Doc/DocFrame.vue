<template>
  <div
    :style="{
      'backgroundColor': '#f8f9fa',
      'padding-top': (meta && meta.soDoc ? '40px' : 'unset'),
      'padding-bottom': (meta && meta.soDoc ? '40px' : 'unset')
    }"
  >
    <iframe
      v-if="url && (!meta || !meta.soDoc)"
      id="doc-frame"
      :src="formattedUrl"
      class="border-none w-full h-full absolute z-10 iframe"
      allowtransparency="false"
      v-on:onload="$emit('loaded')"
    ></iframe>
    <div
      v-else-if="meta && meta.soDoc"
      class="mx-auto so-doc-border so-doc-padding w-full bg-white z-10"
      :style="{ height: (state.soDocHeight + 100) + 'px' }"
    >
      <iframe
        id="doc-frame"
        :src="meta.soDoc"
        allowtransparency="false"
        class="border-none w-full h-full iframe"
        v-on:onload="$emit('loaded')"
      ></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onBeforeMount } from 'vue';

export default defineComponent({
  components: {
  },
  props: {
    url: { type: String },
    layoutData: { type: Object },
    meta: { type: Object }
  },
  emits: ['loaded'],
  setup(props, {emit}) {
    const state = reactive({
      soDocHeight: 800
    })

    const formattedUrl = computed(() => {
      if (props.url.includes('/pub')) return props.url
      let url = props.url + (props.layoutData.editMode ? 'edit' : 'preview')
      if (props.meta && props.meta.gid) url += '#gid=' + props.meta.gid
      return url
    })

    onBeforeMount(() => {
      window.addEventListener('message', data => {
        if (['https://docs.heystacks.org.s3.us-east-1.amazonaws.com', 'https://docs.heystacks.org'].includes(data.origin)) {
          if (data.data.height) {
            state.soDocHeight = data.data.height + 50
          }
        }
      }, false)
    })

    return {
      state
    }
    
  }
})
</script>
<style scoped>
  .iframe {
    -webkit-transform:translate3d(0,0,0);
  }

  .so-doc-border {
    max-width: 794px;
  }
</style>
