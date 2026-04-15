'use client'

import { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const inputBase =
  'w-full rounded-xl px-4 py-3 text-[14px] transition-all outline-none ' +
  'border focus:ring-2 focus:ring-[rgba(0,113,227,0.25)] focus:border-[#0071E3]'

const inputLight =
  'bg-[#F5F5F7] border-transparent text-[#1D1D1F] placeholder-[#AEAEB2]'

export default function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`${inputBase} ${inputLight} ${className}`}
      {...props}
    />
  )
}
