<template>
  <div class="h-full">
    <custom-header
      v-if="!state.space && !spaceObj.name"
      :doc-data="document"
    ></custom-header>
    <space-header
      v-else
      :space-name="state.space"
      :doc-data="state.document"
    ></space-header>

    <AddNewModal
      v-if="state.newDocumentModal" 
      :existing-tags="state.existingTags"
      @close="state.newDocumentModal = false"
      @close-add-new-modal="(doc) => addedNewDoc(doc)"
      @close-approval-needed="addedApprovalNeeded"
    ></AddNewModal>
    <div v-if="state.newDocumentModal" class="backdrop" @click="state.newDocumentModal = false"></div>

    <div id="action-buttons" class="w-full py-1 text-center">
      <div class="py-0 flex justify-between items-center">
        <div class="w-10">
        </div>
        <div class="flex">
          <button
            @click="upvoteDocument(state.document.id)"
            class="doc-page-btn m-1 flex items-center justify-center"
            :class="state.layoutData.onMobile ? 'small-top-btn' : ''"
            title="Upvote"
            :style="upvoted ? {'font-weight': '600', color: '#074246', width: state.layoutData.onMobile ? '50px' : '58px'} : {width: state.layoutData.onMobile ? '50px' : '58px'}"
          >
            <div class="w-4 mr-2">
              <svg v-if="upvoted" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" class="svg-inline--fa fa-heart fa-w-16 text-darken-green" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>
              <svg v-else aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart" class="svg-inline--fa fa-heart fa-w-16 text-lightergrey" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path></svg>
            </div>
            <span class="text-sm min-w-10">
              {{state.document.upvotes}}
            </span>
          </button>

          <button
            @click="toggleComments"
            class="doc-page-btn doc-button m-1 flex items-center justify-center font-medium text-lightergrey"
            :class="state.layoutData.onMobile ? 'small-top-btn' : ''"
            title="Comment"
          >
            <div class="w-4 mr-2">
              <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="comment" class="svg-inline--fa fa-comment fa-w-16 text-lightergrey" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"></path></svg>
            </div>
            <span class="text-sm min-w-10">
              {{state.document.comments}}
            </span>
          </button>

          <div class="relative"
            @mouseover="state.layoutData.onTouchSocialLink = true"
            @mouseleave="state.layoutData.onTouchSocialLink = false"
          >
            <button
              class="doc-page-btn m-1 flex justify-center items-center doc-button"
              :class="state.layoutData.onMobile ? 'small-top-btn w-50' : ''"
              title="Share"
            >
              <svg class="svg-inline--fa fa-share-alt fa-w-14 fa-2x h-4 font-semibold mx-1 text-lightergrey" aria-hidden="true" focusable="false" data-prefix="far" data-icon="share-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M352 320c-25.6 0-48.9 10-66.1 26.4l-98.3-61.5c5.9-18.8 5.9-39.1 0-57.8l98.3-61.5C303.1 182 326.4 192 352 192c53 0 96-43 96-96S405 0 352 0s-96 43-96 96c0 9.8 1.5 19.6 4.4 28.9l-98.3 61.5C144.9 170 121.6 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.6 0 48.9-10 66.1-26.4l98.3 61.5c-2.9 9.4-4.4 19.1-4.4 28.9 0 53 43 96 96 96s96-43 96-96-43-96-96-96zm0-272c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zM96 304c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm256 160c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"></path></svg>
            </button>
            <transition name="fade">
              <div 
                v-if="state.layoutData.onTouchSocialLink" 
                @click="state.layoutData.onTouchSocialLink = false"
                class="menu-content absolute flex flex-col items-start absolute-center-x"
              >
                <a 
                  class="px-4 py-2 w-full text-left whitespace-nowrap block py-2 duration-200 text-gray-500 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300"
                  :href="'https://twitter.com/share?text=Check out this Google doc!&url=https://heystacks.org/doc/' + state.document.id + '/' + state.document.slug + '&hashtags=heystacks'"
                  target="_blank"
                >
                  <i class="fab fa-twitter-square twitter-icon"></i>
                  Twitter
                </a>
                <a 
                  class="px-4 py-2 w-full text-left whitespace-nowrap block py-2 duration-200 text-gray-500 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300"
                  :href="'https://www.facebook.com/sharer/sharer.php?u=https://heystacks.org/doc/' + state.document.id + '/' + state.document.slug + '&t=Check out this Google doc!'"
                  target="_blank"
                >
                  <i class="fab fa-facebook-square"></i>
                  Facebook
                </a>
                <a
                  class="px-4 py-2 w-full text-left whitespace-nowrap block py-2 duration-200 text-gray-500 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300" 
                  :href="'https://www.linkedin.com/shareArticle?mini=true&url=https://heystacks.org/doc/' + state.document.id + '/' + state.document.slug + '&title=Check out this Google doc!'"
                  target="_blank"
                >
                  <i class="fab fa-linkedin linkedin-icon"></i>
                  LinkedIn
                </a>
                <a 
                  class="px-4 py-2 w-full text-left whitespace-nowrap block py-2 duration-200 text-gray-500 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300"
                  :href="'https://heystacks.org/doc/' + state.document.id + '/' + state.document.slug"
                  target="_blank"
                >
                  <i class="far fa-copy"></i>
                  Copy link
                </a>
              </div>
            </transition>
          </div>

          <a :href="state.document.url" target="_blank">
            <div
              class="doc-page-btn doc-button-2 m-1 font-medium rounded cursor-pointer flex items-center justify-center text-gray-500 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300"
              :class="state.layoutData.onMobile ? 'small-top-btn w-50' : ''"
              title="Source doc"
            >
              <div class="rounded-full doc-icon">
                <DocIcon
                  :url="state.document.url"
                  :color-override="'rgba(0, 0, 0, 0.34)'"
                  class="w-4"
                />
              </div>
              <span class="min-w-10">
                Url
              </span>
            </div>
          </a>

          <button 
            class="doc-page-btn doc-button-2 m-1 rounded flex justify-center items-center text-gray-500 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300"
            :class="state.layoutData.onMobile ? 'small-top-btn w-16' : ''"
            @click="state.layoutData.tipDialog = true"
            title="Tip"
          >
            <div class="mr-2 text-lightergrey w-14">
              <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="envelope-open-dollar" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-envelope-open-dollar fa-w-12 max-h-full max-w-full"><path fill="currentColor" d="M230.72 233.72l42.19 11.44c4.19 1.14 7.09 4.55 7.09 8.3 0 4.8-4.5 8.7-10.06 8.7H243.6c-4.15 0-8.23-1.04-11.77-2.95-3.08-1.67-6.84-1.37-9.24 1.18l-12.07 12.73c-3.11 3.28-2.6 8.64 1.13 11.19 8.3 5.65 18.06 8.88 28.35 9.52V304c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8v-10.25c22.18-1.1 40-18.57 40-40.3 0-18.17-12.62-34.28-30.72-39.17l-42.19-11.44c-4.19-1.14-7.09-4.55-7.09-8.3 0-4.8 4.5-8.7 10.06-8.7h26.34c4.15 0 8.23 1.04 11.77 2.95 3.08 1.66 6.84 1.37 9.24-1.18l12.07-12.73c3.11-3.28 2.6-8.64-1.13-11.19-8.3-5.65-18.06-8.88-28.35-9.52V144c0-4.42-3.58-8-8-8h-16c-4.42 0-8 3.58-8 8v10.25c-22.18 1.1-40 18.57-40 40.3 0 18.17 12.62 34.28 30.72 39.17zm263.87-69.2c-1.52-1.26-13.86-11.2-30.59-24.66V96c0-26.51-21.49-48-48-48h-66.13C327.24 28.85 293.77 0 256 0c-37.65 0-70.9 28.63-93.85 48H96c-26.51 0-48 21.49-48 48v43.85c-16.81 13.52-29.15 23.46-30.48 24.56A48.002 48.002 0 0 0 0 201.48V464c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V201.51c0-14.31-6.38-27.88-17.41-36.99zM96 96h320v156.66c-36.26 29.32-78.69 63.67-86.59 69.95C311.25 337.12 279.6 368 256 368c-23.69 0-55.86-31.37-73.41-45.39-7.9-6.28-50.33-40.64-86.59-69.97V96zm368 362c0 3.31-2.69 6-6 6H54c-3.31 0-6-2.69-6-6V275.56c38.96 31.48 95.95 77.65 104.66 84.58C174.71 377.76 212.55 416 256 416c43.21 0 80.64-37.72 103.34-55.86 9-7.15 65.84-53.19 104.66-84.56V458z" ></path></svg>
            </div>
            <span>
              Tip
            </span>
          </button>

          <button 
            class="doc-page-btn doc-button-2 m-1 rounded border border-lightgrey flex justify-center items-center text-gray-500 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300"
            :class="state.layoutData.onMobile ? 'small-top-btn w-16' : ''"
            @click="state.newDocumentModal = true"
            title="Share an interesting Google doc"
          >
            <div 
              :class="state.layoutData.onMobile ? 'mr-1' : ''" 
              class="mr-1 text-lightergrey w-14"
            >
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-plus fa-w-14 max-w-full max-h-full"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" ></path></svg>
            </div>
            <span>
              {{ state.layoutData.onMobile ? '' : 'New' }}
            </span>
          </button>
        </div>

        <div 
          class="relative z-10 min-w-39"
          @mouseover="state.layoutData.onTouchOtherLink = true"
          @mouseleave="state.layoutData.onTouchOtherLink = false"
        >
          <button
            class="bottom-action-btn doc-button m-1 hover:opacity-75 active:opacity-50"
            :class="state.layoutData.onMobile ? 'small-top-btn w-50' : ''"
            title="Share"
          >
            <i class="fa fa-ellipsis-v text-xl text-lightgrey"></i>
          </button>
          <transition name="fade">
            <div 
              v-if="state.layoutData.onTouchOtherLink" 
              @click="state.layoutData.onTouchOtherLink = false"
              class="menu-content absolute flex flex-col items-start right-0 min-w-200"
            >
              <div
                class="w-full py-2 bg-zinc-100 text-base whitespace-nowrap uppercase font-bold text-center"
              >
                Other links
              </div>
              <a 
                @click="action('Report abuse', state.document.id)"
                class="text-cyan-700 px-4 py-2 w-full text-left whitespace-nowrap block py-2 duration-200 text-gray-500 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300"
              >
                <i class="fas fa-exclamation-circle"></i>
                Report
              </a>
              <a 
                class="text-cyan-700 px-4 py-2 w-full text-left whitespace-nowrap block py-2 duration-200 text-gray-500 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300"
                href="mailto:info@heystacks.org"
                target="_blank"
              >
                <i class="far fa-envelope"></i>
                Contact
              </a>
              <a 
                class="text-cyan-700 px-4 py-2 w-full text-left whitespace-nowrap block py-2 duration-200 text-gray-500 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300"
                href="/hall-of-fame"
              >
                <i class="fas fa-medal"></i>
                Hall of fame
              </a>
              <a
                @click="notificationSnackbarVisibleVar += '1'"
                class="text-cyan-700 px-4 py-2 w-full text-left whitespace-nowrap block py-2 duration-200 text-gray-500 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300"
              >
                <i class="far fa-bell"></i>
                Newsletter
              </a>
              <a 
                class="text-cyan-700 px-4 py-2 w-full text-left whitespace-nowrap block py-2 duration-200 text-gray-500 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300"
                href="https://medium.com/@matthews8000/search-public-google-documents-with-sourceful-9b49a10f76d6"
                target="_blank"
              >
                <i class="fab fa-medium"></i>
                Blog
              </a>
              <a 
                class="text-cyan-700 px-4 py-2 w-full text-left whitespace-nowrap block py-2 duration-200 text-gray-500 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300"
                href="https://www.facebook.com/heystacks.org"
                target="_blank"
              >
                <i class="fab fa-facebook"></i>
                Facebook
              </a>
              <a 
                class="text-cyan-700 px-4 py-2 w-full text-left whitespace-nowrap block py-2 duration-200 text-gray-500 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300"
                href="https://twitter.com/matthews8000"
                target="_blank"
              >
                <i class="fab fa-twitter"></i>
                Twitter
              </a>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <div
      class="frame-wrapper relative w-full bg-white"
      :style="!(state.document.meta && state.document.meta.soDoc) ? {
        'height': 'calc(100% - ' + state.layoutData.frameHeightOffset + 'px)'
      } : {}"
    >
      <div
        v-if="state.layoutData.frameLoading && !(state.document.meta && state.document.meta.soDoc)"
        class="absolute frame-loading"
      >
        <div class="loader"></div>
      </div>
      <DocFrame
        :url="state.document.url"
        :meta="state.document.meta"
        :layout-data="state.layoutData"
        @loaded="state.layoutData.frameLoading = false"
      />

      <SheetTabDialog
        v-if="!state.layoutData.onMobile && state.document.url && state.document.url.includes('spreadsheets')"
        :loading="state.layoutData.frameLoading"
      ></SheetTabDialog>
    </div>

    <div
      v-if="state.document.ads"
      class="w-full mb-10 text-center overflow-hidden"
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

    <transition name="slide">
      <div v-if="state.layoutData.showComments" id="comments-wrapper" class="shadow-material">
        <span
          id="comments-close-btn"
          @click="toggleComments"
          class="cursor-pointer px-2 fixed z-10 right-6 top-3"
        >
          <i class="fa fa-times text-xl" ></i>
        </span>
        <div id="comments-wrapper-inner h-full overflow-auto">
          <CommentSection
            :allow-notifications="state.document.allowNotifications"
          ></CommentSection>
        </div>
      </div>
    </transition>

    <TipDialog
      v-if="state.layoutData.tipDialog"
      :doc-id="state.document.id"
      @close="state.layoutData.tipDialog = false"
    >
    </TipDialog>

    <div v-if="state.layoutData.openDialog || state.layoutData.tipDialog" class="backdrop" @click="() => {state.layoutData.openDialog = false; state.layoutData.tipDialog = false;}"></div>

    <ReportDialog
      v-if="state.layoutData.openDialog"
      :open-dialog="state.layoutData.openDialog"
      @close="state.layoutData.openDialog = false"
    ></ReportDialog>

    <div v-if="state.layoutData.infoDialog" class="info-dialog absolute z-20 top-0 bottom-0 left-0 right-0 flex justify-center items-center">
      <div class="dialog text-center bg-white rounded py-3">
        <h3 class="text-xl py-2">Info</h3>
        <div class="whitespace-pre-line">
          {{state.document.description}}
        </div>
        <div v-if="state.document.id" class="leading-4 pt-4">
          <small v-for="(tag, tid) in state.document.tags.replace(/'/g, '').split(', ')" :key="tid" class="mr-1">
            <a :href="'/?tags=' + tag">
              {{tag}}
            </a>
            <span v-if="tid < document.tags.replace(/'/g, '').split(', ').length - 1"> •</span>
          </small>
        </div>
        <button
          class="text-lg text-gray-500 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 px-4 py-2 rounded"
          @click="state.layoutData.infoDialog = false"
        >
          Close
        </button>
      </div>
    </div>

    <div
      v-if="state.layoutData.openSnackbar"
      class="snackbar z-20 flex justify-between items-center absolute bg-zinc-800 text-gray-200 px-3 py-2 rounded"
    >
      <span class="whitespace-nowrap mr-6">{{layoutData.snackbarText}}</span>
      <button
        @click="state.snackbar.visible = false"
        class="px-4 py-2 hover:bg-zinc-700 rounded"
      >
        Close
      </button>
    </div>

    <EmailNotificationSignup :visible-var="state.notificationSnackbarVisibleVar"></EmailNotificationSignup>

  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, computed, onBeforeMount, onMounted, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import DocFrame from '@/components/Doc/DocFrame.vue';
import DocIcon from '@/components/Atoms/DocIcon.vue';
import CommentSection from '@/components/Doc/CommentSection.vue';
import EmailNotificationSignup from '@/components/Layout/EmailNotificationSignup.vue';
import CustomHeader from '@/components/Layout/CustomHeader.vue';
import SpaceHeader from '@/components/Layout/SpaceHeader.vue';
import AddNewModal from '@/components/Molecules/AddNewModal.vue';
import ReportDialog from '@/components/Doc/ReportDialog.vue';
import TipDialog from '@/components/Doc/TipDialog.vue';
import SheetTabDialog from '@/components/Doc/SheetTabDialog.vue';

export default defineComponent({
  components: {
    AddNewModal,
    CustomHeader,
    SpaceHeader,
    DocIcon,
    DocFrame,
    SheetTabDialog,
    CommentSection,
    TipDialog,
    ReportDialog,
    EmailNotificationSignup
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const state = reactive({
      layoutData: {
        loading: true,
        onMobile: false,
        frameLoading: true,
        frameHeight: 600,
        frameHeightOffset: 0,
        editMode: false,
        openDialog: false,
        infoDialog: false,

        showComments: false,

        openSnackbar: false,
        snackbarText: '📋 Link copied',
        tipDialog: false,
        onTouchSocialLink: false,
        onTouchOtherLink: false
      },
      linkBack: '/',
      newDocumentModal: false,
      newDocumentObj: {
        existingTags: [],
        topTag: ''
      },
      notificationSnackbarVisibleVar: '',
      votedIds: [],
      document: {},
      similarDocs: [],
      space: null,
    })

    const upvoted = computed(() => {
      return state.votedIds.indexOf(state.document.id) >= 0
    })
    const spaceObj = computed(() => {
      return store.getters.getSpaceData || {}
    })

    watch(() => state.document.id, (val, oldVal) => {
      if (val !== oldVal) {
        nextTick(() => {
          resizeFrame()

          document.getElementById('doc-frame').onload = () => {
            state.layoutData.frameLoading = false
          }

          fetch('/api/documents/check-for-content-update', {
            method: 'POST',
            body: JSON.stringify({
              docId: state.document.id
            })
          })
        })
      }
    })

    onBeforeMount(() => {
      const ssrDiv = document.getElementById('ssr-data-div')
      if (ssrDiv) {
        const docObj = JSON.parse(ssrDiv.getAttribute('data-json'))
        if (docObj.id === parseInt(route.params.docId)) {
          if (docObj.id) state.document = docObj
          const spaceArrObj = JSON.parse(docObj.spacesArr || '[]')
          state.space = (spaceArrObj && spaceArrObj.length) ? spaceArrObj[0] : null
        }
        document.getElementById('ssr-div').style.display = 'none'
      }

      if (window.location.search.includes('tip-currency=')) state.layoutData.tipDialog = true
      if (window.location.href.includes('#comment-section')) {
        state.layoutData.showComments = true
        const htmlEl = document.getElementsByTagName('html')[0]
        htmlEl.style.marginRight = (window.innerWidth - htmlEl.offsetWidth) + 'px'
        htmlEl.classList.add('scroll-hidden')
      }
      if (window.location.href.includes('edit=true')) state.layoutData.editMode = true

      state.layoutData.onMobile = window.innerWidth < 600
      window.addEventListener('resize', () => {
        state.layoutData.onMobile = window.innerWidth < 600
        resizeFrame()
      })

      state.votedIds = JSON.parse(localStorage.getItem('voted') || '[]')

      fetch('/api/documents/get', {
        method: 'POST',
        body: JSON.stringify({
          id: route.params.docId
        })
      }).then(r => {
        if (r.status !== 200) {
          r.json().then(r => alert(r))
        } else {
          r.json().then(r => {
            state.document = r.documents[0]
            state.layoutData.loading = false
            state.tags = r.remindingTags
            state.similarDocs = r.similarDocs
            state.space = (r.documents[0].spacesArr && r.documents[0].spacesArr.length) ? r.documents[0].spacesArr[0] : null
            getTags()
            const params = new URL('https://heystacks.org/' + location.search).searchParams
            window.history.replaceState(
              { page: 'heystacks' },
              'heystacks',
              '/doc/' + state.document.id + '/' + state.document.slug
              + (params.get('comment-report') ? '?comment-report=' + params.get('comment-report') : '')
              + (state.layoutData.showComments ? '#comment-section' : '')
            )
          })
        }
      })

      if (document.referrer.includes('.co.uk/?')
        || document.referrer.includes('.co/?')
        || document.referrer.includes('.us/?')
        || document.referrer.includes('1337/?')
        || document.referrer.includes('8080/?')
      ) state.linkBack = document.referrer
        .replace('https://', '')
        .replace('http://', '')
        .replace('sourceful.co.uk', '')
        .replace('sourceful.co', '')
        .replace('sourceful.us', '')
        .replace('heystacks.org', '')
        .replace('localhost:1337', '')
        .replace('localhost:8080', '')

      state.layoutData.onTouch = matchMedia('(hover: none), (pointer: coarse)').matches
    })

    onMounted(() => {
      setTimeout(() => state.layoutData.frameLoading = false, 10000)
      resizeFrame()
      setTimeout(() => action('Read document', route.params.docId, ''), 60000)
      setTimeout(() => {
        try {
          if (state.document && state.document.ads) {
            // @ts-ignore
            (adsbygoogle = window.adsbygoogle || []).push({})
          }
        } catch (error) {
          console.log(error)
        }
      }, 6000)
    })

    const getTags = () => {
      fetch('/api/tags/get', {
        method: 'POST'
      }).then(r => {
        if (r.status !== 200) {
          r.json().then(r => alert(r))
        } else {
          r.json().then(r => {
            state.newDocumentObj.existingTags = r.tags.map(tag => ({ text: tag.title, value: tag.title }))
            const docTags = state.document.tags.split(', ').map(tag => tag.replace(/\'/g, ''))
          })
        }
      })
    }
    
    const action = (type, docId, reason) => {
      state.layoutData.openDialog = false
      if (type === 'Report abuse') {
        state.layoutData.openDialog = true
      } else {
        fetch('/api/action', {
          method: 'POST',
          body: JSON.stringify({
            type: type,
            docId: docId,
            reason: reason
          })
        }).then(r => {
          if (r.status !== 200) {
            r.json().then(r => alert(r))
          } else {
            r.json().then(r => {
              if (r.type === 'reload-title') {
                state.document.title = r.newTitle
                state.layoutData.snackbarText = '🔄 Title has been reloaded'
                state.layoutData.openSnackbar = true
              } else if (r.type === 'url-not-working') {
                state.layoutData.snackbarText = '👍 Thank you for reporting this url, we will manually review it'
                state.layoutData.openSnackbar = true
              } else if (r.type === 'report-abuse') {
                state.layoutData.snackbarText = '👍 Thank you for reporting this document, we will manually review it'
                state.layoutData.openSnackbar = true
                state.abuseReason = ''
              }
            })
          }
        })
      }
    }

    const upvoteDocument = (docId: number) => {
      const votedIdx = state.votedIds.indexOf(docId)
      let remove = false
      if (votedIdx < 0) {
        state.document.upvotes += 1
        state.votedIds.push(docId)
      } else {
        state.document.upvotes -= 1
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

    const copyToClipboard = (text) => {
      const modalEl = document.getElementsByClassName('modal-dialog')[0]
      const textarea = document.createElement('textarea')
      textarea.textContent = text
      textarea.style.position = 'fixed'
      !modalEl ? document.body.appendChild(textarea) : modalEl.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
        state.layoutData.snackbarText = '📋 Link copied'
        state.layoutData.openSnackbar = true
      } catch (ex) {
        state.layoutData.snackbarText = 'Copy to clipboard failed'
        state.layoutData.openSnackbar = true
      } finally {
        !modalEl ? document.body.removeChild(textarea) : modalEl.removeChild(textarea)
      }
    }

    const resizeFrame = () => {
      nextTick(() => state.layoutData.frameHeightOffset = 2
        // @ts-ignore
        + (document.getElementsByClassName('masthead')[0].offsetHeight > 80 ? 0 : 60)
        + (document.getElementById('title-wrapper') || {offsetHeight: state.layoutData.onMobile ? 42 : 55}).offsetHeight
        + (document.getElementById('action-buttons') || {offsetHeight: state.layoutData.onMobile ? 48 : 58}).offsetHeight)
    }

    const toggleComments = (event) => {
      if (event) event.preventDefault()
      state.layoutData.showComments = !state.layoutData.showComments
      if (state.layoutData.showComments && !window.location.href.includes('#comment-section')) {
        window.history.replaceState({ page: 'heystacks' }, 'heystacks', window.location.href + '#comment-section')
        const htmlEl = document.getElementsByTagName('html')[0]
        htmlEl.style.marginRight = (window.innerWidth - htmlEl.offsetWidth) + 'px'
        htmlEl.classList.add('scroll-hidden')
      }
      if (!state.layoutData.showComments && window.location.href.includes('#comment-section')) {
        window.history.replaceState({ page: 'heystacks' }, 'heystacks', window.location.href.replace('#comment-section', ''))
        const htmlEl = document.getElementsByTagName('html')[0]
        htmlEl.style.marginRight = '0'
        htmlEl.classList.remove('scroll-hidden')
      }
    }

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

    const addedNewDoc = () => {
      state.newDocumentModal = false
      state.layoutData.snackbarText = '👏 Thank you, the doc has been added!'
      state.layoutData.openSnackbar = true
    }

    const addedApprovalNeeded = () => {
      state.newDocumentModal = false
      state.layoutData.snackbarText = '👍 Thank you, the doc will be added after approval from the gathering owner'
      state.layoutData.openSnackbar = true
    }

    const updateDocData = (updateObj) => {
      state.document.description = updateObj.description
      state.document.tags = updateObj.tags.map(tag => '\'' + (tag.text ? tag.text : tag).replace(/\'/g, '"') + '\'').join(', ')
    }

    const urlRedirect = (newUrl) => {
      window.location.href = newUrl
    }

    const urlOpen = (newUrl) => {
      window.open(newUrl, '_blank')
    }

    return {
      state,
      upvoted,
      spaceObj,
      getTags,
      action,
      upvoteDocument,
      copyToClipboard,
      resizeFrame,
      toggleComments,
      openCollectChat,
      addedNewDoc,
      addedApprovalNeeded,
      updateDocData,
      urlRedirect,
      urlOpen
    }
  },
})
</script>

<style scoped>

  .loader {
    display: inline-block;
    border: 10px solid lightgrey;
    border-top: 10px solid #074246;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 0.8s ease-in-out infinite;
    box-shadow: 0 0 10px #ebeaea;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .small-top-btn {
    height: 32px !important;
  }

  #comments-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    background: white;
    z-index: 50;
    overflow-x: hidden;
    transition: width 0.2s ease-in-out, min-width 0.2s ease-in-out;
  }

  .slide-enter-active > #comments-close-btn {
    opacity: 0;
  }
  .slide-leave-active > #comments-close-btn {
    opacity: 0;
  }
  #comments-close-btn {
    opacity: 1;
  }

  @media screen and (max-width: 600px) {
    #comments-wrapper {
      width: 100%;
    }
    #comments-wrapper>div {
      min-width: 100vw;
    }
  }

  @media screen and (min-width: 601px) and (max-width: 900px) {
    #comments-wrapper {
      width: 80%;
    }
    #comments-wrapper>div {
      min-width: 80vw;
    }
  }

  @media screen and (min-width: 901px) {
    #comments-wrapper {
      width: 50%;
    }
    #comments-wrapper>div {
      min-width: 50vw;
    }
  }

  @supports ((-webkit-backdrop-filter: blur(20px)) or (backdrop-filter: blur(20px))) {
    #comments-wrapper {
      -webkit-backdrop-filter: blur(16px);
      backdrop-filter: blur(16px);
      background-color: rgba(255, 255, 255, 0.75) !important;
    }
    #comments-wrapper-inner {
      -webkit-backdrop-filter: blur(16px);
      backdrop-filter: blur(16px);
    }
  }

  .slide-enter, .slide-leave-to {
    width: 0 !important;
  }

  .menu-content {
    box-shadow: 0 9px 18px 0 rgb(62 57 107 / 15%);
  }

  .dialog {
    width: 800px;
  }

  .doc-button {
    height: 36px; 
    width: 58px;
  }

  .doc-button-2 {
    height: 36px; 
    width: 74px;
  }

  .twitter-icon {
    color: #38A1F3;
  }

  .facebook-icon {
    color: #4267b2;
  }

  .linkedin-icon {
    color: #0077B5;
  }

  .doc-icon {
    width: 30px;
    min-width: 30px;
  }

  .w-50 {
    width: 50px;
  }

  .min-w-10 {
    min-width: 10px;
  }

  .min-w-39 {
    min-width: 39px;
  }

  .w-14 {
    width: 14px;
  }

  .h-280 {
    height: 280px;
  }

  #action-buttons {
    background-color: #f8f9fa;
  }

  .info-dialog {
    background-color: rgba(0, 0, 0, 0.4);
  }

  .frame-loading {
    left: calc(50% - 40px); 
    top: calc(50% - 90px); 
    z-index: 0; 
    -webkit-transform:translate3d(0,0,0);
  }

</style>