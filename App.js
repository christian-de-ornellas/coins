import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, StyleSheet, FlatList} from 'react-native';

const App = () => {
  const [coins, setCoins] = useState([]);

  const fetchCoins = async () => {
    let coinsData = [];
    const data = await fetch(
      'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL',
    );
    const json = await data.json();

    coinsData.push(json.USDBRL);
    coinsData.push(json.EURBRL);
    coinsData.push(json.BTCBRL);

    setCoins(coinsData);
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.coin}>
        <Text style={styles.coinText}>
          {item.name}: {item.low}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={coins}
        renderItem={renderItem}
        keyExtractor={item => item.bid}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  coin: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#6c5ce7',
    borderRadius: 10,
    marginBottom: 10,
  },
  coinText: {fontSize: 14, color: '#fff'},
});
