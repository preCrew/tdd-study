import { QueryClient, QueryClientProvider, UseQueryResult, useQuery } from "react-query";
import { render, screen } from "@testing-library/react";
import UserList from "./UserList";

interface WrapperProps {
  children: React.ReactNode
}

//리액트쿼리 mock
jest.mock("react-query");


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});


const wrapper = ({ children }: WrapperProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);


describe("UserList component", () => {
  it("데이터 fetch 확인", () => {
    const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>; // usequery함수 mock
    mockUseQuery.mockReturnValue({ isLoading: true } as UseQueryResult<any>); // loading값 true인지

    render(<UserList />, { wrapper });
  });
  
});