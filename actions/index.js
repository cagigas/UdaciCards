export const LOAD_DECKS = 'LOAD_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const RESET_QUIZ = 'RESET_QUIZ'

export function loadDecks (decks) {
  return {
    type: LOAD_DECKS,
    decks,
  }
}

export function addDeck (deckTitle) {
  return {
    type: ADD_DECK,
    deckTitle,
  }
}

export function addCard (deckTitle, card) {
  return {
    type: ADD_CARD,
    deckTitle,
    card
  }
}

export function answerQuestion (state) {
  return {
    type: ANSWER_QUESTION,
    state: state
  }
}
export function resetQuiz () {
  return {
    type: RESET_QUIZ
  }
}
