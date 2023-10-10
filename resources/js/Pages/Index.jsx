import { Link } from "@inertiajs/react";
import { Button, Space } from "antd";
import React, { useState } from "react";
import Logo from "../assets/logo.png";
import * as Portal from "@radix-ui/react-portal";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import HeroCarousel from "../components/HeroCarousel";

export default function Index() {
    const [openMenu, setOpenMenu] = useState(false);

    const menus = ["Home", "About", "Services", "Contact Us"];

    return (
        <>
            <header className="py-8 px-4 md:absolute md:z-50 w-full bg-transparent">
                <div className="container  mx-auto">
                    <nav className="flex justify-between items-center">
                        <a href="" className="brand-logo">
                            <img src={Logo} alt="NRNA Logo" />
                        </a>
                        <div className="block md:hidden">
                            <button
                                aria-haspopup="true"
                                aria-controls="menu--:r0:"
                                className="focus:border-primary hover:border-black border-secondary text-black inline-flex h-14 w-14 items-center justify-center rounded-full border-2 p-1 transition focus:outline-none active:border-black"
                                id="menu-button--menu--:r0:"
                                type="button"
                                data-reach-menu-button=""
                                onClick={() => setOpenMenu(!openMenu)}
                            >
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        x="6"
                                        y="9"
                                        width="20"
                                        height="2"
                                        rx="1"
                                        fill="currentColor"
                                        style={{
                                            transform: openMenu
                                                ? "translateY(7px) rotate(45deg)"
                                                : "none",
                                            transformOrigin: openMenu
                                                ? "16px 10px 0px"
                                                : "0px 0px 0px",
                                        }}
                                        transform-origin={
                                            openMenu ? "16px 10px" : "0px 0px"
                                        }
                                    ></rect>
                                    <rect
                                        x="6"
                                        y="15"
                                        width="20"
                                        height="2"
                                        rx="1"
                                        fill="currentColor"
                                        opacity={openMenu ? 0 : 1}
                                    ></rect>
                                    <rect
                                        x="6"
                                        y="21"
                                        width="20"
                                        height="2"
                                        rx="1"
                                        fill="currentColor"
                                        style={{
                                            transform: openMenu
                                                ? "translateY(-5px) rotate(-45deg)"
                                                : "none",
                                            transformOrigin: openMenu
                                                ? "16px 22px 0px "
                                                : "0px 0px 0px",
                                        }}
                                        transform-origin={
                                            openMenu ? "16px 22px" : "0px 0px"
                                        }
                                    ></rect>
                                </svg>
                            </button>
                        </div>

                        <div className="hidden md:block text-white">
                            <NavigationMenu.Root className="flex gap-8">
                                {menus.map((item) => (
                                    <NavigationMenu.Item className="no-decoration list-none">
                                        <NavigationMenu.Link>
                                            {item}
                                        </NavigationMenu.Link>
                                    </NavigationMenu.Item>
                                ))}
                                <NavigationMenu.Item className="list-none">
                                    <NavigationMenu.Link className="px-8 py-4 border-2 border-gray-200">
                                        Donate Now
                                    </NavigationMenu.Link>
                                </NavigationMenu.Item>
                            </NavigationMenu.Root>
                        </div>
                    </nav>
                </div>
            </header>

            <main>
                <section className="hero">
                    <div className="flex flex-col-reverse md:flex-row ">
                        <div className="md:w-1/2">
                            <div className="py-12 px-4  md:pt-48 md:px-32">
                                <h1 className=" text-2xl md:text-4xl text-slate-800 uppercase font-black font-primary">
                                    uniting and binding the Nepali Diaspora
                                    under one{" "}
                                    <span className="text-primary">
                                        umbrella
                                    </span>
                                </h1>

                                <p className="mt-4  text-md leading-6 text-slate-400">
                                    We rejoice in the achievement of our beloved
                                    country and her people and are disheartened
                                    by their sufferings and failures.
                                </p>

                                <div className="cta mt-12">
                                    <a
                                        href=""
                                        className="px-8 py-4 bg-primary text-white rounded-md"
                                    >
                                        Donate Now
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div
                                className="opacity-80   flex items-center justify-center md:pt-48 md:pb-32"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(#ffffff 0.5px, #03039a 0.5px)",
                                    backgroundSize: "10px 10px",
                                }}
                            >
                                <div className="w-full h-full">
                                    <HeroCarousel />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-gray-200 pb-16 pt-48 ">
                <div className="relative mx-10vw">
                    <div className="relative mx-auto grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 xl:gap-x-6 grid-rows-max-content gap-x-4">
                        <div className="col-span-full md:col-span-3">
                            <div>
                                <div>
                                    <img src={Logo} alt="NRNA Logo" />
                                </div>
                                <p className="mt-6 text-gray-500 leading-snug">
                                    Let us unite to face and fight against this
                                    difficult time, together; and send oxygen to
                                    Nepal to save the lives of our beloved back
                                    home
                                </p>

                                <p className="text-secondary mt-6 flex items-center justify-between gap-4">
                                    <div className="flex gap-4">
                                        <a href="" className="text-primary"></a>
                                    </div>
                                </p>
                            </div>
                        </div>

                        <div className="col-span-full md:col-span-4 md:col-start-5 mt-20 md:mt-0">
                            <div>
                                <div className="text-lg font-medium text-black">
                                    Contact
                                </div>
                                <ul className="mt-4">
                                    <li className="py-1 flex items-center gap-2">
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
                                                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                            />
                                        </svg>

                                        <a
                                            href=""
                                            className="text-gray-500 underlined "
                                        >
                                            Subarna Shamsher Marg, Baluwatar
                                        </a>
                                    </li>
                                    <li className="py-1 flex items-center gap-2">
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
                                                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                            />
                                        </svg>

                                        <a
                                            href=""
                                            className="text-gray-500 underlined "
                                        >
                                            +977- 014411530 , 014426005
                                        </a>
                                    </li>
                                    <li className="py-1 flex items-center gap-2">
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
                                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                            />
                                        </svg>

                                        <a
                                            href=""
                                            className="text-gray-500 underlined whitespace-nowrap"
                                        >
                                            info@nrna.org
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-span-full md:col-start-10 mt-20 md:mt-0">
                            <div>
                                <div className="text-lg font-medium text-black">
                                    Sitemap
                                </div>
                                <ul className="mt-4">
                                    <li className="py-1">
                                        <a
                                            href=""
                                            className="text-gray-500 underlined whitespace-nowrap"
                                        >
                                            Home
                                        </a>
                                    </li>
                                    <li className="py-1">
                                        <a
                                            href=""
                                            className="text-gray-500 underlined whitespace-nowrap"
                                        >
                                            About
                                        </a>
                                    </li>
                                    <li className="py-1">
                                        <a
                                            href=""
                                            className="text-gray-500 underlined whitespace-nowrap"
                                        >
                                            Contact US
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {openMenu ? <MenuPortal menus={menus} /> : ""}
        </>
    );
}

function MenuPortal({ menus }) {
    return (
        <Portal.Root>
            <div
                className="w-full z-50"
                style={{
                    position: "absolute",
                    display: "block",
                    inset: "calc(92px + 2.25rem) 0px 0px",
                }}
            >
                <div className="bg-white flex h-full flex-col overflow-y-scroll border-t border-gray-200 pb-12">
                    <NavigationMenu.Root>
                        <NavigationMenu.List className="border-none bg-transparent p-0">
                            {menus.map((item) => (
                                <NavigationMenu.Item className="hover:bg-secondary focus:bg-secondary text-primary border-b border-gray-200 px-5vw py-9 hover:text-team-current ">
                                    <NavigationMenu.Link>
                                        {item}
                                    </NavigationMenu.Link>
                                </NavigationMenu.Item>
                            ))}
                        </NavigationMenu.List>
                    </NavigationMenu.Root>
                </div>
            </div>
        </Portal.Root>
    );
}
