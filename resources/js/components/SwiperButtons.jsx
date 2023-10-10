import { useSwiper } from "swiper/react";

export default function SwiperButtons() {
    const swiper = useSwiper();

    return (
        <div className="slider-buttons p-4 flex justify-end gap-4 mt-12">
            <button
                onClick={() => swiper.slidePrev()}
                className="p-1 rounded-full border-2 border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-primary transition-all"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                    />
                </svg>
            </button>

            <button
                onClick={() => swiper.slideNext()}
                className="p-1 rounded-full border-2 border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-primary transition-all"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                </svg>
            </button>
        </div>
    );
}
