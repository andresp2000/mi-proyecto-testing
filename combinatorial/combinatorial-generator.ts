export function pairwiseCombinations(params: Record<string, any[]>): any[] {
  const keys = Object.keys(params);
  const result: any[] = [];

  keys.forEach((k1, i) => {
    keys.slice(i + 1).forEach(k2 => {
      params[k1].forEach(v1 => {
        params[k2].forEach(v2 => {
          result.push({ [k1]: v1, [k2]: v2 });
        });
      });
    });
  });

  return result;
}