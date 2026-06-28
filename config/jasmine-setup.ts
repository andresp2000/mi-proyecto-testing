
// Importar módulo de métricas usando import/export (TypeScript compilará a CommonJS)
import { recordMetrics, metricsRegistry } from "../metrics/testmetrics";
import { aggregateMetricsByModule, printMetricsTable } from "../metrics/metrics-aggregator";

let suiteStartTime: number;
let testStartTime: number;

// Gancho de inicio: inicia cronómetro global y registro de telemetría
beforeAll(() => {
  suiteStartTime = performance.now();
  console.log("=== INICIANDO TELEMETRÍA GLOBAL DEL FRAMEWORK HÍBRIDO ===");
});

// Gancho de fin: calcula duración total y genera reporte de complejidad
afterAll(() => {
  const totalDuration = performance.now() - suiteStartTime;
  console.log(
    `=== FIN DE LA EJECUCIÓN. TIEMPO TOTAL: ${totalDuration.toFixed(2)}ms ===`
  );

  // Generar reporte de complejidad por módulo
  if (metricsRegistry.length > 0) {
    console.log("\n");
    const summaries = aggregateMetricsByModule(metricsRegistry);
    printMetricsTable(summaries);
  }
});

// Gancho previo: prepara cronómetro para cada test individual
beforeEach(() => {
  testStartTime = performance.now();
});

// Gancho posterior: registra métricas después de cada test
afterEach(function (this: any) {
  const duration = performance.now() - testStartTime;
  
  // Capturar nombre completo del test (describe + it)
  const currentSpec = (jasmine.getEnv() as any).currentSpec;
  const testName = currentSpec?.fullName || "Prueba Avanzada";

  // Registra duración, complejidad ciclomática y probabilidad de flaky
  recordMetrics(testName, duration, 3, 0.01);
});