# Map Space Model

## 1. Purpose

Use this file before designing map space, Cocos scene layout, camera behavior, map points, route data, grid data, room data, region data, or minimap rules.

This is a universal map-space model. It is not a concrete map design and not a game-type example.

## 2. Core principle

There is no universal map layout that fits every game.

A map is not only background art.
A map is a gameplay space contract between:

- viewport
- world space
- camera
- route
- region
- point
- trigger
- collision
- objective
- interaction
- visual layer
- runtime binding

The gameplay space layer and the visual art layer must be separated.

For 16:9 games, design map space from visible viewport first, then decide whether the world is:

- fixed-screen
- scrollable
- room-based
- region-based
- endless
- node-based
- grid-based
- path/lane-based

Do not treat a 1280x720 background image as a complete map system.

## 3. Universal map vocabulary

- Viewport: the visible player-facing screen area.
- World Space: the coordinate space where gameplay objects, map points, routes, regions, and collision live.
- Camera Window: the part of world space currently framed by the camera.
- Playable Area: the valid gameplay area where player action can occur.
- Dead Area: world space that may exist visually but does not support gameplay.
- Safe UI Area: screen area reserved for HUD, touch controls, overlays, and platform-safe margins.
- Map Layer: a named logical layer of the map contract.
- Collision Layer: blocking or passability rules used by movement, placement, targeting, or navigation.
- Route: an ordered traversal definition.
- Lane: a constrained route channel with shared movement or targeting semantics.
- Path: a geometric or graph path used by movement, spawning, or guidance.
- Node: a graph point used by node maps, routes, navigation, or unlock chains.
- Grid Cell: a logical grid coordinate used for tactics, puzzles, placement, or tile rules.
- Tile: a visual or logical unit in a tile-based map.
- Room: a bounded playable space with entry, exit, and local rules.
- Region: a larger named world area that may contain rooms, paths, gates, objectives, or reveal state.
- Area: a named subspace used for gameplay rules, UI labels, spawn scope, or navigation.
- Gate: a transition, blocker, lock, door, or progression boundary between spaces.
- Spawn Point: a runtime location where actors or objects enter the map.
- Player Start: the initial player spawn or entry point.
- Objective Point: a location tied to mission, quest, collection, defense, delivery, or interaction goals.
- Trigger Zone: a bounded area that emits runtime events when conditions are met.
- Interaction Zone: a bounded area where player input can target an object, NPC, clue, resource, or device.
- Camera Anchor: a marker or rule target that influences camera framing.
- MiniMap Projection: the mapping from world, room, route, grid, or graph space to UI map space.
- Reveal State: whether an area, room, node, route, or marker is hidden, discovered, revealed, or completed.
- Runtime Map Binding: the runtime connection between authored data, scene nodes, and gameplay systems.

## 4. Viewport vs world space

Viewport is screen-facing. World Space is gameplay-facing.

A fixed-screen game may keep Viewport and World Space nearly identical. A scrolling, room-based, region-based, endless, graph, grid, or lane game must define how the Viewport observes a larger World Space.

Design order:

1. define the visible Viewport and Safe UI Area
2. define the Playable Area
3. define whether the World Space is the same size, larger, segmented, generated, graphed, or tiled
4. define the Camera Window rule
5. define the gameplay layers and runtime binding

## 5. Map scale and playable area

Map scale defines how authored positions become gameplay meaning.

Every map design should state:

- viewport resolution and aspect assumption
- world bounds or segmentation rule
- Playable Area bounds
- Dead Area purpose
- safe UI overlap rule
- coordinate origin and unit convention
- whether movement is free, constrained, graph-based, grid-based, lane-based, or room-based

## 6. Camera rule

Camera rule must be selected from the map model, not guessed from art size.

Common camera rules:

- fixed camera
- target follow
- bounded follow
- room snap
- region anchor
- lane scroll
- endless forward window
- tactical board fit
- node graph pan/zoom

The camera must not hide required objectives, interaction zones, route entrances, or critical blockers.

## 7. Map layers

A map can include these layers:

- Gameplay Space Layer
- Visual Art Layer
- Collision Layer
- Interaction Zone Layer
- Spawn / Objective / Trigger Point Layer
- Route / Lane / Path Layer
- Region / Area / Room Layer
- Grid / Tile / Coordinate Layer
- Camera Anchor Layer
- MiniMap Projection Layer

Only load or build layers required by the selected map model.

## 8. Gameplay space layer

The Gameplay Space Layer owns playable coordinates, valid movement areas, objective placement, route shape, interaction scope, and runtime map meaning.

It must be testable without final art.

## 9. Visual art layer

The Visual Art Layer presents the map.

It may include backgrounds, tiles, sprites, parallax, props, lighting, and decorations. It must not be the only source of route, collision, spawn, objective, gate, or trigger truth.

## 10. Collision / blocking layer

Collision and blocking rules must be explicit when movement, placement, projectile travel, line of sight, or pathing depends on them.

Collision may be implemented through physics colliders, logical masks, grid flags, route blockers, room gates, region locks, or generated chunks depending on the map model.

## 11. Interaction zone layer

Interaction zones define where input becomes meaningful gameplay intent.

Use them for NPC talk ranges, clue inspection, pickups, switches, doors, delivery targets, puzzle devices, contextual prompts, or point-and-click hotspots.

## 12. Spawn / objective / trigger point layer

Spawn, objective, and trigger points are logical map contracts.

They should have stable ids when referenced by config, quests, waves, rooms, routes, or runtime systems.

## 13. Route / lane / path layer

Routes, lanes, and paths define constrained traversal.

Use this layer for enemy travel, convoy movement, runner rhythm, lane combat, escort paths, navigation hints, path reveals, and scripted movement.

## 14. Region / area / room layer

Regions, areas, and rooms define named gameplay spaces.

Use this layer when progression, reveal, navigation, enemy pools, puzzle state, quest logic, or camera rules change by location.

## 15. Grid / tile / coordinate layer

Grid, tile, and coordinate rules define discrete space.

Use this layer when placement, movement, adjacency, rotation, pathfinding, board state, puzzle state, or tactical targeting depends on cells or tiles.

## 16. Runtime binding rule

Runtime Map Binding connects:

- selected map model
- authored map data
- Cocos scene nodes
- point and zone components
- camera rules
- collision or grid data
- minimap or navigation projection
- objective, spawn, route, room, or region systems

Do not bind runtime gameplay directly to decorative node names or background sprite dimensions.

## 17. Cocos Creator 3.8.8 node structure

Use a structure like this only when the selected map model needs it:

```text
Canvas
  SafeUI
    HUD
    MiniMapRoot

WorldRoot
  GameplaySpace
    MapBounds
    Points
    Routes
    Regions
    Rooms
    Grid
    InteractionZones
    Collision
  VisualSpace
    Background
    TileArt
    Props
    Effects
  CameraAnchors
  RuntimeBindings
```

For simple Fixed Screen Map or simple Narrative Scene Map work, reduce this structure instead of creating unused systems.

## 18. Map model selection handoff

Before concrete scene layout, load [architecture/map-model-router.md](map-model-router.md).

After selection:

- use this file for map space contract
- use [architecture/minimap-navigation-model.md](minimap-navigation-model.md) only when minimap or navigation might be needed
- use [architecture/level-data-models.md](level-data-models.md) for level content model
- use [architecture/level-config-schemas.md](level-config-schemas.md) for data schema boundaries
- use [architecture/level-system.md](level-system.md) for runtime system boundaries

## 19. Forbidden patterns

- Treating one background image as the whole map system.
- Designing a concrete map before choosing the map model.
- Mixing gameplay collision, visual art, route, point, and objective truth into one decorative layer.
- Adding minimap by default.
- Assuming every game needs a large world map.
- Assuming every 16:9 game is a fixed 1280x720 map.
- Binding gameplay to unstable scene hierarchy names instead of explicit ids.
- Adding route, grid, room, region, and minimap systems when the first MVP needs only one or two of them.

## 20. Review questions

- What game type and gameplay space are being served?
- Which map model was selected before scene design?
- Is the Viewport separate from World Space when needed?
- Is gameplay space separated from visual art?
- What is the Camera Window rule?
- Which layers are required for the first version?
- Which points, routes, regions, rooms, grids, or gates require stable ids?
- Is minimap or navigation truly needed?
- What owns Runtime Map Binding?
