#!/usr/bin/env node

"use strict";

const { BaseRuntime } = require("./runtime-manager");

class AssetRuntime extends BaseRuntime {
  constructor() {
    super({
      id: "asset-runtime",
      type: "asset",
      integrationId: "asset-integration",
      supportedCapabilities: ["asset-requirements", "image-generation", "concept-art"],
      executionEnabled: false,
    });
  }

  routeIntegration(request) {
    return this.invokeIntegration("createAsset", {
      asset_id: request.asset_id || request.task_id,
      image_provider: request.image_provider || "provider-registry-selection",
    });
  }

  perform(request) {
    return this.routeIntegration(request);
  }
}

module.exports = {
  AssetRuntime,
};
