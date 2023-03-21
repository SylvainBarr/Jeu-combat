let combattants = [];
let perso = 0;
let adv = -5;
let att = 0;
let choixAdv = choixStat();



function creation() {
    document.getElementById('start').style.display = 'none';
    class Combattant {
        constructor(name, life, force, intell, def, speed) {
            this.name = name;
            this.life = 150;
            this.force = getRandomInt(99);
            this.intell = getRandomInt(99);
            this.def = getRandomInt(200 - (this.force + this.intell));
            if (this.def > 99) {
                this.def = this.def / 2;
            }
            this.speed = 200 - (this.force + this.intell + this.def);
        }
    }
    let boutonOppo = "";
    let bouton = "";
    
    let prenom = ['Caïus', 'Spartacus', 'Achilles', 'Crixus', 'Marcus', 'Julius', 'Gaius'];
    let nom = ['Caligula', 'Cicero', 'Crispinus', 'Luxurios', 'Romanus', 'Crassus', 'Platus', 'Maximus'];

    document.getElementById('textZone').innerHTML = 'Avé César ! Ceux qui vont mourir te saluent ! ';
    console.log("\nAvé César ! Ceux qui vont mourir te saluent !\n");
    document.getElementById('fighters').style.display = 'block';

    for (let i = 0; i < 4; i++) {
        let combattant = new Combattant((prenom[getRandomInt(6)] + " " + nom[getRandomInt(8)]));
        combattants[i] = combattant;
        bouton = "fighter" + (i + 1);
        let fighterstats = Object.keys(combattant).map(function(cle){
            return [Number(cle), combattant[cle]]
        });
        document.getElementsByClassName(bouton).innerHTML=fighterstats;
        document.getElementById(bouton).value = combattant.name;
        boutonOppo = "oppo" + (i + 1);
        document.getElementById(boutonOppo).value = combattant.name;
        console.log(combattants[i].name + "\nForce : " + combattants[i].force + "\nIntelligence : " + combattants[i].intell + "\nDéfense : " + combattants[i].def + "\nVitesse : " + combattants[i].speed + "\n")
    }
}

function fight() {

    let cont = true;
    let esq = false;
    while (cont) {

        // choix de l'attaque

        console.log("\n**********\nVos possibilités :\nAttaque - 1\nAttaque magique - 2\nDéfendre - 3\n**********\n");
        let choix = parseInt(prompt("Que faire?"));
        att = choix == 1 ? combattants[perso].force : combattants[perso].intell;


        // Notre attaque

        esq = esquive(adv)
        if ((choix == 1 || choix == 2) && esq === false) {
            degats(perso, adv);
        }


        else if (esq) {
            console.log("\n**********\nVotre adversaire " + combattants[adv].name + " esquive")
        }

        // test si adversaire mort après notre attaque

        cont = testLife();
        if (cont === false) {
            break;
        }

        //attaque ennemi

        esq = esquive(perso)
        if (esq) {
            console.log("Vous esquivez\n**********\n")
        }

        else if (choix == 3 && esq === false) {
            defense();
        }

        else {
            degats(adv, perso);
        }
        cont = testLife();
        if (cont === false) {
            break;
        }

    }

    if (combattants[perso].life <= 0) {
        console.log("Vous subissez un coup fatal, " + combattants[perso].name + " est mort, vous avez perdu !")
    }
    else if (combattants[adv].life <= 0) {
        console.log("Vous achevez le combattant adverse : " + combattants[perso].name + " est mort, vous avez gagné !")
    }
}



// fonction qui définit si ennemi attaque avec force ou intell

function choixStat() {
    if (combattants[adv].force > combattants[adv].intell) {
        return (combattants[adv].force);
    }
    else {
        return (combattants[adv].intell);
    }
}


// fonction de calaul des degats et vie après coups

function degats(carac1, carac2) {
    if (carac1 == perso) {
        let damage = ((att * (30 / 100)) * ((100 - combattants[carac2].def) / 100));
        combattants[carac2].life = (combattants[carac2].life - damage);
        if (combattants[carac2].life <= 0) {
            console.log("")
        }
        else {
            console.log("\n**********\nVous infligez " + damage + " dégats, il reste " + combattants[carac2].life + " PV à l'adversaire\n");
        }
    }
    else {
        let damage = ((choixAdv * (30 / 100)) * ((100 - combattants[carac1].def) / 100));
        combattants[carac2].life = (combattants[carac2].life - damage);
        if (combattants[carac2].life <= 0) {
            console.log("")
        }
        else {
            console.log("Vous subissez " + damage + " dégats, il vous reste " + combattants[carac2].life + " PV\n**********\n");
        }
    }
}


// fonction de test si 2 combattants sont en vie

function testLife() {
    if ((combattants[perso].life > 0) && (combattants[adv].life > 0)) {
        return true;
    }
    else {
        return false;
    }
}


// fonction de test d'esquive

function esquive(caracter) {
    let jetEsquive = getRandomInt(100);
    if ((10 + (combattants[caracter].speed / 5)) >= jetEsquive) {
        return true;
    } else {
        return false;
    }
}


//fonction de défense

function defense() {
    combattants[perso].life = combattants[perso].life - ((choixAdv * 30 / 100) * ((100 - combattants[perso].def) / 3 / 100))
    console.log("Vous subissez " + ((combattants[adv].intell * 30 / 100) * ((100 - combattants[perso].def) / 3 / 100)) + " dégats, il vous reste " + combattants[perso].life + " PV")
}

// fonction random number

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


// fontion du choix de perso

function choixPerso(caracNumber) {

    perso = parseInt(caracNumber);
    adv = perso
    document.getElementById('fighters').style.display = 'none';
    document.getElementById('opponents').style.display = 'block';
    document.getElementById('oppo'+(perso+1)).style.display = 'none';
}

// fonction du choix de l'adversaire

function choixOpponent(caracChoice) {

        adv = parseInt(caracChoice);
    
    if (adv !== perso) {
        document.getElementById('opponents').style.display = 'none';
        document.getElementById('combat').style.display = 'block';
    }
}