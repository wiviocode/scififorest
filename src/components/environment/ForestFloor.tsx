import { TerrainMesh } from './ground/TerrainMesh';
import { GlowingPlants } from './ground/GlowingPlants';

export function ForestFloor() {
  return (
    <group>
      <TerrainMesh />
      <GlowingPlants />
    </group>
  );
}