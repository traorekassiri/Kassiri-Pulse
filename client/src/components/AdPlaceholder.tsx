import { cn } from "@/lib/utils";

interface AdPlaceholderProps {
  className?: string;
  format?: "horizontal" | "rectangle" | "sidebar";
}

export function AdPlaceholder({ className, format = "horizontal" }: AdPlaceholderProps) {
  return (
    <div
      className={cn(
        "bg-secondary/50 border border-border/80 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground p-4 overflow-hidden relative group",
        format === "horizontal" && "w-full h-[120px] md:h-[90px]",
        format === "rectangle" && "w-full aspect-video max-w-[300px] mx-auto",
        format === "sidebar" && "w-full h-[600px]",
        className
      )}
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')] opacity-10"></div>
      <span className="text-xs font-semibold uppercase tracking-wider mb-1 opacity-70">Publicité</span>
      <span className="text-sm font-medium z-10 text-center">Emplacement AdSense<br/>{format}</span>
    </div>
  );
}
