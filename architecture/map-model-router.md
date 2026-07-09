# Map Model Router

## 1. Purpose

Use this file before designing any concrete map, scene space, world space, route system, grid system, room system, region system, camera rule, minimap, or navigation layer.

This router selects a universal map model from game type and gameplay space. It does not create a concrete map.

## 2. Core principle

Do not assume one map model fits every game.

Do not design a concrete map before selecting the map model.

Use one primary map model and at most one secondary map model for the first version.

Do not mix three or four map models in the first MVP.

## 3. Map model selection questions

- What is the selected game type?
- What is the primary player action?
- Is gameplay fixed-screen, scrolling, lane/path-based, grid/tile-based, room-based, region-based, node-based, world-map-based, narrative-scene-based, or endless?
- Does the player move through space, select from space, inspect space, defend a route, solve cells, enter rooms, unlock regions, or traverse nodes?
- Does the camera stay fixed, follow, scroll, snap by room, pan across a world, fit a board, or project onto a graph?
- Does the game need collision, route data, grid data, room data, region data, reveal state, or minimap projection?

## 4. Map model matrix

### Fixed Screen Map

- use when: card game, visual novel, dialogue game, match / board-lite game, simple story choice game.
- avoid when: the player needs traversal, spatial progression, long routes, room transitions, or large-area exploration.
- core spatial unit: visible screen zone.
- required map data: screen id, optional interaction zones, optional objective points.
- required scene objects: fixed background or board, UI-safe zones, optional hotspots, optional point markers.
- camera rule: fixed camera.
- point / route / region rule: points and zones may exist; routes and regions usually stay out of first version.
- minimap need level: none.
- Cocos scene structure hint: `Canvas/SafeUI` plus a small `WorldRoot/GameplaySpace/InteractionZones` only when needed.

### Scrolling Stage Map

- use when: platformer, runner, shooter, side-scroller, vertical scroller.
- avoid when: gameplay is menu-like, board-like, room-snap, or graph-selection driven.
- core spatial unit: segment or scrolling world slice.
- required map data: segment id, scroll direction, bounds, spawn points, checkpoints, obstacle points.
- required scene objects: world bounds, camera follow target, segment roots, obstacle roots, spawn points.
- camera rule: bounded follow, axis scroll, or endless forward window.
- point / route / region rule: points mark starts, checkpoints, pickups, hazards, and exits; route is implied by scroll direction unless authored paths are needed.
- minimap need level: low to medium; navigation hint may be enough.
- Cocos scene structure hint: `WorldRoot/GameplaySpace/MapBounds`, `Points`, `Collision`, `CameraAnchors`, and `VisualSpace`.

### Path / Lane Map

- use when: tower defense, attack-defense, lane battle, escort / convoy game, route defense game.
- avoid when: units move freely across regions, rooms, or grids rather than along constrained paths.
- core spatial unit: route, lane, or path node.
- required map data: route id, lane id, path nodes, spawn points, objective points, blockers, optional branch rules.
- required scene objects: route roots, lane markers, spawn roots, objective roots, blocking/collision markers, camera anchors.
- camera rule: fixed, bounded follow, lane overview, or route-focused camera.
- point / route / region rule: routes and points are primary; regions are optional for zones, build areas, or wave phases.
- minimap need level: medium when map exceeds one viewport or routes branch.
- Cocos scene structure hint: `WorldRoot/GameplaySpace/Routes`, `Points`, `InteractionZones`, `Collision`, and `VisualSpace`.

### Grid / Tile Map

- use when: tactics, puzzle, SLG, simulation, tile placement game.
- avoid when: continuous movement or visual-only scenes are the main interaction.
- core spatial unit: Grid Cell or Tile.
- required map data: grid size, cell coordinates, tile types, blockers, spawn cells, objective cells, adjacency rules.
- required scene objects: grid root, tile root, cell markers, selection overlay, blockers, spawn and objective markers.
- camera rule: board fit, bounded pan/zoom, or tactical follow.
- point / route / region rule: points map to cells; routes are computed or authored through cells; regions may group cells.
- minimap need level: medium for large boards; low for single-screen boards.
- Cocos scene structure hint: `WorldRoot/GameplaySpace/Grid`, `Collision`, `Points`, `Regions`, and `VisualSpace/TileArt`.

### Room-Based Map

- use when: roguelite, dungeon crawler, escape room, room exploration game.
- avoid when: the map is a single fixed screen, one continuous region, or only a route/lane.
- core spatial unit: Room.
- required map data: room id, room bounds, entrances, exits, gates, room state, encounter or puzzle payload.
- required scene objects: room roots, gate markers, entry points, exit points, camera anchors, local interaction zones.
- camera rule: room snap, room fit, or bounded room follow.
- point / route / region rule: points live inside rooms; gates connect rooms; route may be graph-derived.
- minimap need level: medium to high for multi-room navigation or reveal.
- Cocos scene structure hint: `WorldRoot/GameplaySpace/Rooms`, `Points`, `InteractionZones`, `CameraAnchors`, and optional `MiniMapRoot`.

### Region / Area Map

- use when: RPG, metroidvania, open exploration, quest adventure.
- avoid when: gameplay is short-stage, fixed-screen, or only lane/grid based.
- core spatial unit: Region or Area.
- required map data: region id, area id, gates, unlock rules, objectives, reveal state, optional room or route references.
- required scene objects: region roots, area bounds, gates, objective points, interaction zones, camera anchors.
- camera rule: bounded follow, region anchor, or area-aware camera.
- point / route / region rule: regions and areas are primary; points and gates connect objectives and progression; routes may guide navigation.
- minimap need level: medium to high.
- Cocos scene structure hint: `WorldRoot/GameplaySpace/Regions`, `InteractionZones`, `Points`, `CameraAnchors`, and optional `SafeUI/MiniMapRoot`.

### Node Graph Map

- use when: roguelite route, chapter map, branching story, level select, strategy route map.
- avoid when: physical traversal, collision, or continuous camera movement is the main gameplay.
- core spatial unit: Node and edge.
- required map data: node id, edge id, unlock state, node type, reward or encounter reference, reveal state.
- required scene objects: node buttons/markers, edge visuals, optional graph camera or pan root, selection UI.
- camera rule: fixed graph, pan/zoom graph, or chapter-map framing.
- point / route / region rule: nodes and edges replace free-space points and routes; regions may group graph sections.
- minimap need level: low; the graph itself often is the map.
- Cocos scene structure hint: `Canvas` or `WorldRoot/GameplaySpace/Graph`, with graph nodes and edge visuals.

### World Map

- use when: RPG world, chapter world, area unlock, travel map.
- avoid when: first MVP only needs one local stage, room, lane, or fixed screen.
- core spatial unit: world area, location node, or region.
- required map data: location id, region id, unlock rule, travel edge, chapter state, reveal state.
- required scene objects: world map root, location markers, route lines, region overlays, camera anchors.
- camera rule: fixed overview, pan/zoom world, or location-focused camera.
- point / route / region rule: regions and location points are primary; routes show travel or unlock paths.
- minimap need level: low when the world map is the main UI; high only for nested exploration.
- Cocos scene structure hint: `Canvas/WorldMapUI` or `WorldRoot/GameplaySpace/Regions` depending on whether it is UI or world-driven.

### Narrative Scene Map

- use when: story chapter clear, interactive fiction, scene investigation, point-and-click adventure.
- avoid when: the core loop is combat traversal, grid tactics, route defense, or large open exploration.
- core spatial unit: scene hotspot, clue zone, dialogue point, or story object.
- required map data: scene id, hotspot id, interaction zone id, objective point, dialogue or clue reference.
- required scene objects: background/visual root, interaction zones, hotspot markers, optional camera anchors.
- camera rule: fixed, focus pan, or investigation zoom.
- point / route / region rule: interaction zones and objective points are primary; routes are usually absent.
- minimap need level: none for simple scenes; low for multi-room investigation.
- Cocos scene structure hint: `WorldRoot/GameplaySpace/InteractionZones`, `Points`, and `VisualSpace`.

### Endless Chunk Map

- use when: endless runner, endless survival, procedural arcade, chunk-spawn game.
- avoid when: authored map identity, stable rooms, or fixed quest regions matter more than generation.
- core spatial unit: chunk, segment, or spawn band.
- required map data: chunk id, generator rule, spawn pattern, difficulty curve, despawn bounds, recycle rule.
- required scene objects: chunk pool root, spawn bands, camera window, recycle boundary, active chunk root.
- camera rule: endless forward window, follow, or fixed player with scrolling world.
- point / route / region rule: points are generated or chunk-local; routes may be lane-based; regions usually represent difficulty bands.
- minimap need level: low to medium; compass or near-future route hint may be enough.
- Cocos scene structure hint: `WorldRoot/GameplaySpace/Chunks`, `Points`, `Routes`, `CameraAnchors`, and pooled `VisualSpace`.

## 5. Game type to map model routing

- card game -> Fixed Screen Map
- visual novel -> Fixed Screen Map or Narrative Scene Map
- dialogue game -> Fixed Screen Map or Narrative Scene Map
- match / board-lite game -> Fixed Screen Map or Grid / Tile Map
- simple story choice game -> Fixed Screen Map or Narrative Scene Map
- platformer -> Scrolling Stage Map
- runner -> Scrolling Stage Map or Endless Chunk Map
- shooter -> Scrolling Stage Map, Fixed Screen Map, or Endless Chunk Map depending on movement
- side-scroller -> Scrolling Stage Map
- vertical scroller -> Scrolling Stage Map
- tower defense -> Path / Lane Map
- attack-defense -> Path / Lane Map
- lane battle -> Path / Lane Map
- escort / convoy game -> Path / Lane Map
- route defense game -> Path / Lane Map
- tactics -> Grid / Tile Map
- puzzle -> Grid / Tile Map, Fixed Screen Map, or Room-Based Map depending on interaction
- SLG -> Grid / Tile Map, Region / Area Map, or World Map
- simulation -> Grid / Tile Map, Region / Area Map, or Fixed Screen Map
- tile placement game -> Grid / Tile Map
- roguelite -> Room-Based Map or Node Graph Map
- dungeon crawler -> Room-Based Map
- escape room -> Room-Based Map or Narrative Scene Map
- room exploration game -> Room-Based Map
- RPG -> Region / Area Map, World Map, or Narrative Scene Map depending on scope
- metroidvania -> Region / Area Map
- open exploration -> Region / Area Map or World Map
- quest adventure -> Region / Area Map or Narrative Scene Map
- branching story -> Node Graph Map or Narrative Scene Map
- level select -> Node Graph Map or World Map
- strategy route map -> Node Graph Map or World Map
- endless survival -> Endless Chunk Map
- procedural arcade -> Endless Chunk Map
- chunk-spawn game -> Endless Chunk Map

## 6. Primary / secondary map model rule

Use one primary map model and at most one secondary map model for the first version.

Examples of safe combinations:

- primary Path / Lane Map, secondary Fixed Screen Map for a route-defense menu stage.
- primary Room-Based Map, secondary Node Graph Map for a small roguelite run.
- primary Region / Area Map, secondary World Map for an RPG with local exploration plus travel.
- primary Grid / Tile Map, secondary Region / Area Map for a tactical RPG with regional stage selection.

Do not mix three or four map models in the first MVP.

## 7. Cocos implementation handoff

After selecting the model, use [architecture/map-space-model.md](map-space-model.md) to define:

- viewport
- world space
- camera rule
- map layers
- Cocos scene structure
- runtime binding

Do not create scene nodes, prefabs, components, or runtime systems until the selected model names what is required.

## 8. Data model handoff

Use [architecture/level-data-models.md](level-data-models.md) to choose the level data model.

Use [architecture/level-config-schemas.md](level-config-schemas.md) to decide whether shared tables such as `Map.csv` and `MapPoint.csv` are enough or whether model-specific tables are required.

## 9. MiniMap handoff

Use [architecture/minimap-navigation-model.md](minimap-navigation-model.md) only after the map model is selected.

Do not add minimap by default.

## 10. Forbidden routing mistakes

- Assuming all games need a big map.
- Assuming all games need a minimap.
- Treating background art as the full map system.
- Designing the concrete map before selecting Fixed Screen, Scrolling, Path/Lane, Grid/Tile, Room, Region, Node Graph, World, Narrative Scene, or Endless Chunk.
- Hardcoding rules for one game type as universal map law.
- Adding grid, route, room, region, world, and minimap systems together for a first version.

## 11. Review questions

- What game type was selected?
- What is the primary gameplay space?
- Which map model is primary?
- Is there a secondary model, and is it truly necessary?
- What should be avoided for the first MVP?
- Which Cocos scene objects are required?
- Which map data tables are required?
- Does this map model need minimap, navigation hints, both, or neither?
