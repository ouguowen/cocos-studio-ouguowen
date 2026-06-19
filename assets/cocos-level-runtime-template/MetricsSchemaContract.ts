export interface MetricFieldContract {
  readonly fieldName: string;
  readonly fieldType: "string" | "number" | "boolean" | "timestamp";
  readonly required: boolean;
}

export interface MetricContract {
  readonly metricName: string;
  readonly owner: string;
  readonly fields: readonly MetricFieldContract[];
}

export class MetricsSchemaContract {
  private readonly contracts = new Map<string, MetricContract>();

  public register(contract: MetricContract): MetricContract {
    this.contracts.set(contract.metricName, contract);
    return {
      ...contract,
      fields: contract.fields.map((field) => ({ ...field })),
    };
  }

  public get(metricName: string): MetricContract {
    const contract = this.contracts.get(metricName);
    if (!contract) {
      throw new Error(`[MetricsSchemaContract] Missing metric contract: ${metricName}`);
    }

    return {
      ...contract,
      fields: contract.fields.map((field) => ({ ...field })),
    };
  }

  public has(metricName: string): boolean {
    return this.contracts.has(metricName);
  }
}
