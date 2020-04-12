import React, {Component} from 'react';
import { Image, Button, Platform, StyleSheet, Text, View, Alert, TouchableOpacity, Dimensions, Animated} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { db } from '../config';
import { data } from '../App';
import Accordion from '../components/Accordion'

export default class Screen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      buttons: {},
    };
  }

  clickButton(button) {

  }

  async getButtons(path) {
    try {
      const snapshot = await db.ref(path).once('value');
      let buttons = [];
      snapshot.forEach((s) => {
        let button = (
          <TouchableOpacity
            style={[{backgroundColor: '#7ED551'}, styles.buttonStyle]}
            onPress={() => this.clickButton(s.key)}>
            <Image 
                source={require(`../assets/images/${s.key.toLowerCase()}.png`)}
                style={styles.buttonIcon}/>
            <Text style={styles.buttonText}>{s.key.toUpperCase()}</Text>
          </TouchableOpacity>
        )

      });
      this.setState({buttons})
    } catch(e) {
      console.warn(e);
    }
  }
  componentDidMount() {
    this.getButtons();
  }

  render() {
    return (
        <View style = {styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Clinician {"\n"} Pocket Reference</Text>
              <Image 
                source={require('../assets/images/clinician.png')}
                style={styles.titleImage}/>
              <View style={styles.buttonContainer}>
                {this.state.buttons}
              </View>
            </View>
          </ScrollView>
        </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  titleText: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 30,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 20,
    // padding: 15,
    paddingBottom: 20,
    alignSelf: 'center'
  },
});
