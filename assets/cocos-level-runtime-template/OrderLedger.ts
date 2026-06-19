export type OrderStatus = "pending" | "paid" | "fulfilled" | "failed";

export interface OrderRecord {
  readonly orderId: string;
  readonly productId: string;
  readonly providerOrderId: string | null;
  status: OrderStatus;
  createdAtMs: number;
  paidAtMs: number | null;
  fulfilledAtMs: number | null;
  failureReason: string | null;
}

export class OrderLedger {
  private readonly orders = new Map<string, OrderRecord>();

  public createPendingOrder(orderId: string, productId: string, createdAtMs: number): OrderRecord {
    const order: OrderRecord = {
      orderId,
      productId,
      providerOrderId: null,
      status: "pending",
      createdAtMs,
      paidAtMs: null,
      fulfilledAtMs: null,
      failureReason: null,
    };
    this.orders.set(orderId, order);
    return { ...order };
  }

  public markPaid(orderId: string, providerOrderId: string, paidAtMs: number): OrderRecord {
    const order = this.requireOrder(orderId);
    order.status = "paid";
    order.paidAtMs = paidAtMs;
    (order as { providerOrderId: string | null }).providerOrderId = providerOrderId;
    return { ...order };
  }

  public markFulfilled(orderId: string, fulfilledAtMs: number): OrderRecord {
    const order = this.requireOrder(orderId);
    order.status = "fulfilled";
    order.fulfilledAtMs = fulfilledAtMs;
    return { ...order };
  }

  public markFailed(orderId: string, reason: string): OrderRecord {
    const order = this.requireOrder(orderId);
    order.status = "failed";
    order.failureReason = reason;
    return { ...order };
  }

  public getOrder(orderId: string): OrderRecord | null {
    return this.orders.get(orderId) ?? null;
  }

  public createSnapshot(): readonly OrderRecord[] {
    return Array.from(this.orders.values()).map((order) => ({ ...order }));
  }

  private requireOrder(orderId: string): OrderRecord {
    const order = this.getOrder(orderId);
    if (!order) {
      throw new Error(`[OrderLedger] Missing order: ${orderId}`);
    }
    return order;
  }
}
