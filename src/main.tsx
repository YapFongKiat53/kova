// src/main.tsx
import { ViteReactSSG } from 'vite-react-ssg';
import { lazy } from 'react';
import App from './App';
import { Home } from './pages/Home';
import './index.css';

// 将按需加载的组件移到这里
const Blog = lazy(() => import("./pages/Blog").then((m) => ({ default: m.Blog })));
const BlogPost = lazy(() => import("./pages/BlogPost").then((m) => ({ default: m.BlogPost })));

// 使用嵌套路由结构：App 作为根节点，页面作为其 children
const routes = [
  {
    path: '/',
    element: <App />, 
    children: [
      { index: true, element: <Home /> }, 
      { path: 'bidai', element: <Home /> }, 
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogPost /> },
      { path: 'bidai/jurnal', element: <Blog /> },
      { path: 'bidai/jurnal/:slug', element: <BlogPost /> },
      { path: '*', element: <Home /> } 
    ]
  }
];

export const createRoot = ViteReactSSG({ routes });