import { TreePosition } from '../types/forest';

export function generateTreePositions(count: number): TreePosition[] {
  const positions: TreePosition[] = [];
  
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 5 + Math.random() * 25; // Distribute trees in a circle
    
    positions.push({
      position: [
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      ] as [number, number, number],
      scale: [
        1 + Math.random() * 0.5,
        1 + Math.random() * 0.5,
        1 + Math.random() * 0.5
      ] as [number, number, number],
      rotation: [0, Math.random() * Math.PI * 2, 0] as [number, number, number],
      pulsePhase: Math.random() * Math.PI * 2
    });
  }
  
  return positions;
}