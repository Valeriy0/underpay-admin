import React, { useState, useRef, useEffect } from 'react';

export const CustomSelect = ({ title, value, onChange, options = [], placeholder = 'Выберите значение', error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Закрываем дропдаун при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Находим выбранную опцию
  const selectedOption = options.find(option => option.id === value);

  const handleSelect = (option) => {
    onChange(option.id);
    setIsOpen(false);
  };

  return (
    <div className="form-control w-full" ref={dropdownRef}>
      <label className="label">
        <span className="label-text font-medium text-sm lg:text-base">{title}</span>
      </label>
      <div className="dropdown w-full">
        <button 
          type="button"
          tabIndex={0} 
          className={`btn btn-outline w-full justify-between ${error ? 'input-error' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="truncate">
            {selectedOption ? selectedOption.name : placeholder}
          </span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <ul 
            tabIndex={0} 
            className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-full max-h-60 overflow-y-auto border-2 border-primary"
          >
            {options.map((option) => (
              <li 
                key={option.id}
                className={`py-2 px-3 ${option.id === value ? 'bg-primary text-primary-content font-medium' : 'hover:bg-primary/10'}`}
              >
                <button 
                  type="button"
                  className="w-full text-left"
                  onClick={() => handleSelect(option)}
                >
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
}; 