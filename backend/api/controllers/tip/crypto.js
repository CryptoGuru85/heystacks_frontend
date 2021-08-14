/**
 * Module dependencies
 */

// ...


/**
 * tip/crypto.js
 *
 * Crypto tip.
 */
module.exports = async function crypto(req, res) {

  let docObj = await Document.findOne({
    where: {id: req.body.id},
    select: ['payments']
  })

  if (docObj.payments) {
    await Document.update({id: req.body.id})
      .set({
        payments: {
          ...docObj.payments,
          btcCount: (docObj.payments.btcCount || 0) + 1,
          btcLast: Date.now()
        }
      })
    return res.send({
      address: docObj.payments.btcAddress
    })
  } else {
    const bitcoin = require('bitcoinjs-lib')
    const keyPair = bitcoin.ECPair.makeRandom()
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })
    const publicKey = keyPair.publicKey.toString('hex')
    const wif = keyPair.toWIF()
    await Document.update({id: req.body.id})
      .set({
        payments: {
          btcAddress: address,
          btcPublicKey: publicKey,
          btcPrivateWif: wif,
          btcCount: 0,
          btcLast: Date.now()
        }
      })
    return res.send({
      address: address
    })
  }
}
