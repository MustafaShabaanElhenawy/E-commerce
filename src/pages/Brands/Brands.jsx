import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { getAllBrands } from "../../service/brands";
import axios from "axios";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Brands() {
  const [brands, setBrands] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showModal, setShowModal] = useState(false);

  async function fetchBrands() {
    try {
      setIsLoading(true);
      const response = await getAllBrands();
      setBrands(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  }

  async function handleBrandClick(id) {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${id}`
      );
      setSelectedBrand(response.data.data);
      setShowModal(true);
    } catch (error) {
      console.error("Failed to fetch brand", error);
    }
  }

  function closeModal() {
    setShowModal(false);
    setSelectedBrand(null);
  }

  useEffect(() => {
    fetchBrands();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="container">
        <h1 className="text-primary-600 text-center my-10 font-medium text-[45px]">
          All Brands
        </h1>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mb-40">
          {brands.map((brand) => (
            <div
              key={brand._id}
              onClick={() => handleBrandClick(brand._id)}
              className="cursor-pointer brand min-h-[250px] m-3.5 border-gray-300 border-1 overflow-hidden rounded-md transition-shadow duration-300 hover:shadow-[0_0_5px_4px_rgba(34,197,94,0.4)]"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-[200px] object-contain"
              />
              <p className="mb-7 text-center">{brand.name}</p>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedBrand && (
        <div
          className="fixed inset-0  bg-black/50  flex justify-center items-center z-50 "
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-[33%]  py-8 px-5 relative flex justify-between items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-3  text-3xl font-bold text-gray-600 hover:text-gray-800 transition-colors duration-200"
              onClick={closeModal}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <div className="flex flex-col sm:flex-row gap-5 items-center w-full  ">
              <div className="flex-1">
                <h2 className="text-green-500 text-[35px] font-medium">
                  {selectedBrand.name}
                </h2>
                <p className="text-gray-600">{selectedBrand.slug}</p>
              </div>

              <img
                src={selectedBrand.image}
                alt={selectedBrand.name}
                className="w-[210px] h-[210px] object-contain  "
              />
            </div>

            <button
              className="absolute  bottom-4 right-4 bg-gray-500 text-white px-5 py-2 text-[17px] rounded hover:bg-gray-800 transition-colors duration-200 "
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
