# buttercms-react-native
React Native starter project integrated with ButterCMS

## Install

Add [ButterCMS NPM module](https://www.npmjs.com/package/buttercms) as a dependency to your existing React native project.

If you plan to use this project directly, simply execute below commands to get going:
```bash
npm i
npm run start
```
These commands will install the required dependencies for the project and start it using the Expo CLI. 

## Quickstart

Add you API token to `butter-client.js` file:
```properties
# ...
const butter = Butter('<your key>')
# ...
```

Import ButterCMS client in your JS/TS file:

```javascript
import Butter from 'buttercms'

const butter = Butter('<your key>')

export default butter
```

You can then test ButterCMS client by, for example, fetching all of your posts:
```java
butter.post.list({page:1, page_size: 10});
```
This will fetch you upto 10 blog posts that you would have stored in your ButterCMS account

## Pages

### Get single page

With your homepage defined, the ButterCMS Pages API will return it in JSON format like this:
```json
{
  "data":{
    "slug": "home",
    "page_type": null,
    "fields": {
      "seo_title": "Marvellous React Native page powered by ButterCMS",
      "headline": "Marvellous React Native page powered by ButterCMS",
      "hero_image": "https://cdn.buttercms.com/WjJXN3B6ThWJpucfZM9P",
      "call_to_action": "Know more",
      "customer_logo": "https://cdn.buttercms.com/PTEqdDBReOq0X08W43sA"
    }
  }
}
```

To integrate this into your app, simply make a call to ButterCMS APIs using the ButterCMS client. Place this call in the `componentDidMount` hook:

`home.js`

```javascript
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
```
## Get all page content of specific type. For instance, customers for the case study

`customers.js`

```javascript
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
```
 

## Blog Engine

### Display posts

To display posts we create a simple /blog route in our app and fetch blog posts from the Butter API. See our [API reference](https://buttercms.com/docs/api/) for additional options such as filtering by category or author. The response also includes some metadata we'll use for pagination.

To retrieve the blog posts using ButterCMS client, you can use the function `butter.post.list({})`

`bloghome.js`

```javascript
import React from 'react'
import { Text, ScrollView,StyleSheet,Image,Button } from 'react-native'
import { Actions } from 'react-native-router-flux'
import butter from './butter-client'
import { TouchableOpacity } from 'react-native-gesture-handler'
import HTMLView from 'react-native-htmlview';
export default class Blog extends React.Component {
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
```
To display a complete post, you can use the `butter.post.retrieve(<url>)` method. See a full list of available post properties in our [API reference](https://buttercms.com/docs/api/). 

`blogpost.js`

```javascript
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
```

### Categories, Tags, and Authors

Use Butter's APIs for categories, tags, and authors to feature and filter content on your blog:

### Categories

`category.js`

```javascript
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
            resp = await butter.post.list({
                category_slug: slug
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
```
