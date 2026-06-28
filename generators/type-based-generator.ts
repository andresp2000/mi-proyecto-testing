
interface FieldDef { name: string; type: "number" | "string"; min?: number; max?: number; }
export function generateBoundaryCases(schema: FieldDef[]): any[] {
const cases: any[] = [];
schema.forEach(f => {
if (f.type === "number" && f.min !== undefined && f.max !== undefined) {
cases.push({ [f.name]: f.min }, { [f.name]: f.max });
}
});
return cases;
}
