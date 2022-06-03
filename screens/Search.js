import { View, Text,TextInput, StyleSheet, TouchableOpacity, Modal} from 'react-native'
import React, { useContext, useState } from 'react'
import { NewsContext } from '../API/Context'
import { MaterialIcons } from '@expo/vector-icons';
import SingleNews from './SingleNews';


const Search = () => {

    const {news: {articles}, darkTheme, setDarkTheme} = useContext(NewsContext);

    const [searchResults, setSearchResults] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentNews, setCurrentNews] = useState();

    const handleSearch = (text)=>{
        if(!text){
            setSearchResults([]);
            return;
        }
        setSearchResults(articles.filter((query)=> query.title.includes(text)))
    }

    const handleModal = (news)=>{
        setModalVisible(true);
        setCurrentNews(news);
    }

  return (
    <View style={{width:'80%', position:'relative' }}>
        <TextInput style={{...styles.searchBar,
        backgroundColor: darkTheme ? "black": 'lightgrey',
        color: darkTheme ? "white": 'black',
         }} 
         onChangeText={(text)=>handleSearch(text)}
         placeholder='Search for your news'
         placeholderTextColor={darkTheme ? "white": 'black'}
          />
      
      <View style={styles.searchResults}>
          {
              searchResults.slice(0,10).map((news)=>(
                  <TouchableOpacity
                  key={news.title} 
                  activeOpacity= {0.7}
                  onPress={()=> handleModal(news)}
                  >
                      <Text style={{...styles.singleResult, 
                        backgroundColor: darkTheme ? "black": 'lightgrey',
                        color: darkTheme ? "white": 'black',
                    }}>
                        {news.title}
                    </Text>
                  </TouchableOpacity>
              ))
          }
      </View>

      <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={()=>{
          setModalVisible(!modalVisible);
      }}
      >
          <TouchableOpacity
          onPress={()=> setModalVisible(!modalVisible)}

          style={{
              position:'absolute',
              zIndex:2,
              right:0,
              margin:20,
          }}
          >
              <MaterialIcons name="cancel" size={24} color="#fa6d0f" />
          </TouchableOpacity>
          <View style={{
              height:'100%',
              transform: [{scaleY:-1}],
          }}>
              <SingleNews item={currentNews}  />
          </View>
      </Modal>
    </View>
  )
}
const styles= StyleSheet.create({
    searchBar:{
        paddingVertical:10,
        paddingHorizontal: 15,
        borderRadius: 10,
        fontSize: 15,
        marginBottom: 15,
    }, 
    searchResults:{
        position: 'absolute',
        zIndex: 1,
        top: 50,
    }, 
    singleResult:{
        borderRadius: 5,
        padding: 10,
        margin:0.5,
        shadowColor: 'black',
        elevation: 5,
    }
});

export default Search