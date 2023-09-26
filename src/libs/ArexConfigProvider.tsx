import {createContext, useState} from "react";
// import {ConfigProvider} from "antd";
import { ThemeProvider } from '@emotion/react';
import zhCN from 'antd/locale/zh_CN';
import { Button, ConfigProvider, theme } from 'antd';
const { useToken, darkAlgorithm } = theme;

export const ArexConfigContext = createContext({});
export const ArexConfigProvider = ({ children }: any) => {
  const { token } = useToken();
  const [state, setState] = useState(0);
  return (
    <ArexConfigContext.Provider value={{ state, setState }}>
      <ConfigProvider
        locale={zhCN}
        theme={{
          token: {
            colorPrimary: 'peachpuff',
          },
          algorithm: [darkAlgorithm],
        }}
      >
        <ThemeProvider theme={token}>
          {children}
        </ThemeProvider>
      </ConfigProvider>
    </ArexConfigContext.Provider>
  );
};
