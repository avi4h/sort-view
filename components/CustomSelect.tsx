import React, { useState, useRef, useEffect } from 'react';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface SelectOption {
  value: any;
  label: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
  id?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, disabled, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (newValue: any) => {
    onChange(newValue);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={selectRef}>
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="w-full bg-[#1F2937] border border-gray-700 text-white text-sm focus:ring-1 focus:ring-teal-500 focus:border-teal-500 flex p-2.5 justify-between items-center text-left disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{selectedOption?.label}</span>
        <ChevronDownIcon className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-[#293241] border border-gray-600 shadow-lg">
          <ul className="max-h-60 overflow-auto py-1 custom-scrollbar">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className="text-white text-sm px-3 py-2 cursor-pointer hover:bg-gray-700"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;