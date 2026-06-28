// config/jasmine-setup.ts

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

  // Nombre completo generado por Jasmine
  const fullName: string =
    (this.result && typeof this.result.fullName === "string"
      ? this.result.fullName
      : "Otros");

  console.log(`[DEBUG fullName] ${fullName}`);

  let moduleName = "Otros";

  if (fullName.includes("binarySearch básica")) {
    moduleName = "binarySearch básica";
  } else if (fullName.includes("binarySearch contract testing")) {
    moduleName = "binarySearch contract testing";
  } else if (fullName.includes("binarySearch property-based")) {
    moduleName = "binarySearch property-based";
  } else if (fullName.includes("Jasmine Setup")) {
    moduleName = "Jasmine Setup";
  } else if (fullName.includes("Test Metrics")) {
    moduleName = "Test Metrics";
  } else if (fullName.includes("Advanced Spies")) {
    moduleName = "Advanced Spies";
  } else if (fullName.includes("Type Generator")) {
    moduleName = "Type Generator";
  } else if (fullName.includes("Combinatorial")) {
    moduleName = "Combinatorial";
  }

  recordMetrics(moduleName, duration, 3, 0.01);
});