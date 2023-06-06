import { Suspense } from 'react';
import WeatherApp from './WeatherApp';

function App() {
  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <WeatherApp />
      </Suspense>
    </>
  );
}

export default App;
