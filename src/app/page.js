import LocationList from "./(components)/LocationList";
import SearchTab from "./(components)/SearchTab";
import HomeLayout from "./templates/HomeLayout";
import HomeBottom from "./(components)/HomeBottom";
import { Toaster } from "react-hot-toast";

const Home = () => {
  return (
    <main>
      <HomeLayout>
        <SearchTab />
        <LocationList />
        <HomeBottom />
      </HomeLayout>
    </main>
  );
};

export default Home;
