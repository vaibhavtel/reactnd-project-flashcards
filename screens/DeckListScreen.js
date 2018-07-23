import React from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY } from '../utils/Constants'

export default class DeckListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            decks: {}
        }
    }
    handleOnPress = (deckId) => {
        const deck = this.state.decks[deckId];
        this.props.navigation.navigate("DeckViewScreen", {
            deck
        });
    }
    componentDidMount() {
        this.props.navigation.addListener('didFocus', () => {
            AsyncStorage.getItem(DECKS_STORAGE_KEY).then(decks => {
                if (decks) {
                    this.setState({
                        decks: JSON.parse(decks)
                    });
                }
            });
        });
    }
    render() {
        const decks = Object.keys(this.state.decks);
        return (
            decks && decks.length ?
                <View>
                    <ScrollView>
                        <View>
                            <Text>Deck List:</Text>
                            <FlatList
                                keyExtractor={item => item}
                                data={decks}
                                renderItem={({item}) => {
                                    return (
                                        <TouchableOpacity key={item} style={styles.deck} onPress={() => this.handleOnPress(item)}>
                                            <Text>{item}</Text>
                                            <Text>{this.state.decks[item].questions.length} cards</Text>
                                        </TouchableOpacity>
                                    );
                                }}
                            />
                        </View>
                    </ScrollView>
                </View>
                : <Text> No decks</Text>
        );
    }
}

const styles = {
    deck: {
        borderWidth: 1,
        borderColor: '#555',
        marginVertical: 10,
        padding: 5,
        alignItems: "center"
    }
};

