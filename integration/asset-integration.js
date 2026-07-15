#!/usr/bin/env node

"use strict";

const { BaseIntegration } = require("./integration-manager");

class AssetIntegration extends BaseIntegration {
  constructor(options = {}) {
    super({
      id: "asset-integration",
      type: "asset-provider",
      operations: ["createAsset"],
      runtimeMode: options.runtimeMode || "mock",
      executionEnabled: false,
    });
  }

  validateOperation(operation, request) {
    super.validateOperation(operation, request);
    for (const field of ["asset_id", "image_provider"]) {
      if (typeof request[field] !== "string" || request[field].trim().length === 0) {
        throw new Error(`Asset Integration ${operation} requires ${field}.`);
      }
    }
    return true;
  }

  createAsset(request) {
    return this.execute("createAsset", request);
  }

  perform() {
    throw new Error("Asset Integration is interface-only and has no Provider connection.");
  }
}

module.exports = {
  AssetIntegration,
};
