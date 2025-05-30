import { useRef, useState } from 'react'

interface Props {
  length?: number;
  onComplete?: (code: string) => void;
}

export const CodeInput = ({length = 6, onComplete}: Props) => {

  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;

    if (/^[0-9]$/.test(val)) {
      const newValues = [...values];
      newValues[index] = val;
      setValues(newValues);

      if (index < length - 1) {
        inputs.current[index + 1]?.focus();
      }

      // Si se completan todos los dígitos, llama a onComplete
      if (newValues.every((digit) => digit !== '') && onComplete) {
        onComplete(newValues.join(''));
      }
    } else if (val === '') {
      const newValues = [...values];
      newValues[index] = '';
      setValues(newValues);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const setRef = (index: number) => (el: HTMLInputElement | null) => {
  inputs.current[index] = el;
};

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {values.map((val, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={val}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={setRef(index)}
          className='w-full text-white text-center h-[40px] bg-darkblue rounded-md outline-none focus:border-[1px] focus:border-skycustom text-[11px]'
        />
      ))}
    </div>
  );
}
