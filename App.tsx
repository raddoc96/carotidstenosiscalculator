
import React, { useState, useMemo, useCallback } from 'react';
import { StenosisInputs, VisualFinding, StenosisResult } from './types';
import { gradeStenosis } from './services/stenosisGrader';
import Header from './components/Header';
import ResultCard from './components/ResultCard';

const VISUAL_FINDING_OPTIONS = [
  { id: VisualFinding.NORMAL, label: 'Normal (No Plaque Visible)' },
  { id: VisualFinding.PLAQUE_VISIBLE, label: 'Plaque Visible' },
  { id: VisualFinding.NEAR_OCCLUSION, label: 'Suggests Near Occlusion (Markedly Narrowed Lumen)' },
  { id: VisualFinding.TOTAL_OCCLUSION, label: 'Suggests Total Occlusion (No Flow Detected)' },
];

const NumberInput: React.FC<{
  label: string;
  unit: string;
  name: keyof StenosisInputs;
  value: number | null;
  onChange: (name: keyof StenosisInputs, value: number | null) => void;
  disabled: boolean;
  placeholder?: string;
}> = ({ label, unit, name, value, onChange, disabled, placeholder }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = e.target.value === '' ? null : parseFloat(e.target.value);
    onChange(name, num);
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="number"
          id={name}
          name={name}
          value={value ?? ''}
          onChange={handleChange}
          disabled={disabled}
          className="block w-full pr-12 sm:text-sm rounded-md border-slate-300 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
          placeholder={placeholder || ''}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{unit}</span>
        </div>
      </div>
    </div>
  );
}

const App: React.FC = () => {
  const initialState: StenosisInputs = {
    visualFinding: null,
    psv: null,
    edv: null,
    ccaPsv: null,
  };
  const [inputs, setInputs] = useState<StenosisInputs>(initialState);

  const handleInputChange = useCallback((name: keyof StenosisInputs, value: number | null) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleVisualFindingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({ ...prev, visualFinding: e.target.value as VisualFinding }));
  };
  
  const handleReset = () => {
    setInputs(initialState);
  }

  const result: StenosisResult = useMemo(() => gradeStenosis(inputs), [inputs]);
  
  const areMeasurementsDisabled = inputs.visualFinding !== VisualFinding.PLAQUE_VISIBLE;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-8">
            <h2 className="text-xl font-bold text-slate-800 border-b pb-3">Patient Parameters</h2>

            {/* Visual Assessment */}
            <fieldset>
              <legend className="text-lg font-semibold text-slate-700 mb-3">1. Visual Assessment</legend>
              <div className="space-y-3">
                {VISUAL_FINDING_OPTIONS.map(option => (
                  <div key={option.id} className="flex items-center">
                    <input
                      id={option.id}
                      name="visualFinding"
                      type="radio"
                      value={option.id}
                      checked={inputs.visualFinding === option.id}
                      onChange={handleVisualFindingChange}
                      className="h-4 w-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                    />
                    <label htmlFor={option.id} className="ml-3 block text-sm font-medium text-slate-700">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>

            {/* Doppler Measurements */}
            <fieldset className={`transition-opacity duration-300 ${areMeasurementsDisabled ? 'opacity-50' : 'opacity-100'}`}>
              <legend className="text-lg font-semibold text-slate-700 mb-3">2. Doppler Measurements</legend>
              <div className="space-y-4">
                <NumberInput label="ICA Peak Systolic Velocity (PSV)" unit="cm/s" name="psv" value={inputs.psv} onChange={handleInputChange} disabled={areMeasurementsDisabled} placeholder="e.g. 150"/>
                <NumberInput label="ICA End-Diastolic Velocity (EDV)" unit="cm/s" name="edv" value={inputs.edv} onChange={handleInputChange} disabled={areMeasurementsDisabled} placeholder="e.g. 60"/>
                <NumberInput label="CCA Peak Systolic Velocity (PSV)" unit="cm/s" name="ccaPsv" value={inputs.ccaPsv} onChange={handleInputChange} disabled={areMeasurementsDisabled} placeholder="e.g. 80"/>
              </div>
            </fieldset>
            
            <button 
                onClick={handleReset}
                className="mt-4 w-full bg-slate-600 text-white font-bold py-2 px-4 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
            >
                Reset
            </button>
          </div>

          {/* Result Panel */}
          <div>
            <ResultCard result={result} />
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-xs text-slate-500">
        <p>This tool is for informational purposes and is not a substitute for professional medical judgment. All data is processed locally in your browser.</p>
        <p>&copy; {new Date().getFullYear()} World-Class Senior Frontend React Engineer</p>
      </footer>
    </div>
  );
}

export default App;
