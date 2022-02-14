<template>
  <div
    class="masthead text-center relative flex items-center justify-center"
    :style="(space && space.customisation && space.customisation.colors)
      ? {
        'min-height': '570px',
        'background-image': 'linear-gradient(180deg, rgba(7, 68, 73, 0.3), ' + space.customisation.colors.color1 + '),linear-gradient(50deg, ' + space.customisation.colors.color2 + ' 22%, ' + space.customisation.colors.color3 + ')',
        'background-color': space.customisation.colors.color1
      } : {
      'min-height': '570px'
      }"
  >

    <div
      class="search-input-header flex mx-6 absolute left-0 right-0 justify-between overflow-hidden top-5"
    >
      <router-link
        v-if="!docData"
        :to="{ name: 'Home' }"
        class="header-link flex items-center"
        title="heystacks"
      >
        <svg alt="heystacks logo" class="heystacks-logo mr-2" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 900.000000 900.000000" preserveAspectRatio="xMidYMid meet">
          <rect x="100" y="100" width="850" height="800" fill="#7b4848"></rect>
          <rect x="10" y="10" width="700" height="700" fill="white"></rect>
          <g transform="translate(0.000000,800.000000) scale(0.100000,-0.100000)" fill="#d96d1a" stroke="none">
            <path d="M0 4000 l0 -4000 4000 0 4000 0 0 4000 0 4000 -4000 0 -4000 0 0 -4000z m6740 1695 l0 -445 -2315 0 -2315 0 0 445 0 445 2315 0 2315 0 0 -445z m-870 -1730 l0 -445 -2315 0 -2315 0 0 445 0 445 2315 0 2315 0 0 -445z"/>
          </g>
        </svg>
        <h1 class="hide-on-400px font-medium mb-0 text-2xl">heystacks</h1>
      </router-link>
      <router-link
        v-else
        :to="{ path: '/s/' + space.name }"
        :title="space.name"
        class="header-link"
      >
        <h1 class="font-medium text-2xl mb-0">s/{{space.name}}</h1>
      </router-link>

    </div>

    <div
      v-if="!docData"
      ref="masthead-content"
      class="masthead-content py-4 px-2"
    >
      <h1 class="font-normal mb-0 text-3xl">
        s/{{ space.name }}
      </h1>
      <h2 class="mt-2 masthead-explainer text-xl font-normal">
        {{ space.description }}
      </h2>
    </div>
    <MastheadContent
      v-else
      :doc-data="docData"
    ></MastheadContent>

  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, computed, onBeforeMount, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import MastheadContent from '@/components/Layout/MastheadContent.vue'

export default defineComponent({
  components: {
    MastheadContent
  },
  props: {
    docData: { type: Object },
    spaceName: { type: String }
  },
  setup(props) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      layoutData: {
        onboarded: true,
        onMobile: false,
        animatingMasthead: false,
      }
    })

    onBeforeMount(() => {
      const getSpaceData = () => {
        if (
          (route.params.spaceName || props.spaceName) &&
          space.name !== (route.params.spaceName || props.spaceName)
        ) {
          fetch('/api/spaces/get', {
            method: 'POST',
            body: JSON.stringify({
              slug: route.params.spaceName || props.spaceName,
              docId: route.params.docId
            })
          }).then(r => {
            if (r.status !== 200) {
              r.json().then(r => {
                alert(r)
              })
            } else {
              r.json().then(r => {
                store.commit('setSpace', r.spaces[0])
              })
            }
          })
        }
      }
      const ssrDiv = document.getElementById('ssr-data-tags-div') || document.getElementById('ssr-data-div')
      if (ssrDiv) {
        const ssrObj = JSON.parse(ssrDiv.getAttribute('data-json'))
        if (ssrObj && (
          (ssrObj.spaceObj && ssrObj.spaceObj.name === route.params.spaceName) ||
          (ssrObj.id && ssrObj.id === parseInt(route.params.docId))
        )) {
          store.commit('setSpace', ssrObj.spaceObj)
        }
      } else {
        getSpaceData()
      }
    })

    onMounted(() => {
        state.layoutData.onMobile = window.innerWidth < 600
        window.addEventListener('resize', () => {
          state.layoutData.onMobile = window.innerWidth < 600
        })
    })
    
    const space = computed(() => {
      return store.getters.getSpaceData || {}
    })

    const searchEnter = (search) => {
      if (search) {
        router.push('/?search=' + search)
      }
    }

    return {
      state, 
      searchEnter,
      space
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
    background-image: -moz-linear-gradient(180deg, rgba(7, 68, 73, 0.3), #074449),-moz-linear-gradient(50deg, #072046 22%, #0c400b);
    background-image: -webkit-linear-gradient(180deg, rgba(7, 68, 73, 0.3), #074449),-webkit-linear-gradient(50deg, #072046 22%, #0c400b);
    background-image: -o-linear-gradient(180deg, rgba(7, 68, 73, 0.3), #074449),-o-linear-gradient(50deg, #072046 22%, #0c400b);
    background-image: -ms-linear-gradient(180deg, rgba(7, 68, 73, 0.3), #074449),-ms-linear-gradient(50deg, #072046 22%, #0c400b);
    background-image: linear-gradient(180deg, rgba(7, 68, 73, 0.3), #074449),linear-gradient(50deg, #072046 22%, #0c400b);
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
    opacity: 0.07;
  }


  .header-link {
    color: white !important;
  }

  .header-link:active {
    color: lightgrey !important;
  }

  .masthead-explainer {
    line-height: 1.4em; 
    opacity: 0.9;
  }

  .heystacks-logo {
    width: 1.05em;
  }

</style>
