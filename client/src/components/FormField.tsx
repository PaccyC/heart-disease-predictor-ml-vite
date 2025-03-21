
import { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}

const FormField = ({ label, htmlFor, error, children }: FormFieldProps) => {
  return (
    <div className="mb-6">
      <label 
        htmlFor={htmlFor} 
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FormField;
