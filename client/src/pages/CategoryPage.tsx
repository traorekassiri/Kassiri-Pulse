import { Layout } from "@/components/Layout";
import { ArticleCard } from "@/components/ArticleCard";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { useArticlesByCategory } from "@/hooks/use-articles";
import { useRoute } from "wouter";
import { Loader2 } from "lucide-react";

const CATEGORY_LABELS: Record<string, string> = {
  urgent: "Urgent",
  a_la_une: "À la une",
  politique: "Politique",
  economie: "Économie",
  culture: "Culture",
  sport: "Sport",
  sante: "Santé",
  international: "International",
  afrique: "Afrique"
};

export default function CategoryPage() {
  const [, params] = useRoute("/category/:category");
  const category = params?.category || "afrique";
  
  const { data: articles, isLoading, error } = useArticlesByCategory(category);

  const label = CATEGORY_LABELS[category] || category;

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Category Header */}
      <div className="bg-primary text-primary-foreground py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-accent font-bold tracking-widest uppercase text-sm mb-2 block">Rubrique</span>
          <h1 className="text-4xl md:text-6xl font-serif font-black capitalize">{label}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Grid */}
          <div className="lg:col-span-8">
            {error ? (
              <div className="p-8 bg-destructive/10 text-destructive rounded-lg border border-destructive/20 text-center">
                Une erreur s'est produite lors du chargement des articles.
              </div>
            ) : articles && articles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* First article is larger */}
                <div className="col-span-1 sm:col-span-2 mb-4">
                  <ArticleCard article={articles[0]} variant="hero" className="h-[350px] md:h-[450px]" />
                </div>
                {/* Rest of the articles */}
                {articles.slice(1).map(article => (
                  <ArticleCard key={article.id} article={article} variant="grid" />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-muted/50 rounded-xl border border-border border-dashed">
                <p className="text-muted-foreground text-lg">Aucun article n'a encore été publié dans cette rubrique.</p>
              </div>
            )}

            {/* Pagination Placeholder */}
            <div className="mt-12 flex justify-center">
              <button className="px-6 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-colors">
                Charger plus d'articles
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <AdPlaceholder format="rectangle" />
            <AdPlaceholder format="sidebar" className="h-[500px]" />
          </aside>
          
        </div>
      </div>
    </Layout>
  );
}
