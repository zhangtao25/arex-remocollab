import { css } from '@emotion/react';
import { theme } from 'antd';
import { FC, useState } from 'react';
const { useToken } = theme;
interface Item {
  label: string;
  icon: any;
  children: any;
  key: string;
}
const SmartLink: FC<{ items: Item[]; defaultValue: string }> = ({
  items,
  defaultValue,
}) => {
  const { token } = useToken();
  const [activeIndex, setActiveIndex] = useState(defaultValue);
  return (
    <div
      css={css`
        display: flex;
        height: 100%;
      `}
    >
      <div
        css={css`
          border-right: 1px solid ${token.colorBorder};
          height: 100%;
        `}
      >
        {items.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setActiveIndex(item.key);
              }}
              css={css`
                //height: 56px;
                //width: 68px;
                line-height: 2;
                width:100px;
                padding: 10px 0;
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                cursor: pointer;
                background-color: ${item.key === activeIndex
                  ? token.colorFillSecondary
                  : 'none'} !important;
                color: ${item.key === activeIndex
                  ? token.colorText
                  : token.colorTextSecondary};
                border-left: 2px
                  ${item.key === activeIndex
                    ? token.colorPrimary
                    : 'rgba(0,0,0,0)'}
                  solid;
                font-size: 13px;
                &:hover {
                  background-color: ${token.colorFill};
                  color: ${token.colorText};
                }
              `}
            >
              {item.icon}
              {item.label}
            </div>
          );
        })}
      </div>

      {/*展示*/}
      <div
        css={css`
          //border: 1px solid salmon;
          flex: 1;
          padding-left: 10px;
          height: calc(100vh - 130px);
          overflow-y: auto;
        `}
      >
        {items.map((item, index) => {
          return (
            <div
              key={index}
              css={css`
                display: ${item.key === activeIndex ? 'block' : 'none'};
              `}
            >
              {item.children}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SmartLink;
