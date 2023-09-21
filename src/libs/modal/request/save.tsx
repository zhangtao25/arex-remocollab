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
      <div
        css={css`
          &:hover {
            text-decoration:underline;
            cursor: pointer;
          }
        `}
      >
        New Folder
      </div>
      <Space>
        <Button type={'primary'}>确认</Button>
        <Button>返回</Button>
      </Space>
    </div>
  );
};
const SaveRequestModal: FC<{ open: boolean }> = ({ open }) => {
  const list = [
    {
      name: 'test',
    },
    {
      name: 'test',
    },
    {
      name: 'test',
    },
  ];

  return (
    <Modal title={'SAVE REQUEST'} width={650} open={open} footer={<Footer />}>
      <Input placeholder={'Request name'} />

      <div>Save to Select a collection/folder</div>

      <Input prefix={<SearchOutlined className='site-form-item-icon' />} />

      <div
        css={css`
          border: 1px solid #eee;
        `}
      >
        {list.map((item, index) => {
          return (
            <div
              key={index}
              css={css`
                display: flex;
                justify-content: space-between;
                .xiaojiantou {
                  display: none;
                }
                &:hover {
                  background-color: #eee;
                  cursor: pointer;
                  .xiaojiantou {
                    display: inline;
                  }
                }
              `}
            >
              <span>{item.name}</span>
              <span className={'xiaojiantou'}>小箭头</span>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default SaveRequestModal;
