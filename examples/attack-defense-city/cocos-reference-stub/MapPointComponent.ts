import { _decorator, Component, Node } from 'cc';

const { ccclass, property } = _decorator;

export type MapPointType = 'player_spawn' | 'enemy_spawn' | 'camera_anchor' | 'objective_anchor' | 'unknown';

@ccclass('MapPointComponent')
export class MapPointComponent extends Component {
  @property
  public pointId = '';

  @property
  public pointType: MapPointType = 'unknown';

  public getNode(): Node {
    return this.node;
  }
}
