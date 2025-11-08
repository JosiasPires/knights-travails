type Coordinate = [number, number];
interface KnightNode {
  coordinate: Coordinate;
  path: Coordinate[];
}

class Queue<T> {
  private items: Record<number, T> = {};
  private head = 0;
  private tail = 0;

  enqueue(element: T): void {
    this.items[this.tail] = element;
    this.tail++;
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const item = this.items[this.head];
    delete this.items[this.head];
    this.head++;
    return item;
  }

  peek(): T | undefined {
    return this.items[this.head];
  }

  isEmpty(): boolean {
    return this.head === this.tail;
  }

  size(): number {
    return this.tail - this.head;
  }
}

function knightMoves(initial: Coordinate, target: Coordinate): Coordinate[] {
  const moves: Coordinate[] = [
    [2, 1], [2, -1],
    [-2, 1], [-2, -1],
    [1, 2], [1, -2],
    [-1, 2], [-1, -2]
  ];
  const searchQueue = new Queue<KnightNode>();
  const visited = new Set<string>();

  visited.add(initial.toString());
  searchQueue.enqueue({ coordinate: initial, path: [initial] });
  while (!searchQueue.isEmpty()) {
    const current = searchQueue.dequeue()!;
    const [currentX, currentY] = current.coordinate;

    if (currentX === target[0] && currentY === target[1]) {
      return current.path;
    }
    
  }
} 