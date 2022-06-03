import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Button, StatusBar, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native';
import Context, { NewsContext } from './API/Context';
import Home from './components/Home';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { logo } from './assets';


const firebaseConfig = {
  apiKey: "AIzaSyAuzuSGNwnsyxjWfTimsF8oK5ZHC1wD2gU",
  authDomain: "appnews-6e353.firebaseapp.com",
  projectId: "appnews-6e353",
  storageBucket: "appnews-6e353.appspot.com",
  messagingSenderId: "75072233279",
  appId: "1:75072233279:web:74b006aa21c0b4b5907d8a"
};

initializeApp(firebaseConfig);

const auth = getAuth();
const Stack = createNativeStackNavigator();

const image = logo;

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen options={{ headerShown: false }} name="Signup" component={SignupScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const LoginScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Dashboard")
      }
    })
  }, [])
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        // console.log(user.email);
      })
      .catch(error => alert(error.message))
  }
  return (
    <KeyboardAvoidingView style={{
      ...styles.container, justifyContent: 'center',
      alignItems: 'center'
    }} behavior="padding">
      <Image source={image} style={styles.image}></Image>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Enter your Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, padding: 11 }}>Don't Have An Account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.button}>
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}



const SignupScreen = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Dashboard")
      }
    })
  }, [])
  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        // console.log(user.email);
      })
      .catch(error => alert(error.message))
  }
  return (
    <KeyboardAvoidingView style={{
      ...styles.container, justifyContent: 'center',
      alignItems: 'center'
    }} behavior="padding">
      <Image source={image} style={styles.image}></Image>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Enter your Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={{ ...styles.buttonContainer, flexDirection: 'row' }}>
        <TouchableOpacity onPress={handleSignup} style={{ ...styles.button, marginRight: 80, }}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
          <Text style={{ ...styles.buttonText, fontSize: 15 }}>Login Instead</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const DashboardScreen = () => {



  const { darkTheme } = useContext(NewsContext)
  return (
    <View style={{
      ...styles.container,
      backgroundColor: darkTheme ? "#282C35" : 'white'
    }}>
      <Home />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  inputContainer: {
    width: '75%'
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingBottom: 8,
    marginHorizontal: 5,
    borderBottomColor: '#007FFF',
    borderBottomWidth: 5,
    alignSelf: 'center',
    borderRadius: 10,
  },
  image: {
    // flex: 1,
    justifyContent: "center",
    width: 250,
    height: 250,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    backgroundColor: '#0785F8',
    width: '40%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15
  },

});


export default () => {
  return (
    <Context>
      <App />
    </Context>
  );
}