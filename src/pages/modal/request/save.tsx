import type { DataNode } from 'antd/es/tree';

import SaveRequestModal from '../../../libs/modal/request/save.tsx';
// import treeData from '../../mocks/treeData.json';

import treeData from '../../../mock.json'
const SaveRequestModalPage = () => {
  return <SaveRequestModal treeData={treeData} open={true} />;
};

export default SaveRequestModalPage;
