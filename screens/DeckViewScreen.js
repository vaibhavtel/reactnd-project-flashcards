import React from "react";
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    AsyncStorage
} from "react-native";
import { DECKS_STORAGE_KEY } from "../utils/Constants";


export default class DeckViewScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.deck.title
    })
    constructor(props) {
        super(props);
        this.state = {
            deckId: props.navigation.state.params.deck.title,
            deck: props.navigation.state.params.deck
        };
    }
    componentDidMount() {
        this.props.navigation.addListener("didFocus", () => {
            AsyncStorage.getItem(DECKS_STORAGE_KEY).then((data) => {
                const decks = JSON.parse(data);
                this.setState({
                    deck: decks[this.state.deckId]
                });
            });
        });
    }
    handleAddCard = () => {
        this.props.navigation.navigate("AddCardScreen", {
            deckId: this.state.deckId
        });
    }
    handleStartQuiz = () => {
        this.props.navigation.navigate("QuizScreen", {
            questions: this.state.deck.questions
        });
    }
    render() {
        return (
            <View>
                <ScrollView>
                    <View>
                        <Text>{this.state.deck.title}</Text>
                        <Text>{this.state.deck.questions.length} cards</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleAddCard}
                    >
                        <Text> Add card </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleStartQuiz}
                    >
                        <Text> Start Quiz </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        marginVertical: 10
    }
};
