import React from 'react'
import { Text, ScrollView, StyleSheet, Image, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import butter from './butter-client'
import { TouchableOpacity } from 'react-native-gesture-handler'
import HTMLView from 'react-native-htmlview';
export default class Post extends React.Component {
    state = {
        data: ''
    }
    async componentDidMount() {
        const { slug } = this.props;
        const resp = await butter.post.retrieve(slug)
        console.log('New State: ',resp.data);
        this.setState(resp.data)
    }
    render() {
        const post = this.state.data
        const goToHome = () => {
            Actions.home()
        }
        if (post) {
            return (
                <ScrollView style={{ padding: 20 }}>
                    <Text style={styles.heading}>{post.title}</Text>
                    <HTMLView value={post.body} ></HTMLView>
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
        alignItems: "center",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center"
    },
    content: {
        height: '100px',
        width: '100%'
    }
})