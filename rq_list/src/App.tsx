import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { useUsersQuery } from "./useUsersQuery";
import UserList from "./UserList";



const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <UserList />
    </QueryClientProvider>
  );
}

export default App;
