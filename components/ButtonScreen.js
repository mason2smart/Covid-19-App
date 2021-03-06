import React, {useEffect, useState }  from "react";
import {StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MyButton from "./MyButton";
import { db } from "../config";


export default function ButtonScreen({ route, navigation }) {
  const { name } = route.params;
  const { data } = route.params;
  const { color } = route.params;
  const { page } = route.params;
  const { nextScreen } = route.params;
  
  const [pageData, setData] = useState({});

  async function getData() {
    const path = ''.concat(page, data);
    try {
      const snapshot = await db.ref(path).once("value");
      let data = snapshot.val();
      setData(data)
    } catch (e) {
      console.warn(e);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  function createButtons() {
    let buttonList = [];
    Object.entries(pageData).map(([key, value]) => {
        let title = key.replace(/_/g, " ");
        buttonList.push(<MyButton name={title} data = {value} color={color} key={key} content={nextScreen}/>);
    })
    return buttonList;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            {name}
          </Text>
          {createButtons()}
        </View>
      </ScrollView>
    </View>
  );
}

//Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  titleText: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 36,
    textAlign: "center",
  },
  titleImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
});