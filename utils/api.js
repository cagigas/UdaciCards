import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo';

const DECKS_STORAGE_KEY = 'cagigas:decks'
const DECK_QUIZ_NOTIF = 'cagigas:notification'

function dummyDecks() {
  return {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        }, {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
}

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(parseDecks)
}
export function getDeck(id) {
  return getDecks().then((decks) => (decks[id]))
}
export function saveDeckTitle(deckTitle) {
  getDecks().then((decks) => {
    if (!decks[deckTitle]) {
      decks[deckTitle] = {
        title: deckTitle,
        questions: []
      }
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
    }
  })
}
export function clearDB() {
  AsyncStorage.setItem(DECKS_STORAGE_KEY, '')
}
export function addCardToDeck(deckTitle, {question, answer}) {
  getDecks().then((decks) => {
    if (decks[deckTitle] && decks[deckTitle]['questions']) {
      decks[deckTitle]['questions'].push({question, answer})
    }
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
  })
}
function parseDecks(results) {
  return (results) ? JSON.parse(results) : dummyDecks()
}


export function clearLocalNotification () {
  return AsyncStorage.removeItem(DECK_QUIZ_NOTIF)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Log your stats!',
    body: "👋 don't forget to take your test for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(DECK_QUIZ_NOTIF)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(), {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(DECK_QUIZ_NOTIF, JSON.stringify(true))
            }
          })
      }
    })
}
