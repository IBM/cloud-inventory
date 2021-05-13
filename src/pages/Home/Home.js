import React from "react";

import Imagem from "../../images/17_23_p_gorodenkoff-043.jpg";

const Home = () => {
  return (
    <div className="bx--home">
      <img
        className="bx--home__img"
        src={Imagem}
        alt="home page illustration"
      />
      <div className="bx--home__container--text">
        <div className="bx--home__text bx--home__title">Cloud Inventory</div>
        <div className="bx--home__text bx--home__description">
          Cloud Inventory provides visibility into your IBM Cloud computing
          environment. You can use Cloud Inventory to collect metadata from you
          instances and use this to query the data and quickly determine which
          instances are running, what OS and etc. You can also configure and
          view inventory data from multiple IBM Cloud Regions and accounts.
        </div>
      </div>
    </div>
  );
};

export default Home;
