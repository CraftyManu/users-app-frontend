export const pretty = (value: unknown): string => JSON.stringify(value, null, 2);

export const toJson = (text: string): unknown => {
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("El body debe contener JSON válido.");
  }
};

export const methodClass = (method: string): string => `method ${method.toLowerCase()}`;
