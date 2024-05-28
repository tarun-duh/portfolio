import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader";
import Island from "../models/Island";
import Sky from "../models/Sky";
import Bird from "../models/Bird";
import Plane from "../models/Plane";
import HomeInfo from "../components/HomeInfo";
import sakura from "../assets/sakura.mp3";
import pirates from "../assets/pirates.mp3";
import { soundoff, soundon } from "../assets/icons";

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currenStage, setCurrentStage] = useState(1);
  const audioRef = useRef(new Audio(pirates));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [isplaying, setIsplaying] = useState(false);

  useEffect(() => {
    if (isplaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      if (audioRef.current.src == "/src/assets/pirates.mp3") {
        console.log(audioRef.current.src);
        audioRef.current.src = "/src/assets/sakura.mp3";
      } else {
        console.log(audioRef.current.src);
        audioRef.current.src = "/src/assets/pirates.mp3";
      }
    }
  }, [isplaying]);

  const adjustIslandForScreensize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];
    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }
    return [screenScale, screenPosition, rotation];
  };
  const adjustPlaneForScreensize = () => {
    let screenScale, screenPosition;
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }
    return [screenScale, screenPosition];
  };
  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreensize();
  const [planeScale, planePosition] = adjustPlaneForScreensize();

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex justify-center items-center">
        {currenStage && <HomeInfo currenStage={currenStage} />}
      </div>
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing:" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.3} />
          <directionalLight intensity={3} position={[8, 1, 1]} />
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor={"#000000"}
            intensity={1}
          />
          <Bird isRotating={isRotating} />
          <Sky isRotating={isRotating} />
          <Island
            scale={islandScale}
            position={islandPosition}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            isRotating={isRotating}
            rotation={[0, 20, 0]}
            scale={planeScale}
            position={planePosition}
          />
        </Suspense>
      </Canvas>
      <div className="absolute bottom-2 left-2">
        <img
          src={isplaying ? soundon : soundoff}
          alt="sound"
          className="w-10 h-10 cursor-pointer object-contain"
          onClick={() => {
            setIsplaying(!isplaying);
          }}
        />
      </div>
    </section>
  );
};

export default Home;
