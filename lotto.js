/**
 * Lotto-Zahlengenerator
 * Generiert Lotto-Kombinationen und speichert diese lokal
 */

class LottoGenerator {
  constructor(numberCount = 6, maxNumber = 49, bonusNumber = 10) {
    this.numberCount = numberCount;
    this.maxNumber = maxNumber;
    this.bonusNumber = bonusNumber;
    this.combinations = this.loadCombinations();
    this.useSmartFilters = true; // Filter für häufig gespielte Kombinationen
  }

  /**
   * Setzt die Verwendung von intelligenten Filtern
   * @param {boolean} enabled - Filter aktivieren/deaktivieren
   */
  setSmartFilters(enabled) {
    this.useSmartFilters = enabled;
  }

  /**
   * Prüft ob eine Kombination häufig gespielt wird
   * @param {Array} numbers - Array mit Zahlen
   * @returns {boolean} true wenn die Kombination vermieden werden sollte
   */
  isCommonPattern(numbers) {
    // 1. Arithmetische Sequenzen vermeiden (z.B. 1,2,3,4,5,6)
    if (this.isArithmeticSequence(numbers)) {
      return true;
    }

    // 2. Geburtstag-Muster vermeiden (1-31 für Tage, 1-12 für Monate)
    if (this.isBirthdayPattern(numbers)) {
      return true;
    }

    // 3. Zu viele Zahlen aus dem gleichen Bereich vermeiden
    if (this.isBiasedRange(numbers)) {
      return true;
    }

    // 4. Zu viele gerade oder ungerade Zahlen vermeiden
    if (this.isOddEvenBiased(numbers)) {
      return true;
    }

    // 5. Beliebte Muster vermeiden (z.B. 7, 11, 13, 21, 42 - "Glückszahlen")
    if (this.containsLuckyNumbers(numbers)) {
      // Nur warnen, nicht blockieren
      return false;
    }

    return false;
  }

  /**
   * Prüft auf arithmetische Sequenzen (1,2,3 oder 10,20,30)
   */
  isArithmeticSequence(numbers) {
    if (numbers.length < 3) return false;

    for (let i = 0; i < numbers.length - 2; i++) {
      const diff1 = numbers[i + 1] - numbers[i];
      const diff2 = numbers[i + 2] - numbers[i + 1];
      
      // Wenn Differenzen gleich sind und mindestens 3 Zahlen
      if (diff1 === diff2 && diff1 > 0) {
        return true;
      }
    }
    return false;
  }

  /**
   * Prüft auf Geburtstags-Muster
   */
  isBirthdayPattern(numbers) {
    // Zähle wie viele Zahlen typische Geburtstags-Zahlen sind (1-31)
    const birthdayNumbers = numbers.filter(n => n >= 1 && n <= 31);
    const monthNumbers = numbers.filter(n => n >= 1 && n <= 12);

    // Wenn sehr viele Zahlen im Geburtstags-Bereich
    if (birthdayNumbers.length >= 4) {
      return true;
    }

    // Wenn ein Muster wie Tag-Monat erkannt wird (z.B. 25, 12 für 25.12.)
    if (birthdayNumbers.length >= 2 && monthNumbers.length >= 1) {
      return true;
    }

    return false;
  }

  /**
   * Prüft ob Zahlen zu sehr in einen Bereich konzentriert sind
   */
  isBiasedRange(numbers) {
    const sorted = [...numbers].sort((a, b) => a - b);
    const firstHalf = sorted.filter(n => n <= this.maxNumber / 2).length;
    const secondHalf = sorted.length - firstHalf;

    // Wenn alle oder 5 von 6 Zahlen in einer Hälfte
    if (firstHalf >= 5 || secondHalf >= 5) {
      return true;
    }

    return false;
  }

  /**
   * Prüft auf Ungerade/Gerade Bias
   */
  isOddEvenBiased(numbers) {
    const oddCount = numbers.filter(n => n % 2 !== 0).length;
    const evenCount = numbers.length - oddCount;

    // Wenn 5 oder 6 Zahlen ungerade oder gerade
    if (oddCount >= 5 || evenCount >= 5) {
      return true;
    }

    return false;
  }

  /**
   * Prüft auf zu viele "Glückszahlen"
   */
  containsLuckyNumbers(numbers) {
    const luckyNumbers = [7, 11, 13, 21, 42]; // Beliebte Glückszahlen
    const count = numbers.filter(n => luckyNumbers.includes(n)).length;
    return count >= 3; // Warnung wenn 3+ Glückszahlen
  }

  /**
   * Generiert eine zufällige Lotto-Kombination mit optionalen Filtern
   * @returns {Object} Objekt mit regulären Zahlen und Bonuszahl
   */
  generateCombination() {
    let numbers;
    let attempts = 0;
    const maxAttempts = 100;

    do {
      numbers = this.generateRandomNumbers(
        this.numberCount,
        this.maxNumber
      );
      attempts++;
    } while (
      this.useSmartFilters &&
      this.isCommonPattern(numbers) &&
      attempts < maxAttempts
    );

    const bonus = Math.floor(Math.random() * this.bonusNumber) + 1;

    return {
      numbers: numbers,
      bonus: bonus,
      timestamp: new Date().toISOString(),
      id: Date.now(),
    };
  }

  /**
   * Generiert mehrere zufällige unterschiedliche Zahlen
   * @param {number} count - Anzahl der Zahlen
   * @param {number} max - Maximale Zahl (inklusive)
   * @returns {Array} Array mit sortierten Zahlen
   */
  generateRandomNumbers(count, max) {
    const numbers = new Set();

    while (numbers.size < count) {
      numbers.add(Math.floor(Math.random() * max) + 1);
    }

    return Array.from(numbers).sort((a, b) => a - b);
  }

  /**
   * Speichert eine Kombination lokal
   * @param {Object} combination - Die zu speichernde Kombination
   */
  saveCombination(combination) {
    this.combinations.push(combination);
    this.saveCombinationsToStorage();
  }

  /**
   * Speichert mehrere Kombinationen
   * @param {number} count - Anzahl der zu generierenden Kombinationen
   * @returns {Array} Array der generierten Kombinationen
   */
  generateAndSave(count = 1) {
    const newCombinations = [];

    for (let i = 0; i < count; i++) {
      const combination = this.generateCombination();
      this.saveCombination(combination);
      newCombinations.push(combination);
    }

    return newCombinations;
  }

  /**
   * Speichert Kombinationen im localStorage
   */
  saveCombinationsToStorage() {
    try {
      localStorage.setItem(
        "lottoCombinations",
        JSON.stringify(this.combinations)
      );
    } catch (error) {
      console.error("Fehler beim Speichern der Kombinationen:", error);
    }
  }

  /**
   * Lädt Kombinationen aus dem localStorage
   * @returns {Array} Array der gespeicherten Kombinationen
   */
  loadCombinations() {
    try {
      const stored = localStorage.getItem("lottoCombinations");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Fehler beim Laden der Kombinationen:", error);
      return [];
    }
  }

  /**
   * Gibt alle gespeicherten Kombinationen zurück
   * @returns {Array} Array aller Kombinationen
   */
  getAllCombinations() {
    return this.combinations;
  }

  /**
   * Löscht alle gespeicherten Kombinationen
   */
  clearCombinations() {
    this.combinations = [];
    this.saveCombinationsToStorage();
  }

  /**
   * Löscht eine bestimmte Kombination nach ID
   * @param {number} id - Die ID der zu löschenden Kombination
   */
  deleteCombination(id) {
    this.combinations = this.combinations.filter((c) => c.id !== id);
    this.saveCombinationsToStorage();
  }

  /**
   * Formatiert eine Kombination für die Anzeige
   * @param {Object} combination - Die zu formatierende Kombination
   * @returns {string} Formatierte Kombinationszeichenkette
   */
  formatCombination(combination) {
    const numbersStr = combination.numbers.join(", ");
    const date = new Date(combination.timestamp).toLocaleString("de-DE");
    return `${numbersStr} | Bonus: ${combination.bonus} (${date})`;
  }
}

// Exportieren für Node.js/Module
if (typeof module !== "undefined" && module.exports) {
  module.exports = LottoGenerator;
}
