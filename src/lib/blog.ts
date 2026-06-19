import { supabase } from "./supabase";

export type BlogCategory = "All" | "设计知识" | "项目故事";

export interface BlogPost {
  id: string;
  createdAt: string;
  updatedAt?: string;
  author?: string;
  content?: string;
  excerpt?: string;
  image?: string;
  publishedAt?: string;
  tags?: string;
  title?: string;
  featured?: boolean;
  slug?: string;
}

/** * 列表页使用的轻量级类型
 */
export type BlogPostSummary = Omit<BlogPost, "content">;

/**
 * 获取所有已发布的文章（按发布时间倒序）
 */
export async function listPosts(category: BlogCategory = "All"): Promise<BlogPostSummary[]> {
  if (!supabase) {
    console.warn("[blog] Supabase 客户端未初始化");
    return [];
  }

  // 1. 基础查询与大写列名别名映射
  let query = supabase
    .from("KovaTable")
    .select(`
      id, 
      slug, 
      title, 
      excerpt, 
      image, 
      author, 
      tags, 
      featured, 
      createdAt:"createdAt", 
      updatedAt:"updatedAt", 
      publishedAt:"publishedAt"
    `);

  // 2. 严格的时间与发布状态过滤 (注意: 驼峰字段在过滤器中必须使用 '""' 包裹)
  query = query
    .not('"publishedAt"', "is", null)
    .lte('"publishedAt"', new Date().toISOString())
    .order('"publishedAt"', { ascending: false });

  const { data, error } = await query;

  if (error) {
    console.error("[blog] listPosts 失败:", error.message);
    return [];
  }

  // 【核心调试日志】在此处打印回传的数据，帮助你在浏览器控制台一眼看清是否拿到了数据
  console.log("[blog] 从 KovaTable 成功获取到的原始数据包:", data);
  
  return (data ?? []) as BlogPostSummary[];
}

/**
 * 根据 slug 获取单篇文章内容
 */
export async function getPost(slug: string): Promise<BlogPost | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("KovaTable")
    .select(`
      id, 
      slug, 
      title, 
      excerpt, 
      content, 
      image, 
      author, 
      tags, 
      featured, 
      createdAt:"createdAt", 
      updatedAt:"updatedAt", 
      publishedAt:"publishedAt"
    `)
    .eq("slug", slug)
    .not('"publishedAt"', "is", null)
    .maybeSingle();

  if (error) {
    console.error("[blog] getPost 失败:", error.message);
    return null;
  }
  return (data ?? null) as BlogPost | null;
}

/** 格式化日期显示 ("12 March 2025") */
export function formatPostDate(iso: string | undefined | null, locale = "en-MY"): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}