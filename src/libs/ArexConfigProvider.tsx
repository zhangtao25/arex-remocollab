import { ThemeProvider } from '@emotion/react';
import { ConfigProvider, theme } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import { createContext, useState } from 'react';

import { AccentColors, BgColors, Locales } from './token.ts';

const { useToken, darkAlgorithm } = theme;

const locales = {
  [Locales.cn]: zhCN,
  [Locales.en]: enUS,
};
export const ArexConfigContext = createContext({});
export const ArexConfigProvider = ({ children }: any) => {
  const { token } = useToken();
  const [state, setState] = useState<{
    bgColor: BgColors;
    accentColor: AccentColors;
    locale: Locales;
  }>({
    bgColor: BgColors.dark,
    accentColor: AccentColors.blue,
    locale: Locales.cn,
  });

  function genAlgorithm() {
    if (state.bgColor === 'system') {
      const themeMedia = window.matchMedia('(prefers-color-scheme: light)');
      if (themeMedia.matches) {
        document.body.className = 'light-mode';
        return [];
      } else {
        document.body.className = 'dark-mode';
        return [darkAlgorithm];
      }
    } else if (state.bgColor === 'light') {
      document.body.className = 'light-mode';
      return [];
    } else {
      document.body.className = 'dark-mode';
      return [darkAlgorithm];
    }
  }
  return (
    <ArexConfigContext.Provider value={{ state, setState }}>
      <ConfigProvider
        locale={locales[state.locale]}
        theme={{
          token: {
            colorPrimary: state.accentColor,
          },
          algorithm: genAlgorithm(),
        }}
      >
        <ThemeProvider theme={token}>{children}</ThemeProvider>
      </ConfigProvider>
    </ArexConfigContext.Provider>
  );
};
