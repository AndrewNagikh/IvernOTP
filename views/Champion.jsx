/* eslint-disable max-len */
/* eslint-disable jsx-a11y/media-has-caption */
const React = require('react');
const Layout = require('./Layout');

module.exports = function Champion({ user, championId }) {
  return (
    <Layout newUser={user}>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossOrigin="anonymous" />
      <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossOrigin="anonymous" />
      <script defer src="js/championScript.js" />
      <link rel="stylesheet" href="css/championPageStyle.css" />
      <section className="championSection" id={championId}>
        <div className="container-xl">
          <div id="carouselExampleControls" className="carousel slide col-12 col-sm-12 col-md-10" data-bs-ride="carousel">
            <div className="carousel-inner" />
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <h3 className="title" />
          <span className="underTitleLine" />
          <div className="diff_role_story">
            <div className="role_diff">
              <div>
                <p className="diff" />
                <p className="diffDecs" />
              </div>
              <div className="role" />
            </div>
            <div className="story" />
          </div>
          <h3 className="spellsTitle">Умения</h3>
          <div className="spells" />
          <div className="spellViewBlock">
            <div className="passive spell active_spell">
              <div className="spellDiscP spellDisc" />
              <video className="videoP video" src="" preload="metadata" autoPlay loop muted />
            </div>
            <div className="spell0 spell">
              <div className="spellDiscQ spellDisc" />
              <video className="videoQ video" src="" preload="metadata" autoPlay loop muted />
            </div>
            <div className="spell1 spell">
              <div className="spellDiscW spellDisc" />
              <video className="videoW video" src="" preload="metadata" autoPlay loop muted />
            </div>
            <div className="spell2 spell">
              <div className="spellDiscE spellDisc" />
              <video className="videoE video" src="" preload="metadata" autoPlay loop muted />
            </div>
            <div className="spell3 spell">
              <div className="spellDiscR spellDisc" />
              <video className="videoR video" src="" preload="metadata" autoPlay loop muted />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
