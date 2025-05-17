import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MarkerData, MarkerImage } from '../../types';
import ImageList from '../../components/ImageList';
import { useMarkers } from '../../context/MarkersContext';

export default function MarkerDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  // const [marker, setMarker] = useState<MarkerData | null>(null);
  const { markers, updateMarker } = useMarkers();

  const marker = markers.find((m) => m.id === id);

  const addImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!result.canceled && result.assets.length > 0) {
        const newImage: MarkerImage = { uri: result.assets[0].uri };
        const updatedImages = [...(marker?.images ?? []), newImage];
        updateMarker(id, { images: updatedImages });
      }
    } catch (err) {
      Alert.alert('Ошибка', 'Не удалось выбрать изображение');
    }
  };

  const deleteImage = (uri: string) => {
    const updated = marker?.images?.filter((img) => img.uri !== uri) ?? [];
    updateMarker(id!, { images: updated });
  };

  if (!marker) return <Text>Маркер не найден</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Координаты:</Text>
      <Text style={styles.coords}>
        {marker.coordinate.latitude}, {marker.coordinate.longitude}
      </Text>
      <Button title="Добавить изображение" onPress={addImage} />
      <ImageList images={marker.images} onDelete={deleteImage} />
      <Button title="Назад к карте" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  coords: {
    marginBottom: 16,
  },
});