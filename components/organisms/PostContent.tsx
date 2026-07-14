'use client'

import { useEffect, useRef } from 'react'

interface PostContentProps {
  content: string
}

export default function PostContent({ content }: PostContentProps) {
  const articleRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let cancelled = false

    async function renderMermaidDiagrams() {
      const article = articleRef.current
      if (!article) return

      const codeBlocks = article.querySelectorAll<HTMLElement>('pre > code.language-mermaid')
      if (codeBlocks.length === 0) return

      const { default: mermaid } = await import('mermaid')
      if (cancelled) return

      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: 'neutral',
      })

      const diagrams: HTMLElement[] = []

      codeBlocks.forEach((codeBlock, index) => {
        const pre = codeBlock.parentElement
        if (!pre) return

        const diagram = document.createElement('div')
        diagram.className = 'mermaid'
        diagram.id = `mermaid-diagram-${index}`
        diagram.textContent = codeBlock.textContent ?? ''
        pre.replaceWith(diagram)
        diagrams.push(diagram)
      })

      try {
        await mermaid.run({ nodes: diagrams, suppressErrors: false })
      } catch (error) {
        console.error('Mermaid diagram rendering failed:', error)
      }
    }

    void renderMermaidDiagrams()

    return () => {
      cancelled = true
    }
  }, [content])

  return (
    <article
      ref={articleRef}
      className="prose prose-lg max-w-none
        prose-headings:text-[#1D1D1F] prose-headings:tracking-tight
        prose-a:text-[#0071E3] prose-a:no-underline hover:prose-a:underline
        prose-img:rounded-2xl prose-img:shadow-lg
        prose-blockquote:border-[#0071E3] prose-blockquote:text-[#6E6E73]"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
