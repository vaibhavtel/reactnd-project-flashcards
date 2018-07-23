import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY } from './Constants'

const MockData = () => {
  const Data = {
    javascript: {
      title: 'javascript',
      questions: [
        {
          question: 'What is a closure?',
          answer:
            'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    },
    react: {
      title: 'react',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    }
  }

  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(Data))
}

export default MockData;