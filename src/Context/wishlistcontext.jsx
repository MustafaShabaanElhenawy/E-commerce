import  {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  addProductToWishlist,
  getUserWishlist,
  removeProductFromWishlist,
} from "../service/wishlist";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/Auth.context";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { token: userToken } = useContext(AuthContext);

  const [wishlistItems, setWishlistItems] = useState([]);
  const [loadingWishlist, setLoadingWishlist] = useState(true);
  const [errorWishlist, setErrorWishlist] = useState(null);

  const fetchWishlist = useCallback(async () => {
    if (!userToken) {
      setWishlistItems([]);
      setLoadingWishlist(false);
      setErrorWishlist(null);
      return;
    }
    setLoadingWishlist(true);
    setErrorWishlist(null);
    try {
      const data = await getUserWishlist(userToken);
      const ids = data.data.map((item) => item.id);
      setWishlistItems(ids);
    } catch (err) {
      setErrorWishlist("Failed to fetch wishlist");
      console.error(err);
    } finally {
      setLoadingWishlist(false);
    }
  }, [userToken]);

  useEffect(() => {
    if (userToken) {
      fetchWishlist();
    } else {
      setWishlistItems([]);
      setLoadingWishlist(false);
      setErrorWishlist(null);
    }
  }, [userToken, fetchWishlist]);

  const isProductInWishlist = useCallback(
    (productId) => wishlistItems.includes(productId),
    [wishlistItems]
  );

  const addToWishlist = async (productId) => {
    if (!userToken) {
      toast.error("Please log in to add to wishlist.");
      return;
    }
    try {
      await addProductToWishlist(productId, userToken);
      setWishlistItems((prev) => [...prev, productId]);
      toast.success("Product added  successfully!");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to add product to wishlist.";
      toast.error(msg);
      console.error("Add to wishlist error:", err.response || err);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!userToken) {
      toast.error("Please log in to remove from wishlist.");
      return;
    }
    try {
      await removeProductFromWishlist(productId, userToken);
      setWishlistItems((prev) => prev.filter((id) => id !== productId));
      toast.success("Product removed  successfully!");
    } catch (err) {
      toast.error("Failed to remove product from wishlist.");
      console.error(err);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        loadingWishlist,
        errorWishlist,
        isProductInWishlist,
        addToWishlist,
        removeFromWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
