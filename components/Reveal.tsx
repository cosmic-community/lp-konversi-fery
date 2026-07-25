'use client'

import { useEffect, useRef, useState } from 'react'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'li' | 'article' | 'header' | 'figure'
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  as = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry && entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const Tag = as as any

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}