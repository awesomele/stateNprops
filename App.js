/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

/**
  Todo:
    1. add props and state
        - propTypes and defaultProps
    2. use proprs and state
    3. add a function as props (todo)
    4. add an object as props (todo)
    5. use redux.
 */

import React, {Component} from 'react';
import {StyleSheet, ScrollView, Button} from 'react-native';
import {Personinfo} from './Personinfo';

export default class App extends Component {
  render() {
    return (
     <ScrollView>
        <Personinfo isStillAlive={true}/>
        <Personinfo name='Confucius' initialAge={10} isStillAlive={true} imageUrl={require('./images/confucius.jpg')}/>
        <Personinfo name='Thanos' initialAge={20} isStillAlive={true} imageUrl={require('./images/thanos.png')} />
        <Personinfo name='Deadpool' initialAge={30} isStillAlive={false} imageUrl={require('./images/deadpool.png')}/>
        <Personinfo name='GI Joe' initialAge={60} isStillAlive={true} imageUrl={require('./images/joe.png')}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

});
