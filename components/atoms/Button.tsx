'use client'

import Link from 'next/link'
import { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'outline' | 'ghost'

interface CommonProps {
  variant?: ButtonVariant
  children: ReactNode
  className?: string
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>

type ButtonAsLink = CommonProps & {
  href: string
  target?: string
  rel?: string
}

type ButtonProps = ButtonAsButton | ButtonAsLink

function isLink(props: ButtonProps): props is ButtonAsLink {
  return 'href' in props && typeof (props as ButtonAsLink).href === 'string'
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
}

export default function Button(props: ButtonProps) {
  const { variant = 'primary', children, className = '' } = props
  const cls = `${variantClass[variant]} ${className}`

  if (isLink(props)) {
    return (
      <Link href={props.href} target={props.target} rel={props.rel} className={cls}>
        {children}
      </Link>
    )
  }

  const { variant: _v, className: _c, children: _ch, ...btnProps } = props as ButtonAsButton
  return (
    <button className={cls} {...btnProps}>
      {children}
    </button>
  )
}
