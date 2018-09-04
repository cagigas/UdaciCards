import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { Platform } from 'react-native';
import { Entypo } from '@expo/vector-icons'
import DeckList from './components/DeckList'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import DeckView from './components/DeckView'
//import Quiz from './components/Quiz'

import { gray, white, black } from './utils/colors'

const TabNavigator = createBottomTabNavigator({
  DeckList:{
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'DeckList',
      headerStyle: {
        backgroundColor: gray
      },
      tabBarIcon: ({tintColor}) => <Entypo name='list' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({tintColor}) => <Entypo name='add-to-list' size={30} color={tintColor} />
    }
  }
},{
  navigationOptions:{
    header: null,
  },
  tabBarOptions:{
    activeTintColor: Platform.OS === 'ios'? gray : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : gray,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
   }
  }
})

export const MainNavigator = createStackNavigator({
  Home:{
    screen: TabNavigator
  },
  DeckView:{
    screen: DeckView,
    navigationOptions:{
      headerTintColor: white,
      headerStyle:{
        backgroundColor: gray
      },
      headerBackTitle: null,
    }
  },
  AddCard:{
    screen: AddCard,
    navigationOptions:{
      headerTintColor: white,
      headerStyle:{
        backgroundColor: black
      },
      headerBackTitle: null,
      title: "Add Card"
    }
  },
/*  Quiz:{
    screen: Quiz,
    navigationOptions:{
      headerTintColor: white,
      headerStyle:{
        backgroundColor: black
      },
      headerBackTitle: null,
      title: "Quiz"
    }
  }*/
})
