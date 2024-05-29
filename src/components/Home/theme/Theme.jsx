import { useEffect, useState } from "react";
import { getThemeList } from "../../../lib/apis/studyRoom/theme";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "./Theme.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function ThemeComponent() {
  const [themeList, setThemeList] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const v = getThemeList();
    setThemeList(v);
    if (v.length > 0) {
      setBackgroundImage(v[0].imageUrl);
    }
  }, []);

  useEffect(() => {
    if (themeList.length > 0) {
      const url = themeList[activeIndex].imageUrl;
      console.log(url);
      setBackgroundImage(url);
    }
  }, [activeIndex]);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    margin: "20px",
  };
  const handleLearnMoreClick = () => {
    window.location.href = `/room/sea`;
  };
  return (
    <div className="background" style={backgroundStyle}>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {themeList.map((theme) => {
          return (
            <SwiperSlide
              style={{ maxWidth: "500px", overflow: "hidden" }}
              key={theme._id}
            >
              <div className="card">
                <img
                  src={theme.imageUrl}
                  alt={theme.themeName}
                  className="card-image"
                />
                <div className="card-content">
                  <p className="card-name">
                    <b>{theme.themeName}</b>
                  </p>
                  <p className="card-description">{theme.description}</p>
                  <button className="card-button" onClick={handleLearnMoreClick}>Learn More</button>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
