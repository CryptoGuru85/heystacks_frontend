<template>
  <div>
    <div class="flex justify-center items-center">
      <svg class="w-5 mr-2" alt="heystacks logo" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 900.000000 900.000000" preserveAspectRatio="xMidYMid meet">
        <rect x="100" y="100" width="850" height="800" fill="#7b4848"></rect>
        <rect x="10" y="10" width="700" height="700" fill="white"></rect>
        <g transform="translate(0.000000,800.000000) scale(0.100000,-0.100000)" fill="#d96d1a" stroke="none">
          <path d="M0 4000 l0 -4000 4000 0 4000 0 0 4000 0 4000 -4000 0 -4000 0 0 -4000z m6740 1695 l0 -445 -2315 0 -2315 0 0 445 0 445 2315 0 2315 0 0 -445z m-870 -1730 l0 -445 -2315 0 -2315 0 0 445 0 445 2315 0 2315 0 0 -445z"/>
        </g>
      </svg>
      <h1 class="text-2xl font-normal">
        heystacks
        <span class="font-medium text-cyan-900">TEAMS</span>
      </h1>
    </div>
    <div>
      <h4 class="text-lg mt-4 mb-6 font-bold">Organize your team's Google docs</h4>
      <p v-if="extended" class="text-lg mt-4 mb-10 px-2">
        Looking for an enterprise wiki, knowledge base or documentation tool? Why not use Google docs, a tool
        which everyone on your team is already familiar with? heystacks Teams can then help you to easily organize,
        search and discover knowledge for your entire organization.
      </p>
      <div class="relative mx-auto pt-4 pb-3 px-6 mb-5 border-animation" :class="extended ? 'bg-white' : ''">
        <img class="max-w-full teams-img" src="/src/assets/img/teams.png" alt="heystacks Teams" title="heystacks Teams">
        <span class="team-img-title hide-on-500px font-semibod absolute bg-white p-1 font-base">A TEAM</span>
      </div>
      <a class="no-underline" href="https://teams.heystacks.org" target="_blank" title="heystacks Teams">
        <button 
          class="min-w-200 duration-200 mt-10 mb-2 w-3/5 bg-orange-600 hover:bg-orange-500 active:bg-orange-400 py-2.5 px-6 rounded"
        >
          <i class="fa fa-plus text-white mr-2"></i>
          <span class="text-white text-xl">Sign in/up</span>
        </button>        
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    extended: { type: Boolean }
  },
})
</script>

<style scoped>

  @keyframes fadein {
    from { 
      border: 2px dashed white; 
    }
    to { 
      border: 2px dashed #074246; 
    }
  }

  .border-animation {
    width: 322px;
    max-width: 80%;
    border: 2px solid white;
    border-radius: 3px;
    animation: fadein 0.2s forwards;
    animation-delay: 1s;
    animation-iteration-count: 1;
  }

  .teams-img {
    width: 280px; 
    min-height: 280px;
  }

  .team-img-title {
    left: 88px; 
    top: 18px;
  }

</style>
