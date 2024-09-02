import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

const ArticleAdmin = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to fetch data from the API
  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://restourant-project-backend.vercel.app/api/article');
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      const { data } = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Function to navigate to article detail
  const handleCardClick = (id) => {
    navigate(`/article/${id}`);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="relative w-full mt-24 phone:mb-20 px-4">
          <div className="mb-4 px-6 flex laptop:flex-row phone:flex-col justify-between laptop:items-center phone:items-start phone:gap-6">
            <h2 className="text-3xl font-semibold text-orange-700">
              Manage <span className="text-orange-950">Article</span>
            </h2>
            <button className="button-alert-con text-xl">Add Article</button>
          </div>

          {/* Wrapper for Swiper */}
          <div className="relative w-full px-4">
            <Swiper
              modules={[Pagination]}
              spaceBetween={20}
              slidesPerView={3}
              pagination={{ clickable: true }}
              breakpoints={{
                300: { slidesPerView: 1, spaceBetween: 10 },
                640: { slidesPerView: 1, spaceBetween: 10 },
                768: { slidesPerView: 2, spaceBetween: 15 },
                1024: { slidesPerView: 4, spaceBetween: 20 },
              }}
              className="relative"
            >
              {articles.map((article) => (
                <SwiperSlide key={article.id}>
                  <div
                    onClick={() => handleCardClick(article.id)}
                    className="cursor-pointer m-4 p-4 bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105 min-h-[480px] overflow-hidden"
                  >
                    <img
                      src={article.photo}
                      alt={article.title}
                      className="w-full h-52 object-cover rounded-md"
                    />
                    <h3 className="text-xl font-semibold mt-4">{article.title}</h3>
                    {/* Limit description to a specific length */}
                    <p className="text-gray-600 mt-2">
                      {article.description.length >= 100 ? article.description.substring(0, 100) + '...' : article.description}
                    </p>
                    {/* Display post status and date */}
                    <div className="mt-4 flex justify-between text-sm text-gray-500">
                      <span>{new Date(article.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default ArticleAdmin;
