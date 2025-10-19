enum ResistorColor {
  black = 0,
  brown = 1,
  red = 2,
  orange = 3,
  yellow = 4,
  green = 5,
  blue = 6,
  violet = 7,
  grey = 8,
  white = 9,
}

function colorToValue(color: ResistorColor): number {
  return color;
}

function calculateResistance(bands: ResistorColor[]): number {
  if (bands.length < 3) {
    throw new Error('Invalid number of bands');
  }

  const significantDigits = colorToValue(bands[0]) * 10 + colorToValue(bands[1]);
  const multiplier = 10 ** colorToValue(bands[2]);
  const resistance = significantDigits * multiplier;

  return resistance;
}

// Example usage
const resistorBands: ResistorColor[] = [
  ResistorColor.brown,
  ResistorColor.black,
  ResistorColor.red,
];

const resistanceValue = calculateResistance(resistorBands);
console.log(`Resistance value: ${resistanceValue} ohms`);