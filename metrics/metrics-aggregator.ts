/**
 * Aggregator de métricas de tests por módulo
 * Procesa el registro de testmetrics.ts y genera reportes de complejidad
 */

export interface TestMetrics {
  name: string;
  cyclomaticComplexity: number;
  avgDurationMs: number;
  flakyProbability: number;
}

export interface ModuleSummary {
  module: string;
  cc: number;
  loc: number;
  avgDuration: number;
  flakyProb: number;
  testCount: number;
  classification: string;
}

/**
 * Mapa de líneas de código por módulo
 * Extraído del análisis manual del proyecto
 */
const MODULE_LOC: Record<string, number> = {
  "binarySearch básica": 13,
  "binarySearch contract testing": 13,
  "binarySearch property-based": 13,
  "Binary Search": 13,
  "Jasmine Setup": 34,
  "Test Metrics": 37,
  "Advanced Spies": 47,
  "Type Generator": 11,
  "Combinatorial": 17,
};

/**
 * Mapa de complejidad ciclomática por módulo
 * Según análisis de COMPLEXITY_ANALYSIS.md
 */
const MODULE_CC: Record<string, number> = {
  "binarySearch básica": 3,
  "binarySearch contract testing": 3,
  "binarySearch property-based": 3,
  "Binary Search": 3,
  "Jasmine Setup": 2,
  "Test Metrics": 2,
  "Advanced Spies": 2,
  "Type Generator": 3,
  "Combinatorial": 5,
};

/**
 * Extrae el nombre del módulo del nombre completo del test
 * @example "binarySearch básica encuentra un elemento" → "binarySearch básica"
 */
function extractModuleName(testName: string): string {
  // Buscar el primer nivel del describe (nombre del módulo)
  const match = testName.match(/^([^]+?)\s+(?:encuentra|devuelve|maneja|busca|cumple|precondición|postcondición)/);
  if (match) {
    return match[1].trim();
  }
  return testName.split(" ")[0];
}

/**
 * Clasifica la complejidad ciclomática
 */
function classifyComplexity(cc: number): string {
  if (cc <= 3) return "🟢 Baja";
  if (cc <= 7) return "🟡 Media";
  return "🔴 Alta";
}

/**
 * Agrega métricas de tests por módulo
 * @param metricsRegistry - Array de métricas registradas durante los tests
 * @returns Array de resúmenes agregados por módulo
 */
export function aggregateMetricsByModule(metricsRegistry: TestMetrics[]): ModuleSummary[] {
  // Agrupar métricas por módulo
  const moduleMap = new Map<string, {
    durations: number[];
    complexities: number[];
    flakyProbs: number[];
    testCount: number;
  }>();

  // Procesar cada métrica registrada
  metricsRegistry.forEach(metric => {
    const moduleName = extractModuleName(metric.name);
    
    if (!moduleMap.has(moduleName)) {
      moduleMap.set(moduleName, {
        durations: [],
        complexities: [],
        flakyProbs: [],
        testCount: 0,
      });
    }

    const moduleData = moduleMap.get(moduleName)!;
    moduleData.durations.push(metric.avgDurationMs);
    moduleData.complexities.push(metric.cyclomaticComplexity);
    moduleData.flakyProbs.push(metric.flakyProbability);
    moduleData.testCount++;
  });

  // Convertir a array de ModuleSummary
  const summaries: ModuleSummary[] = [];

  moduleMap.forEach((data, moduleName) => {
    // Calcular promedios
    const avgDuration = data.durations.reduce((a, b) => a + b, 0) / data.durations.length;
    const avgComplexity = data.complexities.reduce((a, b) => a + b, 0) / data.complexities.length;
    const avgFlakyProb = data.flakyProbs.reduce((a, b) => a + b, 0) / data.flakyProbs.length;

    const cc = MODULE_CC[moduleName] || Math.round(avgComplexity);
    const loc = MODULE_LOC[moduleName] || 0;

    summaries.push({
      module: moduleName,
      cc,
      loc,
      avgDuration: Math.round(avgDuration * 100) / 100,
      flakyProb: Math.round(avgFlakyProb * 10000) / 10000,
      testCount: data.testCount,
      classification: classifyComplexity(cc),
    });
  });

  // Ordenar por módulo
  return summaries.sort((a, b) => a.module.localeCompare(b.module));
}

/**
 * Imprime tabla formateada de métricas por módulo
 * @param summaries - Array de resúmenes de módulos
 */
export function printMetricsTable(summaries: ModuleSummary[]): void {
  console.log("\n");
  console.log("╔══════════════════════════════════════════════════════════════════════════════════╗");
  console.log("║              📊 TABLA DE COMPLEJIDAD POR MÓDULO                                 ║");
  console.log("╠══════════════════════════════════════════════════════════════════════════════════╣");
  console.log("║ Módulo                 │ CC │ LOC │ Dur(ms) │ Flaky  │ Tests │ Clasificación    ║");
  console.log("╠════════════════════════╪════╪═════╪═════════╪════════╪═══════╪══════════════════╣");

  summaries.forEach(summary => {
    const moduleName = summary.module.padEnd(22);
    const cc = String(summary.cc).padStart(2);
    const loc = String(summary.loc).padStart(3);
    const duration = summary.avgDuration.toFixed(2).padStart(7);
    const flaky = summary.flakyProb.toFixed(4).padStart(6);
    const tests = String(summary.testCount).padStart(5);
    const classification = summary.classification.padEnd(16);

    console.log(
      `║ ${moduleName} │ ${cc} │ ${loc} │ ${duration} │ ${flaky} │ ${tests} │ ${classification} ║`
    );
  });

  console.log("╠════════════════════════╧════╧═════╧═════════╧════════╧═══════╧══════════════════╣");

  // Calcular totales
  const totalTests = summaries.reduce((sum, s) => sum + s.testCount, 0);
  const avgCC = (summaries.reduce((sum, s) => sum + s.cc, 0) / summaries.length).toFixed(2);
  const avgDuration = (summaries.reduce((sum, s) => sum + s.avgDuration, 0) / summaries.length).toFixed(2);
  const avgFlaky = (summaries.reduce((sum, s) => sum + s.flakyProb, 0) / summaries.length).toFixed(4);

  console.log(`║ TOTAL: ${summaries.length} módulos │  ${avgCC}  │   │    ${avgDuration}    │ ${avgFlaky} │ ${String(totalTests).padStart(5)} │                  ║`);
  console.log("╚════════════════════════╧════╧═════╧═════════╧════════╧═══════╧══════════════════╝");

  // Resumen estadístico
  console.log("\n📈 ESTADÍSTICAS:\n");
  console.log(`   • Total de módulos: ${summaries.length}`);
  console.log(`   • Total de tests: ${totalTests}`);
  console.log(`   • Complejidad Ciclomática Promedio: ${avgCC}`);
  console.log(`   • Duración Promedio: ${avgDuration}ms`);
  console.log(`   • Probabilidad Flaky Promedio: ${avgFlaky}`);

  // Clasificación de módulos
  const lowComplexity = summaries.filter(s => s.cc <= 3).length;
  const mediumComplexity = summaries.filter(s => s.cc > 3 && s.cc <= 7).length;
  const highComplexity = summaries.filter(s => s.cc > 7).length;

  console.log(`\n🔍 DISTRIBUCIÓN DE COMPLEJIDAD:\n`);
  console.log(`   ├─ 🟢 Baja (CC ≤ 3):     ${lowComplexity} módulos`);
  console.log(`   ├─ 🟡 Media (CC 4-7):    ${mediumComplexity} módulos`);
  console.log(`   └─ 🔴 Alta (CC > 7):     ${highComplexity} módulos`);

  console.log("\n");
}

/**
 * Exportar función para generar reporte en formato JSON
 */
export function exportMetricsAsJSON(summaries: ModuleSummary[]): string {
  return JSON.stringify(
    {
      timestamp: new Date().toISOString(),
      projectName: "mi-proyecto-testing",
      summary: {
        totalModules: summaries.length,
        totalTests: summaries.reduce((sum, s) => sum + s.testCount, 0),
        avgComplexity: (summaries.reduce((sum, s) => sum + s.cc, 0) / summaries.length).toFixed(2),
        avgDuration: (summaries.reduce((sum, s) => sum + s.avgDuration, 0) / summaries.length).toFixed(2),
      },
      modules: summaries,
    },
    null,
    2
  );
}
