export type ResourceAssetKind =
  | "prefab"
  | "sprite-frame"
  | "audio"
  | "effect"
  | "timeline"
  | "json"
  | "material"
  | "ui-prefab";

export type PrefabResourceId = `prefab:${string}`;
export type SpriteFrameResourceId = `sprite-frame:${string}`;
export type AudioResourceId = `audio:${string}`;
export type EffectResourceId = `effect:${string}`;
export type TimelineResourceId = `timeline:${string}`;
export type JsonResourceId = `json:${string}`;
export type MaterialResourceId = `material:${string}`;
export type UiPrefabResourceId = `ui-prefab:${string}`;

export type ResourceId =
  | PrefabResourceId
  | SpriteFrameResourceId
  | AudioResourceId
  | EffectResourceId
  | TimelineResourceId
  | JsonResourceId
  | MaterialResourceId
  | UiPrefabResourceId;

export const ResourceIds = {
  prefab(name: string): PrefabResourceId {
    return `prefab:${name}`;
  },
  spriteFrame(name: string): SpriteFrameResourceId {
    return `sprite-frame:${name}`;
  },
  audio(name: string): AudioResourceId {
    return `audio:${name}`;
  },
  effect(name: string): EffectResourceId {
    return `effect:${name}`;
  },
  timeline(name: string): TimelineResourceId {
    return `timeline:${name}`;
  },
  json(name: string): JsonResourceId {
    return `json:${name}`;
  },
  material(name: string): MaterialResourceId {
    return `material:${name}`;
  },
  uiPrefab(name: string): UiPrefabResourceId {
    return `ui-prefab:${name}`;
  },
} as const;

export function isResourceId(value: string): value is ResourceId {
  return value.includes(":");
}
