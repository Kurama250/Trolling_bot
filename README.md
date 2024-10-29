<h1 align="center">Trolling_bot</h1>
<em><h5 align="center">(Programming Language - Node.js | Shell)</h5></em>

<p align="center">
  <img src="https://img.shields.io/github/stars/Kurama250/Trolling_bot">
  <img src="https://img.shields.io/github/license/Kurama250/Trolling_bot">
  <img src="https://img.shields.io/github/repo-size/Kurama250/Trolling_bot">
  <img src="https://img.shields.io/badge/stability-stable-green">
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/module-name">
  <img src="https://img.shields.io/npm/v/discord.js?label=discord.js">
</p>

# Tutorial to install the bot ! For LINUX (VPS or Dedicated Server)

## 1 - on Terminal

<h5>A) Auto installer</h5>

- Run command :

```shell script
bash <(curl -s https://raw.githubusercontent.com/Trolling_bot/main/setup.sh)
```
<h5>B) Manual installer</h5>

```shell script
apt update && apt upgrade -y
apt install npm nodejs git -y
curl -fsSL https://deb.nodesource.com/setup_20.x | bash - &&\
apt-get install -y nodejs
```

```shell script
git clone https://github.com/Kurama250/Trolling_bot.git
cd Trolling_bot/
npm i discord.js && npm i pm2 -g
```
## 2 - on Terminal

```shell script
nano config.json
```

- And you also change this line :

```json
  "token": "YOUR_TOKEN"
```

- After doing this, press CTRL + X and you press Y and ENTER then you do the following commands !

## 3 - on Terminal

```shell script
pm2 start index.js -n Trolling_bot --time
```

<h3 align="center">If you like this repository don't hesitate to give it a star ⭐ !</h3>
<h1 align="center">Then it's the end you have started the bot have fun !</h1>
