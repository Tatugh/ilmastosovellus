# ilmastosovellus

version: 1.15

## 1 JOHDANTO

Projektin tavoitteena on toteuttaa applikaatio, jolla voidaan vertailla säätietoja. Projekti toteutetaan aikavälillä 13.2–21.4 seuraavia työkaluja käyttäen:

• React

• Express

• Javascript

• GitHub

• Chai ja Mocha

## 2 PROJEKTIN ORGANISAATIO

Projektin jäseninä ovat Tatu Ruohoaho, Sepeteus Rosenlöf, Janne Toivanen, Heikki Järvelä, Martin Nipuli ja Arttu Nurminoro.

Roolit:

• Tatu Ruohoaho, Kehittäjä

• Sepeteus Rosenlöf, Kehittäjä

• Janne Toivanen, Kehittäjä

• Heikki Järvelä, Kehittäjä

• Arttu Nurminoro, Kehittäjä

• Martin Nipuli, Kehittäjä

Tapaamiset tiistaisin (sprint review sekä uusi sprint planning). Kommunikoimiseen käytetään discordia.

## 3 VAATIMUSMÄÄRITTELY

Toiminnalliset vaatimukset:

• Seurata sää tietoja

• Vertailla sää tietoja sijainnin perusteella

• Nykyiset sääolosuhteet

• Tuntikohtainen ennuste

• Päivittäinen ennuste

• Mahdollisuus lisätä ja poistaa sijainteja.

• Näytä säätiedot eri sijainneille.

• Mahdollisuus vertailla eri sijaintien säätietoja

• Nähdä jos toiminto onnistui taikka jos se ei onnistunut (Käyttäjä EI jää arvailemaan).

Ei-toiminnalliset vaatimukset:

• Arkaluonteista dataa ei tallenneta erikois tarvetta, ja jos tallennetaan, pitää se turvallisesti pitää salassa. Esim. Enkryptaamisella.

• Kerättyä dataa käytetään ainoastaan siihen mihin se on välttämätöntä ja parantaa käyttökokemusta. Esim. Käyttåjän IP-osoitteen kautta löydetyt latitude sekä longitude arvot (haetaan säätiedot näiden perusteella)

• Käyttäjän pitää pystyä helposti näkemään tärkeimmät sekä muut mahdolliset toiminnot (nähdä eri sääsuhteet, ja lokaatioiden lisäily sekä poistaminen helposti ilman erilaista työlästä etsimistä)

• Säätiedot ovat mahdollisimman ajan tasalla, ja tulevaisuuden estimaatiot mahdollisimman täsmällisiä. Näihin vaikuttaa itse API, joten itsenäisesti ei ole mahdollista varmistaa säätietojen tarkkaavuutta.

• Mahdollisimman nopea lataus aika sekä vähiten häiritsevä päivitys eri toiminnoille, kuten säätiedoille kun valitsee uuden lokaation.

• Säätiedot esitetään käyttäjälle mahdollisimman yksinkertaistettuna (most universally understood). Esim. Mitä eri arvot/kuvat/ikonit kuvailevat.

• Koodi olisi mahdollisimman modulaarinen sekä yksinkertainen, jotta sen eri osia olisi helppo ylläpitää ja muuttaa tarpeitten mukaan

Toimintaympäristön rajoitukset:

Tämä applikaatio vaatii hieman ohjelmointi osaamista, jotta pystyy pystyttämään ympäristön ja käyttämään sitä. Tähän vaaditaan seuraavat työkalut tai vastaavat (nämä vaatimukset kestävät niin kauan kuin ei ole itse web-sivustoa):

• Windows 10 (ympäristön toiminta on tälle testattu toimivaksi, muut järjestelmät vaativat erilaisen testauksen)

• Perustietokone (läppäri tai pöytäkone, käyttää hyvin vähän resursseja, vanha parin sadan kone pitäisi toimia hyvin)

• Visual studio code (helposti hallitsemaan ja pystyttämään projekti, teknisesti voisi yhtä hyvin käyttää terminaaleja)

• Javascript (ohjelmointikieli jolla projekti on kehitetty)

• Node.js (ajonaikainen ympäristö javascript koodille)

• Express.js (web-sovelluskehys Node.js:n päälle jolla backend on kehitetty)

• React (JavaScript kirjasto joka auttaa helposti kehittämään tyylikkäitä sekä responsiivisia käyttäjäliittymiä)

• GitHub (Version hallintajärjestelmä)

• Chrome Web Browser taikka Mozilla FireFox (projekti on testattu toimivan näillä selaimilla)

• Internet yhteys (API:t vaativat tämän, jotta pystyy hakemaan dataa)

• Englanninkielen ymmärrys (Webbisivut ovat kirjoitettu englanniksi, joten tämän kielen ymmärtäminen on hyödyllistä, mutta ei kauhean vaadittua)

• Ruutu resoluutio on testattu toimivan 375px, 768px, 1366px, 1920px, 2560px leveille ruuduille

• Osa käytetyistä kirjastoista käyttävät vanhentuneita kirjastoja, mutta applikaatio toimii toistaiseksi.

• API:en antamat tiedot saattavat olla hieman ohitse henkilön oikean lokaatiosta (esim. Henkilö on latitude:61.0 longitude 27.0, mutta data on haettu latitude: 61.7 longitude: 27.3). Myös sää sekä tunti ennusteet saattavat erota todellisista luvuista (Mutta ei paljoa).

Työkaluilla on omat rajoituksensa. JavaScript ei ole C, joten hitaampi, ja ei yhtä yksinkertainen ja siisti (clean) kuin Python (list comprehension, arvoja leikataan suoraan indeksistä ex. [:25], jne.). Git vaikeata korjata brancheja, mutta helppo hajoittaa. React, kehitetty yhden sivun periaatteella. Data mitä voi saada API:lta voi olla väärin ja muuttua koska vaan.

Laatuvaatimukset:

• Toimii

• Sivustolle pääsee selaimen taikka CLI:n kautta

• Säätiedot vastaavat API:lta saatuja säätietoja

• Sivusto on helppokäyttöinen sekä selkeä

• Tietoturva toimii, ei pidetä turhaa arkaluonteista dataa pidempään kuin tarve

• Sivusto ei polta käyttäjän silmiä taikka ruutua

• Sivusto englannin kieleksi

• Vastaa takaisin käyttäjälle mahdollisimman nopeasti

• Toimii eri selaimilla

• Toimii eri ruutu resoluutiolla

• Toimii ainakin Windows käyttöjärjestelmällä

• Mahdollisuus automaatti/manuaali testaukseen

User story:

• Käyttäjänä haluan tietää säätietoja alueeltani

• Haluan katsella hienoja sää graafeja

• Nähdä uusimmat ja ajan tasalla olevat säätiedot

• Katsella muitten maitten/kaupunkien/alueitten säätiedot

• Vertailla eri paikkojen säätietoja

• Nähdä tietoa tärkeätä tietoa säästä, lämpöaste, tuulinopeus, sade, pilvisyys/muu varoitus

• Tuntikohtaiset säätiedot graafina

• Ainakin viikon sää ennusteet

• Lisäillä lokaatioita ja vaihdella niitten välillä helposti

• Poistaa lokaatioita omasta listasta

## 4 DESIGN

Käyttöliittymä sisältää seuraavat asiat:

• Valitun sijainnin nykyiset sääolosuhteet.

• Tunnittaiset sekä päivittäiset ennusteet näkyvät.

• Käyttäjät voivat vaihdella eri sijaintien välillä.

• Käyttöliittymä toimii eri laitteilla, (työpöytä, mobiili)

• Terminaalin kautta toimii yhteys (ainakin backendiin)

![alt text](/weatherDefault.png?raw=true "weather default view")
Kuva 1. Sääsovelluksen perus näkymä

Sovellus on hyvin yksinkertainen visuaalisest. Näemme tämän hetkisen sään ja siihen liittyvät säätiedot, kutne lämpötila, säätiedote, kosteus, sademäärä, tuulennopeus. Myös näemme päivittäiset ennusteet, JA jos ruutu resoluutio on pieni, niin pystytään vierittämään tietoja helposti (HUOMIO! Chromen device design mode EI pysty ihan oikein simuloimaan kännykkää, FireFox näyttää paremmin, kuinka hovering tuo esille vierityspalkin). Graafi näyttää tuntikohtaiset ennusteet hyvin selkeästi. Ylhäällä näemme tämän hetkisen lokaation nimen, ja sen vasemmalla on nappi jolla voimme lisätä uuden lokaation, ja oikealla nappi jonka kautta pystymme vaihtamaan nopeasti tallennettujen lokaatioiden välillä. Pilven/Auringon välinen ero on katkaistu puoli pilvisellä, elikkä jos on puolipilvistä, niin silloin vielä näytetään aurinkoinen ikoni, muutoin pilvinen. (Kuva 1.)

![alt text](/weatherAdd.png?raw=true "weather adding new location")
Kuva 2. Uuden lokaation lisääminen

Uuden lokaation lisääminen on hyvin yksinkertaista. Kirjoita lokaation nimi, ja sitten paina Search nappia, tämä antaa takaisin listan mahdollisia osuvuuksia etsitylle lokaatiolle. Lokaation valitsemisen jälkeen, kun painetaan OK nappia, jos lokaatio EI ole vielä lisätty tallennettuihin lokaatioihin, se tallennetaan. (Lokaatiot ovat tallennettu local storageen, tällöin ei ole turhaa tarvetta tietokannalle). (Kuva 2.) Jos taas lokaatio on jo tallennettu, niin näemme notifikaation joka kertoo tästä.

![alt text](/weatherSwitch.png?raw=true "weather location quick switch")
Kuva 3. Lokaation nopea vaihtaminen

Tallennetujen lokaatioiden välillä vaihteleminen on hyvinkin yksinkertaista. Valitaan vain jokin haluttu lokaatio, tai voidaan jopa myös poistaa lokaatio jos sitä ei enään haluta/tarvita. (Kuva 3.)

API rajapinnat:

Käytämme geolokaatioon seuraavaa kutsua:
Geolokaatio: `https://api.ipregistry.co/?key=d9tj0m8blqg53opj&pretty=true`
Teimme väliaikaisen tilin ipregistry.co sivustolle ja tätä kautta saimme API avaimen, jolla voimme vapaasti kutsua API:a 100 000 kertaa kokonaisuudessaan.
Tätä kutsuen saamme suoraan käyttäjän IP osoitteen perusteella heidän latitude sekä longitude tiedon, jonka perusteella voimme hakea tarkan tämänhetkisen säätiedon.
Säätieto:
Haemme kaiken säätiedon OpenMeteolta.

Kovakoodattu API kutsu on seuraavanlainen:
`https://api.open-meteo.com/v1/forecast?latitude=61.6886&longitude=27.2723&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=Europe%2FMoscow`

Tämä näyttää perus idean, kuinka kutsumme API, ja mitä tietoja haemme. Latitude sekä Longitude antavat API:lle tiedon lookatiosta josta hakea tarkkaa dataa. Myös timezone tekee tätä, mutta vain kovakoodatussa. Muut API kutsut käyttävät default GMT+0:llaa. Kaikki hakevat hieaman samanlaista ja erilaista tietoa. Tämä on myös fallback jos ei pystytä muutoin kutsumaan API dataa, esim. Henkilön IP-osoite haku josta saadaan hänen Latitude sekä Longitude ei toimi jostain syystä, tai valitsemasta lokaatiosta ei saada dataa jonkun syyntakia. Tämä EI turvaa, että aina olisi dataa, vaan sen, että mahdollisesti jotain dataa näkyy käyttäjälle.

Current:
Tämän hetkiset tiedot:
"temperature_2m",
"relative_humidity_2m",
"apparent_temperature",
"precipitation",
"rain",
"wind_speed_10m",
"weather_code",

Pääsijainen (1. vaihtoehto) yleisesti hakee lämpötilan, kosteuden, sateenmäärän, tuulen nopeuden sekä sää koodiin (sää koodi kertoo sääolosuhteen [sataa, pilvistä, ukkostaa, jne.]), ja hieman muutakin. Kaikki tämä tehdään backendin puolella, ja haettu ja siistitty data lähetetään frontendillä näytettäväksi.

![alt text](/weatherArchitecture.png?raw=true "weather app architecture")
Kuva 4. Arkkitehtuuri (toimii)

Arkkitehtuuri on hyvin yksiselitteinen. Käyttäjä näkee käyttöliittymän ja interaktio sen kautta. Haemme säätietoja palvelimen kautta, joka ensimmäiseksi (oletetaan että käyttäjä on ensimäistä kertaa sivuilla koskaan) yrittää hakea käyttäjän IP-osoitteen kautta hänen Latitude sekä Longitude tiedot. Jota käyttämällä, palvelin voi Open-Meteo API:a hyödyntämällä hakea tarkat säätiedot, jotka frontend pystyy näyttämään käyttäjälle. Jos käyttäjä hakee erikseen jonkun muun paikan säätietoja, niin haetaan sen paikan Latitude sekä Longitude tietojen perusteella säätiedot API:lta. Backend hoitaa kaiken raskaan työn API:n tuoman säätieto datan suhteen. Frontend hoitaa backendistä tuodun säätieto datan näkyvyyden loppukäyttäjälle. Myös hyvä huomioida, että frontend kutsuu vain yhtä backend API endpointtia. Tämä onnistuu, koska jokainen eri kutsu kertoo mitä se hakee (Tämänhetkinen, tuntikohtainen, päivittäinen säätieto). Tämä on yksinkertaisempi sekä ylläpidettävämpi ratkaisu, useamman endpointin hallitseminen olisi raskasta, ja muutoinkin turhauttavaa, koska kaikki tekevät periaatteessa samaa pienillä muutoksilla.

Käytämme myös cache:iä, joka tallentaa toistaiseksi eri säätiedot 15 minuutiksi, käyttämällä säätieto tyyppiä avaimina (Current, Hourly, Daily). Tämä helpottaa välttämään turhauttavia API:kutsuja.

## 5 TESTAUS

Testaus strategia:

• Automaatti sekä manuaaliset testit

• Testit samaan aikaan kuin funktiot/metodit tehdään

• Testit ensijaisesti kritikaali toimivuuksille

• Mahdollisimman modulaariset testit Test cases:

• Sivustoon yhteys

• Toimii (toivottavasti)

Automaatti testit (vain backendille) testasivat, että API lähettää oikean datan takaisin odotetulla tavalla. Helpottaa tulevaisuudessa debuggaamaan mahdolliset ongelmat. Käytimme Chai + Mocha kombinaatiota testejen tekemiseen.

Testit ovat yksinkertaista juoksuttaa seuraavalla komennolla backendissä:

```npm run test tests```

Manuaalisilla testeillä testasimme frontendin toimintaa; UI:n visuaalinen näkymä käyttäjälle sekä sen toimivuus eri näyttö kokoilla, näkyykö oikeat sää ikonit, data (condition, wind speed, etc.), 7 päivän säätiedot, 24 h lämpötila sekä sademäärä, paikan valitseminen ja sen myötä uusien säätietojen saaminen ja näkyminen sivulla.

Kukaan meistä ei ole sää expertti, joten voimme vain luottaa säädatan olevan oikein ja varmistaa, että API:lta saatu data näkyy oikeassa kohdassa.

Näistä kriittisimmät olivat: oikean datan näyttäminen oikeissa kohdissa, tämänhetkinen sekä seitsemän päivän sää tiedot, paikan valitseminen, ja UI:n toimivuus mahdollisimman monella eri kokoisella näytöllä.

Edellä mainittujen kriittisyys perustuu siihen, että jos sivu ei edes näy eri näytöillä, kukaan ei halua/voi käyttää applikaatiota ollenkaan. Jos tämänhetkistä säädataa ei näy tai se näkyy väärin, applikaatio ei ole luotettava/toiminnallinen. Monia käyttäjiä kiinnostaa perusidea, miten viikon sää noin suurin piirtein vaihtelee, tarkemmin lämpötila ja sademäärä ovat ykkös- konserneja. Paikan valitseminen ei sinänsä ole kriittinen, mutta jos jonkun syyn takia käyttäjältä ei saada geolokaatio informaatiota, on tärkeätä olla heille mahdollisuus valita paikkansa sentään.

Koko applikaatio on manuaalisesti testtattu toimivan Mozilla FireFox sekä Google Chrome selaimilla eri resoluutiolla.

Myös perus automaatti testit ovat ajettu, näistä tulokset allla:
Fetching weather data and checking responses
Fetched weather data succesfully
✔ should fetch latest temp, humidity, precipitation, rain and wind speed (187ms)
Fetched weather data succesfully
✔ should fetch hourly temp, humidity, precipitation, precipitation probability, wind speed (67ms)
Fetched weather data succesfully
✔ should fetch daily temp max/min, humidity max/min, precipitation, precip-itation probability, wind speed (70ms)

3 passing (332ms)

Nämä perustestit testaavat eri API kutsujen toimivuutta (Current, Hourly, Daily). Tarkistattavat, että vaadittu säätieto löydetään API:n vastauksesta.

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

# Nopea Käyttöönotto

frontend ja backend kansioissa terminaalissa tee`npm i` ja sitten `npm run dev`

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

• Get request joka hakee lokaation säätiedot

```
$url = "http://localhost:3001/api/weather?name=Mikkeli&longitude=27.27227&latitude=61.68857&weatherType=Current"
$response = Invoke-WebRequest -Uri $url -Method GET
$data = $response.Content
Write-Host $data
```

• Post request joka hakee lokaation tiedot

```
$url = "http://localhost:3001/api/location/data?q=Mikkeli"
Invoke-WebRequest -Uri $url -Method Post
```
