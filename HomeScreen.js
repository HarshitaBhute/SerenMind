import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import MoodCheckin from '../components/MoodCheckin';

export default function HomeScreen() {
  const [prompt, setPrompt] = useState(null);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>🌤️ Today's Mood</Text>
      <MoodCheckin onPrompt={(text) => setPrompt(text)} />
      {prompt && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>✨ Journaling Prompt:</Text>
          <Text>{prompt}</Text>
        </View>
      )}
    </View>
  );
}
