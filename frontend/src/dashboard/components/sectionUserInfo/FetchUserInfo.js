import React, { useState, useEffect, useContext } from "react";
import UserInfo from "./UserInfo";
import AuthContext from "../../../store/auth-context";

const FetchUserInfo = () => {
  const [userInfo, setUserInfo] = useState({});
  const authCtx = useContext(AuthContext);

  // console.log(authCtx.id);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:1200/api/v1/users/${authCtx.id}`
        );
        if (!res.ok) {
          throw new Error(`An error occurred: ${res.status}`);
        }
        const data = await res.json();
        setUserInfo(data.data.user);
        console.log(data.data.user.username);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    })();
  }, [authCtx.id]);
  return (
    <div>
      <UserInfo userInfo={userInfo} />
    </div>
  );
};

export default FetchUserInfo;
