import { binarySearch, generateSortedArray } from "./helpers";

describe("binarySearch property-based", () => {
  it("cumple la propiedad f(A,k) = i → (A[i] = k) ∨ (i = -1 ∧ k ∉ A)", () => {
    for (let i = 0; i < 100; i++) {
      const arr = generateSortedArray();
      const key = Math.floor(Math.random() * 100);
      const index = binarySearch(arr, key);

      if (index !== -1) {
        expect(arr[index]).toBe(key);
      } else {
        expect(arr.includes(key)).toBeFalse();
      }
    }
  });
});