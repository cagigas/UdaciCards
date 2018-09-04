import React, {Component} from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { white, lightGray } from '../utils/colors'

class Deck extends Component {
  render() {
    const { title, questions, bigFonts } = this.props;

    return (
      <View style={styles.container}>
        <Text style={[
          styles.title, (bigFonts)
            ? {
              fontSize: 36
            }
            : ''
        ]}>{title}</Text>
        <Text style={[
          styles.count, (bigFonts)
            ? {
              fontSize: 22
            }
            : ''
        ]}>{questions.length}
          &nbsp;Cards</Text>
      </View>
    )
  }
}

export default Deck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    color: white,
    fontSize: 24,
    textAlign: 'center'
  },
  count: {
    color: lightGray,
    fontSize: 16,
    textAlign: 'center'
  }
})
