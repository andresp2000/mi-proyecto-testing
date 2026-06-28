// @ts-nocheck
// Interfaz para registro de métricas de pruebas
export interface TestMetrics {
  name: string;
  cyclomaticComplexity: number;
  avgDurationMs: number;
  flakyProbability: number;
}

// Registro centralizado de métricas de todas las pruebas
const metricsRegistry: TestMetrics[] = [];

/**
 * Registra métricas de una prueba individual
 * @param name - Nombre de la prueba
 * @param durationMs - Duración en milisegundos
 * @param complexity - Complejidad ciclomática estimada
 * @param flakyProb - Probabilidad de prueba inestable (0-1)
 */
export function recordMetrics(
  name: string,
  durationMs: number,
  complexity: number,
  flakyProb: number
): void {
  metricsRegistry.push({
    name,
    cyclomaticComplexity: complexity,
    avgDurationMs: durationMs,
    flakyProbability: flakyProb
  });

  console.log(
    `[TELEMETRÍA] - Prueba: ${name} | Duración: ${durationMs.toFixed(
      2
    )}ms | Complejidad M: ${complexity} | Flaky: ${flakyProb}`
  );
}

// Exportar registro para análisis post-ejecución
export { metricsRegistry };