// Basik variabler
var game,
    ctx;

// Spel variabler
var pokemons,
    player = [100, 100, 0, 0], // Index 0 = x, Index 1 = y, Index 2 = vx, Index 3 = vy.
    walk = 1,
    stage = 'world',
    pokemonImg;

function start() {
    game = document.getElementById('game');
    ctx = game.getContext('2d');

    window.setInterval(update, 25);
}

function Pokemon(type, name, strength, own) {
    this.type = type;
    this.hp = 100;
    this.name = name;
    this.strength = strength;
    this.own = own;
}

Pokemon.prototype.damage = function(damage) {
    this.hp -= damage;
    console.log(this.hp);
}

Pokemon.prototype.catch = function() {
    this.own = 1;
}

function keyUp(event) {
    key = event.keyCode;
    event.preventDefault();

    if(key === 87) {
        player[3] = 0;
    } else if(key === 83){
        player[3] = 0;
    } else if(key === 65) {
        player[2] = 0;
    } else if(key === 68) {
        player[2] = 0;
    }
}

function keyHandler(event) {
    var key = event.keyCode;

    if(key === 87 && walk === 1) {
        if( fightChange() && player[0] > 730 && player[1] < 100) {
            playervx = 0;
            playervy = 0;
            walk = 0;
        } else {
            player[3] = -3;
        }
    } else if(key === 83 && walk === 1) {
        if( fightChange() && player[0] > 730 && player[1] < 100) {
            playervx = 0;
            playervy = 0;
            walk = 0;
        } else {
            player[3] = 3;
        }
    } else if(key === 65 && walk === 1) {
        if( fightChange() && player[0] > 730 && player[1] < 100) {
            playervx = 0;
            playervy = 0;
            walk = 0;
        } else {
            player[2] = -3;
        }
    } else if(key === 68 && walk === 1) {
        if( fightChange() && player[0] > 730 && player[1] < 100) {
            playervx = 0;
            playervy = 0;
            walk = 0;
        } else {
            player[2] = 3;
        }
    }
}

function fightChange() {
    if(player[0] > 730 && player[1] < 100){
        var random = Math.random();
        if(random < 0.1) {
            pokemons = [];
            stage = 'fight';
            random = Math.random();
            if(random < 0.2) {
                pokemons.push(new Pokemon('fire', 'Mr Fire', 10, 0));
            } else if(random < 1) {
                pokemons.push(new Pokemon('water', 'Miss Water', 8, 0));
            }
            return true;
        } else {
            return false;
        }
    }
}

function paint(x, y) {
    ctx.beginPath();
    if(stage === 'world') {
        ctx.arc(x, y, 10, 0, 2*Math.PI);
    } else if (stage === 'fight') {
        if(pokemons[0].type === 'water') {
            pokemonImg = document.getElementById('water_pokemon');
            ctx.drawImage(pokemonImg, 50, 50, 200, 200);
        }
    }
    ctx.fill();
    ctx.closePath();
}

function update() {
    ctx.clearRect(0, 0, 1280, 720);
    player[0] += player[2];
    player[1] += player[3];
    paint(player[0], player[1]);

    if(stage === 'world') {
        
    } else if(stage === 'fight') {
        document.getElementById('game').style.backgroundImage = "url('../images/fight_background.png')"
    }
}