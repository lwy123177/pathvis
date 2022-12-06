// source: https://www.codeguru.co.in/2021/05/binary-heap-min-and-max-heap-using.html
export class MinHeap<T> {
  public count = 0;
  private items: T[] = [];
  public add(item: T) {
    this.count++;
    this.items.push(item);
    this.heapifyUp(this.items.length - 1);
  };
  public extractMin() {
    if (this.count > 0) {
      this.count--;
      let item = this.items[0];
      this.items[0] = this.items.pop()!;
      this.heapifyDown(0);
      return item;
    }
  };
  private heapifyUp(index: number) {
    let parent = this.parent(index);
    if (parent >= 0 && this.items[parent] > this.items[index]) {
      this.swap(this.items, parent, index);
      this.heapifyUp(parent);
    }
  };
  private heapifyDown(index: number) {
    let smallest = index;
    let leftChild = this.letChild(index);
    let rightChild = this.rightChild(index);
    if (leftChild < this.count && this.items[leftChild] < this.items[index]) {
      smallest = leftChild;
    }
    if (rightChild < this.count &&
      this.items[rightChild] < this.items[smallest]) {
      smallest = rightChild;
    }
    if (smallest !== index) {
      this.swap(this.items, index, smallest);
      this.heapifyDown(smallest);
    }
  };
  private parent(index: number) {
    return Math.floor((index - 1) / 2);
  };
  private letChild(index: number) {
    return index * 2 + 1;
  };
  private rightChild(index: number) {
    return index * 2 + 2;
  };
  private swap(arr: T[], i: number, j: number) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };
}