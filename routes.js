import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import {StyleSheet} from 'react-native'
import Home from './home.js'
import CaseStudy from './case-study'
import Blog from './blog.js'
import Post from './post.js'
import Category from './category.js'
export default class Routes extends React.Component {
   render() {
      return (
         <Router>
            <Scene key="root" style={styles.mainview}>
               <Scene key="home" component={Home} title="Home" initial={true} />
               <Scene key="about" component={CaseStudy} title="Case Study" />
               <Scene key="blog" component={Blog} title="Blog"/>
               <Scene key="category" component={Category} title="Categories"/>
               <Scene key="post" component={Post} title="Post"/>
               
            </Scene>
            
         </Router>
      )
   }
}
const styles = StyleSheet.create({
   mainview:{
      height:'80vh'
   }
})