import { Layout } from "@/components/Layout";
import { ArticleCard } from "@/components/ArticleCard";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { useArticles } from "@/hooks/use-articles";
import heroImg from "@assets/IMG_4514_1772611942534.webp";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Home() {
  const { data: articles, isLoading, error } = useArticles();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (articles && articles.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.min(articles.length, 5));
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [articles]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  // Fallback dynamic grouping
  const sliderArticles = articles.slice(0, 5);
  const trendingList = articles.slice(5, 10);

  const categories = ["urgent", "politique", "economie", "culture", "sport", "sante", "international"];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-16">
        
        {/* SLIDE SHOW - DERNIÈRES ACTUALITÉS TOUTES CATÉGORIES */}
        <section className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden group shadow-2xl">
          {sliderArticles.map((article, index) => (
            <div 
              key={article.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000",
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
            >
              <img src={article.imageUrl || heroImg} className="w-full h-full object-cover" alt={article.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-16">
                <span className="inline-block px-4 py-1 bg-[#E11D48] text-white text-xs font-bold uppercase mb-4 self-start rounded-sm shadow-lg">
                  {article.category.replace('_', ' ')}
                </span>
                <Link href={`/article/${article.category}/${article.slug}`}>
                  <h2 className="text-2xl md:text-5xl font-black text-white hover:text-accent transition-colors leading-tight mb-4 cursor-pointer drop-shadow-md">
                    {article.title}
                  </h2>
                </Link>
                <p className="text-white/80 line-clamp-2 md:text-xl max-w-2xl mb-6 hidden md:block">
                  {article.excerpt}
                </p>
                <Link href={`/article/${article.category}/${article.slug}`}>
                  <button className="bg-[#E11D48] text-white px-8 py-3 rounded-full font-bold self-start hover:bg-[#BE123C] transition-all transform hover:scale-105 shadow-xl">
                    Lire l'article
                  </button>
                </Link>
              </div>
            </div>
          ))}
          
          <div className="absolute bottom-6 right-8 z-20 flex gap-2">
            {sliderArticles.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentSlide(i)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all border border-white/30",
                  i === currentSlide ? "bg-[#E11D48] w-8 border-transparent" : "bg-white/50"
                )}
              />
            ))}
          </div>
        </section>

        {/* AFFICHAGE DYNAMIQUE PAR CATÉGORIE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-16">
            {categories.map((cat) => {
              const catArticles = articles
                .filter(a => a.category === cat)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
              
              if (catArticles.length === 0) return null;

              const mainArticle = catArticles[0];
              const subArticles = catArticles.slice(1, 4);

              return (
                <section key={cat} className="space-y-6">
                  <div className="flex items-center justify-between border-b-2 border-primary/10">
                    <h2 className="text-xl font-black text-white bg-[#E11D48] px-4 py-2 uppercase inline-block shadow-sm">
                      {cat.replace('_', ' ')}
                    </h2>
                    <Link href={`/category/${cat}`} className="text-sm font-bold text-[#E11D48] hover:underline flex items-center gap-1 transition-all">
                      Voir plus <ChevronRight size={14} />
                    </Link>
                  </div>

                  <div className="space-y-8">
                    {/* Article Principal - Grand Format */}
                    <ArticleCard article={mainArticle} variant="grid" className="md:scale-100" />
                    
                    {/* Articles Secondaires - Petit Format */}
                    <div className="grid grid-cols-1 gap-6">
                      {subArticles.map(article => (
                        <ArticleCard key={article.id} article={article} variant="list" className="py-2" />
                      ))}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 space-y-10">
            <div className="sticky top-24 space-y-10">
              <AdPlaceholder format="rectangle" />
              
              <div className="bg-card border border-border/60 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-black text-foreground mb-6 pb-2 border-b-2 border-[#E11D48] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-pulse"></span>
                  EN CONTINU
                </h3>
                <div className="flex flex-col gap-4 divide-y divide-border/40">
                  {trendingList.map(article => (
                    <ArticleCard key={article.id} article={article} variant="compact" />
                  ))}
                </div>
              </div>

              <AdPlaceholder format="sidebar" className="h-[600px]" />
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
