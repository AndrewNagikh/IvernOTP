const section = document.querySelector('.championSection');
const carousel = document.querySelector('.carousel-inner');
const title = document.querySelector('.title');
const story = document.querySelector('.story');
const role = document.querySelector('.role');
const diff = document.querySelector('.diff');
const diffDecs = document.querySelector('.diffDecs');
const spells = document.querySelector('.spells');
const spellDiscP = document.querySelector('.spellDiscP');
const spellDiscQ = document.querySelector('.spellDiscQ');
const spellDiscW = document.querySelector('.spellDiscW');
const spellDiscE = document.querySelector('.spellDiscE');
const spellDiscR = document.querySelector('.spellDiscR');
const videoP = document.querySelector('.videoP');
const videoQ = document.querySelector('.videoQ');
const videoW = document.querySelector('.videoW');
const videoE = document.querySelector('.videoE');
const videoR = document.querySelector('.videoR');
const championId = section.id;

function createTagImg(tag) {
  let tagImgUrl;
  if (tag === 'Fighter') tagImgUrl = 'img/Fighter.webp';
  if (tag === 'Tank') tagImgUrl = 'img/Tank.webp';
  if (tag === 'Mage') tagImgUrl = 'img/Mage.webp';
  if (tag === 'Assassin') tagImgUrl = 'img/Assasin.webp';
  if (tag === 'Marksman') tagImgUrl = 'img/Marksman.webp';
  if (tag === 'Support') tagImgUrl = 'img/Support.webp';
  return tagImgUrl;
}

function chooseChampDiff(diffScore) {
  let difficulty;
  if (diffScore <= 3) difficulty = 'Низкая';
  if (diffScore > 3 && diffScore < 7) difficulty = 'Средняя';
  if (diffScore > 7) difficulty = 'Высокая';
  return difficulty;
}

function toggleSpellElement(event) {
  const elementToView = document.querySelector(`.${event.target.id}`);
  const elementToHidden = document.querySelector('.active_spell');
  elementToHidden.classList.remove('active_spell');
  elementToView.classList.toggle('active_spell');
  const activeSpell = document.querySelector('.activeSpellImg');
  activeSpell.classList.remove('activeSpellImg');
  event.target.classList.toggle('activeSpellImg');
}

function removeHtmlTags(string) {
  return string.replace(/<\/?[^>]+(>|$)/g, '');
}

async function addSkins() {
  const championsData = await fetch(`http://ddragon.leagueoflegends.com/cdn/12.16.1/data/ru_RU/champion/${championId}.json`);
  const { data } = await championsData.json();
  const championData = Object.values(data)[0];
  function generetaVideoId() {
    const nullCount = 4 - championData.key.length;
    const keyForvideo = '0'.repeat(nullCount) + championData.key;
    return keyForvideo;
  }
  //------------------------------------------
  championData.skins.forEach((skin) => {
    const carouselItem = document.createElement('div');
    carouselItem.className = 'carousel-item';
    carouselItem.id = skin.num;
    if (carouselItem.id === '0') carouselItem.classList.add('active');
    carouselItem.innerHTML = `<img src="http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_${skin.num}.jpg" class="d-block w-100 image-fluid" alt="..." /> <div class="carousel-caption d-none d-md-block">
    <h5 class='skinName'>${skin.name === 'default' ? championData.name : skin.name}</h5>
  </div>`;
    carousel.appendChild(carouselItem);
  });
  //------------------------------------------
  title.innerText = `${championData.name}: ${championData.title}`;
  story.innerText = `${championData.lore}`;
  role.innerText = 'Роль:\n';
  diff.innerText = 'Сложность:\n';
  diffDecs.innerText = chooseChampDiff(championData.info.difficulty);
  //------------------------------------------
  championData.tags.forEach((tag) => {
    const tagImg = document.createElement('img');
    tagImg.src = createTagImg(tag);
    tagImg.classList.add('tagImg');
    tagImg.id = tag;
    tagImg.title = tag;
    role.appendChild(tagImg);
  });
  //------------------------------------------
  const spellImgDivP = document.createElement('div');
  spellImgDivP.innerHTML = `
  <img id='passive' class='spellImg activeSpellImg' src='http://ddragon.leagueoflegends.com/cdn/12.16.1/img/passive/${championData.passive.image.full}'/>
  `;
  spells.appendChild(spellImgDivP);
  championData.spells.forEach((spell, i) => {
    const spellImgDiv = document.createElement('div');
    spellImgDiv.innerHTML = `
    <img id='spell${i}' class='spellImg' src='http://ddragon.leagueoflegends.com/cdn/12.16.1/img/spell/${spell.image.full}' title='${spell.name}'/>
    `;
    spells.appendChild(spellImgDiv);
  });
  //------------------------------------------
  spellDiscP.innerHTML = `<h3 style='color: rgb(199, 150, 43);'>${removeHtmlTags(championData.passive.name)}</h3>\n${removeHtmlTags(championData.passive.description)}`;
  spellDiscQ.innerHTML = `<h3 style='color: rgb(199, 150, 43);'>${removeHtmlTags(championData.spells[0].name)}</h3>\n${removeHtmlTags(championData.spells[0].description)}`;
  spellDiscW.innerHTML = `<h3 style='color: rgb(199, 150, 43);'>${removeHtmlTags(championData.spells[1].name)}</h3>\n${removeHtmlTags(championData.spells[1].description)}`;
  spellDiscE.innerHTML = `<h3 style='color: rgb(199, 150, 43);'>${removeHtmlTags(championData.spells[2].name)}</h3>\n${removeHtmlTags(championData.spells[2].description)}`;
  spellDiscR.innerHTML = `<h3 style='color: rgb(199, 150, 43);'>${removeHtmlTags(championData.spells[3].name)}</h3>\n${removeHtmlTags(championData.spells[3].description)}`;
  videoP.src = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${generetaVideoId()}/ability_${generetaVideoId()}_P1.webm`;
  videoQ.src = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${generetaVideoId()}/ability_${generetaVideoId()}_Q1.webm`;
  videoW.src = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${generetaVideoId()}/ability_${generetaVideoId()}_W1.webm`;
  videoE.src = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${generetaVideoId()}/ability_${generetaVideoId()}_E1.webm`;
  videoR.src = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${generetaVideoId()}/ability_${generetaVideoId()}_R1.webm`;
  //------------------------------------------
  spells.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
      toggleSpellElement(event);
    }
  });
  console.log(championData);
}

addSkins();
