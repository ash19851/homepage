/* === 主题 === */
export type ThemeName = 'cyberpunk' | 'matrix' | 'aurora' | 'void' | 'synthwave' | 'minimal-white' | 'glassmorphism' | 'ink-art' | 'memphis';

export interface ThemeInfo {
  key: ThemeName;
  label: string;
  description: string;
}

export const THEMES: ThemeInfo[] = [
  { key: 'cyberpunk', label: '赛博朋克', description: '霓虹末世 · 粉青紫' },
  { key: 'matrix', label: '矩阵', description: '数字雨 · 绿屏黑底' },
  { key: 'aurora', label: '极光', description: '空灵科技 · 渐变流光' },
  { key: 'void', label: '虚空', description: '深空 · 纯白星空' },
  { key: 'synthwave', label: '合成波', description: '复古未来 · 橙粉蓝' },
  { key: 'minimal-white', label: '极简白', description: '素净留白 · 衬线优雅' },
  { key: 'glassmorphism', label: '玻璃幻境', description: '磨砂玻璃 · 流光溢彩' },
  { key: 'ink-art', label: '水墨丹青', description: '东方气韵 · 墨染宣纸' },
  { key: 'memphis', label: '孟菲斯', description: '后现代 · 几何波普' },
];

/* === 内容 === */
export interface Profile {
  id: number;
  name: string;
  title: string;
  bio: string;
  avatar_url: string;
  github_url: string;
  email: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  image_url: string;
  demo_url: string;
  github_url: string;
  category: string;
  featured: boolean;
  sort_order: number;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;
  icon: string;
  sort_order: number;
}

export interface SkillCategory {
  category: string;
  label: string;
  skills: Skill[];
}

/* === 统计 === */
export interface StatsOverview {
  total_visits: number;
  today_visits: number;
  unique_ips: number;
}

export interface StatsTimeline {
  date: string;
  visits: number;
}

export interface StatsPageBreakdown {
  page_path: string;
  count: number;
}

/* === 站点配置 === */
export interface SiteConfig {
  id: number;
  site_name: string;
  footer_text: string;
  footer_github: string;
  footer_email: string;
}

/* === 后台 === */
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface AdminSettings {
  username: string;
  password?: string;
}
