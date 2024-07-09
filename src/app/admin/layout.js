'use client'
import { getData } from "../utils/storage";
import { useEffect, useState } from "react";
import LoadingGlobal from "../(components)/(Admin)/common/LoadingGlobal";
import { Provider, useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/admin/userSlice";
import { getUserService } from "../services/userService";
import { useRouter } from "next/navigation";
import { storeAdmin } from "../redux/storeAdmin";

const AdminLayout = (props) => {
    const [isLoading, setIsLoading] = useState(true);
  const token = getData("token");
  const userId = getData("userId");

  const navigate = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && userId) {
      getUserService(userId).then((data) => dispatch(setUser(data)));
      // return navigate.push("/admin");
    }
    setIsLoading(false);
  }, [token, userId, navigate]);
  return isLoading ? <LoadingGlobal /> : <div>{props.children}</div>;
  
  
}

export default function AdminLayoutWrapper({ children }) {
    return (
      <Provider store={storeAdmin}>
        <AdminLayout>{children}</AdminLayout>
      </Provider>
    );
  }