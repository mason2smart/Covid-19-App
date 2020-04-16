import * as React from 'react';
import { Image, StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MyVideo from "../components/MyVideo";

export default function VideoTutorial({route}) {
  const { name } = route.params;
  const { data } = route.params;

  /*const [data, setData] = useState({});

  async function getData() {
    try {
      const snapshot = await db.ref("tutorials/").once("value");
      let data = snapshot.val();
      setData(data);

      // console.log(data)
    } catch (e) {
      console.warn(e);
    }
  }
  useEffect(() => {
    getData();
  }, []);*/

  function createObjects() {
    let k = 0; //for unique keys to get rid of warnings

    let componentsList = [];
    Object.entries(data).map(([key, value]) => {
      switch (value.type) {
        case "video":
          componentsList.push(
            <View key={k++} style={styles.contentContainer}>
              <Text>Video Placeholder</Text>
            </View>
          );
        break;
      }
    });
    return componentsList;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{name}</Text>
        </View>
        <View style={styles.contentContainer}>{createObjects()}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  subtitleText: {
    fontSize: 20,
    // padding: 15,
    paddingBottom: 20,
    alignSelf: 'center'
  },
  titleContainer: {
    alignItems: "center",
    margin: 20,
  },
  titleText: {
    fontSize: 36,
    textAlign: "center",
    fontFamily: "Avenir-roman",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
});
