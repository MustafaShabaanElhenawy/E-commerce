import { faHeart, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../service/products";
import { Link } from "react-router-dom";
import { useWishlist } from "../../Context/wishlistcontext";
import { useCart } from "../../Context/cartcontext";
import Loading from "../Loading/Loading";

export default function Products() {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchText, setSearchText] = useState("");

  const {
    wishlistItems,
    isProductInWishlist,
    addToWishlist,
    removeFromWishlist,
    loadingWishlist,
  } = useWishlist();
  const { handleAddToCart } = useCart();

  async function fetchProducts() {
    try {
      setIsLoading(true);
      const response = await getAllProducts();
      setProducts(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleToggleWishlist = async (productId) => {
    if (isProductInWishlist(productId)) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  };

  if (isLoading || loadingWishlist) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-20">
        Error loading products.
      </div>
    );
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <section>
      <div>
        <input
          type="text"
          placeholder="search...."
          className="form-control mt-14 w-[65%] mx-[15%]"
          name="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="container ">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mb-40">
          {filteredProducts.map(
            ({ _id, imageCover, price, category, title, ratingsAverage }) => (
              <div
                key={_id}
                className="card w-[90%] gap-3 relative group rounded-md overflow-hidden cursor-pointer mt-16 transition-shadow duration-300 hover:shadow-[0_0_5px_4px_rgba(34,197,94,0.4)]"
              >
                <Link to={`/product/${_id}`}>
                  <img src={imageCover} alt={title} />
                  <p className="text-primary-500 px-3">{category.name}</p>
                  <h2 className="my-3 px-3 line-clamp-2">{title}</h2>
                  <div className="flex items-center justify-between px-3 mb-5">
                    <span>{price} EGP</span>
                    <span>
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-300"
                      />{" "}
                      {ratingsAverage}
                    </span>
                  </div>
                </Link>

                <FontAwesomeIcon
                  icon={faHeart}
                  className={`text-3xl ml-[83%] mb-10 cursor-pointer transition-colors duration-200 ${
                    isProductInWishlist(_id) ? "text-red-500" : "text-gray-800"
                  }`}
                  onClick={() => handleToggleWishlist(_id)}
                />

                {/* زرار Add للكارت */}
                <button
                  className="mt-3 absolute left-1/2 bottom-4 -translate-x-1/2 translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 bg-primary-600 text-white font-semibold text-center py-2 px-15 text-nowrap rounded-md transition-all duration-300"
                  onClick={() => handleAddToCart(_id)}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
