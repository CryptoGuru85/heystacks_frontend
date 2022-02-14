<template>
  <div class="fixed bg-gray-100 p-4 z-50 rounded absolute-center w-400" v-if="openDialog">
    <div class="py-4 px-6 w-full text-center text-2xl text-default">
      Report
    </div>
    <div class="comment-input relative mb-4">
      <input
        type="text"
        id="abuse-reason"
        class="bg-transparent rounded w-full outline-none py-2 text-default mb-0"
        v-model="state.abuseReason"
        @keyup.enter="$emit('reported', state.abuseReason)"
        autofocus
        required
      />
      <label for="abuse-reason">Reason (optional)</label>
    </div>
    <div>
      <div class="flex justify-center">
        <button class="bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-400 rounded px-4 py-2 mr-2" @click="$emit('close')">Close</button>
        <button class="bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-400 rounded px-4 py-2" @click="$emit('reported', state.abuseReason)">Report</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  props: {
    openDialog: { type: Boolean },
  },
  emits: ['close', 'reported'],
  setup(props, {emit}) {
    const state = reactive({
      abuseReason: ''
    })

    return {
      state,
    }
  }
})

</script>
<style scoped>
  .comment-input::before {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 2px;
    background: #a6a6a6;
  }
  
  .comment-input label {
    position: absolute;
    transform-origin: top left;
    top: 4px;
    left: 0px;
    font-size: 16px;
    color: #333;
    pointer-events: none;
    -webkit-transition: all 0.15s ease-out 0s;
    transition: all 0.15s ease-out 0s;
  }

  .comment-input input:focus ~ label,
  .comment-input input:not(:focus):valid ~ label {
    transform: translateY(-14px) scale(.75);
    color: #f06139;
  }

  .w-400 {
    width: 400px;
  }
</style>
