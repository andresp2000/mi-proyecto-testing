import { binarySearch } from "./helpers";

describe("binarySearch básica", () => {
  it("encuentra un elemento existente", () => {
    const arr = [1, 2, 3, 4, 5];
    expect(binarySearch(arr, 3)).toBe(2);
  });

  it("devuelve -1 si no existe", () => {
    const arr = [1, 2, 3, 4, 5];
    expect(binarySearch(arr, 10)).toBe(-1);
  });
});