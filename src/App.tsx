import { Button } from 'antd';
import { Suspense, useState } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';

import routes from '~react-pages';

import Settings from './components/Settings';
import { ArexConfigProvider } from './libs/ArexConfigProvider.tsx';
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
  const [open, setOpen] = useState(false);
  function onClose() {
    setOpen(false);
  }

  return (
    <div>
      <ArexConfigProvider>
        <div style={{ padding: 0, minHeight: 360 }}>
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            打开设置
          </Button>
          <Settings open={open} onClose={onClose} />
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
      </ArexConfigProvider>
    </div>
  );
};

export default App;
