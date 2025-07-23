import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { getAllCatrgories } from "../../service/catrgories";
import axios from "axios";

export default function Catrgories() {
  const [catrgories, setCatrgories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

  async function fetchCatrgories() {
    try {
      setIsLoading(true);
      const response = await getAllCatrgories();
      setCatrgories(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  }

  async function handleCategoryClick(category) {
    try {
      setSelectedCategory(category.name);
      const response = await axios.get(
        ` https://ecommerce.routemisr.com/api/v1/categories/${category._id}/subcategories`
      );
      const subs = response.data.data || [];
      setSubcategories(subs);
    } catch (error) {
      console.error("Failed to fetch subcategories", error);
      setSubcategories([]);
    }
  }

  useEffect(() => {
    fetchCatrgories();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="container mb-40">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ">
          {catrgories.map((category) => (
            <div
              key={category._id}
              onClick={() => handleCategoryClick(category)}
              className="cursor-pointer border-gray-300 border-1 m-3.5 w-full max-w-[400px] h-[330px] rounded-md overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_5px_4px_rgba(34,197,94,0.4)] flex flex-col"
            >
              <div className="h-[250px] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-[115%] object-cover"
                />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <p className="text-[24px] font-medium text-primary-600 text-center">
                  {category.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {subcategories.length > 0 && selectedCategory && (
          <div className="mt-10">
            <h2 className="text-center text-green-600 text-4xl font-medium mb-8">
              {selectedCategory} subcategories
            </h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 px-4">
              {subcategories.map((sub) => (
                <div
                  key={sub._id}
                  className="border border-gray-300 rounded-md p-4 text-center overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_5px_4px_rgba(34,197,94,0.4)]"
                >
                  <p className="text-lg font-medium">{sub.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
