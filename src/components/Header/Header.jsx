import home1 from "../../assets/images/home1.jpg";
import home2 from "../../assets/images/home2.jpg";
import fashion from "../../assets/images/fashion.avif";

export default function Header() {
  return (
    <div className="header container mt-12 mb-10 flex  justify-baseline items-center mx-auto  ">
      <div>
        <img src={fashion} alt="fashion" className=" w-[77%]  ml-[36.5%]" />
      </div>
      <div className="ml-[6.1%] mr-[22%] ">
        <img src={home2} alt="home2" className="w-[95%]   " />
        <img src={home1} alt="home1" className="w-[95%]  " />
      </div>
    </div>
  );
}
