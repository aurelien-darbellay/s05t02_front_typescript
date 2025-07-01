export class EntryTypesFormatter {
  static fromCamelCaseToDisplay(type: string): string {
    // Convert camelCase to display format
    return type
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (c) => c.toUpperCase());
  }
  static fromDisplayToConstant(type: string): string {
    return type.replace(/\s+/g, '_').toUpperCase();
  }
  static fromCamelToConstant(type: string): string {
    // Convert camelCase to CONSTANT_CASE
    return type
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .toUpperCase()
      .replace(/\s+/g, '_');
  }
  static fromPascalToCamel(type: string): string {
    // Convert PascalCase to camelCase
    return type.charAt(0).toLowerCase() + type.slice(1);
  }
  static fromDisplayToCamel(type: string): string {
    // Convert display format to camelCase
    return type
      .trim()
      .split(/\s+/)
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join('');
  }
  static fromListToItem(type: string): string {
    return type.startsWith('LIST_') ? type.slice(5) : type;
  }
  static fromConstantToCamel(input: string): string {
    if (!input) return '';

    const parts = input.toLowerCase().split('_');

    return (
      parts[0] +
      parts
        .slice(1)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('')
    );
  }

  static fromConstantToDisplay(input: string): string {
    if (!input) return '';
    return this.fromCamelCaseToDisplay(this.fromConstantToCamel(input));
  }
}
