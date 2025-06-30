import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Switch, Text } from 'react-native';
import * as DB from './db';
import AddPatient from './components/AddPatient';
import PatientList from './components/PatientList';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [patients, setPatients] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    DB.initDB();
    loadPatients();
    loadSettings();
  }, []);

  function loadPatients() {
    DB.fetchPatients(setPatients);
  }

  async function loadSettings() {
    const mode = await AsyncStorage.getItem('darkMode');
    if (mode !== null) setDarkMode(mode === 'true');
  }

  async function toggleDarkMode(val) {
    setDarkMode(val);
    await AsyncStorage.setItem('darkMode', val.toString());
  }

  return (
    <View style={[styles.container, darkMode && styles.dark]}>
      <View style={styles.settingsRow}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>

      <AddPatient onAdd={loadPatients} />
      <PatientList patients={patients} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#eef' },
  dark: { backgroundColor: '#333' },
  settingsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  label: { fontSize: 18, color: '#444' }
});
