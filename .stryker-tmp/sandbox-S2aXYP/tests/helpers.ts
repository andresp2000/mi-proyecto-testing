// @ts-nocheck
// Utilidades compartidas para todos los tests de binary-search
import { binarySearch } from "../algorithms/binary-search";

/**
 * Verifica que un arreglo esté ordenado de forma ascendente
 * @param arr - Arreglo de números
 * @returns true si está ordenado, false caso contrario
 */
export function isSortedAscending(arr: number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
}

/**
 * Genera un arreglo aleatorio ordenado para testing basado en propiedades
 * @param length - Longitud del arreglo (por defecto 20)
 * @returns Arreglo aleatorio ordenado
 */
export function generateSortedArray(length: number = 20): number[] {
  const arr = Array.from({ length }, () => Math.floor(Math.random() * 100));
  return arr.sort((a, b) => a - b);
}

/**
 * Re-exportar binarySearch para facilitar imports en tests
 */
export { binarySearch };
