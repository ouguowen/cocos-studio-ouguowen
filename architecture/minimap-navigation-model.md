# MiniMap Navigation Model

## 1. Purpose

Use this file after selecting a map model when the project may need minimap, navigation hints, region reveal, room reveal, route hints, objective markers, or player markers.

MiniMap and navigation are support systems. They are not required for every game.

## 2. When minimap is needed

A minimap may be needed when the player must understand space beyond the current Viewport.

Common triggers:

- the world is larger than one screen
- the map has multiple rooms
- the map has regions or area unlocks
- the map has branching routes
- the map has grid-scale tactical navigation
- the map has objective markers outside the current camera window
- the map has fog, reveal, or exploration state
- the player can get lost without spatial feedback

Region / World / Room / Path / Grid / Endless Map models may need minimap or navigation hints.

## 3. When minimap is not needed

A minimap is not needed when the full gameplay space is already visible or when spatial navigation is not a player problem.

Fixed Screen Map / simple Narrative Scene Map usually do not need minimap.

Avoid minimap when:

- the Viewport already shows all important gameplay state
- UI markers or local prompts solve the problem
- the game is a simple dialogue, card, board-lite, or story-choice screen
- the first MVP can prove the loop without spatial navigation

## 4. MiniMap projection types

- Static MiniMap: a fixed image or authored map overlay with stable markers.
- Dynamic MiniMap: runtime-generated projection from world, chunk, route, grid, or room state.
- Region MiniMap: projection of regions, areas, gates, unlocks, and objectives.
- Room MiniMap: projection of rooms, doors, gates, current room, and discovered rooms.
- Node Graph MiniMap: projection of nodes, edges, unlock state, and current location.
- Route MiniMap: projection of route lines, lanes, path progress, convoy position, or enemy approach.
- Grid MiniMap: projection of cells, tile ownership, blockers, unit markers, or objective cells.

## 5. Navigation hint types

- Compass / Arrow Hint: directional guide toward an off-screen objective, exit, route, or region.
- Objective Marker: UI or world marker showing a target objective.
- Player Marker: UI or minimap marker showing current player position.
- Route Hint: line, arrow, breadcrumb, lane highlight, or path preview.
- Gate Hint: marker for locked, unlocked, blocked, or transition gates.
- Region Label: name or status of the current region or area.

Navigation hints can replace minimap when the map is small or the player's next action is clear.

## 6. Reveal / fog rules

- Fog of War hides unexplored or unknown areas.
- Map Reveal records discovered rooms, regions, nodes, routes, cells, or objectives.
- Reveal State must be data-driven when it affects progression, quest state, navigation, or save data.
- Do not fake reveal only by hiding art if gameplay systems need the same truth.

## 7. Player marker rules

Player Marker must be derived from trusted runtime position or selected node state.

For each map model:

- Fixed Screen Map: marker usually unnecessary.
- Scrolling Stage Map: marker may show progress along axis or segment.
- Path / Lane Map: marker may show route progress or defended target.
- Grid / Tile Map: marker maps to cell coordinate.
- Room-Based Map: marker maps to current room and optional local position.
- Region / Area Map: marker maps to current area and optional world position.
- Node Graph Map: marker maps to current node.
- World Map: marker maps to current location or selected destination.
- Narrative Scene Map: marker usually unnecessary unless multi-room investigation.
- Endless Chunk Map: marker may show relative progress, lane, or danger direction.

## 8. Objective marker rules

Objective Marker should show only actionable or intentionally visible objectives.

Rules:

- hidden objectives should not leak through minimap
- completed objectives should change state or disappear
- off-screen objectives may use arrow hints instead of full minimap
- objective markers must use stable objective ids or point ids

## 9. Route hint rules

Route Hint is useful when the player must follow, defend, predict, or choose a route.

Route hints can be:

- full path line
- next step arrow
- lane highlight
- enemy approach preview
- convoy route preview
- breadcrumb trail
- blocked route warning

Do not show a route hint when discovery, puzzle solving, or hidden navigation is the intended challenge.

## 10. Region unlock rules

Region unlock state should distinguish:

- hidden
- seen but locked
- unlocked
- entered
- completed
- blocked by gate
- blocked by ability
- blocked by quest state

World Map, Region / Area Map, Room-Based Map, and Node Graph Map often need unlock state. Fixed Screen Map usually does not.

## 11. Cocos UI structure

Use only when needed:

```text
Canvas
  SafeUI
    MiniMapRoot
      MiniMapFrame
      MapProjection
      RegionLayer
      RouteLayer
      GridLayer
      MarkerLayer
      FogLayer
    NavigationHintRoot
      CompassArrow
      ObjectiveMarkerRoot
      RouteHintRoot
```

Keep minimap UI downstream of runtime data. UI presents map truth; it must not own map truth.

## 12. Runtime data source

MiniMap and navigation may read from:

- selected map model
- MapSpaceRuntime
- MapPointRegistry
- RouteRegistry
- GridRegistry
- RegionRegistry
- RoomRegistry
- objective system
- player position or current node state
- reveal or fog state

Only add the data source required by the selected map model.

## 13. Forbidden patterns

- Adding minimap to every game by default.
- Treating minimap art as the source of gameplay truth.
- Revealing hidden objectives through markers.
- Binding markers to decorative node names.
- Building Region MiniMap, Room MiniMap, Node Graph MiniMap, Route MiniMap, and Grid MiniMap together for one first version.
- Using minimap to hide unclear map design.

## 14. Review questions

- Does this game truly need minimap?
- Would Compass / Arrow Hint, Objective Marker, Player Marker, or Route Hint be enough?
- Which projection type matches the selected map model?
- What is the runtime data source?
- What reveal or fog state is required?
- Which markers must be hidden until discovered?
- Does UI present map truth without owning it?
