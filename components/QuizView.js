import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, TextInput, Navigator } from 'react-native'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/api'
import { resetQuiz } from '../actions'
import Card from './Card'
import { white, black, green } from '../utils/colors'


class QuizView extends Component {

  componentDidMount () {
    clearLocalNotification().then(setLocalNotification)
  }

  render() {
    const { navigate, state } = this.props.navigation
    const { deck } = state.params
    const { dispatch, currentQuestion, decks, resetQuiz, goBack } = this.props
    const { questions, title } = deck
    if (questions.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.summary}>
            Please, add new Cards to play the quiz!
          </Text>
          <TouchableHighlight style={styles.button} onPress={() => goBack()}>
            <Text style={styles.buttonTxt}>Return</Text>
          </TouchableHighlight>
        </View>
      )

    }else if (questions.length > 0 && currentQuestion == questions.length) {
      const { correct, incorrect } = this.props
      const percentCorrect = Math.round((correct / (correct + incorrect)) * 100)

      return (
        <View style={styles.container}>
          <Text style={styles.summary}>
            Done! You got {percentCorrect}%  correct ({correct} out of {correct + incorrect})
          </Text>
          <TouchableHighlight style={styles.button} onPress={() => resetQuiz()}>
            <Text style={styles.buttonTxt}>Restart Quiz</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={() => goBack()}>
            <Text style={styles.buttonTxt}>Return</Text>
          </TouchableHighlight>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.count}>{currentQuestion + 1}/{questions.length}</Text>
        <Card question={questions[currentQuestion]} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingLeft: 10,
   paddingRight: 10,
   justifyContent: 'center',
   alignItems: 'center'
  },
  count: {
    fontSize: 14,
    fontWeight: 'bold',
    alignItems: 'flex-start'
  },
  summary: {
    fontSize: 20,
    color: green,
    textAlign: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: black,
    borderWidth: 1,
    width: '60%',
    borderColor: black,
    borderRadius: 10,
    padding: 5,
    margin: 10,
  },
  buttonTxt: {
    width: 240,
    color: white,
    fontSize: 32,
    textAlign: 'center'
  },
})


function mapStateToProps (state) {
  return {
    correct: state.correct,
    incorrect: state.incorrect,
    currentQuestion: state.currentQuestion,
    decks: state.decks
  }
}
function mapDispatchToProps(dispatch, {navigation}) {
  return {
    resetQuiz: () => dispatch(resetQuiz()),
    goBack: () => navigation.goBack()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizView)
