import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { answerQuestion } from '../actions'
import { red, green, white } from '../utils/colors'

class AnswerButtons extends Component {

  render() {
    const { answerQuestion } = this.props

    return (
      <View>
        <TouchableHighlight style={styles.button} onPress={() => answerQuestion(true)}>
          <Text style={styles.buttonTxt}>Correct</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.button, styles.redBtn]} onPress={() => answerQuestion(false)}>
          <Text style={styles.buttonTxt}>Incorrect</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    margin: 5,
    borderRadius: 5,
    backgroundColor: green,
  },
  redBtn: {
    backgroundColor: red
  },
  buttonTxt: {
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    textAlign: 'center',
    color: white,
    fontSize: 32,
  },
})
function mapStateToProps(state) {
  return {
  }
}
function mapDispatchToProps(dispatch, {navigation}) {
  return {
    answerQuestion: (data) => dispatch(answerQuestion(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerButtons)
