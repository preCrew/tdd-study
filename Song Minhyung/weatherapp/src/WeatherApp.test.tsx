import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';

describe('APP', () => {
  it('날씨 정보 가져오는지', async () => {
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
