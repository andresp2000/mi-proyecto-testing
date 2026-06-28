/**
 * Interfaz que define la estructura de un registro de llamada con tiempo
 */
export interface TimedCall {
  args: any[];
  durationMs: number;
}

/**
 * Crea un spy que registra las llamadas a un método junto con su duración
 * @param obj - Objeto que contiene el método a monitorear
 * @param method - Nombre del método a interceptar
 * @returns Función que retorna el registro de llamadas realizadas
 * 
 * @example
 * const obj = { calculate: (x) => x * 2 };
 * const getCallsInfo = createTimedSpy(obj, 'calculate');
 * obj.calculate(5);
 * const calls = getCallsInfo(); // [{ args: [5], durationMs: 0.xx }]
 */
export function createTimedSpy(obj: any, method: string): () => TimedCall[] {
  // Guardar referencia al método original
  const original = obj[method];
  
  // Almacenar información de cada llamada (argumentos y duración)
  const calls: TimedCall[] = [];
  
  // Reemplazar el método con uno que mida tiempo y registre llamadas
  obj[method] = (...args: any[]): any => {
    // Capturar tiempo inicial
    const start = performance.now();
    
    // Ejecutar método original con contexto preservado
    const result = original.apply(obj, args);
    
    // Registrar argumentos y duración de la llamada
    calls.push({
      args,
      durationMs: performance.now() - start
    });
    
    // Retornar resultado del método original
    return result;
  };
  
  // Retornar función que permite acceder al registro de llamadas
  return (): TimedCall[] => calls;
}
