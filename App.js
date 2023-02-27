import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ImageBackground, Image, TextInput,
 TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import * as Speech from 'expo-speech';

export default function App() {
  const [newWord, setNewWord] = useState("");
  const [checkedWord, setCheckedWord] = useState("");
  const [phonetics, setPhonetics] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");

  const searchWord = (enteredWord) => {
    setNewWord(enteredWord);
  };

  getInfo = () => {
    var url = "https://spelltest.azurewebsites.net/api/Word/word/" + newWord;

    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        var word = response[0].spell;
        setCheckedWord(word);
        var id = response[0].id;
        var phonetics = response[0].phonetics;
        setPhonetics(phonetics);
        var setName = response[0].setName;
        var partOfSpeech = response[0].partOfSpeech;
        var def = response[0].definition;
        setDefinition(def);

        var eg = response[0].sentence;
        setExample(eg);
      });
  };

  const speak = () => {
    Speech.speak(checkedWord);
  };

  const clear = () => {
    setCheckedWord("");
    setDefinition("");
    setExample("");
    setNewWord("");
    setPhonetics("");
  };

  return (
    <View style={styles.container}>
        <View style={{ flex: 0.2 }}>
          <Image
            source={require("./assets/icon.png")}
            style={styles.imageDesign}
          />
        </View>

        <View style={{ flex: 0.8 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TextInput
              style={styles.inputBox}
              placeholder="search a word"
              placeholderTextColor={"rgba(0,0,0,0.7)"}
              textAlign="center"
              clearButtonMode="always"
              onChangeText={searchWord}
              value={newWord}
            ></TextInput>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "60%",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                style={styles.buttonDesign}
                onPress={() => {
                  getInfo();
                }}
              >
                <Text style={styles.buttonText}>Go !</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonDesign}
              
              onPress={()=>{
                clear();
              }}
              >
                <Text style={styles.buttonText}>Clear</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  speak();
                }}
              >               
               <Image
              style={styles.speakerButton}
              source={require("./assets/favicon.png")}
            />
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.textDesign}>
                Entered Word :{checkedWord}{" "}
              </Text>
              <Text style={styles.textDesign}>phonetics : {phonetics} </Text>
              <Text style={styles.textDesign}>Definition : {definition} </Text>
              <Text style={styles.textDesign}>Example : {example} </Text>
            </View>
          </View>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  imageDesign: {
    width: "80%",
    height: "120%",
    marginLeft: 50,
    marginTop: 30,
  },
  inputBox: {
    width: "80%",
    height: 50,
    borderWidth: 5,
    borderColor: "rgba(80, 235, 236 ,1)",
    marginTop: 100,
    fontSize: 25,
  },
  buttonDesign: {
    backgroundColor: "rgba(80, 235, 236,0.4)",
    width: 80,
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 25,
    alignSelf: "center",
    marginTop: 5,
  },
  speakerButton: {
    width: 50,
    height: 40,
  },
  textDesign: {
    fontSize: 25,
    backgroundColor: "rgba(80, 235, 236,0.3)",
    marginTop: 10,
    alignSelf: "center",
  },
});
