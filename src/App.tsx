// import SaveRequestModal from './libs/modal/request/save.tsx';
// import SaveRequestModalPage from "./pages/modal/request/save.tsx";
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import routes from '~react-pages';

function traverseTree(tree:any, currentPath = '', paths:any = []) {
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
  return (
    <div>
      <div style={{ padding: 0, minHeight: 360 }}>
        <div>
          {traverseTree(routes).map((i:any,key:any) => {
            return <a href={i} key={key}>{i}</a>;
          })}
        </div>
        <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
      </div>
    </div>
  );
};

export default App;
