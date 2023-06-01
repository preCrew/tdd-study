import { useQuery } from "react-query";

const UserList= () => {
    const { data } = useQuery(["Users"], async () => {
        const response = await fetch("https://gorest.co.in/public/v2/users");
        const json = await response.json();
        return json
        //return json.data; 
    });

    return (
      <ul data-testid="users-wrapper">
        {data && 
            data.map((user: any) => (
                <li key={user.id} data-testid={`user-${user.id}`}>
                {user.name}
                </li>
            ))
        }
      </ul>
    );
  }
  
export default UserList