/* eslint-disable max-len */
/* eslint-disable jsx-a11y/media-has-caption */
const React = require('react');
const Layout = require('./Layout');

module.exports = function Profile({ user }) {
  return (
    <Layout newUser={user}>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossOrigin="anonymous" />
      <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossOrigin="anonymous" />
      <link rel="stylesheet" href="../css/profilePage.css" />
      <script defer src="../js/profileScript.js" />
      <section className="profilePage" id={user}>
        <div className="container-xl">
          <div className="noAcc col-md-6">
            <h2>Пожалуйста введите имя аккаунта RiotGames, что бы видеть статистику последних 20 игр</h2>
            <form className="form">
              <div className="summonerInput">
                <div className="regionSelect">
                  <select className="form-select" name="region">
                    <option value="BR1">BR1</option>
                    <option value="EUN1">EUN1</option>
                    <option value="EUW1">EUW1</option>
                    <option value="JP1">JP1</option>
                    <option value="KR">KR</option>
                    <option value="LA1">LA1</option>
                    <option value="LA2">LA2</option>
                    <option value="NA1">NA1</option>
                    <option value="OC1">OC1</option>
                    <option value="RU" selected>RU</option>
                    <option value="TR">TR</option>
                  </select>
                </div>
                <div className="form-floating summonerName">
                  <input type="text" className="form-control" id="floatingInput" name="summoerName" placeholder="Summoner Name" />
                  <label htmlFor="floatingInput">Summoner Name</label>
                </div>
              </div>
              <button type="submit" className="btn btn-light mb-10">Light</button>
            </form>
          </div>
          <div className="gameHistory" />
        </div>
      </section>
    </Layout>
  );
};
