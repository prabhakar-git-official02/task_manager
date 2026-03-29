"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authGetThunk } from "../Thunks/authGetThunk/thunk";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store/reduxStore/store";
import Loading from "../Components/Loading/page";
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.auth.user);

  const AuthStatus = useSelector((state:RootState) => state.auth.status)

  console.log("AuthStatus",AuthStatus)

  const [checked, setChecked] = useState(false); 

 
  useEffect(() => {
    dispatch(authGetThunk()).finally(() => {
      setChecked(true);
    });
  }, [dispatch]);


  useEffect(() => {

    if(AuthStatus === 500) return router.push('/');

    if (!checked) return; 

    if (!user) {
      router.push("../../Client/Auth/Login");
    }
  }, [checked, user, router,AuthStatus]);

 
  if (!checked) return <Loading/>;

  if (!user) return null;

  return <>{children}</>;
}