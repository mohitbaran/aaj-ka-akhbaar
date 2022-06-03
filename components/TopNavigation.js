import { MaterialCommunityIcons, SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NewsContext } from '../API/Context';
import { useNavigation } from '@react-navigation/native';
import { initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAuzuSGNwnsyxjWfTimsF8oK5ZHC1wD2gU",
  authDomain: "appnews-6e353.firebaseapp.com",
  projectId: "appnews-6e353",
  storageBucket: "appnews-6e353.appspot.com",
  messagingSenderId: "75072233279",
  appId: "1:75072233279:web:74b006aa21c0b4b5907d8a"
};

initializeApp(firebaseConfig);

const auth=getAuth()

const TopNavigation = ({index,setIndex}) => {

  const {fetchNews, darkTheme, setDarkTheme} = useContext(NewsContext);
  const navigation = useNavigation();
  const handleLogout=()=>{
    auth.signOut()
        .then(()=>{
          navigation.navigate('Login');
        })
        .catch(error=>alert(error.message))
  }
  
  return (
    <View style={{...styles.container, backgroundColor: darkTheme ? '#282c35': 'white'}}>
      {index === 0 ?(
        <View style={{flexDirection:'row'}}>
           <TouchableOpacity
      style={{alignItems:'flex-start', flexDirection:'row'}}
      onPress={handleLogout}
      >
        <MaterialCommunityIcons name="logout" size={24} color="#de3e1b" />
      </TouchableOpacity>
<Text>   </Text>
        <TouchableOpacity  style={styles.left}
        onPress={()=> setDarkTheme(!darkTheme)}
        >
          <Text  style={{...styles.text, color: darkTheme ? "lightgrey" : "black"} }>
            <MaterialCommunityIcons
            name="theme-light-dark"
            size={24}
            color='#007FFF'
            />
          </Text>
        </TouchableOpacity> 
        </View> ): (
        <TouchableOpacity style={styles.left}
          onPress={()=> setIndex(index === 0 ? 1:0)}
        >
          <SimpleLineIcons name='arrow-left' size={15} color='#007FFF' />
            <Text style={ {...styles.text, color: darkTheme ? "lightgrey": 'black' }} >Discover</Text>
          </TouchableOpacity>)
      } 

      <Text style={{...styles.center, color: darkTheme ? "white": 'black'}}>
        {index ? "All News" : "Discover"}
      </Text>

      {index ?(
        <TouchableOpacity
        style={styles.right}
        onPress={()=> fetchNews("general")}
        >
          <Text style={styles.text}>
            <AntDesign name='reload1' size={24} color='#007FFF' />
          </Text>
        </TouchableOpacity>
      ):(
        <TouchableOpacity
        style={styles.left}
        onPress={()=> setIndex(index === 0 ? 1:0)}
        >
          <Text style={{...styles.text, color: darkTheme ? "white": 'black'}}>All News</Text>
          <SimpleLineIcons name='arrow-right' size={15} color='#007FFF' />
        </TouchableOpacity>
      )
      }
    </View>
  );
};

const styles=StyleSheet.create({
  container:{
    flexDirection:'row',
    justifyContent: 'space-between',
    padding: 8,
    alignItems: 'center',
    borderBottomColor: 'black', 
    borderBottomWidth: 0.8,
  }, 
  left:{
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
  
  },
  center:{
    paddingBottom: 6,
    borderBottomColor: '#007FFF',
    borderBottomWidth: 5,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: '700',
  },
  right:{
    width:80,
    alignItems: 'flex-end',
  },
  text:{
    fontSize:20,
  }, 
 
})

export default TopNavigation;
