import { css } from '@emotion/react';
import { Radio, RadioChangeEvent } from 'antd';
import { useState } from 'react';

// import t1 from '../../assets/imgs/t1.svg';
// import t2 from '../../assets/imgs/t2.svg';
// import t3 from '../../assets/imgs/t3.svg';

const ThemeSettings = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  return (
    <div>
      <h1>Theme</h1>
      <br />
      <Radio.Group
        css={css`
          //display: flex;
          .ant-radio-wrapper {
            //display: flex;
            //flex-direction: column-reverse;
            //align-items: unset;
            //justify-content: space-between;
            //text-align: left;
            //align-items: end;
          }
        `}
        onChange={onChange}
        value={value}
      >
        <Radio value={1}>
          伴随系统
          {/*<img src={t1} alt='' />*/}
        </Radio>
        <Radio value={2}>
          明亮
          {/*<img src={t2} alt='' />*/}
        </Radio>
        <Radio value={3}>
          黑暗
          {/*<img src={t3} alt='' />*/}
        </Radio>
      </Radio.Group>
    </div>
  );
};

export default ThemeSettings;
