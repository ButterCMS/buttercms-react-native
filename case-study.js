import React from 'react'
import { Text, ScrollView,StyleSheet,Image,Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import butter from './butter-client'
import { TouchableOpacity } from 'react-native-gesture-handler'
import HTMLView from 'react-native-htmlview';
export default class CaseStudy extends React.Component {
   state = {
      data: ''
   }
   async componentDidMount() {
      const resp = await butter.page.list('customer_case_study')
      this.setState(resp.data)
      console.log(resp.data);
   }
   render() {
      const { data } = this.state
      const goToHome = () => {
         Actions.home()
      }
      if (data) {
         return (
            <ScrollView style={{padding:20}}>
               {data.map(page =>
                  <ScrollView style={styles.post} key={page.slug}>
                     <Text style={styles.heading}>{page.fields.seo_title}</Text>
                     <Image style={styles.logo} source={{ uri: page.fields.customer_logo }} />
                     <HTMLView value={page.fields.testimonial}></HTMLView>
                  </ScrollView>
               )}
               <TouchableOpacity style={styles.button}>
                  <Button title="Back to Home" onPress={goToHome}></Button>
               </TouchableOpacity>

            </ScrollView>

         )
      } else {
         return (
            <ScrollView>
               <Text>Loading..</Text>
            </ScrollView>
         )
      }

   }
}
const styles = StyleSheet.create({
   post:{
      borderWidth:'1px',
      borderStyle:'solid',
      borderColor:'black',
      padding:20
   },
   vertical: {
      flex: 1,
      flexDirection: 'column',
      alignItems: "center",
      justifyContent: "center"
   },
   heading: {
      fontSize: '2em',
      fontFamily: 'Georgia',
      color: '#333333',
      paddingTop: '10px'
   },
   logo: {
      width: '90vw',
      height: '150px',
      alignItems:"center",
      flex:1,
      flexDirection:"column",
      justifyContent:"center"
   },
   content: {
      height:'100px',
      width:'100%'
   }
})