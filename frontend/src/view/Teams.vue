<template>
  <div>
    <custom-header :hide-teams="true"></custom-header>
    <div class="container text-center mx-auto mt-10 px-2 sm:px-12 mb-40 py-3 px-12">
      <teams-modal :extended="true"></teams-modal>
    </div>
    <custom-footer></custom-footer>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import CustomFooter from '@/components/Layout/CustomFooter.vue';
import CustomHeader from '@/components/Layout/CustomHeader.vue';
import TeamsModal from '@/components/Molecules/TeamsModal.vue';

export default defineComponent({
  components: {
    CustomHeader,
    CustomFooter,
    TeamsModal
  }
})
</script>
