export type AnalyticsValue = string | number | boolean | null;
export type AnalyticsValueType = "string" | "number" | "boolean" | "null" | "any";

export interface AnalyticsEventSchema {
  readonly eventName: string;
  readonly requiredKeys?: readonly string[];
  readonly propertyTypes?: Readonly<Record<string, AnalyticsValueType>>;
}

export class AnalyticsSchemaRegistry {
  private readonly schemas = new Map<string, AnalyticsEventSchema>();

  public constructor(schemas: readonly AnalyticsEventSchema[] = []) {
    for (const schema of schemas) {
      this.schemas.set(schema.eventName, schema);
    }
  }

  public getSchema(eventName: string): AnalyticsEventSchema | null {
    return this.schemas.get(eventName) ?? null;
  }

  public requireSchema(eventName: string): AnalyticsEventSchema {
    const schema = this.getSchema(eventName);
    if (!schema) {
      throw new Error(`[AnalyticsSchemaRegistry] Missing schema: ${eventName}`);
    }
    return schema;
  }

  public validate(eventName: string, payload: Readonly<Record<string, AnalyticsValue>>): void {
    const schema = this.requireSchema(eventName);

    for (const requiredKey of schema.requiredKeys ?? []) {
      if (!(requiredKey in payload)) {
        throw new Error(
          `[AnalyticsSchemaRegistry] Missing required key "${requiredKey}" in ${eventName}.`
        );
      }
    }

    for (const [key, expectedType] of Object.entries(schema.propertyTypes ?? {})) {
      if (!(key in payload)) {
        continue;
      }

      const actual = payload[key];
      if (!matchesType(actual, expectedType)) {
        throw new Error(
          `[AnalyticsSchemaRegistry] Invalid type for "${key}" in ${eventName}. Expected ${expectedType}.`
        );
      }
    }
  }
}

function matchesType(value: AnalyticsValue, expectedType: AnalyticsValueType): boolean {
  if (expectedType === "any") {
    return true;
  }
  if (expectedType === "null") {
    return value === null;
  }
  return typeof value === expectedType;
}
