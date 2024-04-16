import { List } from "./types";

type Node<T> = {
  prev: Node<T> | Head<T>;
  value: T;
  next: Node<T> | Tail<T>;
};

type Head<T> = {
  next: Node<T> | Tail<T>;
};

type Tail<T> = {
  prev: Node<T> | Head<T>;
};

export class LinkedList<T> implements List<T> {
  private head: Head<T>;
  private tail: Tail<T>;
  private _size: number;

  constructor() {
    this.head = {} as Head<T>;
    this.tail = { prev: this.head };
    this.head.next = this.tail;
    this._size = 0;
  }

  pop(): T {
    if (this.isEmpty()) {
      throw new Error("The list is empty.");
    }
    const node = this.tail.prev as Node<T>;
    this.tail.prev = node.prev;
    node.prev.next = this.tail;
    return node.value;
  }

  push(value: T): void {
    const prev = this.tail.prev;
    const node: Node<T> = {
      prev,
      value,
      next: this.tail,
    };
    this.tail.prev = node;
    prev.next = node;
  }

  shift(): T {
    if (this.isEmpty()) {
      throw new Error("The list is empty.");
    }
    const node = this.head.next as Node<T>;
    this.head.next = node.next;
    node.next.prev = this.head;
    return node.value;
  }

  unshift(value: T): void {
    const next = this.head.next;
    const node: Node<T> = {
      prev: this.head,
      value,
      next,
    };
    this.head.next = node;
    next.prev = node;
  }

  clear(): void {
    if (this.isEmpty()) {
      return;
    }
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  size(): number {
    return this._size;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }
}
