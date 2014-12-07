// Basik variabler
var game,
    ctx;

// Spel variabler
var pokemons = [],
    playerPoke = [],
    pokeUse,
    player = [100, 100, 0, 0, 1, 20], // Index 0 = x, Index 1 = y, Index 2 = vx, Index 3 = vy, index 4 = Player LVL. index 5 = Money.
    walk = 1,
    stage = 'world',
    pokemonImg;


function start() {
    game = document.getElementById('game');
    ctx = game.getContext('2d');

    window.setInterval(update, 25);
}

function Pokemon(type, name, strength, level, healing, own) {
    this.type = type;
    this.hp = 100;
    this.name = name;
    this.strength = strength;
    this.level = level;
    this.exp = 0;
    this.heal = healing;
    this.own = own;
}

Pokemon.prototype.healing = function() {
    if(stage === 'fight') { 
        if(this.hp < 100) {
            this.hp += this.heal;
        }
    } else if(stage === 'world') {
        var count = 0;
        for(var i = 0; i < pokeUse.length; i++) {
            count++;
        }
        var choice = prompt("Vill du heala alla din pokémons? Det kommer att kosta: " + count * 5 + "kr.")
        if(choice) {
            for(var i = 0; i < pokeUse.length; i++) {
                playerPoke[i].hp = 100;
            }
        }
    }
}

playerPoke.unshift(new Pokemon('fire', 'Mr red', 13, 1, 8, 1));

Pokemon.prototype.damage = function(damage) {
    this.hp -= damage;
    playerPoke[pokeUse].hp -= this.strength;
    console.log("Ditt hp: " + playerPoke[pokeUse].hp);
    console.log("Fiendens HP: " + this.hp);
    var random = Math.random();
    if(random < 0.2) {
        pokemons[0].healing();
        console.log("Fienden gjorde en heal! Han har nu: " + pokemons[0].hp + "hp.");
    }

    if(playerPoke[pokeUse].hp <= 0) {
        var nextPoke = false; // Denna behövs för att kolla om man har någon levande pokémon.

        for(var i = 0; i < playerPoke.length; i++) {
            if(playerPoke[i].hp > 0) {
                nextPoke = true;
            }
        }
        if(nextPoke) {
            var text = "";
            for(var i = 0; i < playerPoke.length; i++) {
                if(playerPoke[i].hp > 0) {
                    text = text + i + ": " + playerPoke[i].name + ", ";
                }
            }
            pokeUse = prompt("Din pokémon dog! \n" + text + "\n\nVälj vilken du vill använda nu!");
        }
    }

    if(this.hp <= 0) {
        document.getElementById('game').style.backgroundImage = "url('images/background_town1.png')";
        player[5] += 2;
        console.log(pokeUse);
        playerPoke[pokeUse].exp += 10;

        if(playerPoke[pokeUse].exp >= 100) {
            Pokemon[pokeUse].level;
        }
        stage = 'world';
    }
}

Pokemon.prototype.level = function() {
    this.level += 1;
    this.exp = 0;
    this.strength = this.strength + 3;
    this.hp = this.hp + 3;
}

function buy() {
    if(player[5] >= 10) {
        player[5] -= 10;
        var text = "";
        for(var i = 0; i < pokemons.length; i++) {
            text = text + i + ": " + pokemons[i].name + ", ";
        }
        var choice = prompt("Vilken Pokémon vill du köpa? \n" + text + "\n\nSkriv siffran för den du vill köpa.")
        for(var i = 0; i < pokemons.length; i++) {
            if(i == choice && pokemons[i].own === 1) {
                pokemons[i].hp = 15
                playerPoke.push(pokemons[i]);
            }
        }
        console.log(playerPoke);
    } else {
        alert("Du har inte råd med detta.");
    }
}

function attack(type) {
    if(type === 1) {
        pokemons[0].damage(playerPoke[0].strength);
    } else if(type === 2) {
        playerPoke[0].healing();
    }
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
    if(stage === 'world' && (key === 87 ||  key === 83 || key === 65 || key === 68)) {
        fightChange();
    }

    if(player[0] > 505 && player[0] < 525 && player[1] > 100 && player[1] < 120 && key === 13) {
        buy();
    }

    if(key === 87 && stage === 'world') {
        player[3] = -3;
    } else if(key === 83 && stage === 'world') {
        player[3] = 3;
    } else if(key === 65 && stage === 'world') {
        player[2] = -3;
    } else if(key === 68 && stage === 'world') {
        player[2] = 3;
    }

    if(stage === 'fight' && key === 49) {
        attack(1);
    } else if(stage === 'fight' && key === 50) {
        attack(2);
    }
}

function fightChange() {
    if(player[0] > 730 && player[1] < 100){
        var random = Math.random();
        if(random < 0.1) {
            player[2] = 0;
            player[3] = 0;
            choicePokemon();
            
            if(pokeUse === null) {
                pokeUse = 0;
            }
            stage = 'fight';
            random = Math.random();
            if(random < 0.2) {
                pokemons.unshift(new Pokemon('fire', 'Mr Fire', 10, player[4], 10, 1));
            } else if(random < 1) {
                pokemons.unshift(new Pokemon('water', 'Miss Water', 8, player[4], 20, 1));
            }
        }
    }
}


function choicePokemon() {
    var text = "";
    for(var i = 0; i < playerPoke.length; i++) {
        text = text + i + ": " + playerPoke[i].name + ", ";
    }
    pokeUse = prompt("Vilken Pokémon vill du använda? \n" + text + "\n\nSkriv siffran för den du vill använda.");
}

function paint(x, y) {
    ctx.beginPath();
    if(stage === 'world') {
        ctx.arc(x, y, 10, 0, 2*Math.PI);
    } else if (stage === 'fight') {
        if(pokemons[0].type === 'water') {
            pokemonImg = document.getElementById('water_pokemon');
        }
        ctx.drawImage(pokemonImg, 227, 10, 200, 200);
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
        document.getElementById('game').style.backgroundImage = "url('images/fight_background.png')"
    }
}