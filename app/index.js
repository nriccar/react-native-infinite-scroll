import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Dimensions
} from 'react-native'

import styles from './styles'

import axios from 'axios'

const App = () => {
  const [data, setData] = useState([])
  const [size, setSize] = useState(20)

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then(res => setData(res.data.results))
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, height: Dimensions.get('window').height }}>
      <FlatList
        keyExtractor={item => item.name.toString()}
        data={data}
        numColumns={2}
        renderItem={({ item, index }) =>
          index < size &&
          <View style={styles.box}>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                #{index}
              </Text>
            </View>
            <Text style={styles.text}>
              {item.name}
            </Text>
          </View>}
        onScroll={({
          nativeEvent: { contentOffset, contentSize, layoutMeasurement }
        }) =>
          contentOffset.y >= contentSize.height - layoutMeasurement.height &&
          setSize(size + 20)}
        ListFooterComponent={() =>
          size < 100 &&
          <ActivityIndicator color="black" style={{ margin: 15 }} />}
      />
    </SafeAreaView>
  )
}

export default App
