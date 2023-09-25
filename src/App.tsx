// import SaveRequestModal from './libs/modal/request/save.tsx';
// import SaveRequestModalPage from "./pages/modal/request/save.tsx";
import {ConfigProvider, RadioChangeEvent} from 'antd';
// import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import {Suspense, useState} from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';

import routes from '~react-pages';

import Index from './components/Settings';
import type { Locale } from 'antd/es/locale';
function traverseTree(tree: any, currentPath = '', paths: any = []) {
  if (tree instanceof Array) {
    tree.forEach((node) => {
      const subPath = `${currentPath}/${node.path}`;
      traverseTree(node.children, subPath, paths);
    });
  } else if (typeof tree === 'object') {
    Object.keys(tree).forEach((key) => {
      const subPath = `${currentPath}/${key}`;
      traverseTree(tree[key], subPath, paths);
    });
  } else {
    // 当遍历到最底层时，将当前路径添加到结果数组中
    paths.push(currentPath);
  }
  return paths;
}

const App = () => {
  const nav = useNavigate();
  const [locale, setLocal] = useState<Locale>(enUS);

  // TODO setting 组件调用这个方法
  // @ts-ignore
  window.changeLocale = (value) => {
    // const localeValue = e.target.value;
    setLocal(value);
  };
  return (
    <div>
      <ConfigProvider locale={locale}>
        <div style={{ padding: 0, minHeight: 360 }}>
          <Index />
          <div>
            {traverseTree(routes).map((i: any, key: any) => {
              return (
                <a
                  onClick={() => {
                    nav(`${i}`);
                  }}
                  key={key}
                >
                  {i}
                </a>
              );
            })}
          </div>
          <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default App;
