import React from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {
    clearLocalNotification,
    setLocalNotification
  } from "../utils/Notifications";


export default class QuizScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: props.navigation.state.params.questions,
            currentCount: 0,
            totalCount: props.navigation.state.params.questions.length,
            correctAnswerCount: 0,
            showAnswer: false,
            showResults: false
        }
    }
    static navigationOptions = {
        title: "Quiz"
    }
    handleIncrement = (answer) => {
        let { currentCount, correctAnswerCount, showResults, totalCount } = this.state;
        currentCount++;
        if (currentCount === totalCount) {
            showResults = true;
            clearLocalNotification().then(setLocalNotification);
        }
        if (answer) {
            correctAnswerCount++;
        }
        this.setState({
            currentCount,
            correctAnswerCount,
            showResults,
            showAnswer: false
        });
    }
    handleShowAnswer = () => {
        this.setState({
            showAnswer: true
        });
    }
    getAnswerText = () => {
        if (this.state.showAnswer) {
            return (
                <Text> Answer: {this.state.questions[this.state.currentCount].answer}</Text>
            )
        }
    }
    getShowAnswerButton = () => {
        if (!this.state.showAnswer) {
            return (
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleShowAnswer}
                >
                    <Text> Show Answer </Text>
                </TouchableOpacity>
            )
        }
    }
    handleRestartQuiz = () => {
        this.setState({
            currentCount: 0,
            correctAnswerCount: 0,
            showResults: false,
            showAnswer: false
        });
    }
    handleBackToDeck = () => {
        this.props.navigation.goBack();
    }
    render() {
        return (
            this.state.showResults ?
                <View>
                    <ScrollView>
                        <View>
                            <Text> Score : {this.state.correctAnswerCount}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.handleRestartQuiz}
                        >
                            <Text> Restart Quiz </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.handleBackToDeck}
                        >
                            <Text> Go Back </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                :
                <View>
                    <ScrollView>
                        <View>
                            <Text>{`${this.state.currentCount + 1}/${this.state.totalCount}`}</Text>
                            <Text>{this.state.questions[this.state.currentCount].question}</Text>
                            {this.getShowAnswerButton()}
                            {this.getAnswerText()}
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.handleIncrement(true)}
                            >
                                <Text> Correct </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.handleIncrement(false)}
                            >
                                <Text> Incorrect </Text>
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
        padding: 10,
        marginVertical: 10
    }
};