// import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
// import { Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import { useMemo } from 'react';

import CollectionTitle from './CollectionTitle.tsx';

import treeData from '../../../mock.json'
import {postmanToAntdTreeData} from "../../../helpers";
const CollectionMenus = () => {
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const genTreeData = useMemo(() => {
    const loop = (data: DataNode[]): DataNode[] =>
      data.map((item) => {
        const title = (
          <CollectionTitle data={item}/>
        );
        if (item.children) {
          return { title, key: item.key, children: loop(item.children) };
        }

        return {
          title,
          key: item.key,
        };
      });
    return loop(postmanToAntdTreeData(treeData));
  }, [treeData]);

  return (
    <div>
      <Tree
        blockNode={true}
        motion={false}
        showLine
        switcherIcon={<DownOutlined />}
        defaultExpandAll
        onSelect={onSelect}
        treeData={genTreeData}
      />
    </div>
  );
};

export default CollectionMenus;
