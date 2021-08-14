<template>
  <div class="container p-3">
    <div
      id="comment-section"
      class="pt-2 pb-8 px-1 sm:px-4 rounded"
    >
      <div class="mt-3 w-5/6 mb-12 mx-auto">
        <div class="flex items-center">
          <div class="divider-line"><hr class="border-zinc-400" /></div>
          <span class="text-lg font-bold uppercase mb-0 px-4">
            Comments
            <small v-if="state.commentsClosed" class="normal-case font-normal">(Closed by the document owner)</small>
          </span>
          <div class="divider-line"><hr class="border-zinc-400" /></div>
        </div>
      </div>

      <br>

      <div id="comment-reply-msg" v-if="state.newComment.replyTo !== -1" class="text-center">
        Replying to comment by
        <span class="color-primary font-medium">
          {{state.comments.find(com => com.id === newComment.replyTo).nickname}}
        </span>
      </div>

      <div 
        v-if="!state.commentsClosed"
        class="py-2 w-full"
      >
        <div class="form-group w-full relative mb-3">
          <textarea
            label="Leave a comment or suggestion to help improve this doc"
            ref="textInput"
            id="text-input"
            rows="2"
            class="comment-textarea rounded bg-gray-200 rounded w-full outline-none px-3 pt-5 pb-3 text-default"
            v-model="state.newComment.text"
            :error="!!state.newComment.error1"
            @focusin="state.layoutData.commentSubmitActive = true"
            maxlength="1000"
            filled
            required
          ></textarea>
          <label
            for="text-input"
            :class="state.newComment.error1 ? `text-orange-600` : `text-default`"
          >
            Leave a comment or suggestion to help improve this doc
          </label>
          <div
            @click="state.layoutData.emojiPicker = !state.layoutData.emojiPicker"
            class="emoji-picker-btn cursor-pointer absolute bottom-3 right-2"
          >
            <i class="far fa-smile"></i>
          </div>
          <EmojiPicker
            v-if="state.layoutData.emojiPicker"
            class="absolute z-50 emoji-picker"
            @select-emoji="insertEmoji"
            @close="state.layoutData.emojiPicker = false"
          ></EmojiPicker>
        </div>

        <div class="w-full pt-2 flex justify-end">
          <div class="flex mr-3">
            <div class="comment-input mr-2">
              <input
                type="text"
                ref="nicknameInput"
                id="nickname-input"
                label="Nickname"
                class="bg-transparent rounded w-full outline-none px-3 pt-2 pb-1 text-default mr-3 mb-0"
                maxlength="20"
                required
                @keyup.enter="addComment"
                :error="!!state.newComment.error2"
                v-model="state.newComment.nickname"
              />
              <label for="nickname-input">Nickname</label>
            </div>
            <div class="comment-input">
              <input
                ref="emailInput"
                id="email-input"
                label="Email (optional)"
                class="bg-transparent rounded w-full outline-none px-3 pt-2 pb-1 text-default mb-0"
                maxlength="50"
                type="email"
                required
                @keyup.enter="addComment"
                v-model="state.newComment.emailAddress"
              />
              <label for="email-input">Email (optional)</label>
            </div>
          </div>
          <div >
            <button
              @click="addComment"
              :color="state.layoutData.commentSubmitActive ? 'primary' : '#e0e0e0'"
              :disabled="state.layoutData.addingComment"
              class="shadow-none whitespace-nowrap py-2 rounded w-full font-medium duration-200 bg-orange-600 hover:bg-orange-500 active:bg-orange-400 text-white px-4"
            >
              <i class="fa fa-check text-white"></i>
              Submit
            </button>
          </div>
        </div>

        <div class="w-full mt-3 border-t border-lightgrey">
          <div class="flex items-center py-3">
            <span class="text-base">Order by</span>
            <div class="relative ml-3"
              @mouseover="state.layoutData.onTouchHot = true"
              @mouseleave="state.layoutData.onTouchHot = false"
            >
              <button
                class="feed-btn flex justify-center items-center rounded hover:bg-gray-300 px-2 rounded"
              >
                <span class="text-base font-bold text-default">{{state.layoutData.sort}}</span>
              </button>
                
              <transition name="fade">
                <div 
                  v-if="state.layoutData.onTouchHot" 
                  @click="state.layoutData.onTouchHot = false"
                  class="menu-content absolute left-0 flex flex-col items-start py-3 bg-zinc-100 rounded z-20"
                >
                  <div 
                    v-for="(sortType, tid) in ['Best', 'New']"
                    @click="state.layoutData.sort = sortType"
                    :key="tid" 
                    class="px-4 py-2 w-full text-left whitespace-nowrap block duration-200 text-gray-500 bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 cursor-pointer"
                  >
                    <div :class="state.layoutData.sort === sortType ? 'font-bold' : ''">
                      {{sortType}}
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>

        <div class="w-full min-h-60">
          <div v-if="!state.layoutData.loading && displayedComments.length === 0" class="text-center pa-4">
            No comments... yet
          </div>

          <div
            v-for="(comment, cid) in displayedComments"
            class="border-t border-lightgrey py-2 mb-2"
            :class="comment.replyTo !== -1 ? 'ml-8' : ''"
          >
            <div class="my-1 flex items-center justify-between">
              <div class="color-primary">
                <div class="text-orange-600 text-xl font-medium">
                  {{comment.nickname}}
                </div>
                <div v-if="comment.replyTo !== -1" class="text-sm mt-0">
                  <i class="fa fa-angle-right"></i>
                  {{state.comments.find(com => com.id === comment.replyTo).nickname}}
                </div>
              </div>
              <div class="ml-2 flex-grow text-sm text-default">{{formatTimeAgo(comment.createdAt)}}</div>
              <div @click="commentAction('upvote', comment.id)" class="float-right cursor-pointer text-sm pt-1 text-default">
                {{comment.upvotes}}
                <i class="ml-1 upvote-icon" :class="state.votedIds.indexOf(comment.id) >= 0 ? 'fa fa-heart' : 'far fa-heart'"></i>
              </div>
            </div>
            <div class="text-lg my-1" v-html="comment.text"></div>
            <div class="flex justify-between mb-1">
              <div class="mt-1" v-if="comment.replyTo === -1">
                <div class="report-link color-primary flex items-center text-sm text-orange-600 hover:underline cursor-pointer">
                  <i class="fa fa-angle-right mr-1"></i>
                  <div @click="initiateReply(comment.id)" >Reply</div>
                </div>
              </div>
              <div v-else></div>
              <div class="cursor-pointer" @click="() => {state.layoutData.reportDialogCommentId = comment.id; state.layoutData.reportDialog = true;}" >
                <span class="report-link text-xs">Report</span>
              </div>
            </div>
            <div
              v-if="comment.showMore && showReplies.indexOf(comment.replyTo) < 0"
              @click="showReplies.push(comment.replyTo)"
              class="cursor-pointer color-primary mt-1 px-2 py-1 rounded text-sm"
            >
              <i class="fa fa-plus"></i>
              Show more
            </div>
            <div
              v-if="comment.showLess"
              @click="$delete(showReplies, showReplies.indexOf(comment.replyTo))"
              class="cursor-pointer color-primary mt-1 px-2 py-1 text-sm rounded"
            >
              <i class="fa fa-minus"></i>
              Show less
            </div>
          </div>
        </div>
      </div>

      <div v-if="state.layoutData.reportDialog" class="backdrop" @click="state.layoutData.reportDialog = false"></div>
      <div class="fixed bg-gray-100 p-4 z-50 rounded absolute-center w-400" v-if="state.layoutData.reportDialog" >
        <div class="py-4 px-6 w-full text-center text-2xl text-default">
          Report
        </div>
        <div class="comment-input mb-4">
          <input
            type="text"
            class="bg-transparent rounded w-full outline-none py-2 text-default mb-0"
            v-model="state.reportDialogReason"
            @keyup.enter="commentAction('report', state.reportDialogCommentId)"
            autofocus
            required
          />
          <label for="reason">Reason (optional)</label>
        </div>
        <div>
          <div class="flex justify-center">
            <button 
              class="bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-400 rounded px-4 py-2 mr-2" 
              @click="() => {state.reportDialogReason = ''; state.layoutData.reportDialog = false}"
            >
              Close
            </button>
            <button 
              class="bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-400 rounded px-4 py-2" 
              @click="commentAction('report', state.reportDialogCommentId)"
            >
              Report
            </button>
          </div>
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
          v-on:click.stop
          text
          x-small
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onBeforeMount, onMounted, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import EmojiPicker from '@/components/Molecules/EmojiPicker.vue'

export default defineComponent({
  components: {
    EmojiPicker,
  },
  props: {
    docId: {type: Number},
    allowNotifications: {type: Boolean},
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      layoutData: {
        loading: true,
        addingComment: false,
        commentSubmitActive: false,
        commentSubmitFocusedAlready: false,
        emojiPicker: false,
        reportDialog: false,
        reportDialogCommentId: -1,
        reportDialogReason: '',
        openSnackbar: false,
        snackbarText: '👍 Thank you for reporting this comment, we will manually review it',
        sort: 'Best',
        onTouchHot: false
      },
      commentsClosed: false,
      newComment: {
        text: '',
        nickname: '',
        emailAddress: '',
        notify: true,
        replyTo: -1,
        error1: '',
        error2: ''
      },
      votedIs: [],
      showReplies: [],
      comments: [],
    })

    watch(() => state.layoutData.sort, () => {
      getComments()
    })

    watch(() => state.newComment.replyTo, () => {
      getComments()
    })
    
    const displayedComments = computed(() => {
      return state.comments.filter(com => (com.replyTo === -1 || com.show === true || state.showReplies.indexOf(com.replyTo) >= 0))
    })

    onBeforeMount(() => {
      state.votedIds = JSON.parse(localStorage.getItem('commentsvoted') || '[]')
      getComments()

      state.newComment.nickname = sessionStorage.getItem('commentsNickname') || ''
      state.newComment.emailAddress = sessionStorage.getItem('commentsEmailAddress') || ''
    })

    onMounted(() => {
      if (!state.commentSubmitFocusedAlready) {
        setTimeout(() => document.getElementById('text-input').focus({preventScroll: true}), 1000)
        state.commentSubmitFocusedAlready = true
      }
    })

    const getComments = () => {
      fetch('/api/comments/get', {
        method: 'POST',
        body: JSON.stringify({
          id: route.params.docId,
          sort: state.layoutData.sort
        })
      }).then(r => {
        if (r.status !== 200) {
          r.json().then(r => alert(r))
        } else {
          r.json().then(r => {
            state.comments = r.comments
            state.layoutData.loading = false

            const params = new URL('https://heystacks.org/' + location.search).searchParams
            if (params.get('comment-report')) {
              state.layoutData.reportDialogCommentId = params.get('comment-report')
              state.layoutData.reportDialog = true
            }
          })
        }
      })
    }

    const addComment = () => {
      state.layoutData.addingComment = true
      if (!state.newComment.text) {
        state.newComment.error1 = 'no-text'
        state.layoutData.addingComment = false
      } else if (!state.newComment.nickname) {
        state.newComment.error2 = 'no-nickname'
        state.layoutData.addingComment = false
      } else {
        sessionStorage.setItem('commentsNickname', state.newComment.nickname)
        sessionStorage.setItem('commentsEmailAddress', state.newComment.emailAddress)
        fetch('/api/comments/add', {
          method: 'POST',
          body: JSON.stringify({
            id: route.params.docId,
            text: state.newComment.text,
            nickname: state.newComment.nickname,
            emailAddress: state.newComment.emailAddress,
            replyTo: state.newComment.replyTo,
            notify: state.newComment.notify,
          })
        }).then(r => {
          if (r.status !== 200) {
            r.json().then(r => alert(r))
          } else {
            r.json().then(r => {
              if (state.newComment.replyTo === -1) {
                state.comments = [r.comment].concat(state.comments)
              } else {
                getComments()
              }
              state.newComment.error1 = ''
              state.newComment.error2 = ''
              state.newComment.text = ''
              state.newComment.notify = false
              state.newComment.replyTo = -1
              state.layoutData.commentSubmitActive = false
              state.layoutData.addingComment = false
            })
          }
        })
      }
    }

    const commentAction = (type, commentId) => {
      let upvoted = false
      if (state.votedIds.indexOf(commentId) >= 0) upvoted = true
      fetch('/api/comments/action', {
        method: 'POST',
        body: JSON.stringify({
          id: commentId,
          type: type,
          upvoted: upvoted,
          reportReason: state.layoutData.reportDialogReason,
        })
      }).then(r => {
        if (r.status !== 200) {
          r.json().then(r => alert(r))
        } else {
          r.json().then(r => {
            if (type === 'upvote') {
              // state.comments.find(com => com.id === commentId).upvotes += (upvoted ? -1 : 1)
              // upvoted ? this.$delete(state.votedIds, state.votedIds.indexOf(commentId)) : state.votedIds.push(commentId)
              localStorage.setItem('commentsvoted', JSON.stringify(state.votedIds))
            } else if (type === 'report') {
              state.layoutData.reportDialog = false
              state.layoutData.reportDialogReason = ''
              state.layoutData.openSnackbar = true
            }
          })
        }
      })
    }

    const initiateReply = (commentId) => {
      state.newComment.replyTo = commentId
      nextTick(() => {
        let commentReplyMsg = document.querySelector('#comment-reply-msg');
        commentReplyMsg.scrollIntoView({behavior: 'smooth'})
        setTimeout(() => document.getElementById('text-input').focus(), 800)
      })
    }

    const insertEmoji = (emoji) => {
      const el = document.querySelector('textarea')
      let cursorPos = el.selectionEnd
      state.newComment.text = state.newComment.text.substring(0, cursorPos) + emoji + state.newComment.text.substring(cursorPos)
      cursorPos += 1
      nextTick(() => {
        el.setSelectionRange(cursorPos, cursorPos)
        el.focus()
      })
      state.layoutData.emojiPicker = false
    }

    const formatTimeAgo = (timestamp) => {
      const msPerMinute = 60 * 1000
      const msPerHour = msPerMinute * 60
      const msPerDay = msPerHour * 24
      const msPerMonth = msPerDay * 30
      const msPerYear = msPerDay * 365

      const elapsed = (new Date().getTime()) - timestamp

      if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + 's ago'
      } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + 'min ago'
      } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + 'h ago'
      } else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + 'd ago'
      } else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + 'mo ago'
      } else {
        return Math.round(elapsed / msPerYear) + 'y ago'
      }
    }

    return {
      state,
      displayedComments,
      getComments,
      addComment,
      commentAction,
      initiateReply,
      insertEmoji,
      formatTimeAgo,
    }
  }
})
</script>
<style scoped>
  .comment-input {
    position: relative;
  }
  
  .comment-input::before {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 2px;
    background: #a6a6a6;

  }
  
  .comment-input label {
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

  .comment-input input:focus ~ label,
  .comment-input input:not(:focus):valid ~ label {
    transform: translateY(-14px) scale(.75);
    color: #f06139;
  }

  .min-h-60 {
    min-height: 60px
  }

  .w-400 {
    width: 400px;
  }
</style>
