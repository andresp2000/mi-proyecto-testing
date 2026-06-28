export function binarySearch(arr: number[], key: number): number {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === key) return mid;
    if (arr[mid] < key) low = mid + 1;
    else high = mid - 1;
  }

  return -1;
}