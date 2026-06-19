export interface TypedEventLike {
  readonly type: string;
}

export type EventListener<TEvent extends TypedEventLike> = (event: TEvent) => void;

export class EventBus<TEvent extends TypedEventLike> {
  private readonly listenersByType = new Map<TEvent["type"], Set<EventListener<TEvent>>>();
  private readonly anyListeners = new Set<EventListener<TEvent>>();

  public on<TType extends TEvent["type"]>(
    type: TType,
    listener: EventListener<Extract<TEvent, { readonly type: TType }>>
  ): () => void {
    const bucket =
      this.listenersByType.get(type) ?? new Set<EventListener<TEvent>>();
    bucket.add(listener as EventListener<TEvent>);
    this.listenersByType.set(type, bucket);
    return () => this.off(type, listener);
  }

  public onAny(listener: EventListener<TEvent>): () => void {
    this.anyListeners.add(listener);
    return () => {
      this.anyListeners.delete(listener);
    };
  }

  public once<TType extends TEvent["type"]>(
    type: TType,
    listener: EventListener<Extract<TEvent, { readonly type: TType }>>
  ): () => void {
    const dispose = this.on(type, (event) => {
      dispose();
      listener(event);
    });
    return dispose;
  }

  public off<TType extends TEvent["type"]>(
    type: TType,
    listener: EventListener<Extract<TEvent, { readonly type: TType }>>
  ): void {
    const bucket = this.listenersByType.get(type);
    if (!bucket) {
      return;
    }

    bucket.delete(listener as EventListener<TEvent>);
    if (bucket.size === 0) {
      this.listenersByType.delete(type);
    }
  }

  public emit(event: TEvent): void {
    const typedListeners = this.listenersByType.get(event.type);
    if (typedListeners) {
      for (const listener of typedListeners) {
        listener(event);
      }
    }

    for (const listener of this.anyListeners) {
      listener(event);
    }
  }

  public clear(): void {
    this.listenersByType.clear();
    this.anyListeners.clear();
  }
}
