#!/usr/bin/env node

"use strict";

const { BaseRuntime } = require("./runtime-manager");

class GitRuntime extends BaseRuntime {
  constructor() {
    super({
      id: "git-runtime",
      type: "version-control",
      integrationId: "git-integration",
      supportedCapabilities: ["version-control"],
      executionEnabled: false,
    });
  }

  routeIntegration(request) {
    return this.invokeIntegration("commit", {
      message: request.message || `Runtime task ${request.task_id}`,
    });
  }

  perform(request) {
    return this.routeIntegration(request);
  }
}

module.exports = {
  GitRuntime,
};
