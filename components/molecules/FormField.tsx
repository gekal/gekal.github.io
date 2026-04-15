import { ReactNode } from 'react'

interface FormFieldProps {
  id: string
  label: string
  required?: boolean
  children: ReactNode
}

export default function FormField({ id, label, required = false, children }: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[12px] font-semibold mb-1.5"
        style={{ color: 'var(--text-secondary)' }}
      >
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}
