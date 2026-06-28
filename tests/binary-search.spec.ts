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

  // Casos de borde críticos para capturar mutantes
  it("encuentra elemento al inicio del array", () => {
    const arr = [1, 2, 3, 4, 5];
    expect(binarySearch(arr, 1)).toBe(0);
  });

  it("encuentra elemento al final del array", () => {
    const arr = [1, 2, 3, 4, 5];
    expect(binarySearch(arr, 5)).toBe(4);
  });

  it("maneja array de un elemento cuando existe", () => {
    const arr = [42];
    expect(binarySearch(arr, 42)).toBe(0);
  });

  it("maneja array de un elemento cuando no existe", () => {
    const arr = [42];
    expect(binarySearch(arr, 1)).toBe(-1);
  });

  it("busca valor menor que el mínimo", () => {
    const arr = [10, 20, 30, 40, 50];
    expect(binarySearch(arr, 5)).toBe(-1);
  });

  it("busca valor mayor que el máximo", () => {
    const arr = [10, 20, 30, 40, 50];
    expect(binarySearch(arr, 100)).toBe(-1);
  });

  it("busca valor entre dos elementos existentes", () => {
    const arr = [10, 20, 30, 40, 50];
    expect(binarySearch(arr, 25)).toBe(-1);
  });
});