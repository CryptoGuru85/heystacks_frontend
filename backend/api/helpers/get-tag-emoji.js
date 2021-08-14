module.exports = {


  friendlyName: 'Get emoji for tag string, return both',

  inputs: {
    tag: {
      type: 'string',
      required: true
    },
  },


  fn: async function(inputs) {
    
    if (inputs.tag === 'resources') return '📑 ' + inputs.tag
    else if (inputs.tag === 'tips') return '📋 ' + inputs.tag
    else if (inputs.tag === 'recommendations') return '📋 ' + inputs.tag
    else if (inputs.tag === 'politics') return '🗳️ ' + inputs.tag
    else if (inputs.tag === 'art') return '🎨 ' + inputs.tag
    else if (inputs.tag === 'data') return '🗄️ ' + inputs.tag
    else if (inputs.tag === 'remotework') return '💻 ' + inputs.tag
    else if (inputs.tag === 'food') return '🍲 ' + inputs.tag
    else if (inputs.tag === 'films') return '📽️ ' + inputs.tag
    else if (inputs.tag === 'movies') return '📽️ ' + inputs.tag
    else if (inputs.tag === 'coronavirus') return '😷 ' + inputs.tag
    else if (inputs.tag === 'games') return '🎮️ ' + inputs.tag
    else if (inputs.tag === 'freelance') return '🖥️️ ' + inputs.tag
    else if (inputs.tag === 'teaching') return '👩‍🏫 ' + inputs.tag
    else if (inputs.tag === 'healthcare') return '⚕️ ' + inputs.tag
    else if (inputs.tag === 'jobs') return '👔️ ' + inputs.tag
    else if (inputs.tag === 'parenting') return '👪️ ' + inputs.tag
    else if (inputs.tag === 'music') return '🎵 ' + inputs.tag
    else if (inputs.tag === 'sport') return '⚽️ ' + inputs.tag
    else if (inputs.tag === 'journalism') return '📰️ ' + inputs.tag
    else if (inputs.tag === 'guide') return 'ℹ️️ ' + inputs.tag
    else if (inputs.tag === 'animal crossing') return '🌻️ ' + inputs.tag
    else if (inputs.tag === 'ACNH') return '🌻 ' + inputs.tag
    else if (inputs.tag === 'finance') return '💸️ ' + inputs.tag
    else if (inputs.tag === 'startup') return '🦄️ ' + inputs.tag
    else if (inputs.tag === 'fitness') return '💪️ ' + inputs.tag
    else if (inputs.tag === 'films') return '📽️ ' + inputs.tag
    else if (inputs.tag === 'VC') return '🦄️️ ' + inputs.tag
    else if (inputs.tag === 'climate') return '🌍️ ' + inputs.tag
    else if (inputs.tag === 'recipe') return '🍲 ' + inputs.tag
    else if (inputs.tag === 'recruitment') return '👔️ ' + inputs.tag
    else if (inputs.tag === 'vegan') return '🌱️ ' + inputs.tag
    else if (inputs.tag === 'aviation') return '✈️ ' + inputs.tag
    else if (inputs.tag === 'theatre') return '🎭 ' + inputs.tag
    else if (inputs.tag === 'history') return '🏺 ' + inputs.tag
    else if (inputs.tag === 'reading') return '📚 ' + inputs.tag
    else if (inputs.tag === 'technology') return '⚙️ ' + inputs.tag
    else if (inputs.tag === 'socialism') return '🌹️ ' + inputs.tag
    else if (inputs.tag === 'fact-check') return '🔍 ' + inputs.tag
    else if (inputs.tag === 'protest') return '✊️ ' + inputs.tag
    else if (inputs.tag === 'travel') return '🧳️ ' + inputs.tag
    else if (inputs.tag === 'books') return '📚️ ' + inputs.tag
    else if (inputs.tag === 'mental health') return '💚️ ' + inputs.tag
    else if (inputs.tag === 'podcasts') return '🎙️️ ' + inputs.tag
    else if (inputs.tag === 'contacts') return '📝 ' + inputs.tag
    else if (inputs.tag === 'media') return '🔊 ' + inputs.tag
    else if (inputs.tag === 'society') return '🏛️ ' + inputs.tag
    else if (inputs.tag === 'research') return '🔬 ' + inputs.tag
    else if (inputs.tag === 'LGBT') return '🏳️‍🌈 ' + inputs.tag
    else if (inputs.tag === 'programming') return '⌨️️️' + inputs.tag
    else if (inputs.tag === 'learning') return '👩‍🏫' + inputs.tag
    else if (inputs.tag === 'AI') return '🧠️️' + inputs.tag
    else if (inputs.tag === 'gender') return '♀️️️' + inputs.tag
    else return inputs.tag
    
  }

};
