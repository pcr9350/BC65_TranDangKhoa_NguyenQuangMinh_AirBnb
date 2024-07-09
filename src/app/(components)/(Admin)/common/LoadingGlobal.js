import { CircularProgress } from "@mui/material";

const LoadingGlobal = () => {
  return (
    <div
      className="flex flex-col justify-center items-center w-full h-screen"
      style={{
        backdropFilter: "blur(10px)",
      }}
    >
      <p>Loading...</p>
      <CircularProgress size={50} />
    </div>
  );
};

export default LoadingGlobal;
