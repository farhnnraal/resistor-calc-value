import React, { useState } from 'react';
import "./App.css";
import { ResistorColor, colorNames } from './resistorUtils';

const colors = colorNames.map((name, idx) => ({ name, value: idx as ResistorColor }));

// Ring labels for 4 and 5 ring resistors
const ringLabels: { [key: number]: string[] } = {
  4: ['1st Value', '2nd Value', 'Multiplier', 'Tolerance'],
  5: ['1st Value', '2nd Value', '3rd Value', 'Multiplier', 'Tolerance'],
};

// Helper function to format resistance
const formatResistance = (value: number): string => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2).replace(/\.00$/, '')}GΩ`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2).replace(/\.00$/, '')}MΩ`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(2).replace(/\.00$/, '')}kΩ`;
  return `${value}Ω`;
};

const ResistorCalculator: React.FC = () => {
  const [selectedColors, setSelectedColors] = useState<ResistorColor[]>(Array(5).fill(null));
  const [resistanceValue, setResistanceValue] = useState<string>('');
  const [ringCount, setRingCount] = useState<number>(4);

  const handleColorChange = (color: ResistorColor, index: number) => {
    const newColors = [...selectedColors];
    newColors[index] = color;
    setSelectedColors(newColors);
  };

  const handleCalculate = () => {
    try {
      const activeColors = selectedColors.slice(0, ringCount);
      if (activeColors.includes(null)) {
        setResistanceValue('Please select all colors');
        return;
      }

      let value = 0;
      if (ringCount === 4) {
        // For 4 bands: first two digits + multiplier
        value = (activeColors[0] * 10 + activeColors[1]) * Math.pow(10, activeColors[2]);
      } else {
        // For 5 bands: first three digits + multiplier
        value = (activeColors[0] * 100 + activeColors[1] * 10 + activeColors[2]) * Math.pow(10, activeColors[3]);
      }

      setResistanceValue(formatResistance(value));
    } catch (error) {
      setResistanceValue('Invalid selection');
    }
  };

  const getTextColorClass = (colorName: string, isSelected: boolean) => {
    if (!isSelected) return 'text-gray-100';
    return ['Yellow', 'White', 'Gold'].includes(colorName) ? '!text-black' : '!text-white';
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-900 text-gray-100">
      <div className="flex flex-col items-center justify-center w-full p-6 mx-auto gap-2">
        <h1 className="text-3xl font-bold text-center text-red-400">Resistor Resistance Calculator</h1>
        
        <div className="flex flex-row items-center justify-center w-full gap-4 p-4">
          <label className="text-center">Select Number of Rings:</label>
          <select
            value={ringCount}
            onChange={(e) => setRingCount(Number(e.target.value))}
            className="text-center bg-gray-800 rounded-lg py-2 px-4 text-white"
          >
            <option value={4}>4 Rings</option>
            <option value={5}>5 Rings</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:flex md:flex-row gap-2 w-full justify-items-center">
          {Array.from({ length: ringCount }).map((_, index) => (
            <div key={index} className="flex flex-col items-center w-full bg-gray-800 py-4 px-2 rounded-2xl gap-2">
              <p className="text-center font-semibold min-h-[64px] align-middle w-full">
                Ring {index + 1} ({ringLabels[ringCount][index]})
              </p>
              {colors.map((color) => (
                <button
                  key={color.name}
                  className={`w-full md:w-[120px] !text-black p-2 rounded ${
                    selectedColors[index] === color.value 
                      ? getTextColorClass(color.name, true)
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-100'
                  }`}
                  style={selectedColors[index] === color.value ? { backgroundColor: color.name.toLowerCase() } : {}}
                  onClick={() => handleColorChange(color.value, index)}
                >
                  {color.name}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="flex justify-center w-full py-4">
          <button
            className="rounded w-full bg-red-600 hover:bg-red-700 text-black py-2"
            onClick={handleCalculate}
          >
            Calculate
          </button>
        </div>

        <div className="mt-4 flex flex-col items-center w-full">
          <p className="text-xl font-semibold text-center">Resistance Value:</p>
          <p className="text-2xl font-mono text-center text-red-400">{resistanceValue}</p>
        </div>
      </div>
    </div>
  );
};

export default ResistorCalculator;
