#!/usr/bin/env node

"use strict";

const { BaseIntegration } = require("./integration-manager");

class CocosIntegration extends BaseIntegration {
  constructor(options = {}) {
    super({
      id: "cocos-integration",
      type: "engine",
      operations: ["createProject", "createScene", "buildProject"],
      runtimeMode: options.runtimeMode || "mock",
      executionEnabled: false,
    });
  }

  validateOperation(operation, request) {
    super.validateOperation(operation, request);
    const requiredField = operation === "createProject" ? "project_name" : "project";
    if (typeof request[requiredField] !== "string" || request[requiredField].trim().length === 0) {
      throw new Error(`Cocos Integration ${operation} requires ${requiredField}.`);
    }
    if (operation === "createScene"
      && (typeof request.scene !== "string" || request.scene.trim().length === 0)) {
      throw new Error("Cocos Integration createScene requires scene.");
    }
    return true;
  }

  createProject(request) {
    return this.execute("createProject", request);
  }

  createScene(request) {
    return this.execute("createScene", request);
  }

  buildProject(request) {
    return this.execute("buildProject", request);
  }

  perform() {
    throw new Error("Cocos Integration is interface-only and has no engine connection.");
  }
}

module.exports = {
  CocosIntegration,
};
