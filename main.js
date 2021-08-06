class Player {
    constructor(data) {
        this.times = data?.times || 0;
        this.time = data?.time || 0;

        this.money = {
            total: data?.money?.total || 0,
            receive: data?.money?.receive || 1,
            multiplier: data?.money?.multiplier || 1.01,
            chance: data?.money?.chance || 95,
            sleep: data?.money?.sleep || 3000,
        };
        
        this.result = data?.result || 0;

        this.upgrade1 = {
            cost: data?.upgrade1?.cost || 1,
            level: data?.upgrade1?.level || 0,
        };

        this.upgrade2 = {
            cost: data?.upgrade2?.cost || 10,
            level: data?.upgrade2?.level || 0,
            effect: data?.upgrade2?.effect || 3000,
        };

        this.upgrade3 = {
            bought: data?.upgrade3?.bought || false,
        };

        this.upgrade4 = {
            cost: data?.upgrade4?.cost || 60,
            level: data?.upgrade4?.level || 0,
        };
    };
};

var player = new Player();

var mainGameLoop = window.setInterval(function() {
    if (OmegaNum.cmp(player.money.sleep, 0) > 0) {
        player.money.sleep = OmegaNum.sub(player.money.sleep, 7);
    };
    if (isNaN(player.money.sleep)) {
        player.money.sleep = new OmegaNum(player.upgrade2.effect);
    };
    if (OmegaNum.cmp(player.money.sleep, 0) < 0) {
        player.money.sleep = 0;
    };
    player.upgrade2.effect = OmegaNum.pow(3000, OmegaNum.pow(0.996, player.upgrade2.level));
    if (player.upgrade3.bought == true) {
        add();
    };
    if (isNaN(player.upgrade4.cost)) {
        player.upgrade4.cost = player.upgrade4.cost.array[0];
    };
    player.time = OmegaNum.add(player.time, 0.007);
}, 7);

function add() {
    if (OmegaNum.cmp(player.money.sleep, 0) == 0) {
        player.result = Math.random() * 100;
        player.money.sleep = new OmegaNum(player.upgrade2.effect);
        player.times += 1;
        if (OmegaNum.cmp(player.result, player.money.chance) >= 0) {
            player.money.total = OmegaNum.add(player.money.total, player.money.receive).toFixed(2);
            player.money.receive = OmegaNum.times(player.money.receive, player.money.multiplier);
        };
    };
};

function upgrade1() {
    if (OmegaNum.cmp(player.money.total, player.upgrade1.cost) >= 0) {
        player.money.total = OmegaNum.sub(player.money.total, player.upgrade1.cost).toFixed(2);
        player.upgrade1.cost = OmegaNum.pow(player.upgrade1.cost, 1.06).times(1.01).toFixed(2);
        player.money.chance = OmegaNum.div(player.money.chance, OmegaNum.add(OmegaNum.div(0.02, OmegaNum.add(OmegaNum.div(player.upgrade1.level, 15), 1)), 1));
        player.upgrade1.level = Math.floor(OmegaNum.add(player.upgrade1.level, 1)).toLocaleString("pt-PT");
    };
};

function upgrade2() {
    if (OmegaNum.cmp(player.money.total, player.upgrade2.cost) >= 0) {
        player.money.total = OmegaNum.sub(player.money.total, player.upgrade2.cost).toFixed(2);
        player.upgrade2.cost = OmegaNum.pow(player.upgrade2.cost, 1.075);
        player.upgrade2.level = Math.floor(OmegaNum.add(player.upgrade2.level, 1)).toLocaleString("pt-PT");
    };
};

function upgrade3() {
    if (OmegaNum.cmp(player.money.total, 1000) >= 0) {
        if (player.upgrade3.bought == false) {
            player.money.total = player.money.total = OmegaNum.sub(player.money.total, 1000);
            player.upgrade3.bought = true
        };
    };
};

function upgrade4() {
    if (OmegaNum.cmp(player.time, player.upgrade4.cost) >= 0) {
        player.upgrade4.level += 1;
        player.upgrade4.cost = OmegaNum.mul(player.upgrade4.cost, 1.01).add(60);
        player.money.receive = OmegaNum.pow(player.money.receive, 1.01).mul(1.01);
    };
};

function reset() {
    var r = confirm("Are you sure do you want to reset?");
        if (r == true) {
        player.time = 0;
        player.money.total = 0;
        player.money.receive = 1;
        player.money.multiplier = 1.01;
        player.money.chance = 95;
        player.money.sleep = 3000;
        player.result = 0;
        player.upgrade1.cost = 1;
        player.upgrade1.level = 0;
        player.upgrade2.cost = 10;
        player.upgrade2.level = 0;
        player.upgrade2.effect = 3000;
        player.upgrade3.bought = false;
        player.upgrade4.cost = 60;
        player.upgrade4.level = 0;
        document.getElementById("upgrade3").style.backgroundColor = `white`;
        player.times = 0;
        player.time = 0;
    };
};

function Save() {
    localStorage.player = JSON.stringify(player);
};

function Load() {
    player = new Player(JSON.parse(localStorage.player));
    console.log("Save loaded");
    return player.obj || "default";
};

var mainGameLoop = window.setInterval(function() {
    Save();
}, 3 * 1000);

Load();
