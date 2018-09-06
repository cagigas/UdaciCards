import {LOAD_DECKS, ADD_DECK, ADD_CARD, ANSWER_QUESTION, RESET_QUIZ} from '../actions'

const initialState = {
  correct: 0,
  incorrect: 0,
  currentQuestion: 0,
  quizStarted: false,
}

function decks(state = initialState, action) {
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
        out[action.deckTitle].questions.concat({question, answer})
      }
      return {...state, decks: out}
    case ANSWER_QUESTION :
      action.state ? state.correct += 1 : state.incorrect += 1
      state.currentQuestion += 1
      return {
        ...state
      }
    case RESET_QUIZ:
      return { ...state, ...initialState }


  }

  return state

}

export default decks
