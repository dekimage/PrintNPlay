interface RichTextRendererProps {
  content: string
}

export function RichTextRenderer({ content }: RichTextRendererProps) {
  // Simple markdown-like rendering
  // In a real app, you'd use a proper markdown parser like react-markdown
  const renderContent = (text: string) => {
    return text.split("\n\n").map((paragraph, index) => (
      <p key={index} className="mb-4 last:mb-0">
        {paragraph}
      </p>
    ))
  }

  return <div className="prose prose-invert max-w-none">{renderContent(content)}</div>
}
