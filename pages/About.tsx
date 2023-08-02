import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const About = (props: Props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/grocery");
  };
  return (
    <div className="page-style align-self-center d-flex flex-column align-items-center justify-items-center">
      <h1>About</h1>
      <h2>Chris Kocabas</h2>
      <h3>chriskocabas@outlook.com</h3>
    </div>
  );
};

export default About;
