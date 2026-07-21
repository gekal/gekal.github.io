'use client'

import { useEffect, useRef } from 'react'
import Box from '@mui/material/Box'

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
      const diagramFigures = new Map<HTMLElement, HTMLElement>()
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      codeBlocks.forEach((codeBlock, index) => {
        const pre = codeBlock.parentElement
        if (!pre) return

        const figure = document.createElement('figure')
        figure.className = 'mermaid-figure'
        figure.setAttribute('aria-label', `フロー図 ${index + 1}`)
        figure.dataset.animationPaused = String(reduceMotion)

        const diagram = document.createElement('div')
        diagram.className = 'mermaid'
        diagram.id = `mermaid-diagram-${index}`
        diagram.textContent = codeBlock.textContent ?? ''
        figure.append(diagram)
        pre.replaceWith(figure)
        diagrams.push(diagram)
        diagramFigures.set(diagram, figure)
      })

      try {
        await mermaid.run({ nodes: diagrams, suppressErrors: false })

        diagrams.forEach((diagram) => {
          const figure = diagramFigures.get(diagram)
          if (!figure) return

          const controls = document.createElement('figcaption')
          controls.className = 'mermaid-controls'

          const button = document.createElement('button')
          button.type = 'button'
          button.className = 'mermaid-animation-toggle'

          const status = document.createElement('span')
          status.className = 'mermaid-animation-status'
          status.setAttribute('aria-live', 'polite')

          const setPaused = (paused: boolean) => {
            figure.dataset.animationPaused = String(paused)
            button.textContent = paused ? '▶ 再生' : '⏸ 一時停止'
            button.setAttribute(
              'aria-label',
              paused ? 'フロー図のアニメーションを再生' : 'フロー図のアニメーションを一時停止',
            )
            button.setAttribute('aria-pressed', String(!paused))
            status.textContent = paused ? 'アニメーション停止中' : 'アニメーション再生中'
          }

          setPaused(reduceMotion)
          button.addEventListener('click', () => {
            setPaused(figure.dataset.animationPaused !== 'true')
          })

          controls.append(button, status)
          figure.append(controls)
        })
      } catch (error) {
        console.error('Mermaid diagram rendering failed:', error)
      }
    }

    void renderMermaidDiagrams()

    return () => {
      cancelled = true
    }
  }, [content])

  // スタイルは app/MarkdownStyles.tsx の .markdown-body が当てている
  return (
    <Box
      component="article"
      ref={articleRef}
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
