// app/_layout.tsx
import { Slot } from 'expo-router';
import { MarkersProvider } from '../context/MarkersContext';

export default function Layout() {
  return (
    <MarkersProvider>
      <Slot />
    </MarkersProvider>
  );
}