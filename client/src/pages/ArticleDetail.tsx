import { Layout } from "@/components/Layout";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { ArticleCard } from "@/components/ArticleCard";
import { useArticle, useArticles } from "@/hooks/use-articles";
import { useRoute } from "wouter";
import { Loader2, Facebook, Twitter, Linkedin, Share2, Clock, CalendarDays, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function ArticleDetail() {
  const [, params] = useRoute("/article/:category/:slug");
  const category = params?.category || "";
  const slug = params?.slug || "";

  const { data: article, isLoading, error } = useArticle(category, slug);
  const { data: allArticles } = useArticles();

  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentContent, setCommentContent] = useState("");

  const { data: comments } = useQuery({
    queryKey: ["/api/articles", article?.id, "comments"],
    enabled: !!article?.id,
  });

  const commentMutation = useMutation({
    mutationFn: async (newComment: { author: string; content: string }) => {
      await apiRequest("POST", `/api/articles/${article?.id}/comments`, newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles", article?.id, "comments"] });
      setCommentAuthor("");
      setCommentContent("");
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (error || !article) {
    return (
      <Layout>
        <div className="text-center py-32 max-w-2xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-primary mb-4">Article introuvable</h1>
          <p className="text-muted-foreground mb-8 text-lg">L'article que vous recherchez n'existe pas ou a été déplacé.</p>
          <a href="/" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Retour à l'accueil
          </a>
        </div>
      </Layout>
    );
  }

  const dateObj = new Date(article.date);
  const formattedDate = isNaN(dateObj.getTime()) ? article.date : format(dateObj, "dd MMMM yyyy 'à' HH:mm", { locale: fr });
  
  {/* default news stock image fallback */}
  const fallbackImage = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80";
  const imageUrl = article.imageUrl || fallbackImage;

  // Get related articles
  const relatedArticles = allArticles?.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3) || [];

  return (
    <Layout>
      <article className="bg-background">
        {/* Article Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 text-center">
          <span className="inline-block px-3 py-1 bg-[#E11D48] text-white font-bold uppercase tracking-wider rounded-sm text-sm mb-6">
            {article.category.replace('_', ' ')}
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black text-primary leading-tight mb-6 text-balance mx-auto">
            {article.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-3xl mx-auto mb-8 leading-relaxed">
            {article.excerpt}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-muted-foreground border-y border-border py-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">Par Kassiri Pulse</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-border"></div>
            <div className="flex items-center gap-2">
              <CalendarDays size={16} />
              <span>Publié le {formattedDate}</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-border"></div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>5 min de lecture</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-xl bg-muted border border-border">
            <img src={imageUrl} alt={article.title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Content Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Social Share (Desktop Sticky) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-32 flex flex-col gap-4 items-center">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest rotate-180" style={{ writingMode: 'vertical-rl' }}>Partager</span>
                <div className="w-px h-8 bg-border"></div>
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors"><Facebook size={18} /></button>
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-colors"><Twitter size={18} /></button>
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors"><Linkedin size={18} /></button>
                <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors"><Share2 size={18} /></button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-7">
              <div className="prose prose-lg prose-red max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {article.content}
                </ReactMarkdown>
              </div>
              
              {/* Comments Section */}
              <div className="mt-16 pt-10 border-t border-border">
                <h3 className="text-2xl font-black text-primary uppercase mb-8">Laissez un commentaire</h3>
                
                <form 
                  className="space-y-4 mb-10 bg-muted/30 p-6 rounded-xl border border-border"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (commentAuthor && commentContent) {
                      commentMutation.mutate({ author: commentAuthor, content: commentContent });
                    }
                  }}
                >
                  <div className="grid grid-cols-1 gap-4">
                    <input 
                      type="text" 
                      placeholder="Votre nom" 
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-accent outline-none transition-all"
                      required
                    />
                    <textarea 
                      placeholder="Votre commentaire..." 
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-accent outline-none transition-all h-32"
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={commentMutation.isPending}
                    className="flex items-center gap-2 bg-[#E11D48] text-white px-8 py-3 rounded-full font-bold hover:bg-[#BE123C] transition-all disabled:opacity-50"
                  >
                    {commentMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                    Publier le commentaire
                  </button>
                </form>

                <div className="space-y-6">
                  {comments && (comments as any[]).length > 0 ? (
                    (comments as any[]).map((c) => (
                      <div key={c.id} className="border-b border-border pb-6">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-bold text-foreground">{c.author}</h4>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(c.date), "dd MMM yyyy", { locale: fr })}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{c.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground italic">Soyez le premier à commenter cet article.</p>
                  )}
                </div>
              </div>

              {/* Bottom Ad */}
              <div className="mt-12 pt-8 border-t border-border">
                <AdPlaceholder format="horizontal" />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-10">
              <AdPlaceholder format="rectangle" />
              
              <div className="bg-muted/30 p-6 rounded-xl border border-border/50">
                <h3 className="font-serif text-2xl font-bold text-primary mb-6 border-b border-border pb-3">
                  À lire aussi
                </h3>
                <div className="flex flex-col gap-6">
                  {relatedArticles.map(rel => (
                    <ArticleCard key={rel.id} article={rel} variant="list" className="py-0 border-0" />
                  ))}
                </div>
              </div>

              <AdPlaceholder format="sidebar" />
            </aside>
          </div>
        </div>
      </article>
    </Layout>
  );
}
