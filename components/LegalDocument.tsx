import type { ReactNode } from "react";

export const articleBodyClassName =
  "space-y-10 text-left [&_a]:text-white [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:text-white/80 [&_h4]:mb-3 [&_h4]:mt-0 [&_h4]:text-xl [&_h4]:font-bold [&_h4]:text-white [&_li]:leading-relaxed [&_li]:text-white/85 [&_p]:mb-4 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-white/85 [&_p]:md:text-lg [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-white [&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6";

interface ArticleHeaderProps {
  title: string;
  subtitle: string;
  meta?: ReactNode;
}

export function ArticleHeader({ title, subtitle, meta }: ArticleHeaderProps) {
  return (
    <header className="mb-12 border-b border-white/10 pb-10 text-center">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
        {title}
      </h1>
      <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/70">
        {subtitle}
      </p>
      {meta}
    </header>
  );
}

interface ArticleSectionProps {
  title: string;
  children: ReactNode;
}

export function ArticleSection({ title, children }: ArticleSectionProps) {
  return (
    <section>
      <h4>{title}</h4>
      {children}
    </section>
  );
}

interface LegalDocumentProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalDocument({
  title,
  subtitle,
  lastUpdated,
  children,
}: LegalDocumentProps) {
  return (
    <article className="min-h-screen py-16">
      <div className="container max-w-3xl">
        <ArticleHeader
          title={title}
          subtitle={subtitle}
          meta={
            <p className="mt-6 text-sm italic text-white/50">
              Last updated: {lastUpdated}
            </p>
          }
        />

        <div className={articleBodyClassName}>{children}</div>
      </div>
    </article>
  );
}

/** @deprecated Use ArticleSection instead */
export const LegalSection = ArticleSection;
