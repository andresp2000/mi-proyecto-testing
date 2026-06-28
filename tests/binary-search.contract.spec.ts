import { binarySearch, isSortedAscending } from "./helpers";

describe("binarySearch contract testing", () => {
  it("precondición: arreglo ordenado", () => {
    const arr = [1, 2, 3, 4];
    expect(isSortedAscending(arr)).toBeTrue();
  });

  it("postcondición: índice válido o -1", () => {
    const arr = [1, 2, 3, 4];
    const key = 3;
    const index = binarySearch(arr, key);

    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(arr.length);
    expect(arr[index]).toBe(key);
  });
});