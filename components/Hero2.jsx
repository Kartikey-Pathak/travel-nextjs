"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "./Card";

gsap.registerPlugin(ScrollTrigger);

function Hero2() {
  const ref2 = useRef(null);
  const txt2 = useRef(null);
  const [packages, setPackages] = useState([]);

  // ✅ Fetch packages (only international)
  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch("/api/packages");
        const data = await res.json();
        const internationalPackages = data.filter(
          (pkg) => pkg.type === "international"
        );
        setPackages(internationalPackages);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    }
    fetchPackages();
  }, []);

  useGSAP(() => {
    const fadeIn = gsap.to(ref2.current, {
      opacity: 1,
      delay: 0.5,
      duration: 0.8,
      scrollTrigger: {
        trigger: ref2.current,
        start: "top 50%",
        end: "top 60%",
      },
    });

    const textSlide = gsap.fromTo(
      txt2.current,
      {
        y: 120,
        opacity: 0,
        ease: "power1.inOut",
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: txt2.current,
          start: "top 50%",
          end: "top 60%",
        },
      }
    );

    return () => {
      fadeIn.scrollTrigger?.kill();
      fadeIn.kill();
      textSlide.scrollTrigger?.kill();
      textSlide.kill();
    };
  }, []);

  return (
    <section id="international" className="flex items-center justify-center mt-14 flex-col bg-[#F2F2F6]">
      <h1 ref={txt2} className="text-3xl md:text-4xl text-black font-bold">
        International Packages
      </h1>

      <div ref={ref2} className="opacity-0 flex items-center justify-center w-full">
        <div className="w-full md:w-[90%] flex items-center justify-center place-items-center grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-10 mt-15">
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <Card key={pkg._id} city={pkg.city} img={pkg.img} />
            ))
          ) : (
            <div className="flex items-center justify-center min-h-[50vh] col-span-full">
              <p className="text-gray-500 text-5xl font-semibold">
                Coming soon...
              </p>
            </div>
          )}
        </div>

        <div className="h-20"></div>
      </div>
    </section>
  );
}

export default Hero2;
