# ilmastosovellus
## 1	JOHDANTO
Projektin tavoitteena on toteuttaa applikaatio, jolla voidaan vertailla säätietoja. Projekti toteutetaan aikavälillä 13.2–21.4.

-	React,
-	Express, 
-	GitHub,
-	mongodb (mahdollisesti)

## 2	PROJEKTIN ORGANISAATIO
Projektin jäseninä ovat Tatu Ruohoaho, Sepeteus Rosenlöf, Janne Toivanen, Heikki Järvelä ja Arttu Nurminoro.

Roolit:
-	Tatu Ruohoaho, Kehittäjä
-	Sepeteus Rosenlöf, Kehittäjä
-	Janne Toivanen, Kehittäjä
-	Heikki Järvelä, Kehittäjä 
-	Arttu Nurminoro, Kehittäjä

Tapaamiset tiistaisin (sprint review sekä uusi sprint planning). Kommunikoimiseen käytetään discord

## 3	VAATIMUSMÄÄRITTELY
Toiminnalliset vaatimukset:
-	Seurata sää tietoja 
-	Vertailla sää tietoja sijainnin perusteella
-	Järjestää säätiedot ajan perusteella
-	Nykyiset sääolosuhteet
-	Tuntikohtainen ennuste
-	Päivittäinen ennuste
-	Mahdollisuus lisätä ja poistaa sijainteja.
-	Näytä säätiedot eri sijainneille.
-	Mahdollisuus vertaila eri sijaintien säätietoja
Ei-toiminnaliset vaatimukset:
-	Tietoturva
-	Selkeä käyttöliittymä
-	Säätiedot ovat mahdollisimman ajan tasalla, ja tulevaisuuden estimaatiot mahdollisimman täsmällisiä. 

Toimintaympäristön rajoitukset:
-	Javascript
-	Node.js
-	Express.js
-	React
-	Windows
-	Visual Studio Code
-	GitHub
-	API:lta saatavat tiedot

Laatuvaatimukset:
-	Toimii
-	Sivustolle pääsee selaimen taikka CLI:n kautta
-	Säätiedot vastaavat API:lta saatuja säätietoja
-	Sivusto on helppokäyttöinen sekä selkeä
-	Tietoturva sekä rajoitukset ovat selkeästi selitetty
-	Sivusto ei polta käyttäjän silmiä taikka ruutua
-	Sivusto suomen kieleksi

User story:
-	Käyttäjänä haluan tietää säätietoja alueeltani
-	Haluan katsella hienoja sää graafeja (mahdollisesti)
-	Nähdä uusimmat ja ajan tasalla olevat säätiedot
-	Haluan pystyä katsomaan muiden paikkakuntien säätietoja

## 4	DESIGN
Käyttöliittymä tulee sisältää seuraavat asiat:
-	Näytä valitun sijainnin nykyiset sääolosuhteet.
-	Näytä tunneittaiset ja päivittäiset ennusteet.
-	Anna käyttäjien vaihtaa eri sijaintien välillä.
-	Käyttöliittymän tulee toimia eri laitteilla, (työpöytä, mobiili)

API rajapinnat: 
https://open-meteo.com

## 5	TESTAUS
Testaus strategia:
-	Automaatti sekä manuaaliset testit
-	Testit samaan aikaan kuin funktiot/metodit tehdään
-	Testit ensijaisesti kritikaali toimivuuksille
-	Mahdollisimman modulaariset testit
Test cases:
-	Sivustoon yhteys
-	API yhteys
Tulokset:
-	Toimii (toivottavasti)

## 6	PROJEKTIN HALLINTA
Aikajana ja milestonet:
- ***Viikko* 1**: Teknologiat valittu, henkilistö kirjoitettu dokumenttiin, dokumentoinnin väsääminen. Ensimmäinen commit gittiin
- ***Viikko* 2**: API löydetty ja Martin lisätty projektiin. API toimii, testejä voi tehdä, routing toimii. Frontend/backend pystyy kommunikoimaan.

Riskien hallinta / Laatuvaatimukset:
-	Kommukunikoidaan jos on ongelmia tai kun muutoksia tehdään 
-	Kysytään ChatGPT:ltä jos spaghettia alkaa muodostumaan
-	Kaikilla oma dev branch GitHubissa
-	Main branchiin merge jos testit läpi
-	Noudatetaan Testaus osion ohjeita
-	Koodi englanniksi 
-	Kaikki käyttää samoja teknologioita
-	Koodi seuraa jotain standardia (funktio/metodi, muuttujat, etc. Nimetään samalla tavalla)
-	Javascript ei typescript

# Hyödylliset komennot ja tietoa
Kun haluaa käyttää sekä frontend että backend samanaikaisesti, pitää `npm run dev` frontend sekä backend kansioissa.
- ```npm run dev```
- ```npm test tests```
- ```git pull```
- ```git add```
- ```git commit```
- ```git push```
- ```git checkout```