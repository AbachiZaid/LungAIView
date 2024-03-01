import React, { useState, useEffect, useContext } from "react";
import UpdateProfile from "./UpdateProfile";
import AuthContext from "../../store/auth-context";

const FetchingUpdateProfile = () => {
  const [user, setUser] = useState({});
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `http://127.0.0.1:1200/api/v1/users/${authCtx.id}`
      );
      const data = await res.json();
      setUser(data.data.user);
      console.log(data.data.user.username);
    })();
  }, [authCtx.id]);
  return (
    <div>
      <UpdateProfile user={user} />
    </div>
  );
};

export default FetchingUpdateProfile;
