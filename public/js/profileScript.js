/* eslint-disable no-restricted-syntax */
const form = document.querySelector('.form');
const section = document.getElementsByTagName('section');
const gameHistory = document.querySelector('.gameHistory');
const userLogin = section.id;

const API_KEY = 'RGAPI-f5f4a48f-a4a4-4731-beb7-c2e312a7d2f2';

function trimSpaces(accountName) {
  return accountName.trim().replace(/\s/, '');
}

function getGlobalRegion(region) {
  if (region === 'euw1' || 'eun1' || 'ru' || 'tr') return 'europe';
  if (region === 'na1' || 'la1' || 'la2' || 'br1') return 'americas';
  if (region === 'jp1' || 'kr') return 'asia';
  if (region === 'oc1') return 'sea';
}

function secInMin(dur) {
  return (dur / 60).toFixed(0);
}

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  gameHistory.innerHTML = '';
  const accountInfo = {
    region: event.target.region.value.toLowerCase(),
    summonerName: event.target.summoerName.value,
  };
  console.log(accountInfo)
  const accountFetch = await fetch(`https://${accountInfo.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${trimSpaces(accountInfo.summonerName)}?api_key=${API_KEY}`);
  const account = await accountFetch.json();
  console.log(accountFetch.status);
  // ------------------------------------
  if (accountFetch.status === 200) {
    const {
      puuid, name, profileIconId, summonerLevel,
    } = account;
    // ------------------------------------
    const lastMatchesResponse = await fetch(`https://${getGlobalRegion(accountInfo.region)}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${API_KEY}`);
    const lastMatches = await lastMatchesResponse.json();
    // ------------------------------------
    for await (const match of lastMatches) {
      const matchDataResponse = await fetch(`https://${getGlobalRegion(accountInfo.region)}.api.riotgames.com/lol/match/v5/matches/${match}?api_key=${API_KEY}`);
      const matchData = await matchDataResponse.json();
      const summonerMathInfo = {};
      // ------------------------------------
      matchData.info.participants.forEach((part) => {
        if (part.puuid === puuid) {
          summonerMathInfo.championName = part.championName;
          summonerMathInfo.champLevel = part.champLevel;
          summonerMathInfo.kills = part.kills;
          summonerMathInfo.deaths = part.deaths;
          summonerMathInfo.assists = part.assists;
          summonerMathInfo.kda = part?.challenges?.kda.toFixed(2) || 'not found';
          summonerMathInfo.item0 = part.item0;
          summonerMathInfo.item1 = part.item1;
          summonerMathInfo.item2 = part.item2;
          summonerMathInfo.item3 = part.item3;
          summonerMathInfo.item4 = part.item4;
          summonerMathInfo.item5 = part.item5;
          summonerMathInfo.item6 = part.item6;
          summonerMathInfo.win = part.win;
        }
        // ------------------------------------
      });
      const matchCard = document.createElement('div');
      matchCard.classList.add('matchCard');
      matchCard.innerHTML = `
      <div class='gameInfo'>
            ${matchData.info.gameMode}</br>
            ${secInMin(matchData.info.gameDuration)} мин.
      </div>
      <a href='/${summonerMathInfo.championName}'> <img src='http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/${summonerMathInfo.championName}.png' class='gameChampion'/> </a>
      <div class='summerSpells_kda'>
      <div class='kda'>${summonerMathInfo.kills}/${summonerMathInfo.deaths}/${summonerMathInfo.assists}</br> KDA: ${summonerMathInfo.kda}</div>
      <div class='items'>
            <div class='item' id='${summonerMathInfo.item0}'><img class='itemImg' src='http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/${summonerMathInfo.item0}.png'/></div>
            <div class='item' id='${summonerMathInfo.item1}'><img class='itemImg' src='http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/${summonerMathInfo.item1}.png'/></div>
            <div class='item' id='${summonerMathInfo.item2}'><img class='itemImg' src='http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/${summonerMathInfo.item2}.png'/></div>
            <div class='item' id='${summonerMathInfo.item3}'><img class='itemImg' src='http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/${summonerMathInfo.item3}.png'/></div>
            <div class='item' id='${summonerMathInfo.item4}'><img class='itemImg' src='http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/${summonerMathInfo.item4}.png'/></div>
            <div class='item' id='${summonerMathInfo.item5}'><img class='itemImg' src='http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/${summonerMathInfo.item5}.png'/></div>
            <div class='item' id='${summonerMathInfo.item6}'><img class='itemImg' src='http://ddragon.leagueoflegends.com/cdn/12.16.1/img/item/${summonerMathInfo.item6}.png'/></div>
      </div>
      </div>
      <div class='participants'>
            <div class='team'>
                <div class='part'>
                    <img class='partImg' src='http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/${matchData.info.participants[0].championName}.png'/>
                    <a href='https://u.gg/lol/profile/${accountInfo.region}/${matchData.info.participants[0].summonerName}' target='_blank'> <p class='partName'>${matchData.info.participants[0].summonerName}</p></a>
                </div>
                <div class='part'>
                    <img class='partImg' src='http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/${matchData.info.participants[1].championName}.png'/>
                    <a href='https://u.gg/lol/profile/${accountInfo.region}/${matchData.info.participants[1].summonerName}' target='_blank'> <p class='partName'>${matchData.info.participants[1].summonerName}</p></a>
                </div>
                <div class='part'>
                    <img class='partImg' src='http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/${matchData.info.participants[2].championName}.png'/>
                    <a href='https://u.gg/lol/profile/${accountInfo.region}/${matchData.info.participants[2].summonerName}' target='_blank'> <p class='partName'>${matchData.info.participants[2].summonerName}</p></a>
                </div>
                <div class='part'>
                    <img class='partImg' src='http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/${matchData.info.participants[3].championName}.png'/>
                    <a href='https://u.gg/lol/profile/${accountInfo.region}/${matchData.info.participants[3].summonerName}' target='_blank'> <p class='partName'>${matchData.info.participants[3].summonerName}</p></a>
                </div>
                <div class='part'>
                    <img class='partImg' src='http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/${matchData.info.participants[4].championName}.png'/>
                    <a href='https://u.gg/lol/profile/${accountInfo.region}/${matchData.info.participants[4].summonerName}' target='_blank'> <p class='partName'>${matchData.info.participants[4].summonerName}</p></a>
                </div>
            </div>
                <div class='team'>
                <div class='part'>
                    <img class='partImg' src='http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/${matchData.info.participants[5].championName}.png'/>
                    <a href='https://u.gg/lol/profile/${accountInfo.region}/${matchData.info.participants[5].summonerName}' target='_blank'> <p class='partName'>${matchData.info.participants[5].summonerName}</p></a>
                </div>
                <div class='part'>
                    <img class='partImg' src='http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/${matchData.info.participants[6].championName}.png'/>
                    <a href='https://u.gg/lol/profile/${accountInfo.region}/${matchData.info.participants[6].summonerName}' target='_blank'> <p class='partName'>${matchData.info.participants[6].summonerName}</p></a>
                </div>
                <div class='part'>
                    <img class='partImg' src='http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/${matchData.info.participants[7].championName}.png'/>
                    <a href='https://u.gg/lol/profile/${accountInfo.region}/${matchData.info.participants[7].summonerName}' target='_blank'> <p class='partName'>${matchData.info.participants[7].summonerName}</p></a>
                </div>
                <div class='part'>
                    <img class='partImg' src='http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/${matchData.info.participants[8].championName}.png'/>
                    <a href='https://u.gg/lol/profile/${accountInfo.region}/${matchData.info.participants[8].summonerName}' target='_blank'> <p class='partName'>${matchData.info.participants[8].summonerName}</p></a>
                </div>
                <div class='part'>
                    <img class='partImg' src='http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/${matchData.info.participants[9].championName}.png'/>
                    <a href='https://u.gg/lol/profile/${accountInfo.region}/${matchData.info.participants[9].summonerName}' target='_blank'> <p class='partName'>${matchData.info.participants[9].summonerName}</p></a>
                </div>
            </div>
      </div>
      `;
      if (summonerMathInfo.win === false) {
        matchCard.style.backgroundColor = '#59343B';
      } else {
        matchCard.style.backgroundColor = '#4171D6';
      }
      // ------------------------------------
      const items = document.querySelectorAll('.item');
      items.forEach((item) => {
        if (item.id === '0') {
          item.innerHTML = '';
          item.classList.add('haveNoItem');
        }
      });
      // ------------------------------------
      gameHistory.appendChild(matchCard);
    }
  }
  // ------------------------------------
  if (accountFetch.status === 404) {
    alert('Аккаунт с таким именем не найден');
  }
  // ------------------------------------
  event.target.summoerName.value = '';
});
