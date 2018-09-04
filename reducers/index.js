import {LOAD_DECKS, ADD_DECK, ADD_CARD} from '../actions'

function decks(state = {}, action) {
  switch (action.type) {
    case LOAD_DECKS:
      return { ...state, decks: action.decks }
    case ADD_DECK:
      return { ...state, decks: {...state.decks, [action.deckTitle]: { title: action.deckTitle, questions: [] }}}
    case ADD_CARD:
      const out = {
        ...state.decks
      }
      if (out[action.deckTitle]) {
        const {question, answer} = action.card
        out[action.deckTitle].questions.push({question, answer})
      }
      return {...state, decks: out}
  }
  return state

}

export default decks
