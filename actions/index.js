export const LOAD_DECKS = 'LOAD_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

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
