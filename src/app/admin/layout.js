"use client";
import { storageData } from "../utils/storage";
import { useEffect, useState } from "react";
import LoadingGlobal from "../(components)/(Admin)/common/LoadingGlobal";
import { Provider, useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/admin/userSlice";
import { getUserService } from "../services/userService";
// import { useRouter } from "next/navigation";
import { storeAdmin } from "../redux/storeAdmin";

const AdminLayout = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const token = storageData.getData("token");
  const userId = storageData.getData("userId");

  // const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && userId) {
      getUserService(userId).then((data) => dispatch(setUser(data)));
      // return navigate.push("/admin");
    }
    setIsLoading(false);
  }, [token, userId]);
  return isLoading ? <LoadingGlobal /> : <div>{props.children}</div>;
};

export default function AdminLayoutWrapper({ children }) {
  return (
    <Provider store={storeAdmin}>
      <AdminLayout>{children}</AdminLayout>
    </Provider>
  );
}
