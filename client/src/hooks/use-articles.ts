import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

// Fetch all articles
export function useArticles() {
  return useQuery({
    queryKey: [api.articles.list.path],
    queryFn: async () => {
      const res = await fetch(api.articles.list.path);
      if (!res.ok) throw new Error("Erreur lors de la récupération des articles");
      const data = await res.json();
      return api.articles.list.responses[200].parse(data);
    },
  });
}

// Fetch articles by category
export function useArticlesByCategory(category: string) {
  return useQuery({
    queryKey: [api.articles.getByCategory.path, category],
    queryFn: async () => {
      const url = buildUrl(api.articles.getByCategory.path, { category });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Erreur lors de la récupération de la catégorie");
      const data = await res.json();
      return api.articles.getByCategory.responses[200].parse(data);
    },
    enabled: !!category,
  });
}

// Fetch a single article
export function useArticle(category: string, slug: string) {
  return useQuery({
    queryKey: [api.articles.get.path, category, slug],
    queryFn: async () => {
      const url = buildUrl(api.articles.get.path, { category, slug });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Erreur lors de la récupération de l'article");
      const data = await res.json();
      return api.articles.get.responses[200].parse(data);
    },
    enabled: !!category && !!slug,
  });
}
