"use client"
import Image from "next/image";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import damo from "../../public/Image/Home/damo.png";
import SwiperSlider from "../component/swiper/page";
// import background from '../../public/Image/Login/login_background.jpg'
export default function Home() {
  return (
    <>
      <section className=" h-[100vh] bg-[url('/Image/Home/banner-background-one.jpg')] bg-no-repeat bg-cover bg-top">
        <div className="container mx-auto h-full grid grid-cols-2 items-center gap-8 text-white rajdhani">


          {/* Content Banner */}
          <div className="h-full flex flex-col justify-center">
            <h1 className="text-5xl font-bold mb-4">Hello</h1>

            {/* Typewriter Container with fixed height */}
            <h1 className="text-5xl font-bold mb-4 min-h-[60px]">
              <Typewriter
                words={[
                  'I’m Azmain Iqtidar Anik',
                  'I Love to Code and Design',
                  'Passionate About UI/UX',
                  'Turning Ideas Into Websites',
                  'Let’s Build Something Great!',
                ]}
                loop={false}
                cursor
                cursorStyle="|"
                typeSpeed={30}
                deleteSpeed={30}
                delaySpeed={1500}
              />
            </h1>

            <p className="text-lg text-gray-300 mb-6">
              Frontend Developer with a passion for crafting clean and user-friendly websites.
            </p>

            <Link
              href="#Download"
              className="px-6 py-3 border-blue-600 border-2 hover:bg-black/50 rounded font-medium transition-colors flex justify-center w-[150px]"
            >
              Download CV
            </Link>
          </div>



          {/* Person Banner */}
          <div className="h-full flex justify-center items-center">
            <div>
              <Image
                width={600}
                height={700}
                src={damo}
                alt="Azmain Iqtedar Anik"
                className="object-contain h-full w-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className=" text-gray-800 font-sans  py-16 bg-[#F4F1EA]">
        <div className="container mx-auto  rounded-xl  p-12 ">
          <header className="text-center mb-12">
            <h1 className="text-5xl font-extrabold tracking-wide mb-2">About Me</h1>
            <p className="text-lg font-semibold text-gray-600">Frontend Developer</p>
          </header>

          <div className="grid grid-cols-[50%50%] md:flex-row ">
            {/* Personal Info */}
            <section className="text-black">
              <ul className="grid grid-cols-[50%_50%] gap-y-2 gap-x-6 list-none p-0 m-0">
                <li className="font-semibold">
                  Age: <span className="font-normal">1 Years</span>
                </li>
                <li className="font-semibold">
                  Nationality: <span className="font-normal">Tunisian</span>
                </li>
                <li className="font-semibold">
                  Freelance: <span className="font-normal">Available</span>
                </li>
                <li className="font-semibold">
                  Address: <span className="font-normal">Tunis</span>
                </li>
                <li className="font-semibold">
                  Phone: <span className="font-normal">+21621184010</span>
                </li>
                <li className="font-semibold">
                  Email: <span className="font-normal">you@mail.com</span>
                </li>
                <li className="font-semibold">
                  Skype: <span className="font-normal">steve.milner</span>
                </li>
                <li className="font-semibold">
                  Languages: <span className="font-normal">French, English</span>
                </li>
              </ul>
            </section>


            {/* Stats */}
            <section className="md:flex-1 mt-12 md:mt-0 grid grid-cols-2 gap-8">
              {[
                { num: 12, label: "Years of Experience" },
                { num: 97, label: "Completed Projects" },
                { num: 81, label: "Happy Customers" },
                { num: 53, label: "Awards Won" },
              ].map(({ num, label }) => (
                <div
                  key={label}
                  className="bg-blue-600 text-white rounded-lg p-8 shadow-lg text-center hover:bg-blue-700 transition-colors"
                >
                  <div className="text-5xl font-extrabold tracking-wide">{num}</div>
                  <div className="mt-2 uppercase font-semibold text-lg">{label}</div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </section>


      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto py-10">
        <article className="group relative bg-white rounded-xl overflow-hidden shadow-[0px_13px_10px_-7px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0px_30px_18px_-8px_rgba(0,0,0,0.1)]">

          {/* Hidden image to preserve space */}
          <div className="invisible h-[235px]"></div>

          {/* Hover image overlay */}
          <div
            className="absolute top-0 left-0 w-full h-[235px] rounded-t-xl bg-cover bg-center bg-no-repeat transition-all duration-300 ease-out group-hover:h-full group-hover:opacity-30"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260')",
            }}
          ></div>

          {/* Info Box */}
          <div className="relative z-10 bg-white px-6 pt-4 pb-6 rounded-b-xl transition-colors duration-300 group-hover:bg-transparent">
            <span className="uppercase text-[13px] tracking-[2px] font-medium text-gray-500">
              Recipe
            </span>
            <h3 className="mt-1 mb-2 font-serif text-lg font-semibold">
              Crisp Spanish tortilla Matzo brei
            </h3>
            <span className="text-xs font-medium text-gray-700">
              by{" "}
              <a href="#" className="font-semibold text-[#AD7D52] hover:underline">
                Celeste Mills
              </a>
            </span>
          </div>
        </article>
      </section>
      <section className="">
        <SwiperSlider></SwiperSlider>
      </section>

      




    </>
  );
}
