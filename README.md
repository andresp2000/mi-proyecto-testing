# 🧪 Proyecto de Testing Avanzado

Proyecto integral de pruebas con **TypeScript**, **Jasmine**, **Stryker** y patrones avanzados de testing.

## 📋 Características

- ✅ **Compilación TypeScript** a CommonJS con `tsc`
- ✅ **Framework Híbrido** de testing: unitarias, por contrato y basadas en propiedades
- ✅ **Telemetría integrada** con registro de métricas de pruebas
- ✅ **Testing por mutación** con Stryker
- ✅ **Helpers compartidos** sin código duplicado

## 📁 Estructura del Proyecto

```
mi-proyecto-testing/
├── algorithms/              # Algoritmos bajo prueba
│   └── binary-search.ts
├── tests/                   # Suite de pruebas
│   ├── binary-search.spec.ts                 # Pruebas unitarias
│   ├── binary-search.contract.spec.ts        # Contract testing
│   ├── binary-search.property.spec.ts        # Property-based testing
│   └── helpers.ts                            # Utilidades compartidas
├── config/
│   └── jasmine-setup.ts     # Configuración de Jasmine y telemetría
├── metrics/
│   └── testmetrics.ts       # Registro de métricas de tests
├── spec/support/
│   └── jasmine.json         # Configuración de Jasmine
├── tsconfig.json            # Configuración de TypeScript
├── package.json
└── stryker.conf.js          # Testing por mutación
```

## 🚀 Instalación

```bash
# Clonar repositorio
git clone https://github.com/TU_USUARIO/mi-proyecto-testing.git
cd mi-proyecto-testing

# Instalar dependencias
npm install
```

## 📜 Comandos Disponibles

```bash
# Compilar TypeScript a dist/
npm run build

# Ejecutar todos los tests (build + jasmine)
npm test

# Limpiar carpeta dist/
npm run clean

# Testing por mutación con Stryker
npm run mutate
```

## 🧬 Tipos de Pruebas

### 1️⃣ **Pruebas Unitarias** (`binary-search.spec.ts`)
Verifican el comportamiento básico del algoritmo.

```typescript
it("encuentra un elemento existente", () => {
  const arr = [1, 2, 3, 4, 5];
  expect(binarySearch(arr, 3)).toBe(2);
});
```

### 2️⃣ **Contract Testing** (`binary-search.contract.spec.ts`)
Validan precondiciones y postcondiciones.

```typescript
it("postcondición: índice válido o -1", () => {
  const arr = [1, 2, 3, 4];
  const index = binarySearch(arr, 3);
  expect(index).toBeGreaterThanOrEqual(-1);
  expect(arr[index]).toBe(3);
});
```

### 3️⃣ **Property-Based Testing** (`binary-search.property.spec.ts`)
Prueban propiedades invariantes con entrada aleatoria.

```typescript
it("cumple: f(A,k) = i → (A[i] = k) ∨ (i = -1)", () => {
  for (let i = 0; i < 100; i++) {
    const arr = generateSortedArray();
    const index = binarySearch(arr, key);
    // Verificar propiedad...
  }
});
```

## 📊 Telemetría Integrada

Cada test registra automáticamente:
- **Duración** (ms)
- **Complejidad Ciclomática**
- **Probabilidad de Flaky**

```
[TELEMETRÍA] - Prueba: binarySearch básica | Duración: 1.50ms | Complejidad M: 3 | Flaky: 0.01
```

## 🔄 Flujo de Compilación

```
Source (.ts) 
  ↓
TypeScript Compiler (tsc)
  ↓
Compiled ES2020 CommonJS (.js)
  ↓
Jasmine ejecuta tests
  ↓
Telemetría registrada
  ↓
Stryker (opcional) para mutación
```

## 🎯 Configuración Clave

### `tsconfig.json`
- Módulos: **CommonJS** (compatible con Node.js)
- Target: **ES2020**
- Output: **dist/**

### `spec/support/jasmine.json`
- Ejecuta tests desde: **dist/tests**
- Busca archivos: `**/*[sS]pec.js`
- Helpers: `dist/config/jasmine-setup.js`

### `package.json`
- Type: **"commonjs"** (default module system)

## 🛠️ Requisitos

- Node.js 16+
- npm 7+
- TypeScript 6.0+
- Jasmine 6.3+

## 📝 Notas de Desarrollo

- El `.gitignore` excluye automáticamente `dist/` y `node_modules/`
- Los helpers compartidos están en `tests/helpers.ts`
- Todos los imports de tests usan rutas relativas

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

ISC

---

**Última actualización:** 2026-06-27
