import React from 'react'
import { Text,View,StyleSheet,Image,Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import butter from './butter-client'
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class Home extends React.Component {
   state = {
      data: ''
   }
   async componentDidMount() {
      const resp = await butter.page.retrieve('*', 'home')
      console.log(resp.data);
      this.setState(resp.data)
   }
   render() {
      const { fields } = this.state.data
      const goToAbout = () => {
         Actions.about()
      }
      const goToBlog = () => {
         Actions.blog()
      }
      if (fields) {
         return (
         <View>
            <Text style={styles.heading}>{fields.headline}</Text>
            <Image style={styles.heroimage} source={{uri: fields.hero_image}}></Image>
            <View style={styles.horizontal}>
            <TouchableOpacity style={styles.button}>
            <Button title={fields.call_to_action} onPress={goToAbout}></Button>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
            <Button title="Blog" onPress={goToBlog}></Button>
            </TouchableOpacity>
            </View>
         </View>

         )
      } else {
         return (
            <View>
               <Text>Loading..</Text>
            </View>
         )
      }
   }
}
const styles=StyleSheet.create({
   horizontal:{
      flex:1,
      flexDirection:'row',
      alignItems:"center",
      justifyContent:"center"
   },
   heading: {
      fontSize:'2em',
      fontFamily:'Georgia',
      color: '#333333',
      paddingTop:'10px'
   },
   heroimage:{
      width:'100%',
      height:'150px',
      padding: '20px'
   },
   button:{
      margin:20
   }
})