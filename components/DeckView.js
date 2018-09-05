import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { white, black } from '../utils/colors'
import Deck from './Deck'
import { resetQuiz } from '../actions'

class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params
    return { title: deckTitle }
  }
  render() {
    const { deck, navigateToAddCard, navigateToStartQuiz, backgroundColor, resetQuiz } = this.props
    return (
      <View style={[styles.container, {backgroundColor: backgroundColor}]}>
        <Deck id={deck.title} title={deck.title} questions={deck.questions} bigFonts={true}/>
        <TouchableOpacity style={[styles.btn, styles.addCardBtn]} onPress={() => navigateToAddCard(deck.title, backgroundColor)}>
          <Text style={[styles.btnText, styles.addCardBtnText]}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.startQuizBtn]} onPress={() => {resetQuiz();navigateToStartQuiz(deck, backgroundColor)}}>
          <Text style={[styles.btnText, styles.startQuizBtnText]}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    backgroundColor: white,
    padding: 15
  },
  btn: {
    padding: 10,
    height: 45,
    margin: 10,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        borderRadius: 7
      },
      android: {
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2
      }
    })
  },
  addCardBtn: {
    backgroundColor: white,
    borderWidth: 1,
    width: '60%',
    borderColor: black,
    borderRadius: 10,
  },
  addCardBtnText: {
    color: black
  },
  startQuizBtn: {
    backgroundColor: black,
    borderWidth: 1,
    width: '60%',
    borderColor: black,
    borderRadius: 10,
  },
  startQuizBtnText: {
    color: white
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
})

function mapStateToProps(state, {navigation}) {
  const { deckTitle, backgroundColor } = navigation.state.params
  return {
    decks: state.decks,
    deck: state.decks[deckTitle] || {},
    backgroundColor: backgroundColor
  }
}

function mapDispatchToProps(dispatch, {navigation}) {
  const { deckTitle } = navigation.state.params

  return {
    resetQuiz: () => dispatch(resetQuiz()),
    goBack: () => navigation.goBack(),
    navigateToAddCard: (data, data2) => navigation.navigate('AddCard', { deckTitle: data, backgroundColor: data2}),
    navigateToStartQuiz: (data, data2) => navigation.navigate('QuizView', { deck: data, backgroundColor: data2})
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(DeckView)
