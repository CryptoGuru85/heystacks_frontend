<template>
  <div
    @click="openDocDetails(document.id)"
    @contextmenu="(event) => {rightClick(event, document.id)}"
    :ref="'doc-card-' + document.id"
    class="mx-auto p-3 shadow-none card-no-highlight border-t border-lightgrey min-h-210"
    :class="docDetail ? 'cursor-default' : 'cursor-pointer grey-on-hover'"
  >
    <div class="pt-7 pb-4 px-4">
      <div class="card-thumb pa-2 overflow-hidden">
        <div
          :id="'html-card-wordcloud-' + document.id"
          
          class="w-full mx-auto card-wordcloud"
        ></div>
      </div>
      <div class="card-content">
        <div
          v-if="document.spacesArr && document.spacesArr.length"
          class="ml-2 mb-1"
          v-on:click.stop
          v-on:contextmenu.stop
        >
          <router-link
            v-for="(space, sid) in document.spacesArr"
            :key="'space-link-' + sid"
            :to="{ path: '/s/' + space }"
            :title="space.name"
            class="text-lg space-link text-orange-600 hover:text-orange-400 hover:underline mr-3"
          >
            s/{{space}}
          </router-link>
        </div>

        <div class="inline-block doc-detail" :class="docDetail && !state.layoutData.onMobile && !document.url.includes('/e/') ? 'doc-detail pr-5' : 'w-full'">
          <div class="mr-5">

            <div class="break-words w-full break-all flex items-center">
              <div class="relative"
                @mouseover="state.layoutData.openTitleMenu = true"
                @mouseleave="state.layoutData.openTitleMenu = false"
              >
                <component :is="docDetail ? 'h1' : 'h3'" @click="state.layoutData.openTitleMenu = true" class="color-dark underline-on-hover ml-2 text-lg">
                  <svg v-if="document.url.includes('document')" class="w-4 rounded inline" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
                    <rect x="5" y="5" width="55" height="55" fill="white"></rect>
                    <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#4285F4" stroke="none">
                      <path d="M 0.648 639.352 L 0.648 1.409 L 639.352 0.648 L 639.352 639.352 L 0.648 639.352 Z M 500 465 L 500 430 L 320 430 L 140 430 L 140 465 L 140 500 L 320 500 L 500 500 L 500 465 Z M 500 325 L 500 290 L 320 290 L 140 290 L 140 325 L 140 360 L 320 360 L 500 360 L 500 325 Z M 390 185 L 390 150 L 265 150 L 140 150 L 140 185 L 140 220 L 265 220 L 390 220 L 390 185 Z"></path>
                    </g>
                  </svg>
                  <svg v-if="document.url.includes('spreadsheets')" class="w-4 rounded inline" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
                    <rect x="5" y="5" width="55" height="55" fill="white"></rect>
                    <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#0F9D58" stroke="none">
                      <path d="M0 320 l0 -320 320 0 320 0 0 320 0 320 -320 0 -320 0 0 -320z m280 180 l0 -70 145 0 145 0 0 -35 0 -35 -145 0 -145 0 0 -145 0 -145 -35 0 -35 0 0 145 0 145 -70 0 -70 0 0 35 0 35 70 0 70 0 0 70 0 70 35 0 35 0 0 -70z"/>
                    </g>
                  </svg>
                  <svg v-if="document.url.includes('presentation')" class="w-4 rounded inline" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet">
                    <rect x="5" y="5" width="55" height="55" fill="white"></rect>
                    <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#F4B400" stroke="none">
                      <path d="M0 320 l0 -320 320 0 320 0 0 320 0 320 -320 0 -320 0 0 -320z m570 0 l0 -140 -250 0 -250 0 0 140 0 140 250 0 250 0 0 -140z"/>
                    </g>
                  </svg>
                  <span v-text="document.title" class="inline ml-2 text-emerald-800 font-bold hover:underline" :class="document.archived ? 'text-grey' : {}"></span>
                  <span v-if="document.archived" class="inline ml-1 text-grey">[Archived]</span>
                </component>
                <transition name="fade">
                  <div 
                    v-if="state.layoutData.openTitleMenu" 
                     @mouseenter="menuTimer(true)" @mouseleave="menuTimer()"
                    class="menu-content absolute flex flex-col items-start py-3 bg-zinc-100 rounded z-20 left-0"
                  >
                    <div 
                      class="px-4 w-full text-left whitespace-nowrap block duration-200 text-gray-500 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 cursor-pointer"
                    >
                      <router-link
                        :to="{ path: '/doc/' + document.id + '/' + document.slug }"
                        class="no-underline block py-2"
                      >
                        <div class="font-bold text-emerald-800">
                          <i class="far fa-file-alt text-xl mr-3"></i>
                          Open the doc page
                        </div>
                      </router-link> 
                    </div>
                    <div 
                      class="px-4 w-full text-left whitespace-nowrap block duration-200 text-gray-500 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 cursor-pointer"
                    >
                      <a
                        :href="document.url"
                        @click="action('Click document', document.id)"
                        target="_blank"
                        class="no-underline block py-2"
                      >
                        <div class="text-emerald-800">
                          <i class="fas fa-external-link-alt text-gray-500 mr-2"></i>
                          Open the source doc
                        </div>
                      </a>
                    </div>
                  </div>
                </transition>
              </div>

              <router-link
                v-if="document.hallOfFame"
                v-for="(award, aid) in document.hallOfFame"
                :key="`award-${document.id}-${aid}`"
                :to="'hall-of-fame'"
                title="Hall of fame"
                class="color-primary ml-2 mr-0 no-underline flex"
                v-on:click.stop
                v-on:contextmenu.stop
              >
                <i class="fas fa-medal text-orange-600"></i>
              </router-link>
            </div>

            <div class="ml-2 mb-2 text-lightgrey">
              <small>Added {{formatTimeAgo(document.createdAt)}}</small>
            </div>
          </div>

          <div>
            <p
              class="text-lg ml-2 mb-1 opacity-75"
              :class="document.archived ? 'text-grey' : ''"
            >
              {{document.description}}
            </p>
            <div class="flex">
              <div class="mr-2">
                <div
                  @click="$emit('upvote-document', document.id)"
                  v-on:click.stop
                  v-on:contextmenu.stop
                  class="m-1 cursor-pointer w-full flex items-center"
                  :class="upvoted ? 'text-darken-green font-semibold' : {}"
                >

                  <button 
                    title="Upvote" 
                    class="footer-icon w-8 h-8 rounded-full flex justify-center items-center hover:bg-zinc-100 active:bg-zinc-300 mr-1"
                  >
                    <i
                      :class="upvoted ? 'fa fa-heart text-darken-green' : 'far fa-heart'"
                      class="text-lightgrey font-slg"
                    ></i>
                  </button>
                  <span class="text-sm">
                    {{document.upvotes}}
                  </span>
                </div>
              </div>

              <div>
                <router-link
                  :to="{ path: '/doc/' + document.id + '/' + document.slug + '#comment-section' }"
                  v-on:click.stop
                  v-on:contextmenu.stop
                  class="m-1 cursor-pointer w-full flex items-center"
                >
                  <button 
                    title="Comments" 
                    class="footer-icon w-8 h-8 rounded-full flex justify-center items-center hover:bg-zinc-100 active:bg-zinc-300 mr-1"
                  >
                    <i
                      class="far fa-comment text-lightgrey font-slg"
                    ></i>
                  </button>
                  <span class="text-sm">
                    {{document.comments}}
                  </span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ReportDialog
      v-if="state.layoutData.openDialog"
      :open-dialog="state.layoutData.openDialog"
      @close="state.layoutData.openDialog = false"
      @reported="(reason) => {action('Report abuse incl reason', document.id, reason)}"
    ></ReportDialog>

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
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onBeforeMount, onMounted, computed, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';
import ReportDialog from '@/components/Doc/ReportDialog.vue'

export default defineComponent({
  components: {
    ReportDialog,
  },
  props: {
    document: { type: Object },
    votedIds: { type: Array },
    existingTags: { type: Array },
    selectedTags: { type: Array },
    docDetail: { type: Boolean },
    onTouch: { type: Boolean },
    wordCloudLoaded: { type: Boolean },
    space: { type: Boolean }
  },
  emits: ['toggle-tags', 'upvote-document', 'update-data'],
  setup(props, {emit}) {
    const router = useRouter()
    const state = reactive({
      documentData: {},
      tagCandidate: '',
      layoutData: {
        edit: false,
        comboboxInput: null,
        errors: [],
        onMobile: false,
        onMobile500: false,

        openTitleMenu: false,
        openTitleMenuTimer: null,

        emojiPicker: false,
        openSnackbar: false,
        openDialog: false,
        snackbarText: '📋 Link copied',
        abuseReason: ''
      }
    })

    watch(() => props.document, () => {
      state.documentData = Object.assign({}, props.document)
      state.documentData.tags = state.documentData.tags.replace(/\'/g, '').split(', ').map(tag => ({ text: tag, value: tag }))
    })

    watch(() => state.layoutData.openTitleMenu, (val) => {
      if (val) menuTimer()
    })

    watch(() => props.wordCloudLoaded, (val) => {
      if (val) createWordCloud()
    })

    onBeforeMount(() => {
      state.documentData = Object.assign({}, props.document)
      state.documentData.tags = state.documentData.tags.replace(/\'/g, '').split(', ').map(tag => ({ text: tag, value: tag }))
    })

    onMounted(() => {
      state.layoutData.onMobile = window.innerWidth < 600
      state.layoutData.onMobile500 = window.innerWidth < 500
      window.addEventListener('resize', (ev) => {
        state.layoutData.onMobile = window.innerWidth < 600
        if (
          (state.layoutData.onMobile500 && window.innerWidth > 500) ||
          (!state.layoutData.onMobile500 && window.innerWidth < 500)
        ) {
          state.layoutData.onMobile500 = window.innerWidth < 500
          createWordCloud()
        }
        state.layoutData.onMobile500 = window.innerWidth < 500
      })
      if (typeof WordCloud !== 'undefined') createWordCloud()
    })

    const upvoted = computed(() => {
      return props.votedIds.indexOf(props.document.id) >= 0
    })

    const action = (type, docId, reason) => {
      state.layoutData.openDialog = false
      if (type === 'Report') {
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
                props.document.title = r.newTitle
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

    const createWordCloud = () => {
      // @ts-ignore
      WordCloud(document.getElementById('html-card-wordcloud-' + props.document.id), {
        list: props.document.tags.replace(/'/g, '').split(', ').map(tag => [
          tag,
          5,
          tag
        ]),
        gridSize: 2,
        weightFactor: 10,
        origin: [window.innerWidth < 500 ? 190 : 90, 0],
        drawOutOfBound: false,
        shrinkToFit: true,
        fontFamily: 'Raleway',
        classes: 'weight-500 zoom-08 cursor-pointer text-smooth',
        backgroundColor: 'transparent',
        shuffle: false,
        rotateRatio: 0,
        color: (word) => textToColor(word),
      })
    }

    const textToColor = (text) => {
      if (props.selectedTags.includes(text)) return '#f06139'
      let hash = 0
      for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash)
      }
      const color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16)
      return '#' + Array(6 - color.length + 1).join('0') + color
    }

    const updateDscrp = (docId) => {
      const conf = confirm('❓ Are you sure you want to submit those edits?')
      if (conf) {
        fetch('/api/documents/update', {
          method: 'POST',
          body: JSON.stringify({
            docId: docId,
            description: state.documentData.description,
            tags: state.documentData.tags
          })
        }).then(r => {
          if (r.status !== 200) {
            r.json().then(r => alert(r))
          } else {
            r.json().then(r => {
              state.layoutData.snackbarText = '👍 Thank you for suggesting those edits! We will review them'
              state.layoutData.openSnackbar = true
              emit('update-data', {
                docId: docId,
                description: state.documentData.description,
                tags: state.documentData.tags
              })
              state.layoutData.edit = false
            })
          }
        })
      }
    }

    const updateTagsOnComma = (event) => {
      if (event.key === 'Tab' && state.layoutData.comboboxInput) {
        event.preventDefault()
        const enterProps = { bubbles: true, cancelable: true, key: 'Enter', code: 'Enter', keyCode: 13 }
        const ke = new KeyboardEvent('keydown', enterProps)
        event.target.dispatchEvent(ke)
        setTimeout(() => document.getElementById('tags-box-' + state.documentData.id).focus(), 10)
      }
      if (event.key === ',') {
        event.preventDefault()
        addTag()
      }
      if (event.key === 'Enter') {
        if (state.tagCandidate === 'No data available') {
          addTag()
        } else {
          if (state.documentData.tags.length > 7) {
            state.layoutData.snackbarText = 'Maximum number of tags reached'
            state.layoutData.openSnackbar = true
            state.documentData.tags.pop()
          }
        }
      }
      setTimeout(() => updateTagCandidate(), 0)
    }

    const addTag = () => {
      if (state.documentData.tags.length > 7) {
        state.layoutData.snackbarText = 'Maximum number of tags reached'
        state.layoutData.openSnackbar = true
      } else {
        if (state.layoutData.comboboxInput && state.documentData.tags.map(tag => tag.text).indexOf(state.layoutData.comboboxInput) < 0) { state.documentData.tags.push({ text: state.layoutData.comboboxInput, value: state.layoutData.comboboxInput }) }
        state.layoutData.comboboxInput = null
      }
    }

    const updateTagCandidate = () => {
      state.tagCandidate = (document.querySelector('.v-autocomplete__content > .v-list > .v-list-item--highlighted') || { textContent: 'No data available' }).textContent
    }

    const openDocDetails = (docId) => {
      if (!props.docDetail && !state.layoutData.edit && !state.layoutData.emojiPicker) {
        router.push('/doc/' + docId + '/' + props.document.slug)
      }
    }

    const urlOpen = (newUrl) => {
      window.open(newUrl, '_blank')
    }

    const menuTimer = (clear) => {
      if (clear) clearTimeout(state.layoutData.openTitleMenuTimer)
      else state.layoutData.openTitleMenuTimer = setTimeout(() => state.layoutData.openTitleMenu = false, 4000)
    }

    const rightClick = (event, docId) => {
      if (!props.docDetail) {
        event.preventDefault()
        window.open('/doc/' + docId + '/' + props.document.slug, '_blank')
        window.focus()
      }
    }

    const insertEmoji = (emoji) => {
      const el = document.querySelector(`description-textarea- + ${props.document.id}`)
      let cursorPos = el.selectionEnd
      state.documentData.description = state.documentData.description.substring(0, cursorPos) + emoji + state.documentData.description.substring(cursorPos)
      cursorPos += 1
      nextTick(() => {
        el.setSelectionRange(cursorPos, cursorPos)
        el.focus()
      })
      state.layoutData.emojiPicker = false
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

    const formatTimeAgo = (timestamp) => {
      const msPerMinute = 60 * 1000
      const msPerHour = msPerMinute * 60
      const msPerDay = msPerHour * 24
      const msPerMonth = msPerDay * 30
      const msPerYear = msPerDay * 365

      const elapsed = (new Date().getTime()) - timestamp

      if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago'
      } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago'
      } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago'
      } else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + ' days ago'
      } else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + ' months ago'
      } else {
        return Math.round(elapsed / msPerYear) + ' years ago'
      }
    }

    return {
      state,
      upvoted,
      action,
      createWordCloud,
      textToColor,
      updateDscrp,
      updateTagsOnComma,
      addTag,
      updateTagCandidate,
      openDocDetails,
      urlOpen,
      menuTimer,
      rightClick,
      insertEmoji,
      copyToClipboard,
      formatTimeAgo
    }
  }
})

</script>

<style scoped>

  .grey-on-hover:hover {
    background-color: #fdfdfd;
  }

  .card-thumb {
    width: 150px;
    min-width: 150px;
    margin-right: 70px;
    margin-left: 10px;
    float: left;
    position: absolute;
  }

  .card-wordcloud {
    height: 120px; 
    margin-top: 10px; 
    opacity: 0.6;
  }

  .card-content {
    margin-left: 220px;
  }

  .snackbar {
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
  }

  .font-slg {
    font-size: 22px;
  }

  .min-h-210 {
    min-height: 210px;
  }

  .doc-detail {
    width: calc(100% - 250px);
  }

  @media (max-width: 500px) {
    .card-thumb {
      display: block;
      width: 100%;
      float: unset;
      position: relative;
    }
    .card-content {
      margin-left: 0px;
    }
  }
</style>