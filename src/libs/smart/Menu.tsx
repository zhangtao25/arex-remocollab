import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Space, theme, Typography } from 'antd';
import { FC, ReactNode } from 'react';

const { Text } = Typography;

const Li = styled.li`
  list-style: none;
  padding: 5px 12px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colorBgTextHover};
    border-radius: ${({ theme }) => theme.borderRadius}px;
  }
`;
const { useToken } = theme;
const SmartMenu: FC<{
  defaultActiveKey?: string;
  items: { key: string; label: ReactNode }[];
  onChange: (key: string) => void;
}> = ({ items, onChange, defaultActiveKey }) => {
  const { token } = useToken();
  return (
    <ul
      css={css`
        margin: 0;
        padding: 0;
      `}
    >
      {items.map(({ key, label }) => {
        return (
          <Li
            css={css`
              background-color: ${key === defaultActiveKey
                ? token.colorBgTextHover
                : 'none'};
            `}
            key={key}
            onClick={() => {
              onChange(key);
            }}
          >
            <Space>
              <Text>{label}</Text>
            </Space>
          </Li>
        );
      })}
    </ul>
  );
};

export default SmartMenu;
