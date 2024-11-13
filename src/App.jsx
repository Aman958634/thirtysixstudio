import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from 'locomotive-scroll';
import { useEffect, useState,useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function App() {

  const [showCanvas, setShowCanvas] = useState(false)
  const headingref = useRef(null)
  const growingSpan = useRef(null)

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);
  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });
          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });
          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } 
        else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration:1.2,
            ease: "power2.inOut",
          });
        }
          return !prevShowCanvas;
      });
    }
    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);
    // Clean up event listener on unmount
    return () => headingElement.removeEventListener("click", handleClick);
    
  }, []);

  return (
    <>
    <span ref={growingSpan} className="growing block rounded-full fixed top-[-20%] left-[-20%] w-5 h-5" ></span>
    <div className="w-full relative min-h-screen font-['Helvetica'_Now_Display]">
         {showCanvas &&
          data[0].map((canvasdets, index) =>(
          <Canvas details={canvasdets}/>
         ))}
        
         <div className="w-full h-screen relative z-[1]">
         
         <nav className="w-full p-8 flex justify-between z-50">
            <div className="brand text-2xl font-md">thirtysixstudios</div>
            <div className="links flex gap-10">
              {["Home", "About", "Projects", "Contact"].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-md hover:text-gray-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>
          <div className="textcontainer w-full px-[20%]">
          <div className="text w-[50%] ">
            <h3 className="text-2xl leading-[1.4]">At Thirtysixstudio, we build immersive digital experiences for 
              brands with a purpose.</h3>
              <p className="text-0xl w-[80%] mt-5 font-normal">We’re a boutique production studio focused on design, motion,
                 and creative technology, constantly reimagining what digital craft
                  can do for present-time ads and campaigns.
             </p>
             <p className="text-md mt-10 ">scroll</p>
          </div>
          </div>
          <div className="w-full absolute bottom-0 left-20">
            <h1 
            ref={headingref}
            className="text-[12rem] font-normal tracking-tight leading-none">Thirtysixstudios</h1>
          </div>
         </div>
         </div>
     <div className="w-full relative h-screen mt-32 px-10 ">
     {showCanvas &&
          data[1].map((canvasdets, index) =>(
          <Canvas details={canvasdets}/>
         ))}
      <h1 className="text-5xl tracking-tight">about the brand</h1>
      <p className="text-2xl leading-[1.2] w-[80%] mt-10 font-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. <br/>Ratione tempora rerum culpa 
        veritatis, necessitatibus<br/> perspiciatis Lorem ipsum dolor sit amet consectetur, adipisicing<br/> elit. 
        Labore repudiandae eius, nemo sint rerum consequatur.!</p>
        <img
        className="w-[40%] h-[50%] mt-10"
        src="https://images.unsplash.com/photo-1731223834316-5875db2d781f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
     </div>
  

    </>
    
  );
}

export default App;