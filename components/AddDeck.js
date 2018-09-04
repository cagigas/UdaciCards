import React, {Component} from 'react'
import { Text, TextInput, View, TouchableOpacity, Platform, StyleSheet } from 'react-native'

import { connect } from 'react-redux'
import { black, white, lightGray } from '../utils/colors'

import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'

import FormButtons from './FormButtons'
import { NavigationActions } from 'react-navigation'

class AddDeck extends Component {
  state = {
    title: ""
  }

  submit = () => {
    const { title } = this.state
    const { addDeck } = this.props
    if (title) {
      addDeck(title) //update Redux
      saveDeckTitle(title) //update db
      this.setState({title: ""})
      this.toHome() //navigate to Decks list
    }
  }
  reset = () => {
    this.setState({title: ""})
    this.toHome()
  }
  toHome() {
    this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.deckLabel}>What is the title of your new deck?</Text>
        <TextInput underlineColorAndroid={'transparent'} value={this.state.title} style={styles.deckTitle} editable={true} maxLength={50} placeholder="Deck Title" onChangeText={(title) => this.setState({title})}/>
        <FormButtons onSubmit={this.submit} onCancel={this.reset} submitBtnText={'Add Deck'} cancelBtnText={'Return'}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20
  },
  deckLabel: {
    margin: 10,
    color: black,
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 30
  },
  deckTitle: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: lightGray
  }
})

function mapStateToProps(state) {
  return {state}
}
function mapDispatchToProps(dispatch, { navigation }) {
  return {
    addDeck: (data) => dispatch(addDeck(data))
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)
