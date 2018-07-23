import React from 'react';
import {
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Alert
} from 'react-native';

import { DECKS_STORAGE_KEY } from '../utils/Constants'

export default class NewDeckScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deckName: ""
        }
    }
    handleOnPress = () => {
        const {deckName} = this.state;
        if (deckName.length) {
            AsyncStorage.mergeItem(
                DECKS_STORAGE_KEY,
                JSON.stringify({
                    [deckName]: {
                        title: deckName,
                        questions: []
                    }
                })
            ).then(data => {
                Alert.alert("new deck created sucessfully")
                this.setState({ deckName: "" })
                AsyncStorage.getItem(DECKS_STORAGE_KEY).then(data => {
                    const decks = JSON.parse(data),
                    deck = decks[deckName];
                    this.props.navigation.navigate("DeckViewScreen", {
                        deck
                    });
                });
            })
        } else {
            Alert.alert("Deck name is required")
        }
    }
    render() {
        return (
            <View>
                <ScrollView>
                    <View>
                        <Text>What is the title of your new deck?</Text>
                        <TextInput
                            placeholder="enter deck title here"
                            value={this.state.deckName}
                            style={styles.input}
                            onChangeText={(deckName) => this.setState({ deckName })}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.handleOnPress}
                        >
                            <Text> Submit </Text>
                        </TouchableOpacity>
                    </View>
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