import { Link } from "wouter";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { ArticleResponse } from "@shared/routes";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: ArticleResponse;
  variant?: "hero" | "grid" | "list" | "compact";
  className?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  urgent: "bg-red-600 text-white",
  a_la_une: "bg-primary text-primary-foreground",
  politique: "bg-blue-800 text-white",
  economie: "bg-amber-600 text-white",
  culture: "bg-purple-700 text-white",
  sport: "bg-emerald-600 text-white",
  sante: "bg-cyan-600 text-white",
  international: "bg-slate-800 text-white",
};

const CATEGORY_LABELS: Record<string, string> = {
  urgent: "Urgent",
  a_la_une: "À la une",
  politique: "Politique",
  economie: "Économie",
  culture: "Culture",
  sport: "Sport",
  sante: "Santé",
  international: "International",
};

export function ArticleCard({ article, variant = "grid", className }: ArticleCardProps) {
  const dateObj = new Date(article.date);
  const formattedDate = isNaN(dateObj.getTime()) ? article.date : format(dateObj, "dd MMM yyyy", { locale: fr });
  
  const categoryLabel = CATEGORY_LABELS[article.category] || article.category;
  const categoryColor = CATEGORY_COLORS[article.category] || "bg-primary text-primary-foreground";

  {/* default news stock image fallback */}
  const fallbackImage = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80";
  const imageUrl = article.imageUrl || fallbackImage;

  if (variant === "hero") {
    return (
      <Link href={`/article/${article.category}/${article.slug}`} className={cn("group relative block w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl", className)}>
        <img src={imageUrl} alt={article.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col items-start">
          <span className={cn("px-3 py-1 text-xs font-bold uppercase tracking-wider rounded mb-4", categoryColor)}>
            {categoryLabel}
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-3 group-hover:text-accent transition-colors text-balance leading-tight">
            {article.title}
          </h2>
          <p className="text-gray-200 text-sm md:text-base mb-4 line-clamp-2 md:line-clamp-3 max-w-3xl">
            {article.excerpt}
          </p>
          <div className="flex items-center text-gray-300 text-xs md:text-sm font-medium">
            <span>{formattedDate}</span>
            <span className="mx-2">•</span>
            <span>5 min de lecture</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "list") {
    return (
      <Link href={`/article/${article.category}/${article.slug}`} className={cn("group flex flex-col sm:flex-row gap-4 md:gap-6 items-start py-6 border-b border-border/60 last:border-0", className)}>
        <div className="w-full sm:w-1/3 aspect-video sm:aspect-[4/3] rounded-lg overflow-hidden shrink-0 relative">
          <img src={imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute top-2 left-2 z-10 sm:hidden">
            <span className={cn("px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded shadow-sm", categoryColor)}>
              {categoryLabel}
            </span>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between h-full">
          <div>
            <div className="hidden sm:flex items-center gap-3 mb-2">
              <span className={cn("px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded", categoryColor)}>
                {categoryLabel}
              </span>
              <span className="text-xs text-muted-foreground font-medium">{formattedDate}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
              {article.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
              {article.excerpt}
            </p>
          </div>
          <div className="sm:hidden text-xs text-muted-foreground font-medium mt-auto">
            {formattedDate}
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/article/${article.category}/${article.slug}`} className={cn("group flex gap-4 items-center py-3 border-b border-border/40 last:border-0", className)}>
        <div className="w-20 h-20 rounded-md overflow-hidden shrink-0">
          <img src={imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold text-accent uppercase tracking-wider mb-1 block">
            {categoryLabel}
          </span>
          <h4 className="text-sm font-serif font-bold text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2">
            {article.title}
          </h4>
          <span className="text-[11px] text-muted-foreground mt-1 block">{formattedDate}</span>
        </div>
      </Link>
    );
  }

  // Grid default
  return (
    <Link href={`/article/${article.category}/${article.slug}`} className={cn("group flex flex-col h-full bg-card rounded-xl overflow-hidden border border-border/50 hover-elevate", className)}>
      <div className="w-full aspect-[3/2] overflow-hidden relative">
        <img src={imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute top-3 left-3 z-10">
          <span className={cn("px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded shadow-md", categoryColor)}>
            {categoryLabel}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="text-xs text-muted-foreground font-medium mb-3 flex items-center">
          <span>{formattedDate}</span>
        </div>
        <h3 className="text-xl font-serif font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-3 line-clamp-3">
          {article.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mt-auto">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}
