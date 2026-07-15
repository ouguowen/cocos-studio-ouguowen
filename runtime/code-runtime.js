#!/usr/bin/env node

"use strict";

const { BaseRuntime } = require("./runtime-manager");

class CodeRuntime extends BaseRuntime {
  constructor() {
    super({
      id: "code-runtime",
      type: "code",
      integrationId: "code-integration",
      supportedCapabilities: ["game-design", "validation-checklist", "code-generation"],
      executionEnabled: false,
    });
  }

  routeIntegration(request) {
    return this.invokeIntegration("updateFile", {
      path: request.target_path || request.task_id,
      content: request.content || "",
    });
  }

  perform(request) {
    return this.routeIntegration(request);
  }
}

module.exports = {
  CodeRuntime,
};
