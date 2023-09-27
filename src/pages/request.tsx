import { css } from '@emotion/react';
import { Allotment } from 'allotment';
import { Button } from 'antd';
import { useContext, useState } from 'react';

import { ArexConfigContext } from '../libs/ArexConfigProvider.tsx';
import CollectionMenus from '../libs/menus/collection';
import SaveRequestModal from '../libs/modal/request/save.tsx';
import treeData from '../mock.json';
const Request = () => {
  const [open, setOpen] = useState(false);
  const { state, setState } = useContext(ArexConfigContext);
  function onChangeTheme(theme) {
    setState({
      ...state,
      bgColor: theme,
    });
  }
  function onChangeLocale(locale) {
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
          {['cn', 'en', 'light', 'dark'].map((item,index) => {
            return (
              (['cn', 'en'].includes(item) ? locale : theme) === item && (
                <Button
                  key={index}
                  onClick={() => {
                    if (['cn', 'en'].includes(item)) {
                      onChangeLocale(item == 'cn' ? 'en' : 'cn');
                    } else {
                      onChangeTheme(item == 'light' ? 'dark' : 'light');
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
