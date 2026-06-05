// src/main.tsx
import { ViteReactSSG } from 'vite-react-ssg';
import App from './App';
import './index.css';

// 确保这里没有任何 react-dom/client 的引用
const routes = [
  { path: '/', element: <App lang="en" /> },
  { path: '/ms', element: <App lang="ms" /> }
];

export const createRoot = ViteReactSSG({ routes });