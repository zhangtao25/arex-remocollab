import { css } from '@emotion/react';
import { Allotment } from 'allotment';
import { Button } from 'antd';
import { useState } from 'react';

import CollectionMenus from '../libs/menus/collection';
import SaveRequestModal from '../libs/modal/request/save.tsx';
// import treeData from '../mock.json';
// import SaveRequestModal from "./modal/request/save.tsx";
import treeData from '../mock.json';
const Request = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <header
        css={css`
          height: 48px;
          border-bottom: 1px solid #e5e7eb;
        `}
      ></header>
      <Allotment
        css={css`
          height: ${'calc(100vh - 80px)'};
        `}
        vertical={false}
        onChange={(sizes) => {
          console.log(sizes);
        }}
      >
        <Allotment.Pane preferredSize={360}>
          <CollectionMenus />
        </Allotment.Pane>
        <Allotment.Pane>
          {/*treeData是postman类型，需要转一下*/}
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            Save As
          </Button>
          <SaveRequestModal
            treeData={treeData}
            open={open}
            requestName={''}
            onCreateFolder={() => {}}
            onSave={(data) => {}}
            onClose={() => {
              setOpen(false);
            }}
          />
        </Allotment.Pane>
      </Allotment>
      <footer
        css={css`
          height: 32px;
          border-top: 1px solid #e5e7eb;
        `}
      />
    </div>
  );
};

export default Request;
