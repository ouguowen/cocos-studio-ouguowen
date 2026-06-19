export interface SensitiveWordMatch {
  readonly term: string;
  readonly startIndex: number;
  readonly endIndex: number;
}

export class SensitiveWordFilter {
  public constructor(private readonly blockedTerms: readonly string[]) {}

  public findMatches(input: string): readonly SensitiveWordMatch[] {
    const normalizedInput = input.toLowerCase();
    const matches: SensitiveWordMatch[] = [];

    for (const term of this.blockedTerms) {
      const normalizedTerm = term.toLowerCase();
      let searchIndex = 0;

      while (searchIndex < normalizedInput.length) {
        const foundIndex = normalizedInput.indexOf(normalizedTerm, searchIndex);
        if (foundIndex === -1) {
          break;
        }

        matches.push({
          term,
          startIndex: foundIndex,
          endIndex: foundIndex + normalizedTerm.length,
        });

        searchIndex = foundIndex + normalizedTerm.length;
      }
    }

    return matches.sort((left, right) => left.startIndex - right.startIndex);
  }

  public containsBlockedTerm(input: string): boolean {
    return this.findMatches(input).length > 0;
  }

  public mask(input: string, maskCharacter = "*"): string {
    const characters = input.split("");
    for (const match of this.findMatches(input)) {
      for (let index = match.startIndex; index < match.endIndex; index += 1) {
        characters[index] = maskCharacter;
      }
    }
    return characters.join("");
  }
}
