export type DevicePerformanceTier = "low" | "mid" | "high" | "ultra";

export interface DevicePerformanceSnapshot {
  readonly deviceModel: string;
  readonly memoryMb: number;
  readonly cpuScore: number;
  readonly gpuScore: number;
}

export class DevicePerformanceTierPolicy {
  public classify(snapshot: DevicePerformanceSnapshot): DevicePerformanceTier {
    const blendedScore = snapshot.cpuScore * 0.5 + snapshot.gpuScore * 0.5;

    if (snapshot.memoryMb >= 8192 && blendedScore >= 900) {
      return "ultra";
    }

    if (snapshot.memoryMb >= 6144 && blendedScore >= 700) {
      return "high";
    }

    if (snapshot.memoryMb >= 4096 && blendedScore >= 450) {
      return "mid";
    }

    return "low";
  }
}
