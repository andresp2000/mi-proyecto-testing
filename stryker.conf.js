/** @type {import('@stryker-mutator/api/core').StrykerOptions} */
module.exports = {
  // Patrones de archivos TypeScript a mutar
  mutate: ["algorithms/binary-search.ts"],
  
  // Patrones de archivos a no ignorar
  testRunner: "jasmine",
  
  // Configuración específica de Jasmine para Stryker
  jasmineConfigFile: "spec/support/jasmine.json",
  
  // Comando para compilar proyecto antes de mutar
  buildCommand: "npm run build",
  
  // Tipos de reportes a generar
  reporters: ["progress", "clear-text", "html"],
  
  // No usar cobertura (ya ejecutamos los tests)
  coverageAnalysis: "off",
};