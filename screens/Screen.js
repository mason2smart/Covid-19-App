import React, {Component} from 'react';
import { Image, Button, Platform, StyleSheet, Text, View, Alert, TouchableOpacity, Dimensions, Animated} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { db } from '../config';
import { data } from '../App';
import { MyButton } from '../components/Button';

let color_dict = {
  'cpr': 'blue',
  'ventilators': 'green'
};

export default class Screen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageTitle: 'COVID-19 Reference',
      data: {},
    };
  }

  clickButton(path) {
    // reload the page with everything you need from this button path
    const path_minus_last_part = path.substr(0, path.lastIndexOf('/'));
    const path_split = path.split('/');
    const title = path_split[path_split.length - 1].toUpperCase();
    this.setState({last: path_minus_last_part});
    this.setState({pageTitle: title}); // we don't want this exactly but something similar
    this.getData(path);
  }

  async getData(path) {
    let first_path = path.split('/')[0]; // path up to first '/'
    let color = color_dict[first_path];
    if (color === undefined) {
      color = 'red';
    }

    try {
      const snapshot = await db.ref(path).once('value');
      if (snapshot.hasChildren()) {
        let buttons = [];
        snapshot.forEach((s) => {
          // add button component to list
          let name = s.key;
          let text = this.createButtonName(name);
          let new_path = path + '/' + name;

          let button = <MyButton
            path={new_path}
            color={color} text={text} onclick={this.clickButton}/>
        });
        this.setState({data: buttons});
      } else {
        // no children, display text
        const val = snapshot.val();
        data = null;
        if (/* val = $IMAGE_LOCATION$ */ true) {
          // load image component
        } else {
          // load plain text component
        }
        this.setState({data: data});
      }
    } catch(e) {
      console.warn(e);
    }
  }

  componentDidMount() {
    this.getData('/');
  }

  createButtonName(key) {
    key = key.replace(/_/g, ' ');
    return key.toUpperCase();
  }

  render() {
    return (
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.titleText}>{this.state.pageTitle}</Text>
            <Text style={styles.subtitleText}>{this.state.data.caseFatality}</Text>
            {this.state.data}
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
