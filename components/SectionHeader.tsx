interface SectionHeaderProps {
  title: string
  subtitle?: string
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      {subtitle && <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">{subtitle}</p>}
    </div>
  )
}
