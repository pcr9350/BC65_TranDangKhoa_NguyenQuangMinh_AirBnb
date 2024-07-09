'use client'
// import { useNavigate } from "react-router-dom";
import { useRouter } from 'next/navigation'

const ViewCard = ({ count, title, style = {} }) => {
  const navigate = useRouter();
  return (
    <div
      className={
        "flex flex-row items-center gap-2  p-5 rounded-md w-full md:w-[49%] justify-center h-[200px] view-card-hover cursor-pointer"
      }
      style={{ ...style }}
      onClick={() => navigate(`/${title?.toLowerCase()}`)}
    >
      <p className="font-bold text-2xl">{count}</p>
      <p className="text-[20px]">{title}</p>
    </div>
  );
};

export default ViewCard;
