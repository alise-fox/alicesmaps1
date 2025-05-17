// import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useMarkers } from '../context/MarkersContext';
import { MarkerData } from '../types';
import Map from '../components/Map';

export default function HomeScreen() {
  // const [markers, addMarkers] = useState<MarkerData[]>([]);
  const { markers, addMarker } = useMarkers();

  const handleAddMarker = (coordinate: { latitude: number; longitude: number }) => {
    const newMarker: MarkerData = {
      id: Date.now().toString(),
      coordinate,
      images: [],
    };
    addMarker(newMarker);
  };

  return (
    <View style={styles.container}>
      <Map markers={markers} onAddMarker={handleAddMarker} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});