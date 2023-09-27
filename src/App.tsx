import { Suspense, useState } from 'react';
import { useRoutes } from 'react-router-dom';

import routes from '~react-pages';

import Settings from './components/Settings';
import { ArexConfigProvider } from './libs/ArexConfigProvider.tsx';

const App = () => {
  const [open, setOpen] = useState(false);
  function onClose() {
    setOpen(false);
  }

  return (
    <div>
      <ArexConfigProvider>
        <div style={{ padding: 0, minHeight: 360 }}>
          <Settings open={open} onClose={onClose} />
          <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
        </div>
      </ArexConfigProvider>
    </div>
  );
};

export default App;
