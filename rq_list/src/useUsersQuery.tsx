import { useQuery } from "react-query";

// export const useUsersQuery = () => {
//   const { data, status } = useQuery(["Users"], async () => {
//     const response = await fetch("https://gorest.co.in/public/v2/users");
//     const json = await response.json();
//     return json.data; 
//   });

// };