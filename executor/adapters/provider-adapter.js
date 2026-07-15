"use strict";

const { BaseAdapter } = require("./base-adapter");

class ProviderAdapter extends BaseAdapter {
  constructor() {
    super({
      id: "provider-adapter",
      mode: "real",
      supportedTools: ["asset-requirement-catalog"],
      executionEnabled: false,
    });
  }

  perform() {
    throw new Error("Provider Adapter is interface-only and has no concrete Provider binding.");
  }
}

module.exports = {
  ProviderAdapter,
};
