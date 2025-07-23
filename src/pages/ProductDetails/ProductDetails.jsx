import { faHeart, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { getProductByid } from "../../service/products";
import { useParams } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useWishlist } from "../../Context/wishlistcontext";
import { useCart } from "../../Context/cartcontext";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const [productDetails, setproductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const { addToWishlist } = useWishlist();
  const { handleAddToCart } = useCart();

  async function fetchProductDetails() {
    try {
      setIsLoading(true);
      const response = await getProductByid({ id });
      setproductDetails(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, []);

  if (isLoading) return <Loading />;
  if (!productDetails) return <p>Product not found.</p>;

  const { _id, description, price, title, ratingsAverage, imageCover, images } =
    productDetails;

  function handleAddWishlist() {
    if (_id) addToWishlist(_id);
  }

  async function handleAddCart() {
    if (!_id) return;
    try {
      await handleAddToCart(_id);
    } catch (error) {
      toast.error("Failed to add product to cart!");
    }
  }

  return (
    <div className="container mt-20 mb-60 px-4 ">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        <div className="md:col-span-2 lg:col-span-2 xl:col-span-2">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            loop={true}
            spaceBetween={10}
            slidesPerView={1}
          >
            <SwiperSlide>
              <img
                src={imageCover}
                alt="cover"
                className="w-full rounded-lg mb-8"
              />
            </SwiperSlide>
            {images?.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={img}
                  alt={`image-${i}`}
                  className="w-full rounded-lg mb-8"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="md:col-span-2 lg:col-span-3 xl:col-span-4 flex flex-col justify-center space-y-6">
          <h2 className="text-gray-800 text-[28px] md:text-[32px] font-medium text-start mb-3">
            {title}
          </h2>
          <p className="text-gray-700">{description}</p>
          <div className="flex items-center justify-between mb-5 text-base md:text-lg">
            <span>{price} EGP</span>
            <span>
              <FontAwesomeIcon icon={faStar} className="text-yellow-300" />{" "}
              {ratingsAverage}
            </span>
          </div>
          <div className="flex flex-col md:flex-row justify-around items-center gap-6 md:gap-20 mt-7">
            <button
              onClick={handleAddCart}
              className=" text-center font-medium transition-colors duration-200 text-white text-[17px] hover:bg-primary-600 border-primary-500 rounded-md px-[37%] text-nowrap py-1 bg-primary-500"
            >
              <FontAwesomeIcon icon={faPlus} /> Add
            </button>
            <FontAwesomeIcon
              icon={faHeart}
              className="text-4xl text-primary-900 cursor-pointer"
              onClick={handleAddWishlist}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
