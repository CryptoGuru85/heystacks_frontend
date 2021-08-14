/**
 * Module dependencies
 */

// ...


/**
 * fame/get-hall-of-fame.js
 *
 * Get hall of fame.
 */
module.exports = async function getHallOfFame(req, res) {

  let docObj = await Document.find({where: {hallOfFame: {'!=': ''}}, select: ['hallOfFame', 'id', 'url', 'title', 'description', 'slug', 'tags', 'spacesArr']})
    let hallOfFameObj = {}
    //{place: 3, month: "May", year: 2020}
    docObj.forEach(doc => {
      doc.hallOfFame.forEach(award => {
        const yearMonth = `${award.year}-${award.monthIdx}`
        if (!hallOfFameObj[yearMonth]) hallOfFameObj[yearMonth] = {
          monthIdx: award.monthIdx,
          month: award.month,
          year: award.year,
          docs: []
        }
        doc.tags = doc.tags.split(', ').map(tag => tag.replace(/\'/g, ''))
        doc.spacesArr = JSON.parse(doc.spacesArr)
        hallOfFameObj[yearMonth].docs.push({place: award.place, doc: doc})
      })
    })

    let hallOfFameArr = Object.keys(hallOfFameObj).map(month => hallOfFameObj[month])
    hallOfFameArr = hallOfFameArr.sort((a, b) => b.monthIdx - a.monthIdx)
    hallOfFameArr.forEach(month => month.docs = month.docs.sort((a, b) => a.place - b.place))

    return res.send({
      months: hallOfFameArr
    })

};
