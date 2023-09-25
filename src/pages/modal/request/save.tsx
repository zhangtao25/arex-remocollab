import { Button } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SaveRequestModal from '../../../libs/modal/request/save.tsx';
// import treeData from '../../mocks/treeData.json';
import treeData from '../../../mock.json';
const SaveRequestModalPage = () => {
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();
  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Save As
      </Button>
      {/*treeData是postman类型，需要转一下*/}
      <SaveRequestModal
        treeData={treeData}
        open={open}
        requestName={''}
        onCreateFolder={() => {}}
        onSave={(data) => {}}
        onClose={()=>{
          setOpen(false)
        }}
      />
    </div>
  );
};

export default SaveRequestModalPage;
