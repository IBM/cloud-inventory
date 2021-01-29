import React from "react";

import Imagem from "../../images/image.jpg";

const Home = () => {
  return (
    <div>
      <img
        className="bx--home__img"
        src={Imagem}
        alt="home page illustration"
      />
      <div className="bx--home__container--text">
        <div className="bx--home__text bx--home__title">
          What is <br />
          Cloud Inventory?
        </div>
        <div className="bx--home__text bx--home__description">
          Lorem ipsum dolor sit amet, consectetur adipiscing it, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat.
        </div>
      </div>
    </div>
  );
};

export default Home;
