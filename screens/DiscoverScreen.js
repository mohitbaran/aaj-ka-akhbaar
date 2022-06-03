import React,{useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, TextInput} from 'react-native';
import { NewsContext } from '../API/Context';
import { categories, sources } from '../API/api';
import Carousel from 'react-native-snap-carousel';
import Search from './Search';
import Weather_Result from '../components/Weather_Result';


const windowWidth= Dimensions.get('window').width;
const slide_Width= Math.round(windowWidth/3.5);

const DiscoverScreen = () => {

  const {setCategory,setSource, darkTheme, setDarkTheme} = useContext(NewsContext); 
  
  return (
    <View style={styles.discover}>
      {/* search */}
      <Search />

      {/* categories */}
      <Text style={{...styles.subtitle, color: darkTheme ? "white": 'black'}}>CATEGORIES</Text>
      


      <Carousel 
      layout={'default'}
      data={categories}
      renderItem={
        ({item,index}) => (
          <TouchableOpacity style={styles.categories}
          onPress={()=>setCategory(item.name)}>
            <Image source={{uri: item.pic}} style={styles.categoryImage} />
            <Text style={{...styles.name, color: darkTheme ? "white": 'black'}} >{item.name}</Text>
          </TouchableOpacity>
        )}
        sliderWidth={windowWidth}
        itemWidth={slide_Width}
        activeSlideAlignment={'start'}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
       />

      {/* sources */}
      <Text style={{...styles.subtitle, color: darkTheme ? "white": 'black'}}>SOURCES</Text>
      
      
      <View style={styles.sources}>
        {sources.map((source) => (
          <TouchableOpacity
            onPress={() => setSource(source.id)}
            key={source.id}
            style={styles.sourceContainer}
          >
            <Image source={{ uri: source.pic }} style={styles.SourceImage} />
          </TouchableOpacity>
        ))}
        </View>
    
        {/* weather */}
          
          <Text style={{...styles.subtitle,color: darkTheme ? "white": 'black'}}>Weather</Text>
          <View>
            <Weather_Result />
          </View>
         
    </View>
  );
};

const styles=StyleSheet.create({
  discover:{
    padding:10,
    alignItems: 'center',
  },
  subtitle:{
    fontSize: 20,
    fontWeight:'bold',
    paddingBottom: 8,
    marginHorizontal: 5,
    borderBottomColor: '#007FFF',
    borderBottomWidth: 5,
    alignSelf: 'flex-start',
    borderRadius: 10,
  },
  button:{
    backgroundColor:'#0785F8',
    width:'60%',
    padding:15,
    borderRadius:12,
    alignItems: 'center',
    marginTop:10
  },
  categoryImage:{
    height:'60%',
    width: '100%',
    resizeMode: 'contain',
  },
  categories:{
    height: 130,
    margin: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  SourceImage:{
    height: 55,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  sources:{
    flexDirection:'row',
    justifyContent:'space-around',
    paddingVertical: 15,
  },
  sourceContainer:{
    height: 55,
    width: '22%',
    borderRadius: 10,
    margin: 8,
    backgroundColor: '#cc313d',
  }
}
);

export default DiscoverScreen;
