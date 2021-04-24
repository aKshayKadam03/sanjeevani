import dynamic from "next/dynamic";
import navbar from "../Components/navbar";

const GoodbyeDynamic = dynamic(() => import("../Components/navbar"));

export default function Home() {
  return (
    <div>
      <GoodbyeDynamic />
    </div>
  );
}
