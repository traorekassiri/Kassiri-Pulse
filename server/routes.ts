import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.articles.list.path, async (req, res) => {
    try {
      const articles = await storage.getArticles();
      res.json(articles);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.get(api.articles.getByCategory.path, async (req, res) => {
    try {
      const category = req.params.category;
      const articles = await storage.getArticlesByCategory(category);
      res.json(articles);
    } catch (error) {
      console.error(`Failed to fetch articles for category ${req.params.category}:`, error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.get(api.articles.get.path, async (req, res) => {
    try {
      const { category, slug } = req.params;
      const article = await storage.getArticle(category, slug);
      
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      res.json(article);
    } catch (error) {
      console.error(`Failed to fetch article ${req.params.category}/${req.params.slug}:`, error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.get(api.articles.getComments.path, async (req, res) => {
    try {
      const comments = await storage.getComments(req.params.articleId);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.post(api.articles.addComment.path, async (req, res) => {
    try {
      const comment = await storage.addComment(req.params.articleId, req.body);
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const data = api.contact.submit.input.parse(req.body);
      const success = await storage.submitContactForm(data);
      res.status(200).json({ success });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: error.errors[0].message,
          field: error.errors[0].path.join('.')
        });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  return httpServer;
}
