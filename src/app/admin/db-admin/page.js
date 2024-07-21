"use client";
import AdminDashboardLayout from "@/app/templates/AdminDashboardLayout";
import React from "react";

import { useEffect, useState } from "react";
import { getUsersService } from "../../services/userService";
import {
  getsRoomService,
  getRoomByLocationService,
} from "../../services/roomService";
import { getsBookingService } from "../../services/bookingService";
import { getsLocationService } from "../../services/locationService";
import ViewCard from "../../(components)/(Admin)/ViewCard";

const DashboardAdmin = () => {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [booking, setBooking] = useState([]);
  const [location, setLocation] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getUsersService().then((res) => setUsers(res));
      await getRoomByLocationService("1").then((res) => setRooms(res));
      await getsBookingService().then((res) => setBooking(res));
      await getsLocationService().then((res) => setLocation(res));
    };
    fetchData();
  }, []);

  return (
    <AdminDashboardLayout>
      <div className="flex flex-row justify-around flex-wrap gap-4">
        <ViewCard
          count={users.length}
          title={"USERS"}
          style={{ background: "#B1C5EA" }}
        />
        <ViewCard
          count={rooms.length}
          title={"ROOMS"}
          style={{ background: "#A4CEEC" }}
        />
        <ViewCard
          count={booking.length}
          title={"BOOK-ROOM"}
          style={{ background: "#32D4CB" }}
        />
        <ViewCard
          count={location.length}
          title={"PLACES"}
          style={{ background: "#ECBBAF" }}
        />
      </div>
    </AdminDashboardLayout>
  );
};

export default DashboardAdmin;
