import {ConfigProvider, DatePicker, Select} from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
const m = {
  'en': enUS,
  'cn': zhCN
}
const GeneralSettings = () => {
  // const s = locale();
  // const data = ConfigProvider;
  // console.log(data.ConfigContext);
  return (
    <div>
      <h1>General</h1>
      <DatePicker/>
      <Select
        onSelect={(value, option) => {
          localStorage.setItem('language', value);

          // @ts-ignore
          window.changeLocale(m[value])

        }}
        defaultValue={localStorage.getItem('language') || 'en'}
        options={[
          {
            label: 'English',
            value: 'en',
          },
          {
            label: 'Chinese',
            value: 'cn',
          },
        ]}
      />
    </div>
  );
};

export default GeneralSettings;
