import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Consistent page section: max width, horizontal padding, vertical rhythm.
 *
 * Vertical spacing is owned by BOTTOM padding only (mobile-first, stepping up
 * at sm/lg). Sections have no top padding so that, at every boundary, only the
 * section above contributes the gap — this avoids the top+bottom padding
 * compounding into dead space on mobile. The Hero (which has its own bottom
 * padding) owns the gap above the first section. `scroll-mt` keeps anchor jumps
 * clear of the sticky header now that top padding is gone.
 */
export function Section({ id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto w-full max-w-6xl scroll-mt-16 bg-white px-3 pb-8 sm:scroll-mt-20 sm:px-5 sm:pb-12 lg:pb-14",
        className,
      )}
    >
      {children}
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  action?: React.ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  action,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 sm:gap-3",
        align === "center" && "items-center text-center",
        action && "sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-1.5 font-heading text-xl font-semibold tracking-tight text-foreground sm:mt-2 sm:text-2xl lg:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:mt-2.5 sm:text-[0.95rem]">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
