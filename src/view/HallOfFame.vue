<template>
  <div>
    <custom-header :hide-teams="true"></custom-header>
    <div class="mb-48">
      <br />
      <br />
      <div class="container mx-auto text-center px-8">
        <h1 class="text-3xl font-normal">
          <span class="mr-2">Hall of fame</span>
          <i class="text-orange-600 text-2xl fas fa-medal"></i>
        </h1>
        <br />

        <div>
          <span 
            @click="state.year = 2021" 
            class="mx-2 cursor-pointer"
            :class="state.year == 2021 ? 'font-bold' : ''"
          >
            2021
          </span>
          <span 
            @click="state.year = 2020" 
            class="mx-2 cursor-pointer"
            :class="state.year == 2020 ? 'font-bold' : ''"
          >
            2020
          </span>
        </div>

        <div v-for="(month, mid) in state.months.filter(month => month.year === state.year)">
          
          <div class="w-2/3 mb-12 mx-auto divider" :class="mid === 0 ? 'mt-6' : 'mt-12'">
            <div class="flex">
              <div class="flex-1"><hr /></div>
              <span class="text-lg uppercase font-bold mb-0 px-4">
                {{month.month}}
              </span>
              <div class="flex-1"><hr /></div>
            </div>
          </div>

          <div v-for="(document, did) in month.docs">
            <div class="max-w-550 mx-auto text-left">
              <a :href="'/doc/' + document.doc.id + '/' + document.doc.slug" v-on:click.stop v-on:contextmenu.stop class="text-lg text-emerald-900 font-bold mt-3">
                <div>
                  <h4 v-text="(did + 1) + '.'" class="mr-2 no-underline inline"></h4>
                  <img class="inline h-5 -mt-1" :src="document.doc.url.includes('document') ? 'src/assets/icons/docs-icon.png' : document.doc.url.includes('presentation') ? 'src/assets/icons/slides-icon.png' : 'src/assets/icons/sheets-icon.png'" alt="">
                  <span v-text="document.doc.title" class="inline ml-2 hover:underline"></span>
                </div>
              </a>

              <div
                v-if="document.doc.spacesArr && document.doc.spacesArr.length"
                class="text-base ml-5 mb-0"
                title="test space"
                v-on:click.stop
                v-on:contextmenu.stop
              >
                <a v-for="space in document.doc.spacesArr" :href="'/s/' + space" class="space-link mr-3 text-orange-600 font-semibold">s/{{space}}</a>
              </div>

              <p class="text-base mx-auto pl-5 mb-1 whitespace-pre-wrap">
                {{document.doc.description}}
              </p>

              <div class="leading-4 pl-5 mb-5 text-emerald-900">
                <span v-for="(tag, tid) in document.doc.tags" :key="tid" class="text-sm mr-1">
                  <a class="hover:underline" :href="'/?tags=' + tag" :title="tag">{{tag}}</a><span v-if="tid < document.doc.tags.length - 1"> •</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <custom-footer></custom-footer>
  </div>
</template>

<script lang="ts">

import { reactive, defineComponent } from 'vue';
import CustomFooter from '@/components/Layout/CustomFooter.vue';
import CustomHeader from '@/components/Layout/CustomHeader.vue';

export default defineComponent({
  components: {
    CustomHeader,
    CustomFooter,
  },
  setup() {
    const state = reactive({
      months: [{"monthIdx":6,"month":"July","year":2020,"docs":[{"place":0,"doc":{"id":433,"title":"YeahSheWrites Coding Road Map","slug":"yeahshewrites-coding-road-map","url":"https://docs.google.com/document/d/15AG3c7C3v748mrwu8D_XjpdMdMMZDj3Hwv_uem7-ePU/","description":"A beginner friendly document with resources to start learning to code - created by @yeahshewrites who became a software engineer and wanted to share tips on how to get started in the tech industry","tags":["programming","guide","learning resources","learn to code"],"hallOfFame":[{"place":0,"month":"July","monthIdx":6,"year":2020}]}},{"place":1,"doc":{"id":468,"title":"Thirty things which are quite good","slug":"thirty-things-which-are-quite-good","url":"https://docs.google.com/document/d/1dthPoLeA-dj15uBwhDijWvmXFd2cDXcgf3J6Z_kHkCs/","description":"A list of things which are actually quite good","tags":["list","random","DIY","tools"],"hallOfFame":[{"place":1,"month":"July","monthIdx":6,"year":2020}]}},{"place":2,"doc":{"id":467,"title":"Thiel on Progress and Stagnation","slug":"thiel-on-progress-and-stagnation","url":"https://docs.google.com/document/d/1zao_AyBhNb8TPWrQqgXn5NzNAgfEqzTIaFYos7wdqGI/","description":"Peter Thiel’s view on progress and stagnation in his own words, sourced from a number of his interviews and articles. This document consists only of direct quotes from Thiel, lightly edited for clarity (except for headings and where marked otherwise). Compiled by Richard Ngo (@richardmcngo) and Jeremy Nixon (@jvnixon).","tags":["technology","innovation","startup","Peter Thiel","quotes"],"hallOfFame":[{"place":2,"month":"July","monthIdx":6,"year":2020}]}}]},{"monthIdx":5,"month":"June","year":2020,"docs":[{"place":0,"doc":{"id":380,"title":"Hand picked Remote Jobs from Hacker News Who is hiring - By RemoteLeaf ","slug":"hand-picked-remote-jobs-from-hacker-news-who-is-hi","url":"https://docs.google.com/spreadsheets/d/1NVzygGYTmF3g_VPAh4lXhy3eu6PvxyyUgg-Jy_6BiII/","description":"A list of high quality technical jobs found on Hacker News","tags":["remotework","remote jobs","jobs","tech jobs"],"hallOfFame":[{"place":0,"month":"June","monthIdx":5,"year":2020}]}},{"place":1,"doc":{"id":346,"title":"Justice in June","slug":"justice-in-june","url":"https://docs.google.com/document/d/1H-Vxs6jEUByXylMS2BjGH1kQ7mEuZnHpPSs1Bpaqmw0/","description":"This resource was compiled by Autumn Gupta with Bryanna Wallace’s oversight for the purpose of providing a starting place for individuals trying to become better allies to the anti-racism efforts in the United States","tags":["anti-racism","society","resources","USA"],"hallOfFame":[{"place":1,"month":"June","monthIdx":5,"year":2020}]}},{"place":2,"doc":{"id":292,"title":"Podcast* Recs Super Sheet","slug":"podcast-recs-super-sheet","url":"https://docs.google.com/spreadsheets/d/1SmkVgcKTOPWAMqgogg5oim6aGnYTM0y6bhk4PPJ-n7c/","description":"Podcasts Recs Sheet: Crowd-sourced podcast recommendations, multi-genre and form.","tags":["podcasts","audio","recommendations","media"],"hallOfFame":[{"place":2,"month":"June","monthIdx":5,"year":2020}]}}]},{"monthIdx":4,"month":"May","year":2020,"docs":[{"place":0,"doc":{"id":240,"title":"Journalists/Communications Professionals Doing Pro Bono Work","slug":"journalistscommunications-professionals-doing-pro-bono-work","url":"https://docs.google.com/spreadsheets/d/1Oh5T0r3Di9zg3yLAmnp81Lg998flKdvlAESStIBqXYc/","description":"This sheet is for anyone in the Communications/Media industries willing to do pro bono work to help out other industry folk.\nIf you're not a journalist, please specify what you do so there's no confusion.This is strictly career-adjacent work, not a way to advertise services for nonprofits.","tags":["journalism","pro bono","jobs","contacts"],"hallOfFame":[{"place":0,"month":"May","monthIdx":4,"year":2020}]}},{"place":1,"doc":{"id":95,"title":"COVID-19 European Investor Status List","slug":"covid-19-european-investor-status-list","url":"https://docs.google.com/spreadsheets/d/1Z3cGCZuDRrHznW4AvC41CnirNd5PDSBEQ0gVm4Zt5P0/","description":"OPEN SOURCE - Fully editable and shareable by anyone. Please use sensibly.","tags":["VC","startup"],"hallOfFame":[{"place":1,"month":"May","monthIdx":4,"year":2020}]}},{"place":2,"doc":{"id":106,"title":"Data Spreadsheet for Animal Crossing New Horizons","slug":"item-spreadsheet-for-animal-crossing-new-horizons---group-project","url":"https://docs.google.com/spreadsheets/d/13d_LAJPlxMa_DubPTuirkIV4DERBMXbrWQsmSh8ReK4/","description":"This spreadsheet is a collaboration effort between multiple members of the ACNH community. This is a spreadsheet for free use that anyone can contribute to.","tags":["games","animal crossing","animal crossing item ids"],"hallOfFame":[{"place":2,"month":"May","monthIdx":4,"year":2020}]}}]},{"monthIdx":3,"month":"April","year":2020,"docs":[{"place":0,"doc":{"id":101,"title":"The Freelancer Rate Calculator","slug":"the-freelancer-rate-calculator","url":"https://docs.google.com/spreadsheets/d/1PMmlXqU9b-abEHy9nlh3FMcCwMktWy7R7sZ1nJ5rscQ/","description":"The Freelance Rate Calculator - Take 10 minutes and figure out your hourly / daily / weekly rate","tags":["freelance","remotework","data","finance","budget"],"hallOfFame":[{"place":0,"month":"April","monthIdx":3,"year":2020}]}},{"place":1,"doc":{"id":96,"title":"Online Meeting Resources Toolkit for Facilitators","slug":"online-meeting-resources-toolkit-for-facilitators","url":"https://docs.google.com/document/d/1NyrEU7n6IUl5rgGiflx_dK8CrdoB2bwyyl9XG-H7iw8/","description":"A crowdsourced catalog created by Nancy White, curated by Robin Good - tools, practices, inclusion practices","tags":["collaboration","onlinemeetings","virtualteams","remotework","facilitation","coronavirus"],"hallOfFame":[{"place":1,"month":"April","monthIdx":3,"year":2020}]}},{"place":2,"doc":{"id":236,"title":"Companies Hiring During Corona Crisis (http://bit.ly/stillhiringcorona)","slug":"companies-hiring-during-corona-crisis-httpbitlystillhiringcorona","url":"https://docs.google.com/spreadsheets/d/1lwZ4ot10j-wvQZgA_hJ0AZJS_X3V9HjVk2QLsAU4WMc/","description":"Helping job seekers & companies during challenging times","tags":["jobs","developers","technology","recruitment","freelance","freelance work","I hate my job"],"hallOfFame":[{"place":2,"month":"April","monthIdx":3,"year":2020}]}}]},{"monthIdx":2,"month":"March","year":2020,"docs":[{"place":0,"doc":{"id":1,"title":"UK Coronavirus/COVID-19 Figures - tracking, statistics and breakdowns","slug":"uk-coronaviruscovid-19-figures-officially-confirmed-by-dhsc-and-phe-on-twittergovuk","url":"https://docs.google.com/spreadsheets/d/1eTKeK9vRxgw0KhvKxPCaDrfaHnxQP-n9TsLzsEymviY/","description":"Coronavirus updates. From reports, results take around 48 hours to process and the government delays figures by up to 24 hours for confirmation purposes.  So figures released are likely representative of 72 hours ago.","tags":["coronavirus","data","coronavirus updates","UK"],"hallOfFame":[{"place":0,"month":"March","monthIdx":2,"year":2020}]}},{"place":1,"doc":{"id":108,"title":"COVID-19 \"Don't Go Crazy\" list","slug":"covid-19-dont-go-crazy-list","url":"https://docs.google.com/document/d/1n4gyJdoLdL18z0tmeEurmy4iXqa0c4B2JN4Jqb49YAg/","description":"List of Things To Do and Resources To Stay Sane While Quarantined During COVID-19","tags":["covid19","resources","fun","useful","coronavirus","quarantine","movies","shows","games","arts and crafts","learning","books","podcasts","tips","music","art","mental health"],"hallOfFame":[{"place":1,"month":"March","monthIdx":2,"year":2020}]}},{"place":2,"doc":{"id":104,"title":"Free Theatre Screenings","slug":"free-theatre-screenings","url":"https://docs.google.com/spreadsheets/d/1JC9gQn8-e_hL6vZGPBENdt_a3QEkcZVmbi3rv4_xNzE/","description":"I've put together a schedule of all the free on-line theatre screenings that I found. Enjoy and message me if you have any additions. I'll be updating the doc as we go","tags":["art","theatre","watch movies in theatre online"],"hallOfFame":[{"place":2,"month":"March","monthIdx":2,"year":2020}]}}]}],
      year: 2021,
    })
    const ssrDiv = document.getElementById('ssr-data-div')
    const ssrData = ssrDiv ? JSON.parse(ssrDiv.getAttribute('data-json')) : null
    if (ssrData && ssrData.hallOfFame) {
      state.months = ssrData.months
    } else {
      fetch('/api/hall-of-fame/get')
        .then(r => r.json())
        .then(r => { state.months = r.months })
    }
    return {
      state
    }
  },
})
</script>
<style scoped>
  .max-w-550 {
    max-width: 550px;
  }
</style>
