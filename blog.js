import React from 'react'
import { Text, ScrollView,StyleSheet,Image,Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import butter from './butter-client'
import { TouchableOpacity } from 'react-native-gesture-handler'
import HTMLView from 'react-native-htmlview';
export default class About extends React.Component {
    state = {
        data: ''
     }
    async componentDidMount() {
        const { match } = this.props;
        let page = (match && match.params.page) || 1;
        const resp = await butter.post.list({ page: page, page_size: 10 })
        this.setState(resp.data)
        console.log(resp.data);
    }
    render() {
        const { data } = this.state
        const goToHome = () => {
            Actions.home()
        }
        const goToPost = (post)=>{
            Actions.post({slug:post});
        }
        const goToCategories=()=>{
            Actions.category();
        }
        if (data) {
            return (
                <ScrollView style={{ padding: 20,backgroundColor:'#eeeeee' }}>
                    {data.map(post =>
                        <TouchableOpacity style={styles.post} key={post.slug} onPress={()=>goToPost(post.url)}>
                            <Text style={styles.heading}>{post.title}</Text>
                            <Image style={styles.logo} source={{ uri: post.featured_image }} />
                            <HTMLView value={post.summary}></HTMLView>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={styles.button}>
                        <Button title="Back to Home" onPress={goToHome}></Button>
                        <Button title="All categories" onPress={goToCategories}></Button>
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
       padding:20,
       margin:20
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