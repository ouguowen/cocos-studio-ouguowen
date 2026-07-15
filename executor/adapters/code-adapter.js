"use strict";

const { BaseAdapter } = require("./base-adapter");

class CodeAdapter extends BaseAdapter {
  constructor() {
    super({
      id: "code-adapter",
      mode: "real",
      supportedTools: ["blueprint-design-reader", "validation-checklist-builder"],
      executionEnabled: false,
    });
  }

  perform() {
    throw new Error("Code Adapter is interface-only and cannot generate or modify code.");
  }
}

module.exports = {
  CodeAdapter,
};
