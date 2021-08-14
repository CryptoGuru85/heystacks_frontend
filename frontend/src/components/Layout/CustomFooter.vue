<template>
  <footer class="bottom-0 w-full footer flex justify-center" padless>
    <div
      class="text-center p-3"
    >
      <div>
        <div class="mx-auto">
          <div class="flex justify-center items-center">
            <a 
              href="mailto:info@heystacks.org" 
              target="_blank" 
              class="mx-2 text-emerald-700 flex items-center no-underline"
            >
              <i class="far fa-envelope mr-2 text-emerald-700"></i>
              <span>Contact</span>
            </a>
            <router-link 
              :to="{ path: '/hall-of-fame' }" 
              class="mx-2 text-emerald-700 flex items-center no-underline"
            >
              <i class="fas fa-medal mr-2 text-emerald-700"></i>
              <span>Hall of fame</span>
            </router-link>
            <a 
              @click="state.notificationSnackbarVisibleVar += '1'" 
              class="mx-2 text-emerald-700 flex items-center cursor-pointer no-underline"
            >
              <i class="far fa-bell mr-2 text-emerald-700"></i>
              <span>Newsletter</span>
            </a>
          </div>
          <div class="flex justify-center items-center mt-2">
            <a 
              href="https://medium.com/@matthews8000/search-public-google-documents-with-sourceful-9b49a10f76d6" 
              target="_blank" 
              class="mx-2 text-emerald-700 flex items-center no-underline"
            >
              <i class="fab fa-medium mr-2 text-emerald-700"></i>
              <span>Blog</span>
            </a>
            <a 
              href="https://www.facebook.com/heystacks.org" 
              target="_blank" 
              class="mx-2 text-emerald-700 flex items-center no-underline"
            >
              <i class="fab fa-facebook mr-2 text-emerald-700"></i>
              <span>Facebook</span>
            </a>
            <a 
              href="https://twitter.com/matthews8000" 
              target="_blank" 
              class="mx-2 text-emerald-700 flex items-center no-underline"
            >
              <i class="fab fa-twitter mr-2 text-emerald-700"></i>
              <span>Twitter</span>
            </a>
          </div>
        </div>
        <br>
        <div>{{state.notificationSnackbarVisibleVar}}</div>
        <span class="text-sm">2020 - <b>heystacks</b></span>
      </div>
    </div>
    <EmailNotificationSignup :visible-var="state.notificationSnackbarVisibleVar"></EmailNotificationSignup>
  </footer>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import EmailNotificationSignup from '@/components/Layout/EmailNotificationSignup.vue';
export default defineComponent({
  components: {
    EmailNotificationSignup,
  },
  setup() {
    const state = reactive({
      notificationSnackbarVisibleVar: ''
    })

    const openCollectChat = () => {
      let head = document.getElementsByTagName('head')[0]
      let script = document.createElement('script')
      script.type = 'text/javascript'
      const openChat = () => {
        setTimeout(() => {
          // @ts-ignore
          let collectchat = window.collectchat || {}
          collectchat.open()
        }, 1000)
      }
      script.onload = () => openChat()
      script.onerror = () => openChat()
      script.src = 'https://collectcdn.com/launcher.js'
      // @ts-ignore
      window.CollectId = '5f285f84cac8ec33b6a2bf79'
      head.appendChild(script)
    }

    return {
      state,
      openCollectChat,
    }
  },
})
</script>
<style scoped>
  .footer {
    background-color: #d0d3d4;
  }
</style>
