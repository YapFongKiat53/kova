// src/main.tsx
import { ViteReactSSG } from 'vite-react-ssg';
import App from './App';
import { Home } from './pages/Home';
import { RollerPage } from './pages/Roller';
import { VenetianPage } from './pages/Venetian';
import { VertiSheerPage } from './pages/VertiSheer';
import { ProcessPage } from './pages/ProcessPage';
import { ConfiguratorPage } from './pages/ConfiguratorPage';
import { ContactPage } from './pages/ContactPage';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import './index.css';

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
      
      // 404 Fallback
      { path: '*', element: <Home /> } 
    ]
  }
];

// 核心终极修复：必须命名为 createRoot ！！！
export const createRoot = ViteReactSSG({ routes });