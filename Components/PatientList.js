import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function PatientList({ patients }) {
  return (
    <FlatList
      data={patients}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.age}>{item.age} years</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: { padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 },
  name: { fontSize: 18 },
  age: { color: '#555' }
});
