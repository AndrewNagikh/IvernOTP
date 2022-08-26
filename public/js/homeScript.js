const mainDiv = document.querySelector('.main_div');
async function renderAllCampions() {
  try {
    const championsData = await fetch('http://ddragon.leagueoflegends.com/cdn/12.16.1/data/ru_RU/champion.json');
    const { data } = await championsData.json();
    const champions = Object.values(data);
    //------------------------------------------
    champions.forEach((champion) => {
      const championCard = document.createElement('div');
      championCard.classList.add('col');
      championCard.classList.add('champion');
      championCard.id = champion.id;
      championCard.innerHTML = `
        <div class="card text-bg-dark h-100">
            <a href='/${champion.id}'> <img id='${champion.id}' src="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg" class="card-img" alt="..."></a>
            <div class="card-img-overlay champion_name" id='${champion.id}_title'>
                <h5 class="card-title">${champion.name}</h5>
            </div>
        </div>
        `;
      mainDiv.appendChild(championCard);
    });
    //------------------------------------------
  } catch (error) {
    console.log(error);
  }
}
renderAllCampions();
