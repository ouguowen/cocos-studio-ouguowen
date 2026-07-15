#!/usr/bin/env node

"use strict";

const { BaseRuntime } = require("./runtime-manager");

class CocosRuntime extends BaseRuntime {
  constructor() {
    super({
      id: "cocos-runtime",
      type: "engine",
      integrationId: "cocos-integration",
      supportedCapabilities: ["system-implementation-plan", "engine-planning"],
      executionEnabled: false,
    });
  }

  routeIntegration(request) {
    return this.invokeIntegration("buildProject", {
      project: request.project || request.task_id,
    });
  }

  perform(request) {
    return this.routeIntegration(request);
  }
}

module.exports = {
  CocosRuntime,
};
