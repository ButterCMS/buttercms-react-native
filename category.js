import React from 'react'
import { Text, ScrollView, StyleSheet, Image, Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import butter from './butter-client'
import { TouchableOpacity } from 'react-native-gesture-handler'
import HTMLView from 'react-native-htmlview';
export default class Category extends React.Component {
    state = {
        data: ''
    }
    receivedSlug = false;
    async componentDidMount() {
        const { slug } = this.props;
        let resp = {};
        console.log('Slug: ', slug);
        if (slug != undefined) {
            resp = await butter.category.retrieve(slug, {
                include: 'recent_posts'
            });
            this.receivedSlug = true;
        } else {
            resp = await butter.category.list()
        }
        this.setState(resp.data)
        console.log(resp.data);
    }
    
    render() {
        const { data } = this.state
        const goToHome = () => {
            Actions.home()
        }
        const goToCategory = (slug) => {
            Actions.category({ slug: slug });
        }
        const goToPost = (post)=>{
            Actions.post({slug:post});
        }
        if (data) {
            if (this.receivedSlug) {
                return (
                    <ScrollView style={{ backgroundColor: '#eeeeee' }}>
                        <Text style={styles.heading}>Posts</Text>
                        {data.recent_posts.map(post =>
                            <TouchableOpacity style={styles.post} key={post.slug} onPress={() => goToPost(post.slug)}>
                                <Text style={styles.heading}>{post.title}</Text>
                                <Image style={styles.logo} source={{ uri: post.featured_image }} />
                                <HTMLView value={post.summary}></HTMLView>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity style={styles.button}>
                            <Button title="Back to Home" onPress={goToHome}></Button>
                        </TouchableOpacity>

                    </ScrollView>
                )
            } else {
                return (
                    <ScrollView style={{ padding: 20, backgroundColor: '#eeeeee' }}>
                        <Text style={styles.heading}>Categories</Text>
                        {data.map(category =>
                            <TouchableOpacity style={styles.post} key={category.slug} onPress={() => goToCategory(category.slug)}>
                                <Text style={styles.heading}>{category.name}</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity style={styles.button}>
                            <Button title="Back to Home" onPress={goToHome}></Button>
                        </TouchableOpacity>

                    </ScrollView>

                )
            }

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
    post: {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'black',
        padding: 20,
        margin: 20
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
        width: '80%'
    }
})