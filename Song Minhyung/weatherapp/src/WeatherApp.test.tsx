import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

describe('APP', () => {
  it('최초에 fallback으로 loading 그려주고 그 후 날씨 정보 가져오는지', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    render(<App />, { wrapper });

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();

    expect(await screen.findByText(/cloud: Clouds/i)).toBeInTheDocument();
    expect(await screen.findByText(/temp: 123.456/i)).toBeInTheDocument();
    expect(await screen.findByText(/humidity: 60/i)).toBeInTheDocument();
  });
});
