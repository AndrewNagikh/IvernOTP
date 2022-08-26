const React = require('react');
const Layout = require('./Layout');

module.exports = function Auth() {
  return (
    <Layout>
      <script defer src="js/loginStyleScript.js" />
      <section>
        <div className="container">
          <div className="user singinBox">
            <div className="imgBx">
              <img src="img/login.jpg" alt="loginImg" />
            </div>
            <div className="formBx">
              <form id="singIn">
                <h2>Sing in</h2>
                <input type="text" name="login_singIn" placeholder="Login" />
                <input type="password" name="password_singIn" placeholder="Password" />
                <input type="submit" value="Login" />
                <p className="singup">
                  dont have an account?
                  {' '}
                  <a href="#" className="href">Sing Up</a>
                </p>
              </form>
            </div>
          </div>

          <div className="user singupBox">
            <div className="formBx">
              <form id="singUp">
                <h2>Create an account</h2>
                <input type="text" name="login_singUp" placeholder="Login" />
                <input type="email" name="email_singUp" placeholder="Email" />
                <input type="password" name="password_singUp" placeholder="Password" />
                <input type="submit" value="Sing Up" />
                <p className="singup">
                  Already have an account?
                  {' '}
                  <a href="#" className="href">Sing In</a>
                </p>
              </form>
            </div>
            <div className="imgBx"><img src="img/singup.jpg" alt="loginImg" /></div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
