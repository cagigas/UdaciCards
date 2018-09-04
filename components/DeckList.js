import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'
import { loadDecks } from '../actions'
import Deck from './Deck'
import { AppLoading } from 'expo'
import { white, blue, purple, orange, lightPurp, pink } from '../utils/colors'

class DeckList extends Component {

  state = {
    ready: false,
    color: ["#d26013","#d49600","#ecc13c","#0c5800","#1d6b3e"]
  }

  componentDidMount() {
    const { loadDecks } = this.props
    getDecks().then((decks) => loadDecks(decks)).then(() => this.setState(() => ({ready: true})))
  }

  keyExtractor = (item, index) => item.title;

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={[styles.item, {backgroundColor: this.state.color[index%5]}]} onPress={() => this.props.navigateDeckView(item.title, this.state.color[index%5])}>
        <Deck id={item.title} title={item.title} questions={item.questions}/>
      </TouchableOpacity>
    )
  }
  render() {
    const { decks } = this.props
    
    if (!this.state.ready) {
      return (<AppLoading/>)
    }
    else{
      return (
        <FlatList
          style={styles.container}
          data={Object.values(decks)}
          extraData={this.state}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}/>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  },
  item: {
    backgroundColor: white,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: white
  }
});

function mapStateToProps(state) {
  return {
    decks: state.decks
  }
}
function mapDispatchToProps(dispatch, {navigation}) {
  return {
    loadDecks: (data) => dispatch(loadDecks(data)),
    navigateDeckView: (data, data2) => navigation.navigate('DeckView', { deckTitle: data, backgroundColor: data2})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
