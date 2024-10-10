# ilmastosovellus

version: 1.13

## 1 JOHDANTO

Projektin tavoitteena on toteuttaa applikaatio, jolla voidaan vertailla säätietoja. Projekti toteutetaan aikavälillä 13.2–21.4.

- React,
- Express
- GitHub
- Chai ja Mocha

## 2 PROJEKTIN ORGANISAATIO

Projektin jäseninä ovat Tatu Ruohoaho, Sepeteus Rosenlöf, Janne Toivanen, Heikki Järvelä, Martin Nipuli ja Arttu Nurminoro.

Roolit:

- Tatu Ruohoaho, Kehittäjä
- Sepeteus Rosenlöf, Kehittäjä
- Janne Toivanen, Kehittäjä
- Heikki Järvelä, Kehittäjä
- Arttu Nurminoro, Kehittäjä
- Martin Nipuli, Kehittäjä

Tapaamiset tiistaisin (sprint review sekä uusi sprint planning). Kommunikoimiseen käytetään discord

## 3 VAATIMUSMÄÄRITTELY

Toiminnalliset vaatimukset:

- Seurata sää tietoja
- Vertailla sää tietoja sijainnin perusteella
- Järjestää säätiedot ajan perusteella
- Nykyiset sääolosuhteet
- Tuntikohtainen ennuste
- Päivittäinen ennuste
- Mahdollisuus lisätä ja poistaa sijainteja.
- Näytä säätiedot eri sijainneille.
- Mahdollisuus vertaila eri sijaintien säätietoja
  Ei-toiminnaliset vaatimukset:
- Tietoturva
- Selkeä käyttöliittymä
- Säätiedot ovat mahdollisimman ajan tasalla, ja tulevaisuuden estimaatiot mahdollisimman täsmällisiä.

Toimintaympäristön rajoitukset:

- JavaScript
- Tailwind
- Node.js
- Express.js
- React
- Windows
- Visual Studio Code
- Git
- API:lta saatavat tiedot

Näillä työkaluilla on omat rajoituksensa. JavaScript ei ole C, joten hitaampi, ja ei yhtä yksinkertainen ja siisti (clean) kuin Python (list comprehension, arvoja leikataan suoraan indeksistä ex. [:25], jne.). Git vaikeata korjata brancheja, mutta helppo hajoittaa. React, kehitetty yhden sivun periaatteella, jos haluaakin useamman sivun, niin sitten SOL. Data mitä voi saada API:lta voi olla väärin ja muuttua koskavaan.

Laatuvaatimukset:

- Toimii
- Sivustolle pääsee selaimen taikka CLI:n kautta
- Säätiedot vastaavat API:lta saatuja säätietoja
- Sivusto on helppokäyttöinen sekä selkeä
- Tietoturva sekä rajoitukset ovat selkeästi selitetty
- Sivusto ei polta käyttäjän silmiä taikka ruutua
- Sivusto suomen kieleksi

User story:

- Käyttäjänä haluan tietää säätietoja alueeltani
- Haluan katsella hienoja sää graafeja (mahdollisesti)
- Nähdä uusimmat ja ajan tasalla olevat säätiedot
- Haluan pystyä katsomaan muiden paikkakuntien säätietoja

## 4 DESIGN

Käyttöliittymä tulee sisältää seuraavat asiat:

- Näytä valitun sijainnin nykyiset sääolosuhteet.
- Näytä tunneittaiset ja päivittäiset ennusteet.
- Anna käyttäjien vaihtaa eri sijaintien välillä.
- Käyttöliittymän tulee toimia eri laitteilla, (työpöytä, mobiili)

API rajapinnat:
https://open-meteo.com

## 5 TESTAUS

Testaus strategia:

- Automaatti sekä manuaaliset testit
- Testit samaan aikaan kuin funktiot/metodit tehdään
- Testit ensijaisesti kritikaali toimivuuksille
- Mahdollisimman modulaariset testit
  Test cases:
- Sivustoon yhteys
- API yhteys
  Tulokset:
- Toimii (toivottavasti)

Automaatti testit (vain backendille) testasivat, että API lähettää oikean datan takaisin odotetulla tavalla. Helpottaa tulevaisuudessa debuggaamaan mahdolliset ongelmat. Käytimme Chai + Mocha kombinaatiota testejen tekemiseen.

Testit ovat yksinkertaista juoksuttaaa seuraavalla komennolla backendissä:

```
npm run test tests
```

Manuaaliset testeillä testasimme frontendin toimintaa; UI:n visuaalinen näkymä käyttäjälle sekä sen toimivuus eri näyttö kokoilla, näkyykö oikeat sää ikonit, data (condition, wind speed, etc.), 7 päivän säätiedot, 24h lämpötila sekä sademäärä, paikan valitseminen ja sen myötä uusien säätietojen saaminen ja näkyminen sivulla.

Kukaan meistä ei ole sää expertti, joten voimme vain luottaa säädatan olevan oikein. Ja varmistaa, että API:lta saatu data näkyy oikeassa kohdassa.

Näistä kritikaalisimmat olivat: oikean datan näyttäminen oikeille kohdilleensa, tämän hetkinen sekä seitsemän päivän sää tiedot, paikan valitseminen, ja UI:n toimivuus mahdollisimman monella eri kokoisella näytöllä.

Edellä mainittujen kriittisyys perustuu siihen, että jos sivu ei edes näy eri näytöillä, kukaan ei halua/voi käyttää applikaatiota ollenkaan. Jos tämän hetkistä säädataa ei näy tai se näkyy väärin, applikaatio ei ole luotettava/toiminnallinen. Monia käyttäjiä kiinostaa perusidea miten viikon sää noin suurin piirtein vaihtelee, tarkemmin lämpötila ja sademäärä ovat ykkös konserneja. Paikan valitseminen ei sinäänsä ole kriittinen, mutta jos jonkun syyn takia käyttäjällältä ei saada geolokaatio informaatiota, on tärkeätä olla heille mahdollisuus valita paikkansa sentään.

## 6 PROJEKTIN HALLINTA

Aikajana ja milestonet:

- **_Viikko_ 1**: Teknologiat valittu, henkilistö kirjoitettu dokumenttiin, dokumentoinnin väsääminen. Ensimmäinen commit gittiin
- **_Viikko_ 2**: API löydetty ja Martin lisätty projektiin. API toimii, testejä voi tehdä, routing toimii. Frontend/backend pystyy kommunikoimaan. API hajautettu current, hourly ja daily.
- **_Viikko_ 3**: Tehtävät jaettu seuraavaa kertaa varten. Frontend sää API nytten react komponentti.
- **_Viikko_ 4**: Päivittäinen säätieto tehty. UI parannuksia. Tailwind lisätty projektiin (toimivuus epävarma). Lisää suunnittelua.
- **_Viikko_ 5**: Cache toimii. UI parantelut jatkuu. Annetun lokaation perusteella datan haku.
- **_Viikko_ 6**: UI korjattu toimimaan eri ruuduilla. API testit weatherii varten tehty. Muuta tehty (TBA).
- **_Viikko_ 7**: Lisätty kuvia parantamaan visuaalista ilmettä sekä tuulen ja sateen data näkyy sivulla. Kaavion kanssa myös painittu.
  Riskien hallinta / Laatuvaatimukset:
- Kommunikoidaan jos on ongelmia tai kun muutoksia tehdään
- Kysytään ChatGPT:ltä jos spaghettia alkaa muodostumaan
- Kaikilla oma dev branch GitHubissa
- Main branchiin merge jos testit läpi
- Noudatetaan Testaus osion ohjeita
- Koodi englanniksi
- Kaikki käyttää samoja teknologioita
- Koodi seuraa jotain standardia (funktio/metodi, muuttujat, etc. Nimetään samalla tavalla)
- Javascript ei typescript

# Hyödylliset komennot ja tietoa

Kun haluaa käyttää sekä frontend että backend samanaikaisesti, pitää `npm run dev` frontend sekä backend kansioissa.

- `npm run dev`
- `npm test tests`
- `git pull`
- `git add`
- `git commit`
- `git push`
- `git checkout`

Powershell komento:

- Tekee POST requestin API:lle ja hakee sen lokaatiot
  $url = "http://localhost:3001/api/location/data?q=Mikkeli"
  Invoke-WebRequest -Uri $url -Method Post
