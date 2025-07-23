import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../../Context/cartcontext";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    cartItems,
    totalPrice,
    cartLoading,
    handleRemoveFromCart,
    handleUpdateQuantity,
    handleClearCart,
    totalItems,
  } = useCart();
  const navigate = useNavigate();

  if (cartLoading) return <Loading />;

  return (
    <div className="container mt-12 mb-60">
      <div className="bg-gray-100 p-5 md:p-14 rounded-lg">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-5">
          <h2 className="text-3xl font-medium text-gray-800">Cart Shop</h2>
          <button
            className={`cursor-pointer bg-blue-600 text-[20px] text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200 self-start md:self-center ${
              cartItems.length === 0 ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={cartItems.length === 0}
            onClick={() => {
              if (cartItems.length > 0) navigate("/payment");
            }}
          >
            check out
          </button>
        </div>
        {/* Totals */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-9">
          <h5 className="font-medium text-[20px]">
            total price:
            <span className="text-primary-500"> {totalPrice}</span>
          </h5>
          <h5 className="font-medium text-[20px]">
            total number of items:
            <span className="text-primary-500"> {totalItems}</span>
          </h5>
        </div>

        {cartItems.map((item) => (
          <div
            key={item.product._id}
            className="grid grid-cols-1 md:grid-cols-6 items-center border-b border-gray-300 pb-4"
          >
            <div className="flex justify-center">
              <img
                src={item.product.imageCover}
                alt={item.product.title}
                className="w-[65%] md:w-[100%] max-w-[180px] mt-5 mr-[10%] mb-3"
              />
            </div>
            {/* Column 2: Product Details */}
            <div className="flex flex-col col-span-4 gap-2 md:items-start items-center">
              <h5 className="text-[20px] text-gray-900 font-medium text-center md:text-left">
                {item.product.title}
              </h5>
              <h6 className="text-primary-600 font-medium">{item.price} EGP</h6>
              <button
                className="text-red-600 mt-2 cursor-pointer flex items-center gap-2 w-fit"
                onClick={() => handleRemoveFromCart(item.product._id)}
              >
                <FontAwesomeIcon icon={faTrash} /> Remove
              </button>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() =>
                  handleUpdateQuantity(item.product._id, item.count, +1)
                }
                className="cursor-pointer text-black border px-3 py-1.5 rounded-md border-primary-500 hover:text-white hover:bg-primary-500 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <span className="text-[18px] font-semibold">{item.count}</span>
              <button
                onClick={() =>
                  handleUpdateQuantity(item.product._id, item.count, -1)
                }
                className="cursor-pointer text-black border px-3 py-1.5 rounded-md border-primary-500 hover:text-white hover:bg-primary-500 transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-center">
          <button
            onClick={handleClearCart}
            className="mt-7 cursor-pointer text-[20px] text-gray-800 border py-2 px-5 rounded-md border-primary-500 hover:text-white hover:bg-primary-500 transition-colors duration-200"
            disabled={cartItems.length === 0}
          >
            Clear Your Cart
          </button>
        </div>
      </div>
    </div>
  );
}
