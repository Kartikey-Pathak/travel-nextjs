"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "./Card";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [packages, setPackages] = useState([]);

  // ✅ Fetch packages from API
  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch("/api/packages");
        const data = await res.json();

        // ✅ Only show domestic packages
        const domesticPackages = data.filter(pkg => pkg.type === "domestic");
        setPackages(domesticPackages);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    }
    fetchPackages();
  }, []);

  // ✅ GSAP animations
  useGSAP(() => {
    const fadeIn = gsap.to(sectionRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: "power1.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    const slideInText = gsap.fromTo(
      headingRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      fadeIn.scrollTrigger?.kill();
      fadeIn.kill();
      slideInText.scrollTrigger?.kill();
      slideInText.kill();
    };
  }, []);

  return (
    <section id="domestic" className="flex flex-col items-center justify-center bg-[#F2F2F6] py-20">
      {/* Animated Heading */}
      <h1
        ref={headingRef}
        className="text-3xl md:text-4xl text-black font-bold mb-10"
      >
        Domestic Packages
      </h1>

      {/* Animated Grid */}
      <div ref={sectionRef} className="opacity-0 w-full flex justify-center">
        <div className="w-full md:w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <Card
                key={pkg._id}
                city={pkg.city}
                days={pkg.days}
                img={pkg.img}
              />
            ))
          ) : (
            <div className="flex items-center justify-center min-h-[50vh] col-span-full">
              <p className="text-gray-500 text-5xl font-semibold">
                Coming soon...
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
