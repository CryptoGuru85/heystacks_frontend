<template>
  <transition name="fade-slow">
    <div 
      v-if="state.sheetTabDialogVisible" 
      class="sheet-tab-dialog shadow-material absolute z-10 left-3 bottom-8" 
    >
      <div class="px-4 py-2 rounded text-white text-lg">
        <i class="fas fa-long-arrow-alt-down text-base"></i> <small>Change tabs here</small>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { reactive, defineComponent, onBeforeMount, onMounted, watch } from 'vue';

export default defineComponent({
  props: {
    loading: {type: Boolean}
  },
  setup(props) {
    const state = reactive({
      sheetTabDialogVisible: false,
      checked: false,
      bottom: false,
    })

    onBeforeMount(() => {
      state.checked = JSON.parse(localStorage.getItem('sheet-tab-dialog') || 'false')
    })

    onMounted(() => {
      // @ts-ignore
      state.bottom = document.getElementsByClassName('masthead')[0].offsetHeight <= 200
      if (!state.bottom) {
        window.addEventListener('scroll', () => {
          let totalPageHeight = document.body.scrollHeight;
          let scrollPoint = window.scrollY + window.innerHeight;
          if (scrollPoint >= totalPageHeight) {
            state.bottom = true
            checkAndShowDialog()
          }
        })
      }
    })

    watch(() => props.loading, () => {
      checkAndShowDialog()
    })

    const checkAndShowDialog = () => {
      if (!props.loading && !state.checked && state.bottom) {
        setTimeout(() => state.sheetTabDialogVisible = true, 2000)
        setTimeout(() => state.sheetTabDialogVisible = false, 7000)
        localStorage.setItem('sheet-tab-dialog', 'true')
        state.checked = true
      }
    }

    return {
      state
    }
  }
})

</script>

<style scoped>
  .sheet-tab-dialog {
    box-shadow: 0 9px 68px 0 rgba(62, 57, 107, 0.2) !important;
    border-radius: 3px !important;
    border: 1px solid #d3d3d385 !important;
  }

  @supports ((-webkit-backdrop-filter: blur(10px)) or (backdrop-filter: blur(10px))) {
    .sheet-tab-dialog {
      background-color: rgba(6, 66, 70, 0.60) !important;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      border: none !important;
    }

    .sheet-tab-dialog div {
      background-color: rgba(6, 66, 70, 0.60) !important;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
    }
  }
</style>
