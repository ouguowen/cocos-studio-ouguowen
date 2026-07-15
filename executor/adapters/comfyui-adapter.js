"use strict";

const { BaseAdapter } = require("./base-adapter");

class ComfyUIAdapter extends BaseAdapter {
  constructor() {
    super({
      id: "comfyui-adapter",
      mode: "real",
      supportedTools: ["asset-requirement-catalog"],
      executionEnabled: false,
    });
  }

  perform() {
    throw new Error("ComfyUI Adapter is interface-only and has no external connection.");
  }
}

module.exports = {
  ComfyUIAdapter,
};
