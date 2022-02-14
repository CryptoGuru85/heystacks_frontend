<template>
  <div class="masthead text-center relative min-h-570">
    <div class="pattern-background"></div>

    <div class="fixed top-0 left-0 w-full h-1 z-50 top-bar">
    </div>

    <div
      class="search-input-header flex mx-6 absolute top-5 left-0 right-0 justify-between"
    >
      <div>
        <div v-if="docData">
          <router-link
            :to="{ name: 'Home' }"
            class="header-link flex items-center"
            title="heystacks"
          >
            <svg alt="heystacks logo w-4" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 900.000000 900.000000" preserveAspectRatio="xMidYMid meet">
              <rect x="100" y="100" width="850" height="800" fill="#7b4848"></rect>
              <rect x="10" y="10" width="700" height="700" fill="white"></rect>
              <g transform="translate(0.000000,800.000000) scale(0.100000,-0.100000)" fill="#d96d1a" stroke="none">
                <path d="M0 4000 l0 -4000 4000 0 4000 0 0 4000 0 4000 -4000 0 -4000 0 0 -4000z m6740 1695 l0 -445 -2315 0 -2315 0 0 445 0 445 2315 0 2315 0 0 -445z m-870 -1730 l0 -445 -2315 0 -2315 0 0 445 0 445 2315 0 2315 0 0 -445z"/>
              </g>
            </svg>
            <h1 class="hide-on-400px text-xl font-medium mb-0 mt-1">heystacks</h1>
          </router-link>
        </div>
      </div>

      <div v-if="!hideSpaces" class="pt-1 flex justify-end">
        <button @click="() => {state.layoutData.spacesModal = true}"
          class="spaces-modal-button font-medium px-6 py-2 rounded text-orange-600 outline-none duration-300"
        >
          Gatherings
        </button>
      </div>
    </div>

    <div
      v-if="!docData"
      ref="masthead-content"
      class="inline-block masthead-content py-4 px-2 bottom-4"
    >
      <a
        href="/"
        class="text-white flex items-center justify-center"
        title="heystacks"
      >
        <svg alt="heystacks logo" class="heystacks-logo" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 900.000000 900.000000" preserveAspectRatio="xMidYMid meet">
          <rect x="100" y="100" width="850" height="800" fill="#7b4848"></rect>
          <rect x="10" y="10" width="700" height="700" fill="white"></rect>
          <g transform="translate(0.000000,800.000000) scale(0.100000,-0.100000)" fill="#d96d1a" stroke="none">
            <path d="M0 4000 l0 -4000 4000 0 4000 0 0 4000 0 4000 -4000 0 -4000 0 0 -4000z m6740 1695 l0 -445 -2315 0 -2315 0 0 445 0 445 2315 0 2315 0 0 -445z m-870 -1730 l0 -445 -2315 0 -2315 0 0 445 0 445 2315 0 2315 0 0 -445z"/>
          </g>
        </svg>
        <h1 class="inline-block font-medium mb-0 mt-1 title">heystacks</h1>
      </a>
      <h2 class="mt-2 masthead-explainer text-2xl font-normal">
        Discover the best public<br>
        Google docs
        <a
          href="/?type=docs"
          class="logo-link"
        >
          <svg alt="Google" class="inline mr-2 rounded w-6" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
            <rect x="5" y="5" width="55" height="55" fill="white"></rect>
            <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#4285F4" stroke="none">
              <path d="M 0.648 639.352 L 0.648 1.409 L 639.352 0.648 L 639.352 639.352 L 0.648 639.352 Z M 500 465 L 500 430 L 320 430 L 140 430 L 140 465 L 140 500 L 320 500 L 500 500 L 500 465 Z M 500 325 L 500 290 L 320 290 L 140 290 L 140 325 L 140 360 L 320 360 L 500 360 L 500 325 Z M 390 185 L 390 150 L 265 150 L 140 150 L 140 185 L 140 220 L 265 220 L 390 220 L 390 185 Z"></path>
            </g>
          </svg>
        </a>
        <a
          href="/?type=sheets"
          class="logo-link"
        >
          <svg alt="Google" class="inline mr-2 rounded w-6" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
            <rect x="5" y="5" width="55" height="55" fill="white"></rect>
            <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#0F9D58" stroke="none">
              <path d="M0 320 l0 -320 320 0 320 0 0 320 0 320 -320 0 -320 0 0 -320z m280 180 l0 -70 145 0 145 0 0 -35 0 -35 -145 0 -145 0 0 -145 0 -145 -35 0 -35 0 0 145 0 145 -70 0 -70 0 0 35 0 35 70 0 70 0 0 70 0 70 35 0 35 0 0 -70z"/>
            </g>
          </svg>
        </a>
        <a
          href="/?type=slides"
          class="logo-link"
        >
          <svg alt="Google" class="inline rounded w-6" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
            <rect x="5" y="5" width="55" height="55" fill="white"></rect>
            <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#F4B400" stroke="none">
              <path d="M0 320 l0 -320 320 0 320 0 0 320 0 320 -320 0 -320 0 0 -320z m570 0 l0 -140 -250 0 -250 0 0 140 0 140 250 0 250 0 0 -140z"/>
            </g>
          </svg>
        </a>
      </h2>
      <div class="mt-5 px-2 text-lg text-lightgray max-w-520">Find docs created by community members like you. <br>Give feedback, collaborate and create your own.</div>
    </div>

    <MastheadContent
      v-else
      :doc-data="docData"
    ></MastheadContent>
    <div 
      v-if="state.layoutData.spacesModal"
      class="fade-modal fixed bg-white z-50 absolute-center" 
    >
      <div 
        @click="state.layoutData.spacesModal = false" 
        class="cursor-pointer absolute z-10 top-5 right-8" 
      >
        <i class="fa fa-times text-2xl" ></i>
      </div>
      <div class="overflow-auto pb-2 h-80vh">
        <div class="text-center px-2 sm:px-12 pt-6">
          <SpacesModal></SpacesModal>
        </div>
      </div>
    </div>

    <div v-if="state.layoutData.spacesModal" class="backdrop" @click="state.layoutData.spacesModal = false"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, watch } from 'vue'
import SpacesModal from '@/components/Molecules/SpacesModal.vue'
import MastheadContent from '@/components/Layout/MastheadContent.vue'
import { useRoute } from 'vue-router';

export default defineComponent({
  components: {
    SpacesModal,
    MastheadContent
  },
  props: {
    docData: { type: Object },
    hideSpaces: { type: Boolean }
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      layoutData: {
        onMobile: false,
        spacesModal: false
      }
    })

    onMounted(() => {
      state.layoutData.onMobile = window.innerWidth < 600
      window.addEventListener('resize', () => {
        state.layoutData.onMobile = window.innerWidth < 600
      })
      getBackgroundImg()
    })

    const getBackgroundImg = () => {
      if (!state.layoutData.onMobile && route.name === 'Home') {
        const imageUrl = 'src/assets/img/masthead0.jpg'
        const bgElement = document.getElementsByClassName('pattern-background')[0]
        let preloaderImg = document.createElement('img')
        preloaderImg.src = imageUrl

        preloaderImg.addEventListener('load', () => {
          // @ts-ignore
          bgElement.style.backgroundImage = `url(${imageUrl})`
          bgElement.classList.add('show-pattern')
          preloaderImg = null
        })
      }
    }

    const searchEnter = (search) => {
      window.location.href = '/?search=' + search
    }

    return {
      state,
      getBackgroundImg
    }
  }
})
</script>

<style scoped>
  .logo-link {
    color: white !important;
    text-decoration: none;
  }

  .masthead {
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #074246;
    background-image: -moz-linear-gradient(180deg, rgba(7, 68, 73, 0.3), #074449),-moz-linear-gradient(70deg, #072046 22%, #0c400b);
    background-image: -webkit-linear-gradient(180deg, rgba(7, 68, 73, 0.3), #074449),-webkit-linear-gradient(70deg, #072046 22%, #0c400b);
    background-image: -o-linear-gradient(180deg, rgba(7, 68, 73, 0.3), #074449),-o-linear-gradient(70deg, #072046 22%, #0c400b);
    background-image: -ms-linear-gradient(180deg, rgba(7, 68, 73, 0.3), #074449),-ms-linear-gradient(70deg, #072046 22%, #0c400b);
    background-image: linear-gradient(180deg, rgba(7, 68, 73, 0.3), #074449),linear-gradient(70deg, #072046 22%, #0c400b);
    transition: min-height 1s;
    color: white;
    z-index: 10;
  }

  .masthead-content {
    border-radius: 40px;
  }

  .pattern-background {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: repeat;
    background-position: center center;
    background-size: 1200px;
    opacity: 0;
    transition: opacity 0.5s;
  }

  .show-pattern {
    opacity: 0.32;
  }

  .header-link {
    color: white !important;
  }

  .header-link:active {
    color: lightgrey !important;
  }

  .spaces-modal-button {
    font-size: 1.1rem;
  }

  .spaces-modal-button:hover {
    background-color: rgba(240, 97, 57, 0.2);
  }

  .spaces-modal-button:active {
    background-color: rgba(240, 97, 57, 0.4);
  }

  .min-h-570 {
    min-height: 570px;
  }

  .h-80vh {
    height: 80vh;
  }

  .top-bar {
    background-color: #083f3f;
  }

  .fade-modal {
    max-width: 800px; 
    width: calc(100% - 24px);
  }

  .max-w-520 {
    max-width: 520px;
  }

  .masthead-explainer {
    line-height: 1.4em; 
    opacity: 0.9;
  }

  .title {
    font-size: 3em;
    width: 245px;
  }

  .heystacks-logo {
    width: 1.85em; margin: 10px 0px -2px -7px;
  }
</style>