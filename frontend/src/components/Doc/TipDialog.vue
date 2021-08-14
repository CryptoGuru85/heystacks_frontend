<template>
  <div v-if="state.showDialog" class="fixed bg-white rounded z-50 absolute-center w-400">
    <div class="relative min-h-395">
      <div class="py-4 px-6">
        <div class="headline mb-2 text-3xl text-default text-center">
          Tip the author
        </div>
        <span class="mx-auto mb-3">
          <div class="flex justify-center">
            <button 
              @click="state.paymentType = 0"
              class="px-4 py-2 duration-500 rounded text-lg uppercase relative"
              :class="state.paymentType == 0 ? 'hover:bg-orange-200 text-orange-600 border-orange': 'hover:bg-zinc-200 text-default'"
            >
              PayPal
            </button>
            <button 
              @click="state.paymentType = 1"
              class="px-4 py-2 duration-500 rounded text-lg uppercase relative"
              :class="state.paymentType == 1 ? 'hover:bg-orange-200 text-orange-600 border-orange' : 'hover:bg-zinc-200 text-default'"
            >
              Bitcoin
            </button>
          </div>
        </span>
      </div>

      <div v-if="state.paymentType === 0" class="px-6 pb-5">
        <div class="flex justify-between pt-4 mb-4">
          <div class="amount-input-group relative w-3/4">
            <input
              id="amount"
              v-model="state.amount"
              type="number"
              class="text-lg rounded w-full outline-none pl-4 py-2 text-default mb-0"
              @input="verifyAmount"
              :error-messages="state.amountError"
              :prefix="getCurrencyPrefix(state.currency)"
              required
            />
            <label for="amount">Amount</label>
            <div class="absolute prefix">{{getCurrencyPrefix(state.currency)}}</div>
          </div>
          <div class="select-currency relative w-1/6">
            <select class="text-base rounded w-full outline-none py-2 text-default h-50">
              <option>USD</option>
              <option>GBP</option>
              <option>EUR</option>
              <option>CAD</option>
              <option>AUD</option>
            </select>
          </div>
        </div>
        <div class="note-input-group relative mb-4">
          <input 
            id="state-note"
            v-model="state.note" 
            class="text-lg rounded w-full outline-none pt-3 pb-2 text-default mb-0"
            required
          />
          <label for="state-note">Note (optional)</label>
        </div>

        <div v-if="state.layoutData.loading" class="text-center">
          <i class="fas fa-circle-notch fa-spin mt-4 text-xl text-lightgrey"></i>
        </div>
        <div id="paypal-button-container"></div>
      </div>

      <div v-if="state.paymentType === 1" class="relative text-center pb-20">
        <div class="relative">
          <img
            v-if="state.btcAddress"
            width="300"
            height="300"
            class="bg-white block mx-auto"
            :alt="'Chart?cht=qr&amp;chl=bitcoin%3A' + state.btcAddress + '%3famount%3d0'"
            :src="'https://chart.googleapis.com/chart?cht=qr&amp;chl=bitcoin%3A' + state.btcAddress + '%3Famount%3D0.001&amp;choe=UTF-8&amp;chs=300x300'"
          >
          <div class="absolute loader-box">
            <div class="loader"></div>
          </div>
        </div>
        <div>
          <div
            class="three-dots cursor-pointer w-full text-xl"
            title="Click to copy"
            @click="copyToClipboard($event, state.btcAddress)"
            v-on:click.stop
          >
            {{state.btcAddress}}
          </div>
        </div>

        <div
          v-if="state.layoutData.openSnackbar"
          class="z-20 flex justify-between items-center absolute bg-zinc-800 text-gray-200 px-3 py-2 rounded absolute-center-x bottom-3"
        >
          <span class="whitespace-nowrap mr-6">{{state.layoutData.snackbarText}}</span>
          <button
            @click="state.layoutData.openSnackbar = false"
            v-on:click.stop
            v-on:contextmenu.stop
            class="px-4 py-2 hover:bg-zinc-700 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, reactive, onBeforeMount, onMounted, nextTick, watch, onBeforeUnmount } from 'vue';

export default defineComponent({
  components: {
  },
  props: {
    docId: {type: Number},
  },
  emits: ['close'],
  setup(props, {emit}) {
    const state = reactive({
      layoutData: {
        loading: true,
        openSnackbar: false,
        snackbarText: '📋 Address copied',
      },
      showDialog: true,
      paymentType: 0,
      amount: '5.00',
      currency: 'USD',
      note: '',
      amountError: '',
      payPalButton: {},
      btcAddress: '1H386pp4sQL9zx3feLREFCF7fRwY3VAM6F'
    })

    onBeforeMount(() => {
      const params = new URL('https://heystacks.org/' + location.search).searchParams
      if (params.get('tip-currency')) state.currency = params.get('tip-currency')
      if (params.get('tip-amount')) state.amount = decodeURIComponent(params.get('tip-amount'))
      if (params.get('tip-note')) state.note = params.get('tip-note')
    })

    onMounted(() => {
      if (!window.hasOwnProperty('paypal') || !window['paypal']) {
        let head = document.getElementsByTagName('head')[0]
        let script = document.createElement('script')
        script.setAttribute('id', 'pay-pal-script')
        script.type = 'text/javascript'
        script.onload = () => {
          createPayPalButton()
        }
        script.src = 'https://www.paypal.com/sdk/js?client-id=AQUbilyjn6_C2hgQreBpQIgUPVju_Jf26uNAFYs8q_KHombhjXClk32jZ_Nr-qtpuoROxzD1mZdHDtPK&currency=' + state.currency
        head.appendChild(script)
      } else {
        createPayPalButton()
      }
    })

    onBeforeUnmount(() => {
      if (state.payPalButton) state.payPalButton.close()
    })

    watch(() => state.amount, () => {
       // @ts-ignore
      if (!state.layoutData.loading) paypal.Buttons({
        updateOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: state.amount,
                currency: state.currency
              }
            }],
            application_context: {
              shipping_preference: 'NO_SHIPPING'
            }
          })
        }
      })
    })

    watch(() => state.showDialog, (val) => {
      if (!val) emit('close')
    })

    watch(() => state.currency, (val) => {
      if (!state.layoutData.loading) {
        const params = new URLSearchParams({})
        params.append('tip-currency', encodeURI(val))
        params.append('tip-amount', encodeURI(state.amount))
        params.append('tip-note', encodeURI(state.note))
        let paramsStr = params.toString().replace(/%2C/g, ',').replace(/%25/g, '%')
        window.location.href = window.location.pathname + '?' + paramsStr
      }
    })

    watch(() => state.paymentType, (val) => {
      if (val === 1) {
        fetch('/api/tips/crypto', {
          method: 'POST',
          body: JSON.stringify({
            id: props.docId,
          })
        }).then(r => {
          if (r.status !== 200) {
            r.json().then(r => alert(r))
          } else {
            r.json().then(r => {
              state.btcAddress = r.address
            })
          }
        })
      }
    })

    const createPayPalButton = () => {
      nextTick(() => {
        // @ts-ignore
        state.payPalButton = paypal.Buttons({
          style: {
            color:   'blue',
          },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: state.amount,
                  currency: state.currency
                }
              }],
              application_context: {
                shipping_preference: 'NO_SHIPPING'
              }
            })
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              fetch('/api/tips/tipped', {
                method: 'POST',
                body: JSON.stringify({
                  id: props.docId,
                  note: state.note,
                  payPalData: {
                    purchase_units: details.purchase_units,
                    payer: details.payer
                  }
                })
              }).then(r => {
                if (r.status !== 200) {
                  r.json().then(r => alert(r))
                } else {
                  state.payPalButton.close()
                  nextTick(() => emit('close-tipped'))
                }
              })
            })
          }
        })
        state.layoutData.loading = false
        state.payPalButton.render('#paypal-button-container')
      })
    }

    const verifyAmount = () => {
      state.amountError = (state.amount == 0 || state.amount >= 0.4) ? '' : 'The tip must be over 0.40 (due to PayPal fees)'
    }

    const getCurrencyPrefix = (code) => {
      if (code === 'USD') return '$'
      else if (code === 'GBP') return '£'
      else if (code === 'EUR') return '€'
      else if (code === 'CAD') return 'CA$'
      else if (code === 'AUD') return 'AU$'
    }

    const copyToClipboard = (evt, link) => {
      evt.preventDefault()
      evt.stopPropagation()
      // @ts-ignore
      if (window.clipboardData && window.clipboardData.setData) {
        state.layoutData.openSnackbar = true
        // @ts-ignore
        return window.clipboardData.setData('Text', link)
      } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
        const modalEl = document.getElementsByClassName('headline')[0]
        const textarea = document.createElement('textarea')
        textarea.textContent = link
        textarea.style.position = 'fixed'
        !modalEl ? document.body.appendChild(textarea) : modalEl.appendChild(textarea)
        textarea.select()
        try {
          return document.execCommand('copy')
        } catch (ex) {
          console.warn('Copy to clipboard failed.', ex)
          return false
        } finally {
          !modalEl ? document.body.removeChild(textarea) : modalEl.removeChild(textarea)
          state.layoutData.openSnackbar = true
        }
      }
    }

    return {
      state,
      createPayPalButton,
      verifyAmount,
      getCurrencyPrefix,
      copyToClipboard
    }
  }
})
</script>
<style scoped>

  .amount-input-group::before,
  .note-input-group::before,
  .select-currency::before {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
    height: 2px;
    background: #a6a6a6;
  }

  .amount-input-group label,
  .note-input-group label {
    position: absolute;
    transform-origin: top left;
    top: 11px;
    left: 0px;
    font-size: 16px;
    color: #333;
    pointer-events: none;
    -webkit-transition: all 0.15s ease-out 0s;
    transition: all 0.15s ease-out 0s;
  }

  .amount-input-group label {
    left: 16px;
  }

  .amount-input-group input:focus ~ label,
  .amount-input-group input:not(:focus):valid ~ label,
  .note-input-group input:focus ~ label,
  .note-input-group input:not(:focus):valid ~ label {
    transform: translateY(-16px) scale(.75);
    color: #f06139;
  }

  .amount-input-group input:focus ~ label,
  .amount-input-group input:not(:focus):valid ~ label {
    left: 0;
  }

  .prefix {
    top: 11px;
    left: 0;
  }

  .border-orange::before {
    content: '';
    position: absolute;
    height: 2px;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgb(240, 97, 57);
  }

  .w-400 {
    width: 400px;
  }

  .h-50 {
    height: 50px;
  }

  .min-h-395 {
    min-height: 395px;
  }

  .loader-box {
     left: calc(50% - 20px); 
     top: calc(50% - 20px); 
     z-index: -1; 
     -webkit-transform:translate3d(0,0,0);
  }
</style>