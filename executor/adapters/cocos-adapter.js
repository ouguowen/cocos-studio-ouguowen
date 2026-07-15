"use strict";

const { BaseAdapter } = require("./base-adapter");

class CocosAdapter extends BaseAdapter {
  constructor() {
    super({
      id: "cocos-adapter",
      mode: "real",
      supportedTools: ["blueprint-system-planner"],
      executionEnabled: false,
    });
  }

  perform() {
    throw new Error("Cocos Adapter is interface-only and cannot modify a Cocos project.");
  }
}

module.exports = {
  CocosAdapter,
};
