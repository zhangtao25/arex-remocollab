import { SearchOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Breadcrumb, Button, Input, Modal, Space, theme, Typography } from 'antd';
import { FC, useMemo, useState } from 'react';

import { ItemType, TreeNode } from '../../token.ts';
import RequestItemDisplay from '../../widgets/RequestItemDisplay.tsx';

function findNodeByName(tree: TreeNode[], nameToFind: string): TreeNode | null {
  for (const node of tree) {
    if (node.name === nameToFind) {
      return node; // 如果找到匹配的节点，返回该节点
    }

    if (node.item) {
      const foundNode = findNodeByName(node.item, nameToFind); // 递归搜索子节点
      if (foundNode) {
        return foundNode; // 如果在子节点中找到匹配的节点，返回该节点
      }
    }
  }

  return null; // 如果没有找到匹配的节点，返回 null
}

function findPathByName(
  tree: TreeNode[],
  nameToFind: string,
  currentPath: string[] = [],
): string[] | null {
  for (const [index, node] of tree.entries()) {
    const nodePath = [...currentPath, node.name]; // 更新当前节点的路径

    if (node.name === nameToFind) {
      return nodePath; // 如果找到匹配的节点，返回路径
    }

    if (node.item) {
      const foundPath = findPathByName(node.item, nameToFind, nodePath); // 递归搜索子节点
      if (foundPath) {
        return foundPath; // 如果在子节点中找到匹配的节点，返回路径
      }
    }
  }

  return null; // 如果没有找到匹配的节点，返回 null
}

const { Text } = Typography;
const { useToken } = theme;
interface FooterProps {
  onClose: () => void;
}
const Footer: FC<FooterProps> = ({ onClose }) => {
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
        <Button
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </Button>
      </Space>
    </div>
  );
};

interface SaveRequestModalProps {
  open: boolean;
  requestName: string;
  treeData: TreeNode[];
  onSave: (folderKey: string) => void;
  onCreateFolder: (newFolderName: string, parentFolderId: string) => void;
  onClose: () => void;
}

const SaveRequestModal: FC<SaveRequestModalProps> = ({
  open,
  treeData,
  requestName,
  onCreateFolder,
  onSave,
  onClose,
}) => {
  const token = useToken();
  const [selectedKey, setSelectedKey] = useState<string | undefined>(undefined);
  const selectedTreeData = useMemo(() => {
    if (selectedKey) {
      return findNodeByName(treeData, selectedKey)?.item || treeData;
    } else {
      return treeData;
    }
  }, [treeData, selectedKey]);

  return (
    <Modal
      title={'SAVE REQUEST'}
      width={650}
      open={open}
      footer={<Footer onClose={onClose} />}
      closeIcon={false}
      onCancel={() => {
        onClose();
      }}
    >
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
            display: flex;
          `}
        >
          {selectedKey ? (
            <Breadcrumb
              items={(findPathByName(treeData, selectedKey) || []).map((i, index) => {
                if (index < (findPathByName(treeData, selectedKey) || []).length - 1) {
                  return {
                    title: (
                      <span
                        css={css`
                          &:hover {
                            text-decoration: underline;
                            cursor: pointer;
                          }
                        `}
                      >
                        {i}
                      </span>
                    ),
                    onClick: () => setSelectedKey(i),
                  };
                }
                return { title: i };
              })}
            />
          ) : (
            <Text type={'secondary'}>Select a collection/folder</Text>
          )}
        </span>
      </Space>

      <Input prefix={<SearchOutlined />} />

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
        {selectedTreeData.map((item, index) => {
          return (
            <div
              onClick={() => {
                if (!item.request) {
                  setSelectedKey(item.name);
                }
              }}
              key={index}
              css={css`
                padding: 0 10px;
                height: 40px;
                line-height: 40px;
                display: flex;
                justify-content: space-between;
                opacity: ${item.request ? 0.4 : 'unset'};
                cursor: ${item.request ? 'default' : 'pointer'};
                .right-arrow {
                  display: none;
                }
                ${!item.request
                  ? `&:hover {
                  background-color: #eee;
                  .right-arrow {
                    display: inline;
                  }
                }`
                  : null}
              `}
            >
              <RequestItemDisplay
                itemType={item.request ? ItemType.REQUEST : ItemType.FOLDER}
                name={item.name}
                request={item.request}
              />
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default SaveRequestModal;
