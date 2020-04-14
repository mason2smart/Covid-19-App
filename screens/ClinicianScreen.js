import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MyButton from "../components/MyButton";
import { db } from "../config";

// 3 'Airway_Management': "#1082C7", 
// 5 'Cardiopulmonary_Arrest': "#C73110",
// 6 'Cardiovascular_Support': "#C73110",
// 12 'Discharge': "#38B406", 
// 8 'ECMO': "#C73110",
// 1 'Epidemiology': "#EFCB34", 
// 7 'Hematology_and_Coagulation': "#C73110",
// 10'Imaging': "#38B406",
// 2 'Pharmacological_Treatment': "#EFCB34",
// 9 'Recognition': "EFCB34",
// 11 'Renal_Support': "#38B406", 
// 4 'Respiratory_Support': "#1082C7",

// };

export default function ClinicianScreen({ navigation }) {
  const [cprData, setData] = useState({});

  async function getData() {
    try {
      const snapshot = await db.ref("categories/").once("value");
      let data = snapshot.val();
      setData(data);

      //console.log(data)
    } catch (e) {
      console.warn(e);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  function createButtons() {
    let buttonList = new Array(Object.keys(cprData).length);
    Object.entries(cprData).map(([key, value]) => {
      let name = key.replace(/_/g, " ");
      buttonList[value.order] =  
        <MyButton name={name} color={value.color} data={key} key={key} content = 'Buttonscreen' />
      
    });
    // buttonList = [ //custom button order
    //   buttonList[5], buttonList[8], //yellow
    //   buttonList[6], buttonList[2], buttonList[1], buttonList[4], //red
    //   buttonList[0], buttonList[11], buttonList[10], //blue
    //   buttonList[7], buttonList[9], buttonList[3] //green
    // ];
    return buttonList;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            Clinician {"\n"} Pocket Reference
          </Text>
          <Image
            source={require("../assets/images/clinician.png")}
            style={styles.titleImage}
          />
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
