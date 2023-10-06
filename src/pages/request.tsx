import { css } from '@emotion/react';
import { Allotment } from 'allotment';
import { Button } from 'antd';
import { useContext, useState } from 'react';

import { ArexConfigContext } from '../libs/ArexConfigProvider.tsx';
import CollectionMenus from '../libs/menus/collection';
import SaveRequestModal from '../libs/modal/request/save.tsx';
import { BgColors, Locales } from '../libs/token.ts';
import dTreeData from '../mock.json';
import SmartLink from '../libs/smart/Link.tsx';
import Icon from "@ant-design/icons";
import IconsEnvironment from "../libs/icons/Environment.tsx";
import IconsCollection from "../libs/icons/Collection.tsx";

const Request = () => {
  const [treeData, setTreeData] = useState(dTreeData);
  const [open, setOpen] = useState(false);
  const { state, setState } = useContext<any>(ArexConfigContext);
  function onChangeTheme(theme: BgColors) {
    setState({
      ...state,
      bgColor: theme,
    });
  }
  function onChangeLocale(locale: Locales) {
    setState({
      ...state,
      locale: locale,
    });
  }
  const locale = state.locale;
  const theme = state.bgColor;

  return (
    <div>
      <header
        css={css`
          height: 36px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
          border-bottom: 1px solid #e5e7eb;
        `}
      >
        {/*左*/}
        <div>{JSON.stringify(state)}</div>

        {/*右*/}
        <div>
          {['cn', 'en', 'light', 'dark'].map((item, index) => {
            return (
              (['cn', 'en'].includes(item) ? locale : theme) === item && (
                <Button
                  key={index}
                  onClick={() => {
                    if (['cn', 'en'].includes(item)) {
                      onChangeLocale(item === Locales.cn ? Locales.en : Locales.cn);
                    } else {
                      onChangeTheme(item === BgColors.light ? BgColors.dark : BgColors.light);
                    }
                  }}
                  css={css`
                    padding: 0 10px !important;
                    text-align: center;
                    margin-left: 10px;
                  `}
                  size={'small'}
                >
                  {item.toUpperCase()}
                </Button>
              )
            );
          })}
        </div>
      </header>
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

          <SmartLink
            defaultValue={'MenuTypeEnum.Collection'}
            // defaultValue={getMenuTypeByPageType(params.paneType)}
            items={[
              {
                label: 'Collection',
                icon: <Icon component={IconsCollection} />,
                key: 'MenuTypeEnum.Collection',
                children: <CollectionMenus/>,
              },
              {
                label: 'Environment',
                icon: <Icon component={IconsEnvironment} />,
                key: 'MenuTypeEnum.Environment',
                children: (
                  <div />
                ),
              },
            ]}
          />

          {/*<CollectionMenus />*/}
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
            requestName={'test'}
            onCreateFolder={(newFolderName, parentFolderKey) => {
              const id = Math.random().toString(36).substr(2, 9);
              function insertNode(parentID, name) {
                const newNode = {
                  key: id, // 生成一个随机key
                  name: name,
                  item: [], // 新节点没有子节点
                };
                function insertHelper(node) {
                  if (node.key === parentID) {
                    node.item.push(newNode); // 将新节点插入到父节点下
                    return true; // 找到并插入了节点，返回true
                  }
                  if (node.item) {
                    for (let i = 0; i < node.item.length; i++) {
                      if (insertHelper(node.item[i])) {
                        return true; // 递归查找子节点，找到并插入了节点，返回true
                      }
                    }
                  }
                  return false; // 没有找到对应的节点，返回false
                }
                insertHelper({ name: 'root', key: 'root', item: dTreeData }); // 调用辅助函数插入节点
                return dTreeData; // 返回新的treeData
              }
              return new Promise((resolve) => {
                setTimeout(() => {
                  setTreeData(insertNode(parentFolderKey, newFolderName));
                  resolve(id);
                }, 500);
              });
            }}
            onSave={(folderKey, requestName) => {
              console.log(folderKey, requestName);
            }}
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
