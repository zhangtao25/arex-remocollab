import { SearchOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Button, Input, Modal, Space } from 'antd';
import { FC } from 'react';

const Footer = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
      `}
    >
      New Folder
      <Space>
        <Button type={'primary'}>确认</Button>
        <Button>返回</Button>
      </Space>
    </div>
  );
};
const SaveRequestModal: FC<{ open: boolean }> = ({ open }) => {
  return (
    <Modal title={'SAVE REQUEST'} width={650} open={open} footer={<Footer />}>
      <Input placeholder={'Request name'} />

      <div>Save to Select a collection/folder</div>

      <Input prefix={<SearchOutlined className='site-form-item-icon' />} />
    </Modal>
  );
};

export default SaveRequestModal;
