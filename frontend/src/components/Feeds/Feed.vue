<template>
  <div>
    <CustomHeader
      v-if="!space"
      :feed-page="true"
    ></CustomHeader>
    <SpaceHeader
      v-else
    ></SpaceHeader>
    <AddNewModal
      v-if="state.newDocumentModal" 
      :existing-tags="state.existingTags"
      @close="state.newDocumentModal = false"
      @close-add-new-modal="(doc) => addedNewDoc(doc)"
      @close-approval-needed="addedApprovalNeeded"
    ></AddNewModal>
    <div v-if="state.newDocumentModal" class="backdrop" @click="state.newDocumentModal = false"></div>
    <div id="filter-wrapper" class="pt-8 pb-12">
      <div class="container px-3 mx-auto" v-if="!space">
        <div class="flex justify-center">
          <SearchInput
            :feed="true"
            :initial-search="state.filterObj.search"
            :searching="state.layoutData.searching"
            :existing-tags="state.tags.map(tag => ({text: tag.title}))"
            @search="(search) => {state.filterObj.search = search; searchEnter();}"
            @selected-tag="(tag) => {toggleTags(tag)}"
          ></SearchInput>
          <div class="relative ml-3"
            @mouseover="state.layoutData.onTouchFeed = true"
            @mouseleave="state.layoutData.onTouchFeed = false"
          >
            <button
              class="feed-btn h-45 w-72 flex justify-center items-center rounded border border-white duration-300"
            >
              <svg v-if="state.filterObj.type === 'all' || state.filterObj.type === 'docs'" alt="Google" class="ml-2 w-4 rounded" :class="state.filterObj.type === 'all' ? 'mr-1' : 'mr-2'" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
                <rect x="5" y="5" width="55" height="55" fill="white"></rect>
                <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#4285F4" stroke="none">
                  <path d="M 0.648 639.352 L 0.648 1.409 L 639.352 0.648 L 639.352 639.352 L 0.648 639.352 Z M 500 465 L 500 430 L 320 430 L 140 430 L 140 465 L 140 500 L 320 500 L 500 500 L 500 465 Z M 500 325 L 500 290 L 320 290 L 140 290 L 140 325 L 140 360 L 320 360 L 500 360 L 500 325 Z M 390 185 L 390 150 L 265 150 L 140 150 L 140 185 L 140 220 L 265 220 L 390 220 L 390 185 Z"></path>
                </g>
              </svg>
              <svg v-if="state.filterObj.type === 'all' || state.filterObj.type === 'sheets'" alt="Google" class="w-4 rounded" :class="state.filterObj.type === 'all' ? 'mr-1' : 'mx-2'" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
                <rect x="5" y="5" width="55" height="55" fill="white"></rect>
                <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#0F9D58" stroke="none">
                  <path d="M0 320 l0 -320 320 0 320 0 0 320 0 320 -320 0 -320 0 0 -320z m280 180 l0 -70 145 0 145 0 0 -35 0 -35 -145 0 -145 0 0 -145 0 -145 -35 0 -35 0 0 145 0 145 -70 0 -70 0 0 35 0 35 70 0 70 0 0 70 0 70 35 0 35 0 0 -70z"/>
                </g>
              </svg>
              <svg v-if="state.filterObj.type === 'all' || state.filterObj.type === 'slides'" alt="Google" class="mr-2 w-4 rounded" :class="state.filterObj.type === 'all' ? '' : 'ml-2'" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
                <rect x="5" y="5" width="55" height="55" fill="white"></rect>
                <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#F4B400" stroke="none">
                  <path d="M0 320 l0 -320 320 0 320 0 0 320 0 320 -320 0 -320 0 0 -320z m570 0 l0 -140 -250 0 -250 0 0 140 0 140 250 0 250 0 0 -140z"/>
                </g>
              </svg>
            </button>
            <transition name="fade">
              <div 
                v-if="state.layoutData.onTouchFeed" 
                @click="state.layoutData.onTouchFeed = false"
                class="menu-content absolute flex flex-col items-start py-3 bg-zinc-100 rounded z-20 absolute-center-x "
              >
                <div
                  @click="state.filterObj.type = 'all'"
                  class="px-4 py-2 w-full text-left whitespace-nowrap block duration-200 text-gray-500 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 cursor-pointer"
                >
                  <div class="flex items-center" :class="state.filterObj.type === 'all' ? 'font-bold' : ''">
                    <svg class="w-4 rounded ml-1" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
                      <rect x="5" y="5" width="55" height="55" fill="white"></rect>
                      <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#4285F4" stroke="none">
                        <path d="M 0.648 639.352 L 0.648 1.409 L 639.352 0.648 L 639.352 639.352 L 0.648 639.352 Z M 500 465 L 500 430 L 320 430 L 140 430 L 140 465 L 140 500 L 320 500 L 500 500 L 500 465 Z M 500 325 L 500 290 L 320 290 L 140 290 L 140 325 L 140 360 L 320 360 L 500 360 L 500 325 Z M 390 185 L 390 150 L 265 150 L 140 150 L 140 185 L 140 220 L 265 220 L 390 220 L 390 185 Z"></path>
                      </g>
                    </svg>
                    <svg class="w-4 rounded ml-1" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
                      <rect x="5" y="5" width="55" height="55" fill="white"></rect>
                      <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#0F9D58" stroke="none">
                        <path d="M0 320 l0 -320 320 0 320 0 0 320 0 320 -320 0 -320 0 0 -320z m280 180 l0 -70 145 0 145 0 0 -35 0 -35 -145 0 -145 0 0 -145 0 -145 -35 0 -35 0 0 145 0 145 -70 0 -70 0 0 35 0 35 70 0 70 0 0 70 0 70 35 0 35 0 0 -70z"/>
                      </g>
                    </svg>
                    <svg class="w-4 rounded ml-1" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
                      <rect x="5" y="5" width="55" height="55" fill="white"></rect>
                      <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#F4B400" stroke="none">
                        <path d="M0 320 l0 -320 320 0 320 0 0 320 0 320 -320 0 -320 0 0 -320z m570 0 l0 -140 -250 0 -250 0 0 140 0 140 250 0 250 0 0 -140z"/>
                      </g>
                    </svg>
                    All
                  </div>                  
                </div>

                <div
                  @click="state.filterObj.type = 'docs'"
                  class="px-4 py-2 w-full text-left whitespace-nowrap block py-2 duration-200 text-gray-500 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 cursor-pointer"
                >
                  <div class="flex items-center" :class="state.filterObj.type === 'docs' ? 'font-bold' : ''">
                    <svg class="w-4 rounded mr-1" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
                      <rect x="5" y="5" width="55" height="55" fill="white"></rect>
                      <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#4285F4" stroke="none">
                        <path d="M 0.648 639.352 L 0.648 1.409 L 639.352 0.648 L 639.352 639.352 L 0.648 639.352 Z M 500 465 L 500 430 L 320 430 L 140 430 L 140 465 L 140 500 L 320 500 L 500 500 L 500 465 Z M 500 325 L 500 290 L 320 290 L 140 290 L 140 325 L 140 360 L 320 360 L 500 360 L 500 325 Z M 390 185 L 390 150 L 265 150 L 140 150 L 140 185 L 140 220 L 265 220 L 390 220 L 390 185 Z"></path>
                      </g>
                    </svg>
                    Google Docs
                  </div>                  
                </div>

                <div
                  @click="state.filterObj.type = 'sheets'" 
                  class="px-4 py-2 w-full text-left whitespace-nowrap block py-2 duration-200 text-gray-500 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 cursor-pointer"
                >
                  <div class="flex items-center" :class="state.filterObj.type === 'sheets' ? 'font-bold' : ''">
                    <svg class="w-4 rounded mr-1" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
                      <rect x="5" y="5" width="55" height="55" fill="white"></rect>
                      <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#0F9D58" stroke="none">
                        <path d="M0 320 l0 -320 320 0 320 0 0 320 0 320 -320 0 -320 0 0 -320z m280 180 l0 -70 145 0 145 0 0 -35 0 -35 -145 0 -145 0 0 -145 0 -145 -35 0 -35 0 0 145 0 145 -70 0 -70 0 0 35 0 35 70 0 70 0 0 70 0 70 35 0 35 0 0 -70z"/>
                      </g>
                    </svg>
                    Google Sheets
                  </div>                  
                </div>

                <div
                  @click="state.filterObj.type = 'slides'"
                  class="px-4 py-2 w-full text-left whitespace-nowrap block py-2 duration-200 text-gray-500 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 cursor-pointer"
                >
                  <div class="flex items-center" :class="state.filterObj.type === 'slides' ? 'font-bold' : ''">
                    <svg class="w-4 rounded mr-1" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
                      <rect x="5" y="5" width="55" height="55" fill="white"></rect>
                      <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#F4B400" stroke="none">
                        <path d="M0 320 l0 -320 320 0 320 0 0 320 0 320 -320 0 -320 0 0 -320z m570 0 l0 -140 -250 0 -250 0 0 140 0 140 250 0 250 0 0 -140z"/>
                      </g>
                    </svg>
                    Google Slides
                  </div>                  
                </div>

              </div>
            </transition>
          </div>

          <div class="relative ml-3"
            @mouseover="state.layoutData.onTouchHot = true"
            @mouseleave="state.layoutData.onTouchHot = false"
          >
            <button
              class="feed-btn h-45 w-40 flex justify-center items-center rounded border border-white duration-300"
            >
              <span class="font-medium text-lightgrey">{{state.filterObj.sort}}</span>
            </button>
            <transition name="fade">
              <div 
                v-if="state.layoutData.onTouchHot" 
                @click="state.layoutData.onTouchHot = false"
                class="menu-content absolute flex flex-col items-start py-3 bg-zinc-100 rounded z-20 absolute-center-x"
              >
                <div 
                  v-for="(sortType, tid) in ['Hot', 'Best', 'New']" 
                  @click="state.filterObj.sort = sortType" 
                  :key="tid" 
                  class="px-4 py-2 w-full text-left whitespace-nowrap block duration-200 text-gray-500 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 cursor-pointer"
                >
                  <div :class="state.filterObj.sort === sortType ? 'font-bold' : ''">
                    {{sortType}}
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <button
            @click="state.newDocumentModal = true"
            title="Share an interesting Google doc"
            class="feed-btn h-45 border border-white rounded flex items-center px-3 ml-3 duration-300"
          >
            <div class="mr-2 w-14">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-plus fa-w-14 max-w-full max-h-full"><path fill="#fff" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" ></path></svg>
            </div>
            <span class="text-xl text-white">New</span>
          </button>
        </div>

        <p v-if="!state.layoutData.onboarded" class="mt-5 mb-0 text-center text-xl text-lightgray">Don't know where to start? Check out our <router-link :to="{ path: '/hall-of-fame' }" class="text-orange-600 hover:underline">hall of fame</router-link></p>

        <br>

        <div class="text-center min-h-127">
          <div class="font-medium mb-2 text-lightgrey">Filter results</div>
          <div class="flex flex-wrap justify-center">
            <button
              :key="tid"
              v-for="(tag, tid) in state.tags.slice(0, 10)"
              @click="toggleTags(tag.title)"
              class="m-1 px-5 cursor-pointer tag-chip flex items-center rounded duration-300 h-42"
              :class="state.filterObj.tags.indexOf(tag.title) >= 0 ? 'tag-selected' : ''"
              label
              :ripple="false"
            >
              <TagIcon
                :key="'tag-icon-feed-' + tag.id + '-' + tag.title"
                :title="tag.title"
              ></TagIcon>
              {{tag.title}}
              <i 
                v-if="state.filterObj.tags.indexOf(tag.title) >= 0"
                class="fa fa-times-circle ml-2 text-lightgrey"
              ></i>
            </button>

            <div 
              class="relative ml-3"
              v-if="state.tags.length > 10"
              @mouseover="state.layoutData.onTouchFilter = true"
              @mouseleave="state.layoutData.onTouchFilter = false"
            >
              <button
                class="feed-btn w-40 h-42 flex justify-center items-center rounded m-1 text-lightgrey"
              >
                <i class="fa fa-ellipsis-h text-lightgrey"></i>
              </button>
              <transition name="fade">
                <div 
                  v-if="state.layoutData.onTouchFilter" 
                  @click="state.layoutData.onTouchFilter = false"
                  class="menu-content absolute flex flex-col items-start py-3 px-2 bg-zinc-100 rounded z-20 absolute-center-x w-227"
                >
                  <div class="form-group w-full">
                    <input 
                      class="bg-gray-200 rounded w-full outline-none px-3 pt-5 pb-3 text-default mb-0"
                      id="tag-name"
                      v-model="state.filterObj.tagSearch"
                      v-on:click.stop
                      autofocus
                      filled
                      required
                    />
                    <label for="tag-name">Tag name</label>
                  </div>
                  <a
                    class="px-4 py-2 w-full text-left whitespace-nowrap block duration-200 text-gray-500 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300"
                    v-for="tag in state.tags.slice(!state.filterObj.tagSearch ? 10 : 0, state.tags.length).filter(tag => !state.filterObj.tagSearch || tag.title.includes(state.filterObj.tagSearch)).slice(0, 10)"
                    @click="toggleTags(tag.title)"
                  >
                    <div class="px-1 py-0" :style="state.filterObj.tags.findIndex(t => t === tag.title) >= 0 ? {'font-weight': 600} : {}">{{tag.title}}</div>
                  </a>
                </div>
              </transition>
            </div>
          </div>
        </div>

      </div>

      <div class="container px-3 mx-auto" v-else>
        <div class="text-center flex items-center justify-center">
          <SearchInput
            :feed="true"
            :initial-search="state.filterObj.search"
            :searching="state.layoutData.searching"
            :existing-tags="[]"
            @search="(search) => {state.filterObj.search = search; searchEnter();}"
            @selected-tag="(tag) => {toggleTags(tag)}"
          ></SearchInput>
          <button
            @click="state.newDocumentModal = true"
            title="Share an interesting Google doc"
            class="feed-btn w-100 h-45 flex justify-center items-center rounded border border-white text-white text-lg ml-2"
          >
            <div class="mr-2 w-14">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-plus fa-w-14 max-w-full max-h-full"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" ></path></svg>
            </div>
            New
          </button>

        </div>
      </div>
    </div>

    <div class="pt-12 card-feed bg-white">
      <div class="container px-3 mx-auto">

        <div v-if="!space" class="w-2/3 mb-12 mx-auto divider">
          <div class="flex">
            <div class="opacity-50 divider-line"><hr /></div>
            <span class="mb-0 px-4 text-lg uppercase font-bold text-default">Results</span>
            <div class="opacity-50 divider-line"><hr /></div>
          </div>
        </div>

        <div v-for="(document, did) in state.documents">
          <Card
            :id="'doc-card-' + did"
            :key="'doc-card-' + document.id"
            :document="document"
            :voted-ids="state.votedIds"
            :existing-tags="state.existingTags"
            :selected-tags="state.filterObj.tags"
            :on-touch="state.layoutData.onTouch"
            :space="space"
            :word-cloud-loaded="state.layoutData.wordCloudLoaded"
            @toggle-tags="tag => { toggleTags(tag) }"
            @upvote-document="docId => { upvoteDocument(docId) }"
            @update-data="updateObj => { updateDocData(updateObj) }"
          ></Card>

          <div
            v-if="(!space && (did === 1)) || (space && (did === state.documents.length - 1))"
            class="w-full max-w-full px-10 text-center overflow-hidden"
          >
            <ins
              id="google-feed-ad-1"
              class="adsbygoogle block h-280"
              data-ad-client="ca-pub-4396405754277073"
              data-ad-slot="9371562489"
              data-ad-format="auto"
              data-full-width-responsive="true">
            </ins>
          </div>
        </div>
        <div v-if="state.documents.length" class="border-t border-lightgrey"></div>

        <div v-if="state.layoutData.showSkeleton" class="text-center skeleton">
          <div
            v-for="(c, cid) in Array(10)"
            :key="cid"
            class="relative skeleton-content mx-auto shadow-none card-no-highlight bg-white py-3 border-t border-lightgrey h-209"
          >
            <div class="text-left my-4">
              <button
                class="w-1/2 bg-zinc-200 rounded-xl h-6"
              ></button>
            </div>
            <div class="text-left my-4">
              <button
                class="w-full bg-zinc-200 rounded-xl h-3"
              ></button>
              <button
                class="w-3/4 bg-zinc-200 rounded-xl h-3"
              ></button>
            </div>
            <div class="mx-7 text-left">
              <button
                v-for="(c, cid2) in Array(2)"
                :key="cid2"
                class="m-1 pl-4 pr-3 bg-zinc-200 w-20 h-8 rounded"
              >
                &nbsp;
              </button>
            </div>
          </div>
        </div>

        <div v-if="(state.filterObj.search || space) && !state.documents.length"  class="text-center text-gray-500">
          <p class="mt-6 mb-0 text-lg">No docs found</p>
          <p class="text-sm">Come back later - new documents are being added daily</p>
        </div>

        <br>
        <br>

        <div v-if="state.filterObj.pageCount > 1" class="flex justify-center items-center">
          <button
            v-if="state.filterObj.page > 0"
            @click="state.filterObj.page -= 1"
            class="bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-400 w-8 h-8 rounded-full"
          >
            <i class="fa fa-chevron-left" ></i>
          </button>
          <div class="text-xl mx-3 text-default">Page {{state.filterObj.page + 1}}</div>
          <button
            v-if="state.filterObj.page < state.filterObj.pageCount - 1"
            @click="state.filterObj.page += 1"
            class="bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-400 w-8 h-8 rounded-full"
          >
            <i class="fa fa-chevron-right" ></i>
          </button>
        </div>
        <br>
        <br>
        <br>
      </div>
    </div>

    <div
      v-if="state.layoutData.openSnackbar"
      class="snackbar z-20 flex justify-between items-center fixed bg-zinc-800 text-gray-200 px-3 py-2 rounded"
    >
      <span class="whitespace-nowrap mr-6">{{state.layoutData.snackbarText}}</span>
      <button
        @click="state.layoutData.openSnackbar = false"
        class="px-4 py-2 hover:bg-zinc-700 rounded"
      >
        Close
      </button>
    </div>

    <CustomFooter></CustomFooter>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, onBeforeMount, onMounted, nextTick, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Card from '@/components/Molecules/Card.vue'
import AddNewModal from '@/components/Molecules/AddNewModal.vue'
import CustomFooter from '@/components/Layout/CustomFooter.vue'
import CustomHeader from '@/components/Layout/CustomHeader.vue'
import SpaceHeader from '@/components/Layout/SpaceHeader.vue'
import TagIcon from '@/components/Atoms/TagIcon.vue'
import SearchInput from '@/components/Molecules/SearchInput.vue'

export default defineComponent({
  components: {
    Card,
    AddNewModal,
    CustomFooter,
    CustomHeader,
    SpaceHeader,
    SearchInput,
    TagIcon
  },
  props: {
    space: { type: Boolean }
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      filterObj: {
        page: 0,
        pageCount: 1,
        search: '',
        searchOption: 'Everything',
        tagSearch: '',
        sort: 'Hot',
        type: 'all',
        tags: []
      },
      layoutData: {
        loaded: false,
        onboarded: true,
        searching: false,
        showSkeleton: true,
        comboboxInput: null,
        typingTimer: {},
        onMobile: false,
        onTouch: false,
        onTouchFeed: false,
        onTouchHot: false,
        onTouchFilter: false,
        wordCloudLoaded: false,
        openSnackbar: false,
        snackbarText: '📋 Link copied'
      },
      newDocumentModal: false,
      tags: [],
      documents: [],
      votedIds: [],
      existingTags: [],
      spaceData: {
        name: '',
        slug: '',
        description: '',
        customisation: '',
      }
    })

    watch(() => state.filterObj.tags, () => {
      setTimeout(() => state.filterObj.tagSearch = '', 200)
    })

    watch(() => state.filterObj.page, () => {
      reFetchDocs()
      window.scrollTo(0, 570)
    })

    watch(() => state.filterObj.sort, () => {
      if (state.filterObj.page !== 0) {
        state.filterObj.page = 0
      } else {
        if (state.layoutData.loaded) {
          reFetchDocs()
          getTags()
          updateUrl()
        }
      }
    })

    watch(() => state.filterObj.type, () => {
      if (state.layoutData.loaded) {
        state.filterObj.page !== 0 ? state.filterObj.page = 0
          : reFetchDocs()
        updateUrl()
      }
    })

    watch(() => state.filterObj.searchOption, () => {
      reFetchDocs()
    })

    watch(() => state.newDocumentModal, () => {
      updateUrl()
    })

    onBeforeMount(() => {
      if (localStorage.getItem('onboarded') !== 'yes') {
        state.layoutData.onboarded = false
      }
      localStorage.setItem('onboarded', 'yes')
      state.votedIds = JSON.parse(localStorage.getItem('voted') || '[]')

      const ssrTagsDiv = document.getElementById('ssr-data-tags-div')
      if (ssrTagsDiv) {
        state.tags = JSON.parse(ssrTagsDiv.getAttribute('data-json')).tagsObj
      }
      const ssrDocsDiv = document.getElementById('ssr-data-docs-div')
      if (ssrDocsDiv) {
        let ssrDocsData = JSON.parse(ssrDocsDiv.getAttribute('data-json'))
        ssrDocsData = ssrDocsData.map(doc => ({ ...doc, spacesArr: JSON.parse(doc.spacesArr) }))
        state.documents = ssrDocsData
      }

      const params = new URL('https://heystacks.org/' + location.search).searchParams
      if (params.get('tags')) state.filterObj.tags = params.get('tags').split(',')
      if (params.get('search')) state.filterObj.search = params.get('search')
      if (params.get('sort')) state.filterObj.sort = params.get('sort')
      if (params.get('type')) state.filterObj.type = params.get('type')
      if (params.get('page-type') && params.get('page-type') === 'add-document') state.newDocumentModal = true
      if (params.get('error') && params.get('error') === 'document-doesnt-exist') {
        state.layoutData.snackbarText = '❌ Doc you requested doesn\'t exist'
        state.layoutData.openSnackbar = true
      }
      if (params.get('spacecb') && params.get('spacecb') === 'reject') {
        state.layoutData.snackbarText = '👏 Thank you, the doc has been rejected from your gathering!'
        state.layoutData.openSnackbar = true
      }
      if (params.get('spacecb') && params.get('spacecb') === 'approve') {
        state.layoutData.snackbarText = '👏 Thank you, the doc has been added to your gathering!'
        state.layoutData.openSnackbar = true
        fetch('/api/documents/create-thumbnail', {
          method: 'POST',
          body: JSON.stringify({docId: params.get('spacecbid')})
        })
      }

      if (route.params.spaceName) {
        state.spaceData.name = route.params.spaceName
        state.spaceData.slug = route.params.spaceName
      }

      getDocuments()

      state.layoutData.onTouch = matchMedia('(hover: none), (pointer: coarse)').matches
    })

    onMounted(() => {
      state.layoutData.onMobile = window.innerWidth < 600
      window.addEventListener('resize', () => {
        state.layoutData.onMobile = window.innerWidth < 600
      })

      if (!document.getElementById('wordcloud2-script')) {
        const head = document.getElementsByTagName('head')[0]
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = '/src/assets/lib/wordcloud2.js'
        script.id = 'wordcloud2-script'
        script.onload = () => state.layoutData.wordCloudLoaded = true
        head.appendChild(script)
      }

      setTimeout(() => {
        try {
          // (adsbygoogle = window.adsbygoogle || []).push({})
        } catch (error) {
          console.log(error)
        }
      }, 3000)
    })

    const reFetchDocs = () => {
      if (state.layoutData.loaded) {
        state.layoutData.loaded = false
        state.layoutData.showSkeleton = true
        state.documents = []
        getDocuments()
      }
    }

    const getDocuments = () => {
      state.layoutData.loaded = false
      fetch('/api/documents/get', {
        method: 'POST',
        body: JSON.stringify({
          search: state.filterObj.search,
          tags: state.filterObj.tags,
          page: state.filterObj.page,
          sort: state.filterObj.sort,
          type: state.filterObj.type,
          searchOption: state.filterObj.searchOption,
          space: state.space ? route.params.spaceName : null
        })
      }).then(r => {
        if (r.status !== 200) {
          r.json().then(r => alert(r))
        } else {
          r.json().then(r => {
            state.documents = r.documents
            state.filterObj.pageCount = r.pageCount
            state.layoutData.loaded = true
            state.layoutData.showSkeleton = false
            if (r.remindingTags.length) {
              state.tags = r.remindingTags
              getTags(true)
            }
            state.layoutData.searching = false
            nextTick(() => {
            })
          })
        }
      })
      if (state.filterObj.type === 'all' && !state.filterObj.search && !state.filterObj.tags.length) getTags()
    }

    const addedNewDoc = (doc) => {
      if (doc) {
        state.documents.unshift(doc)
        doc.tags.split(', ').forEach(tag => {
          tag = tag.replace(/\'/g, '')
          const tagIdx = state.tags.findIndex(t => t.title === tag)
          if (tagIdx < 0) {
            state.tags.push({count: 1, title: tag})
          } else {
            state.tags[tagIdx].count += 1
          }
        })
      }
      state.newDocumentModal = false
      state.layoutData.snackbarText = '👏 Thank you, the doc has been added!'
      state.layoutData.openSnackbar = true
    }

    const addedApprovalNeeded = () => {
      state.newDocumentModal = false
      state.layoutData.snackbarText = '👍 Thank you, the doc will be added after approval from the space owner'
      state.layoutData.openSnackbar = true
    }

    const getTags = (unfilteredOnly) => {
      fetch('/api/tags/get', {
        method: 'POST',
        body: JSON.stringify({
          sort: state.filterObj.sort
        })
      }).then(r => {  
        if (r.status !== 200) {
          r.json().then(r => alert(r))
        } else {
          r.json().then(r => {
            if (!unfilteredOnly) state.tags = r.tags
            state.existingTags = r.tags.map(tag => ({ text: tag.title, value: tag.title }))
          })
        }
      })
    }

    const upvoteDocument = (docId: number) => {
      const votedIdx = state.votedIds.indexOf(docId)
      let remove = false
      if (votedIdx < 0) {
        state.documents.find(doc => doc.id === docId).upvotes += 1
        state.votedIds.push(docId)
      } else {
        state.documents.find(doc => doc.id === docId).upvotes -= 1
        state.votedIds.splice(votedIdx, 1)
        remove = true
      }
      fetch('/api/documents/vote', {
        method: 'POST',
        body: JSON.stringify({ docId: docId, remove: remove })
      }).then(r => {
        if (r.status !== 200) {
          r.json().then(r => alert(r))
        }
      })
      localStorage.setItem('voted', JSON.stringify(state.votedIds))
    }

    const searchEnter = () => {
      clearTimeout(state.layoutData.typingTimer)
      state.filterObj.page = 0
      state.layoutData.searching = true
      getDocuments()
      updateUrl()
    }

    const updateDocData = (updateObj) => {
      const docIdx = state.documents.findIndex(doc => doc.id === updateObj.docId)
      state.documents[docIdx].description = updateObj.description
      state.documents[docIdx].tags = updateObj.tags.map(tag => '\'' + (tag.text ? tag.text : tag).replace(/\'/g, '"') + '\'').join(', ')
    }

    const toggleTags = (tag: string) => {
      if (state.space) {
        router.push('/?tags=' + tag)
      } else {
        state.filterObj.page = 0
        const tagIdx = state.filterObj.tags.indexOf(tag)
        if (tagIdx < 0) {
          state.filterObj.tags.push(tag)
          if (!state.documents.length) state.filterObj.search = ''
        } else {
          state.filterObj.tags.splice(tagIdx, 1)
        }
        reFetchDocs()
        updateUrl()
      }
    }

    const updateUrl = () => {
      const params = new URLSearchParams({})
      if (!!state.filterObj.type && state.filterObj.type !== 'all') params.append('type', encodeURI(state.filterObj.type))
      if (!!state.filterObj.sort && state.filterObj.sort !== 'Hot') params.append('sort', encodeURI(state.filterObj.sort))
      if (!!(state.filterObj.tags && state.filterObj.tags.length)) params.append('tags', state.filterObj.tags.map(tag => encodeURI(tag)))
      if (!!state.filterObj.search) params.append('search', encodeURI(state.filterObj.search))
      if (!!state.newDocumentModal) params.append('page-type', 'add-document')
      let paramsStr = params.toString().replace(/%2C/g, ',').replace(/%25/g, '%')
      window.history.replaceState(
        { page: 'heystacks' },
        'heystacks',
        (state.space ? '/' + state.space : '/') + paramsStr ? '?' + paramsStr : ''
      )
    }

    return {
      state,
      reFetchDocs,
      getDocuments,
      addedNewDoc,
      addedApprovalNeeded,
      getTags,
      upvoteDocument,
      searchEnter,
      updateDocData,
      toggleTags,
      updateUrl,
    }
  }
})

</script>

<style scoped>

  .tag-chip {
    box-shadow: none;
    color: lightgrey;
    background-color: #25272d;
    border: 1px solid #25272d;
  }

  .tag-chip:hover {
    background-color: rgba(37, 39, 45, 0.7);
  }

  .tag-chip:active {
    background-color: rgba(211, 211, 211, 0.2);
  }

  .tag-selected {
    border: 2px solid #f06139;
    box-shadow: 0 0 5px 0.2rem rgba(38, 40, 47, 0.05);
    color: #f06139;
    font-weight: 600;
  }

  .loader {
    display: inline-block;
    border: 5px solid lightgrey;
    border-top: 5px solid #a6a6a6;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
  }
  
  .feed-btn:hover {
    background-color: rgba(255, 255, 255, 0.08)
  }

  .feed-btn:active {
    background-color: rgba(255, 255, 255, 0.24)
  }

  .card-feed > .container {
     min-height: 600px; 
     max-width: 960px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media screen and (max-width: 600px) {
    .card-feed > .container {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .snackbar {
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
  }

  .skeleton {
    filter: blur(1px);
  }

  .skeleton-content {
    padding-left: 220px;
  }

  #filter-wrapper {
    background-color: #31343f; 
    border: 1px solid #31343f;
  }

  #filter-wrapper > .container {
    min-height: 242px;
  }
  .h-42 {
    height: 42px;
  }
  .h-45 {
    height: 45px;
  }
  .h-209 {
    height: 209px;
  }
  .h-280 {
    height: 280px;
  }
  .w-14 {
    width: 14px;
  }
  .w-40 {
    width: 40px;
  }
  .w-72 {
    width: 72px;
  }
  .w-100 {
    width: 100px;
  }
  .w-227 {
    width: 227px;
  }
  .min-h-127 {
    min-height: 127px;
  }
</style>