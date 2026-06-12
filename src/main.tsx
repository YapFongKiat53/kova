// src/main.tsx
import { lazy } from 'react'; // 1. 引入 React.lazy
import { ViteReactSSG } from 'vite-react-ssg';
import App from './App';
// 2. 首页 (Home) 作为首屏门面，必须保持直接引入！
import { Home } from './pages/Home'; 
import './index.css';

// 3. 将所有非首屏组件改为懒加载 (处理了命名导出的情况)
const RollerPage = lazy(() => import('./pages/Roller').then(m => ({ default: m.RollerPage })));
const VenetianPage = lazy(() => import('./pages/Venetian').then(m => ({ default: m.VenetianPage })));
const VertiSheerPage = lazy(() => import('./pages/VertiSheer').then(m => ({ default: m.VertiSheerPage })));
const ProcessPage = lazy(() => import('./pages/ProcessPage').then(m => ({ default: m.ProcessPage })));
const ConfiguratorPage = lazy(() => import('./pages/ConfiguratorPage').then(m => ({ default: m.ConfiguratorPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
// 把最重的 Blog 及其依赖剥离出去
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));
const BlogPost = lazy(() => import('./pages/BlogPost').then(m => ({ default: m.BlogPost })));

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
      
      // 404 Fallback (保持使用加载最快的 Home)
      { path: '*', element: <Home /> } 
    ]
  }
];

// 核心终极修复：必须命名为 createRoot ！！！
export const createRoot = ViteReactSSG({ routes });