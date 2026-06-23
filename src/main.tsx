// src/main.tsx
import { lazy } from 'react'; 
import { ViteReactSSG } from 'vite-react-ssg';
import App from './App';
// 首页 (Home) 作为首屏门面，必须保持直接引入！
import { Home } from './pages/Home'; 
import './index.css';
import { Component as LayoutComponent } from "./Layout";


// 将所有非首屏组件改为懒加载
const RollerPage = lazy(() => import('./pages/Roller').then(m => ({ default: m.RollerPage })));
const VenetianPage = lazy(() => import('./pages/Venetian').then(m => ({ default: m.VenetianPage })));
const VertiSheerPage = lazy(() => import('./pages/VertiSheer').then(m => ({ default: m.VertiSheerPage })));
const ProcessPage = lazy(() => import('./pages/ProcessPage').then(m => ({ default: m.ProcessPage })));
const ConfiguratorPage = lazy(() => import('./pages/ConfiguratorPage').then(m => ({ default: m.ConfiguratorPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));
const BlogPost = lazy(() => import('./pages/BlogPost').then(m => ({ default: m.BlogPost })));

// 1. 新增：将 404 页面放入懒加载，分离打包体积
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

// 使用嵌套路由结构：App 作为根节点，页面作为其 children
const routes = [
  {
    path: '/',
    element: <App />, 
    children: [
      { index: true, element: <Home /> }, 
      { path: 'roller', element: <RollerPage /> },
      { path: 'venetian', element: <VenetianPage /> },
      { path: 'vertisheer', element: <VertiSheerPage /> },
      { path: 'process', element: <ProcessPage /> },
      { path: 'configurator', element: <ConfiguratorPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogPost /> },
      
      // Bahasa Malaysia (BM) Routes
      { path: 'bidai', element: <Home /> },
      { path: 'bidai/roller', element: <RollerPage /> },
      { path: 'bidai/venetian', element: <VenetianPage /> },
      { path: 'bidai/vertisheer', element: <VertiSheerPage /> },
      { path: 'bidai/proses', element: <ProcessPage /> },
      { path: 'bidai/reka', element: <ConfiguratorPage /> },
      { path: 'bidai/hubungi', element: <ContactPage /> },
      { path: 'bidai/jurnal', element: <Blog /> },
      { path: 'bidai/jurnal/:slug', element: <BlogPost /> },
      
      // 2. 核心修改：当以上路由全都匹配不到时，渲染 NotFound 组件而不再是 Home
      { path: '*', element: <NotFound /> } 
    ]
  }
];

// 核心终极修复：必须命名为 createRoot ！！！
export const createRoot = ViteReactSSG({ routes });