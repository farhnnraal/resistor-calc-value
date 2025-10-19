export enum ResistorColor {
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
  gold = -1, // For multiplier 0.1
  silver = -2, // For multiplier 0.01
}

export const colorNames: string[] = [
  'Black',
  'Brown',
  'Red',
  'Orange',
  'Yellow',
  'Green',
  'Blue',
  'Violet',
  'Grey',
  'White',
  'Gold',
  'Silver',
];

export function colorToValue(color: ResistorColor): number {
  return color;
}

export function getMultiplierValue(color: ResistorColor): number {
  switch (color) {
    case ResistorColor.black: return 1;
    case ResistorColor.brown: return 10;
    case ResistorColor.red: return 100;
    case ResistorColor.orange: return 1000;
    case ResistorColor.yellow: return 10000;
    case ResistorColor.green: return 100000;
    case ResistorColor.blue: return 1000000;
    case ResistorColor.violet: return 10000000;
    case ResistorColor.grey: return 100000000;
    case ResistorColor.white: return 1000000000;
    case ResistorColor.gold: return 0.1;
    case ResistorColor.silver: return 0.01;
    default: throw new Error('Invalid multiplier color');
  }
}

export function calculateResistance(bands: ResistorColor[]): { value: number; tolerance?: number } {
  if (bands.length < 3) {
    throw new Error('Invalid number of bands');
  }

  let value: number;
  if (bands.length === 4) {
    // 4-band resistor: 2 digits + multiplier + tolerance
    value = (colorToValue(bands[0]) * 10 + colorToValue(bands[1])) * getMultiplierValue(bands[2]);
  } else {
    // 5-band resistor: 3 digits + multiplier + tolerance
    value = (colorToValue(bands[0]) * 100 + colorToValue(bands[1]) * 10 + colorToValue(bands[2])) * 
            getMultiplierValue(bands[3]);
  }

  let tolerance: number | undefined;
  const toleranceIndex = bands.length >= 4 ? bands.length - 1 : undefined;
  if (toleranceIndex !== undefined) {
    switch (bands[toleranceIndex]) {
      case ResistorColor.brown: tolerance = 1; break;
      case ResistorColor.red: tolerance = 2; break;
      case ResistorColor.orange: tolerance = 3; break;
      case ResistorColor.yellow: tolerance = 4; break;
      case ResistorColor.green: tolerance = 0.5; break;
      case ResistorColor.blue: tolerance = 0.25; break;
      case ResistorColor.violet: tolerance = 0.1; break;
      case ResistorColor.grey: tolerance = 0.05; break;
      case ResistorColor.gold: tolerance = 5; break;
      case ResistorColor.silver: tolerance = 10; break;
      default: tolerance = undefined;
    }
  }

  return { value, tolerance };
}