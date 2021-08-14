<template>
  <div>
    <div
      v-if="state.visible"
      class="email-notification-snackbar bg-white fixed z-10 px-4 pb-4 pt-2 rounded absolute-center-x bottom-3"
    >
      <div class="text-right">
        <button  @click="close()">
          <i class="fa fa-times" ></i>
        </button>
      </div>

      <div class="doc-color inline-block text-lg mb-2 mt-2 mx-3">
        Get the <strong>top 3</strong> docs
        <svg alt="Google" class="inline w-4 rounded mx-1" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
          <rect x="5" y="5" width="55" height="55" fill="white"></rect>
          <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#4285F4" stroke="none">
            <path d="M 0.648 639.352 L 0.648 1.409 L 639.352 0.648 L 639.352 639.352 L 0.648 639.352 Z M 500 465 L 500 430 L 320 430 L 140 430 L 140 465 L 140 500 L 320 500 L 500 500 L 500 465 Z M 500 325 L 500 290 L 320 290 L 140 290 L 140 325 L 140 360 L 320 360 L 500 360 L 500 325 Z M 390 185 L 390 150 L 265 150 L 140 150 L 140 185 L 140 220 L 265 220 L 390 220 L 390 185 Z"></path>
          </g>
        </svg>
        <svg alt="Google" class="inline w-4 rounded mr-1" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
          <rect x="5" y="5" width="55" height="55" fill="white"></rect>
          <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#0F9D58" stroke="none">
            <path d="M0 320 l0 -320 320 0 320 0 0 320 0 320 -320 0 -320 0 0 -320z m280 180 l0 -70 145 0 145 0 0 -35 0 -35 -145 0 -145 0 0 -145 0 -145 -35 0 -35 0 0 145 0 145 -70 0 -70 0 0 35 0 35 70 0 70 0 0 70 0 70 35 0 35 0 0 -70z"/>
          </g>
        </svg>
        <svg alt="Google" class="inline w-4 rounded mr-1" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
          <rect x="5" y="5" width="55" height="55" fill="white"></rect>
          <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#F4B400" stroke="none">
            <path d="M0 320 l0 -320 320 0 320 0 0 320 0 320 -320 0 -320 0 0 -320z m570 0 l0 -140 -250 0 -250 0 0 140 0 140 250 0 250 0 0 -140z"/>
          </g>
        </svg>
        each month, delivered to your inbox
      </div>
      <div class="snackbar-input-group mb-4">
        <input
          class="snackbar-input rounded w-full outline-none px-2 pt-3 pb-1 text-default mb-0"
          type="email"
          id="email"
          name="email"
          v-model="state.emailAddress"
          :error="!!state.error"
          :error-message="state.error"
          @keydown.enter="signUp"
          required
        />
        <label 
          for="email"
          :class="state.error ? `text-orange-600` : `text-default`"
        >Email address</label>
      </div>
      <div class="text-center">
        <button
          class="notification-sign-up-btn text-xl text-emerald-600 px-3 py-2 rounded hover:bg-emerald-100 active:bg-emerald-200"
          @click="signUp()"
        >
          &#128077; Sign up
        </button>
      </div>
    </div>
    <div
      v-if="state.added"
      class="snackbar z-20 flex justify-between items-center fixed bg-zinc-800 text-gray-200 px-3 py-2 rounded absolute-center-x bottom-3"
    >
      <span class="whitespace-nowrap mr-6">👍 Sign up successful</span>
      <button
        @click="state.added = false"
        class="px-4 py-2 hover:bg-zinc-700 rounded"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, watch, ref } from 'vue'

export default defineComponent({
  props: {
    visibleVar: { type: String }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const visibleVar = ref(props.visibleVar)
    const state = reactive({
      visible: false,
      mouseMovedDown: false,
      alreadyDisplayed: false,
      added: false,
      emailAddress: '',
      error: ''
    })

    watch(() => props.visibleVar, () => {
      localStorage.setItem('notificationModal', 'true')
      state.error = ''
      state.emailAddress = ''
      state.added = false
      state.visible = true
    })

    onMounted(() => {
      if (localStorage.getItem('notificationModal') !== 'hide') {
        setTimeout(() => {
          if (!state.alreadyDisplayed && !state.added) {
            state.alreadyDisplayed = true
            state.visible = true
          }
        }, 8000)
        window.addEventListener('mousemove', (event) => {
          if (!state.mouseMovedDown && event.y > 300) {
            state.mouseMovedDown = true
          }
          if (!state.alreadyDisplayed && !state.added && state.mouseMovedDown && event.y < 150) {
            state.mouseMovedDown = false
            state.alreadyDisplayed = true
            state.visible = true
          }
        })
      }
    })

    const signUp = () => {
      if (!state.emailAddress.includes('@')) {
        state.error = 'Incorrect email address format'
      } else {
        fetch('/api/notifications/sign-up', {
          method: 'POST',
          body: JSON.stringify({ emailAddress: state.emailAddress })
        }).then(r => {
          if (r.status !== 200) {
            r.json().then(r => alert(r))
          } else {
            state.added = true
          }
        })
        close()
      }
    }

    const close = () => {
      localStorage.setItem('notificationModal', 'hide')
      state.alreadyDisplayed = true
      state.visible = false
      emit('close')
    }

    return {
      state,
      signUp,
      close
    }
  }
})

</script>

<style scoped>
  .snackbar-input-group {
    position: relative;
  }
  
  .snackbar-input-group::before {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 2px;
    background: #a6a6a6;

  }
  
  .snackbar-input-group label {
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

  .snackbar-input-group input:focus ~ label,
  .snackbar-input-group input:not(:focus):valid ~ label {
    transform: translateY(-14px) scale(.75);
    color: #f06139;
  }

  .email-notification-snackbar {
    max-width: 570px; 
    width: calc(100% - 24px);
  }

  .doc-color {
    color: #084950;
  }
</style>
