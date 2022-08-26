const React = require('react');

module.exports = function Layout({ children, newUser }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="//db.onlinewebfonts.com/c/12420e8c141ca7c3dff41de2d59df13e?family=BeaufortforLOL-Bold" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="../css/publicStyles.css" />
        <link rel="stylesheet" href="../css/headerStyles.css" />
        <title>Document</title>
        {
          newUser
            ? (
              <nav className="navbar navbar-expand-md bg-dark">
                <div className="container-fluid">
                  <span className="navbar-brand" style={{ color: 'rgb(199, 150, 43);' }}>Добро пожаловать призыватель</span>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" style={{ color: 'rgb(199, 150, 43);' }} />
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/home" style={{ color: 'white' }}>На главную</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href={`/profile/${newUser}`} style={{ color: 'white' }}>Профиль</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/auth/logout" style={{ color: 'white' }}>Выйти</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            )
            : ''
        }
      </head>
      {children}
      <body />
    </html>
  );
};
