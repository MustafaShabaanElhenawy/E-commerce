import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/Auth.context";
import {
  addProductToCart,
  clearUserCart,
  updateProductQuantity,
  removeProductFromCart,
  getUserCart,
} from "../service/cart";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartLoading, setCartLoading] = useState(true);

  // جلب الكارت من الـ API
  const fetchCart = useCallback(async () => {
    if (!token) {
      setCartItems([]);
      setTotalPrice(0);
      setCartLoading(false);
      return;
    }
    setCartLoading(true);
    try {
      const cart = await getUserCart(token);
      setCartItems(cart.data.products);
      setTotalPrice(cart.data.totalCartPrice || 0);
    } catch (err) {
      setCartItems([]);
      setTotalPrice(0);
    } finally {
      setCartLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCart();
  }, [token, fetchCart]);

  // إضافة منتج
  const handleAddToCart = async (productId) => {
    if (!token) {
      toast.error("Please login to add to cart");
      return;
    }
    const alreadyInCart = cartItems.some(
      (item) => item.product._id === productId
    );
    if (alreadyInCart) {
      toast.info("Product already exists in cart");
      return;
    }
    try {
      await addProductToCart(productId, token);
      toast.success("Added to cart successfully!");
      fetchCart();
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  // حذف منتج
  const handleRemoveFromCart = async (productId) => {
    if (!token) {
      toast.error("Please login to remove from cart");
      return;
    }
    try {
      await removeProductFromCart(productId, token);
      toast.success("Removed from cart");
      fetchCart();
    } catch (err) {
      toast.error("Failed to remove from cart");
    }
  };

  // تعديل كمية
  const handleUpdateQuantity = async (productId, currentCount, inc) => {
    if (!token) return;
    const newCount = currentCount + inc;
    if (newCount < 1) {
      await handleRemoveFromCart(productId);
      return;
    }
    try {
      await updateProductQuantity(productId, newCount, token);
      fetchCart();
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  // مسح كل الكارت
  const handleClearCart = async () => {
    if (!token) return;
    try {
      await clearUserCart(token);
      toast.success("Cart cleared!");
      fetchCart();
    } catch (err) {
      toast.error("Failed to clear cart");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        cartLoading,
        handleAddToCart,
        handleRemoveFromCart,
        handleUpdateQuantity,
        handleClearCart,
        totalItems: cartItems.reduce((acc, item) => acc + item.count, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
