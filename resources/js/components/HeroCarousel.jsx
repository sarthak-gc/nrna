import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "./carousel.css";
import Slider1 from "../assets/slider1.jpg";
import SwiperButtons from "./SwiperButtons";

export default function HeroCarousel() {
    return (
        <Swiper
            slidesPerView={"auto"}
            centeredSlides={true}
            spaceBetween={30}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {["", ""].map((item) => (
                <SwiperSlide>
                    <div
                        className=" w-full bg-white  rounded-md overflow-hidden"
                        style={{ height: "300px" }}
                    >
                        <img
                            src={Slider1}
                            className="object-cover w-full h-full"
                            alt="PM Deuba"
                        />
                    </div>
                    <div className="caption flex mt-4 items-center gap-2 p-4">
                        <div className="number py-1 px-2 border-2 border-gray-200 text-white rounded-sm text-xs">
                            1
                        </div>
                        <div className="text text-sm text-gray-100">
                            PM Deuba augnerating NRN Office
                        </div>
                    </div>
                </SwiperSlide>
            ))}

            <SwiperButtons />
        </Swiper>
    );
}
