import React, {Component} from 'react'
import {
    StyleSheet, Text,
    View
} from 'react-native'

export default class Person extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <View>
                <Text>
                    person
                </Text>
            </View>
        );
    }
}
module.exports = Person