import { CaretRightOutlined, FolderOutlined, SearchOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Button, Input, Modal, Space, theme, Typography } from 'antd';
import { FC } from 'react';

const { Text } = Typography;
const { useToken } = theme;
const Footer = () => {
  const token = useToken();
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
      `}
    >
      <div
        css={css`
          color: ${token.token.colorTextSecondary};
          &:hover {
            text-decoration: underline;
            cursor: pointer;
          }
        `}
      >
        New Folder
      </div>

      <Space>
        <Button type={'primary'}>Save</Button>
        <Button>Cancel</Button>
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
  const token = useToken();
  return (
    <Modal title={'SAVE REQUEST'} width={650} open={open} footer={<Footer />} closeIcon={false}>
      {/*<p>触发覆盖率聚合</p>*/}

      <div
        css={css`
          margin-bottom: 20px;
        `}
      >
        <Text
          type={'secondary'}
          strong
          css={css`
            display: block;
            padding: 10px 0;
          `}
        >
          Request name
        </Text>
        <Input />
      </div>

      <Space
        css={css`
          //display: block;
          //padding: 10px 0;
          margin-bottom: 10px;
        `}
      >
        <span
          css={css`
            color: rgb(107, 107, 107);
            font-weight: 500;
          `}
        >
          Save to
        </span>
        <span
          css={css`
            color: rgb(166, 166, 166);
          `}
        >
          Select a collection/folder
        </span>
      </Space>

      <Input prefix={<SearchOutlined className='site-form-item-icon' />} />

      <div
        css={css`
          transform: translateY(-5px);
          border: 1px solid ${token.token.colorBorder};
          border-bottom-left-radius: ${token.token.borderRadius}px;
          border-bottom-right-radius: ${token.token.borderRadius}px;
          border-top: none;
          height: 360px;
          margin-bottom: 30px;
          padding-top: 5px;
        `}
      >
        {list.map((item, index) => {
          return (
            <div
              key={index}
              css={css`
                padding: 0 10px;
                height: 40px;
                line-height: 40px;
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
              <Space>
                <FolderOutlined
                  css={css`
                    font-size: 16px;
                  `}
                />
                <span>{item.name}</span>
              </Space>
              <span className={'xiaojiantou'}>
                <CaretRightOutlined />
              </span>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default SaveRequestModal;
