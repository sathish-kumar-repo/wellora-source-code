export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

export function capitalizeFirstLetter(input: string): string {
  if (!input) return input; // Return the input if it's empty or falsy
  return (input[0].toUpperCase() + input.slice(1)).trim();
}

export function replaceSlashWithUnderscore(input: string): string {
  return input.replace(/\//g, "_");
}
