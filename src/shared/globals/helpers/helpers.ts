export class Helpers {
  static capitalizeFirstLetter(word: string): string {
    if (word.length === 0) {
      return word;
    }

    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1);

    return firstLetter + restOfWord;
  }

  static lowerCase(word: string) {
    word.toLowerCase();
  }

  static generateRandomIntegers(integerLength: number) {
    const characters = '0123456789';
    let result = '';

    for (let i = 0; i < integerLength; i++) {
      result += characters[Math.floor(Math.random() * characters.length)];
    }

    return parseInt(result, 10);
  }
}
