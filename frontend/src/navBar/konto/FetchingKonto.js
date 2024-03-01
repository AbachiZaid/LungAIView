import React, { useState, useEffect, useContext } from "react";
import Konto from "./Konto";
import AuthContext from "../../store/auth-context";

const FetchingKonto = () => {
  const [user, setUser] = useState({});
  const authCtx = useContext(AuthContext);

  // console.log(authCtx.id);
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
      <Konto user={user} />
    </div>
  );
};

export default FetchingKonto;
