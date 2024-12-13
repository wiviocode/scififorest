export interface DeviceOrientation {
  alpha: number | null;
  beta: number | null;
}

export interface DeviceMotion {
  acceleration: {
    x: number | null;
    y: number | null;
    z: number | null;
  };
}

export interface Location {
  latitude: number | null;
  longitude: number | null;
}