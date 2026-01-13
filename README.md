# 🎰 Lotto Zahlengenerator

Ein moderner Lotto-Zahlengenerator mit JavaScript, der zufällige Zahlen kombiniert und speichert.

## Features

✨ **Funktionen:**
- 🎲 Generiere zufällige Lotto-Kombinationen (6 Zahlen + Bonuszahl)
- 💾 Automatisches Speichern aller Kombinationen im Browser (localStorage)
- 📊 Übersichtliche Darstellung aller gespeicherten Kombinationen
- 🗑️ Einzelne Kombinationen oder alle auf einmal löschen
- 📱 Responsive Design für Mobil und Desktop
- 🌍 Deutsche Benutzeroberfläche

## Installation

Einfach die Dateien in einem beliebigen Verzeichnis platzieren und die `index.html` im Browser öffnen.

```bash
# Keine Installation notwendig!
# Einfach index.html im Browser öffnen
open index.html
```

## Verwendung

### Per Benutzeroberfläche

1. Öffne `index.html` im Browser
2. Gib die Anzahl der gewünschten Kombinationen ein
3. Klicke auf "Generieren" oder nutze einen der Quick-Buttons
4. Alle Kombinationen werden automatisch gespeichert und angezeigt

### Programmatisch (JavaScript)

```javascript
// Neue Instanz erstellen
const lotto = new LottoGenerator(6, 49, 10);

// Einzelne Kombination generieren und speichern
const combo = lotto.generateAndSave(1);
console.log(combo);

// Mehrere Kombinationen auf einmal
const combos = lotto.generateAndSave(5);

// Alle gespeicherten Kombinationen abrufen
const all = lotto.getAllCombinations();

// Kombination formatieren für Anzeige
lotto.getAllCombinations().forEach(combo => {
  console.log(lotto.formatCombination(combo));
});

// Alles löschen
lotto.clearCombinations();
```

## Dateien

- **index.html** - Benutzeroberfläche mit allen Styles
- **lotto.js** - Haupt-JavaScript-Klasse für die Lotto-Logik
- **README.md** - Diese Datei

## Technologie

- **HTML5** - Struktur
- **CSS3** - Responsive Design mit Gradienten
- **JavaScript (ES6+)** - Lotto-Logik und Interaktion
- **localStorage** - Persistente Speicherung

## Konfiguration

Die Standardeinstellungen sind:
- **6 Zahlen** pro Kombination
- **Zahlenbereich: 1-49**
- **Bonuszahl: 1-10**

Um andere Einstellungen zu verwenden:

```javascript
const lotto = new LottoGenerator(
  6,   // Anzahl der Zahlen
  49,  // Maximale Zahlenwert
  10   // Maximale Bonuszahl
);
```

## API-Referenz

### LottoGenerator

#### Konstruktor
```javascript
new LottoGenerator(numberCount, maxNumber, bonusNumber)
```

#### Methoden

| Methode | Beschreibung | Rückgabe |
|---------|-------------|---------|
| `generateCombination()` | Generiert eine Zahlenkombi | Object |
| `generateAndSave(count)` | Generiert und speichert Kombinationen | Array |
| `getAllCombinations()` | Gibt alle gespeicherten Kombinationen | Array |
| `saveCombination(combo)` | Speichert eine Kombination | - |
| `deleteCombination(id)` | Löscht eine Kombination nach ID | - |
| `clearCombinations()` | Löscht alle Kombinationen | - |
| `formatCombination(combo)` | Formatiert für Anzeige | String |

## Speicherung

Die Kombinationen werden im **localStorage** des Browsers gespeichert. Das bedeutet:
- ✅ Daten bleiben auch nach Neuladen erhalten
- ✅ Jeder Browser hat seinen eigenen Speicher
- ✅ Lager ist bei Browsern typischerweise 5-10MB
- ❌ Daten werden bei Cookie-Löschung entfernt

## Browser-Unterstützung

Alle modernen Browser:
- Chrome/Chromium
- Firefox
- Safari
- Edge

## Lizenz

MIT License - Frei verwendbar