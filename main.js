class Queue {
    constructor() {
        this.items = {};
        this.head = 0;
        this.tail = 0;
    }
    enqueue(element) {
        this.items[this.tail] = element;
        this.tail++;
    }
    dequeue() {
        if (this.isEmpty())
            return undefined;
        const item = this.items[this.head];
        delete this.items[this.head];
        this.head++;
        return item;
    }
    peek() {
        return this.items[this.head];
    }
    isEmpty() {
        return this.head === this.tail;
    }
    size() {
        return this.tail - this.head;
    }
}
function knightMoves(initial, target) {
    const moves = [
        [2, 1], [2, -1],
        [-2, 1], [-2, -1],
        [1, 2], [1, -2],
        [-1, 2], [-1, -2]
    ];
    const searchQueue = new Queue();
    const visited = new Set();
    visited.add(initial.toString());
    searchQueue.enqueue({ coordinate: initial, path: [initial] });
    while (!searchQueue.isEmpty()) {
        const current = searchQueue.dequeue();
        const [currentX, currentY] = current.coordinate;
        if (currentX === target[0] && currentY === target[1]) {
            let path = current.path;
            console.log('You made it in %d move%s!', path.length, path.length > 1 ? 's' : '');
            path.forEach(pos => console.log(pos));
            return current.path;
        }
        for (const [xOffset, yOffset] of moves) {
            const newX = currentX + xOffset;
            const newY = currentY + yOffset;
            if (newX < 0 || newX > 7 || newY < 0 || newY > 7)
                continue;
            const key = `${newX},${newY}`;
            if (visited.has(key))
                continue;
            visited.add(key);
            searchQueue.enqueue({
                coordinate: [newX, newY],
                path: [...current.path, [newX, newY]]
            });
        }
    }
    console.log('Path not found.');
    return [];
}
knightMoves([0, 0], [3, 3]);
