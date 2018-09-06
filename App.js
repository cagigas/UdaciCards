import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Platform, StatusBar } from 'react-native';
import { Provider } from 'react-redux'
import { purple, white, lightGray } from './utils/colors'
import { createStore } from 'redux'
import reducer from './reducers'
import { Constants } from 'expo'
import { MainNavigator } from './routes'
import { clearDB } from './utils/api'
import { setLocalNotification } from './utils/api'

function CardsStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  componentDidMount() {
    clearDB()
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <CardsStatusBar backgroundColor={lightGray} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
