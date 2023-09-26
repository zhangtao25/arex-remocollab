import { css } from '@emotion/react';
import { Button, Menu, Modal } from 'antd';
import { useContext, useState } from 'react';

import t1 from '../../assets/imgs/t1.svg';
import { ArexConfigContext } from '../../libs/ArexConfigProvider.tsx';
import GeneralSettings from './General.tsx';
import ThemeSettings from './Theme.tsx';

const Settings = ({ open, onClose }) => {
  // const { state, setState } = useContext(ArexConfigContext);
  const [selectedKey, setSelectedKey] = useState('General');
  return (
    <Modal
      onCancel={onClose}
      width={850}
      open={open}
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
          {selectedKey === 'General' && <GeneralSettings />}
          {selectedKey === 'Theme' && <ThemeSettings />}
        </div>
        <Button
          onClick={() => {
            // setState({
            //   ...state,
            //   accentColor: 'red',
            // });
          }}
        >update</Button>
      </div>
    </Modal>
  );
};

export default Settings;
