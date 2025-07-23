


import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/Auth.context";
import { useWishlist } from "../../Context/wishlistcontext";
import Loading from "../Loading/Loading";
import { getUserWishlist } from "../../service/wishlist";
import { useCart } from "../../Context/cartcontext";
import { toast } from "react-toastify";

export default function Wishlist() {
  const {
    wishlistItems,
    removeFromWishlist,
    loadingWishlist,
    errorWishlist,
  } = useWishlist();

  const { token: userToken } = useContext(AuthContext);
  const { handleAddToCart } = useCart();
  const [detailedWishlistProducts, setDetailedWishlistProducts] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [errorDetails, setErrorDetails] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      if (!userToken) {
        setDetailedWishlistProducts([]);
        setLoadingDetails(false);
        setErrorDetails("User not logged in.");
        return;
      }
      if (wishlistItems.length === 0) {
        setDetailedWishlistProducts([]);
        setLoadingDetails(false);
        setErrorDetails(null);
        return;
      }
      setLoadingDetails(true);
      setErrorDetails(null);
      try {
        const data = await getUserWishlist(userToken);
        setDetailedWishlistProducts(data.data);
      } catch (err) {
        setErrorDetails("Failed to load wishlist details.");
        console.error(err);
      } finally {
        setLoadingDetails(false);
      }
    }

    if (!loadingWishlist && userToken) {
      fetchDetails();
    } else if (!userToken) {
      setDetailedWishlistProducts([]);
      setLoadingDetails(false);
      setErrorDetails("User not logged in.");
    }
  }, [wishlistItems, loadingWishlist, userToken]);

  const handleRemove = async (productId) => {
    await removeFromWishlist(productId);
  };

  // دالة إضافة المنتج للكارت مع تمرير ID المنتج
  async function handleAddCart(productId) {
    if (!productId) return;
    try {
      await handleAddToCart(productId);
      
    } catch (error) {
      toast.error("Failed to add product to cart!");
    }
  }

  if (loadingWishlist || loadingDetails) {
    return <Loading />;
  }

  if (errorWishlist || errorDetails) {
    return (
      <div className="text-center text-red-500 mt-20">
        {errorWishlist || errorDetails}
      </div>
    );
  }

  if (detailedWishlistProducts.length === 0) {
    return (
      <div className="container mt-12 mb-60">
        <div className="bg-gray-100 p-5 md:p-14 rounded-lg">
          <h2 className="text-3xl font-medium text-gray-800 mb-6">My Wish List</h2>
          <p className="text-gray-600 text-lg">Your wishlist is empty. Start adding some products!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-12 mb-60">
      <div className="bg-gray-100 p-5 md:p-14 rounded-lg">
        <h2 className="text-3xl font-medium text-gray-800 mb-6">My Wish List</h2>

        {detailedWishlistProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col md:flex-row items-center gap-6 border-b border-gray-300 pb-7 mb-7 last:border-b-0 last:pb-0"
          >
            <img
              src={product.imageCover}
              alt={product.title}
              className="w-[60%] md:w-[15%] max-w-[170px] mt-2 mb-2"
            />
            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <h5 className="text-[20px] text-gray-900 font-medium line-clamp-2">
                  {product.title}
                </h5>
                <button
                  onClick={() => handleAddCart(product.id)}
                  className="mt-3 md:mt-0 cursor-pointer text-[16px] md:text-[20px] text-gray-800 border py-2 px-4 md:px-6 rounded-md border-primary-500 hover:text-white hover:bg-primary-500 transition-colors duration-200"
                >
                  Add To Cart
                </button>
              </div>
              <h6 className="text-primary-600 font-medium mt-2">{product.price} EGP</h6>
              <button
                className="text-red-600 mt-2 cursor-pointer flex items-center gap-2"
                onClick={() => handleRemove(product.id)}
              >
                <FontAwesomeIcon icon={faTrash} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

