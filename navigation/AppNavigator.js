import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import DeckListScreen from '../screens/DeckListScreen';
import NewDeckScreen from '../screens/NewDeckScreen';
import DeckViewScreen from '../screens/DeckViewScreen';
import QuizScreen from '../screens/QuizScreen';
import AddCardScreen from '../screens/AddCardScreen';

const DeckList = createStackNavigator({
    DeckListScreen: {
        screen: DeckListScreen,
        navigationOptions: {
            title: "Decks"
        }
    },
    DeckViewScreen: {
        screen: DeckViewScreen
    },
    QuizScreen: {
        screen: QuizScreen
    },
    AddCardScreen: {
        screen: AddCardScreen
    }
});

const NewDeck = createStackNavigator({
    NewDeckScreen: {
        screen: NewDeckScreen,
        navigationOptions: {
            title: "New Deck"
        }
    }
});


export default createBottomTabNavigator({
    DeckList,
    NewDeck
});