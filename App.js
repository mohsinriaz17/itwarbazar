import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Nav } from "./src/nav/navigation";
import { Provider } from 'react-redux';
import store from './src/store';

export default class App extends React.Component {
  render() {
    return (
	<Provider store={store}>
       <Nav />
	</Provider>
    );
  }
}