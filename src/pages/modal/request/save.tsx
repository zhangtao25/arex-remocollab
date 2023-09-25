import type { DataNode } from 'antd/es/tree';

import SaveRequestModal from '../../../libs/modal/request/save.tsx';
// import treeData from '../../mocks/treeData.json';

import treeData from '../../../mock.json'
import {Button} from "antd";
import {useState} from "react";
const SaveRequestModalPage = () => {
  const [open,setOpen] = useState(true)
  return <div>
    <Button onClick={()=>{
      setOpen(true)
    }}>Save</Button>
    {/*treeData是postman类型，需要转一下*/}
    <SaveRequestModal treeData={treeData} open={open} />
  </div>;
};

export default SaveRequestModalPage;
