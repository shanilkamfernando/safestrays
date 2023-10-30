import React from "react";
import Image from "next/image";
import "./home.css";

function HomePage() {
  return (
    <div>
      <div className={"heroBanner"}>
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            className="flex items-center justify-end p-6 lg:px-8 text-white"
            aria-label="Global"
          >
            <div className="hidden lg:flex lg:gap-x-12 ">
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-white underline underline-offset-8"
              >
                HOME
              </a>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-white underline underline-offset-8"
              >
                OUR STORY
              </a>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-white underline underline-offset-8"
              >
                SUPPORT
              </a>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-white underline underline-offset-8"
              >
                PROFILE
              </a>
            </div>
          </nav>

          <div className="lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-50"></div>
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                </a>
              </div>
              <div className="mt-6 flow-root ">
                <div className="-my-6 divide-y divide-gray-500/10 ">
                  <div className="space-y-2 py-6">
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Product
                    </a>
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Features
                    </a>
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Marketplace
                    </a>
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Company
                    </a>
                  </div>
                  <div className="py-6">
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="h-[100vh] flex flex-col justify-center items-center">
          <div className=" text-center">
            <div className="text-[36px]">WELCOME TO</div>
            <div className="text-[144px]">SafeStrays</div>
          </div>
          <div className=" rounded-xl border-[1px] border-white tracking-widest w-[20%] flex justify-center bg-[#C4C4C454] ">
            Search
          </div>
        </div>
      </div>
      <div className="bg-white text-black flex flex-col justify-center pb-10">
        <div className="flex justify-center flex-col">
          <div className="text-[30px] uppercase text-center tracking-[9px] border-b-2 border-black mx-[30rem]">
            SafeStrays
          </div>
          {/* <div className="border-b-2 border-black pt-7 w-[400px] pb-10 "></div> */}
        </div>
        <div className="text-black text-[16px]">
          <div className="pt-[2rem] mx-32 text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </div>
          <div className="pt-[2rem] mx-32 text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </div>
        </div>
      </div>
      <div className="bg-white text-black flex flex-col justify-center pb-10">
        <div className="flex justify-center flex-col pb-10">
          <div className="text-[30px] uppercase text-center tracking-[9px] border-b-2 border-black mx-[20rem]">
            Explore our services
          </div>
          {/* <div className="border-b-2 border-black pt-7 w-[400px] pb-10 "></div> */}
        </div>
        <div className=" grid grid-cols-4 gap-4 mx-[10rem] pt-10 ">
          <div className={" firstCard"}>
            <div className="flex flex-col h-[220px] justify-evenly items-center" >
                <div className=" flex flex-col justify-center  p-6 text-center text-white uppercase font-bold  text-[14px]">
                Stray dog sighting and health reporting
                </div>
              
              <div className="bg-black text-white text-center rounded-lg uppercase w-[50%] text-[14px]">
                view more
              </div>
            </div>
          </div>
          <div className={" secondCard"}>
            <div className="flex flex-col h-[220px] justify-evenly items-center" >
                <div className=" flex flex-col justify-center  p-6 text-center text-white uppercase font-bold  text-[14px]">
                Stray dog sighting and health reporting
                </div>
              
              <div className="bg-black text-white text-center rounded-lg uppercase w-[50%] text-[14px]">
                view more
              </div>
            </div>
          </div>
          <div className={" thirdCard"}>
            <div className="flex flex-col h-[220px] justify-evenly items-center" >
                <div className=" flex flex-col justify-center  p-6 text-center text-white uppercase font-bold  text-[14px]">
                Stray dog sighting and health reporting
                </div>
              
              <div className="bg-black text-white text-center rounded-lg uppercase w-[50%] text-[14px] ">
                view more
              </div>
            </div>
          </div>
          <div className={" fourthCard"}>
            <div className="flex flex-col h-[220px] justify-evenly items-center" >
                <div className=" flex flex-col justify-center  p-6 text-center text-white uppercase font-bold  text-[14px]">
                Stray dog sighting and health reporting
                </div>
              
              <div className="bg-black text-white text-center rounded-lg uppercase w-[50%] text-[14px] ">
                view more
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black p-5 flex justify-center items-center flex-col">
        <div className="tracking-[6px] uppercase">SafeStrays</div>
      <div className="leading-relaxed">copyright @ SafeStrays 2023</div>
      </div>
    </div>
  );
}

export default HomePage;
