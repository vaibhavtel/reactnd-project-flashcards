import React from 'react';
import {
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
    AsyncStorage
} from 'react-native';
import { DECKS_STORAGE_KEY } from '../utils/Constants'


export default class AddCardScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: "",
            answer: "",
            deckId: props.navigation.state.params.deckId
        }
    }
    static navigationOptions = {
        title: "Add Card"
    }
    handleOnPress = () => {
        const { question, answer, deckId } = this.state;
        if (question.length && answer.length) {
            AsyncStorage.getItem(DECKS_STORAGE_KEY).then(data => {
                const decks = JSON.parse(data);
                decks[deckId].questions.push({
                    answer,
                    question
                });
                console.log(decks);
                AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
                Alert.alert("new card added sucessfully")
                this.setState({ question: "", answer: "" })
            });
        } else {
            Alert.alert("please enter missing fields")
        }
    }
    render() {
        return (
            <View>
                <ScrollView>
                    <TextInput
                        placeholder="enter question"
                        value={this.state.question}
                        style={styles.input}
                        onChangeText={(question) => this.setState({ question })}
                    />
                    <TextInput
                        placeholder="enter answer"
                        value={this.state.answer}
                        style={styles.input}
                        onChangeText={(answer) => this.setState({ answer })}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleOnPress}
                    >
                        <Text> Submit </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
    input: {
        borderWidth: 1,
        borderColor: '#555',
        marginVertical: 10,
        height: 40
    }
};