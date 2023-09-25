import { css } from '@emotion/react';
import { Menu, Modal } from 'antd';
import { useState } from 'react';

import t1 from '../../assets/imgs/t1.svg';
import ThemeSettings from './Theme.tsx';
import GeneralSettings from "./General.tsx";

const Settings = () => {
  const [selectedKey, setSelectedKey] = useState('General');
  return (
    <Modal
      width={850}
      open={true}
      footer={false}
      css={css`
        .ant-modal-content {
          padding: 0 !important;
          border-radius: 5px;
          overflow: hidden;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          height: 600px;
          .ant-menu-light.ant-menu-root.ant-menu-vertical {
            border-inline-end: none !important;
          }
        `}
      >
        <Menu
          onSelect={(e) => {
            setSelectedKey(e.key);
          }}
          css={css`
            width: 228px;
            padding: 32px 24px;
            background-color: #f9f9f9;
            margin-right: 32px;
          `}
          selectedKeys={[selectedKey]}
          items={[
            {
              label: 'General',
              key: 'General',
            },
            {
              label: 'Theme',
              key: 'Theme',
            },
            {
              label: 'About',
              key: 'About',
            },
          ]}
        />
        <div>
          {selectedKey === 'General' && <GeneralSettings/>}
          {selectedKey === 'Theme' && <ThemeSettings />}
        </div>
      </div>
    </Modal>
  );
};

export default Settings;
