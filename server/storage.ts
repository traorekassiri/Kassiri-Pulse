import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { type Article, type ContactForm, type Comment, type InsertComment } from '@shared/schema';

export interface IStorage {
  getArticles(): Promise<Article[]>;
  getArticlesByCategory(category: string): Promise<Article[]>;
  getArticle(category: string, slug: string): Promise<Article | undefined>;
  submitContactForm(form: ContactForm): Promise<boolean>;
  getComments(articleId: string): Promise<Comment[]>;
  addComment(articleId: string, comment: InsertComment): Promise<Comment>;
}

export class MarkdownStorage implements IStorage {
  private baseDir: string;
  private comments: Map<string, Comment[]> = new Map();

  constructor() {
    // Assuming we run from the project root
    this.baseDir = path.resolve(process.cwd(), 'articles');
  }

  async getComments(articleId: string): Promise<Comment[]> {
    return this.comments.get(articleId) || [];
  }

  async addComment(articleId: string, insertComment: InsertComment): Promise<Comment> {
    const comments = this.comments.get(articleId) || [];
    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      articleId,
      ...insertComment,
      date: new Date().toISOString(),
    };
    comments.push(newComment);
    this.comments.set(articleId, comments);
    return newComment;
  }

  async getArticles(): Promise<Article[]> {
    const articles: Article[] = [];
    
    if (!fs.existsSync(this.baseDir)) {
      return [];
    }

    const categories = fs.readdirSync(this.baseDir);
    
    for (const category of categories) {
      const categoryPath = path.join(this.baseDir, category);
      if (!fs.statSync(categoryPath).isDirectory()) continue;
      
      const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.md'));
      
      for (const file of files) {
        const filePath = path.join(categoryPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        
        const slug = file.replace('.md', '');
        
        articles.push({
          id: `${category}-${slug}`,
          slug,
          category,
          title: data.title || 'Sans titre',
          date: data.date || new Date().toISOString(),
          excerpt: data.excerpt || '',
          content: content,
          imageUrl: data.imageUrl,
        });
      }
    }
    
    // Sort by date descending
    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async getArticlesByCategory(category: string): Promise<Article[]> {
    const allArticles = await this.getArticles();
    return allArticles.filter(a => a.category === category);
  }

  async getArticle(category: string, slug: string): Promise<Article | undefined> {
    const filePath = path.join(this.baseDir, category, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return undefined;
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    
    return {
      id: `${category}-${slug}`,
      slug,
      category,
      title: data.title || 'Sans titre',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      content: content,
      imageUrl: data.imageUrl,
    };
  }
  
  async submitContactForm(form: ContactForm): Promise<boolean> {
    // In a real app we would send an email here.
    // For now we just return success.
    console.log("Contact form submitted:", form);
    return true;
  }
}

export const storage = new MarkdownStorage();
