import React from "react";
import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";

const InfoBox = ({ text, link, btnText }) => (
  <div className="info-box">
    <p className="font-medium text-center sm:text-xl">{text}</p>
    <Link className="neo-brutalism-white neo-btn" to={link}>
      {btnText}
      <img src={arrow} className="w-4 h-4 object-contain" alt="" />
    </Link>
  </div>
);
const renderContent = {
  1: (
    <h1 className="sm:text-xl text-center sm:leading-snug neo-brutalism-blue py-4 px-8 mx-5 text-white">
      Hi, I am <span className="font-semibold">Tarun Singh</span>👋 <br />A
      Frontend Developer from India
    </h1>
  ),
  2: (
    <InfoBox
      text="A digital wizard turning code into enchanting web experiences."
      link="/about"
      btnText="learn more"
    />
  ),
  3: (
    <InfoBox
      text="Crafted captivating websites blending creativity and functionality."
      link="/projects"
      btnText="Visit my portfolio"
    />
  ),
  4: (
    <InfoBox
      text="Need a project done or looking for a dev? I'm just few keystrokes away."
      link="/contact"
      btnText="Let's talk"
    />
  ),
};

const HomeInfo = ({ currenStage }) => {
  return renderContent[currenStage] || null;
};

export default HomeInfo;
