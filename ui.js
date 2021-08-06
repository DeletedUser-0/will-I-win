var mainGameLoop = window.setInterval(function() {
    if (player.time < 60) {
        document.getElementById("time").innerHTML = `${Math.floor(player.time)} seconds.`;
    } else if ((player.time > 60) && (player.time < 3600)) {
        document.getElementById("time").innerHTML = `${Math.floor(player.time / 60)} minutes and ${Math.floor(player.time % 60)} seconds.`;
    } else if ((player.time > 3600) && (player.time < 86400)) {
        document.getElementById("time").innerHTML = `${Math.floor(player.time / 3600)} hours, ${Math.floor((player.time / 60) % 60)} minutes and ${Math.floor(player.time % 60)} seconds`;
    } else if ((player.time > 86400) && (player.time < 31536000)) {
        document.getElementById("time").innerHTML = `${Math.floor(player.time / 86400)} days, ${Math.floor((player.time / 3600) % 24)} hours, ${Math.floor((player.time / 60) % 60)} minutes and ${Math.floor(player.time % 60)} seconds`;
    } else {
        document.getElementById("time").innerHTML = `${Math.floor(player.time / 31536000)} years, ${Math.floor(player.time / 86400) % 365} days, ${Math.floor((player.time / 3600) % 24)} hours, ${Math.floor((player.time / 60) % 60)} minutes and ${Math.floor(player.time % 60)} seconds`;
    };

    document.getElementById("money").innerHTML = `You have ${notate2(player.money.total)}$`;

    document.getElementById("chance").innerHTML = `<p style="font-size: 125%;">Probability: <strong>${player.result.toFixed(2)}%</strong></p> <p style="position: relative; bottom: 15px;">Target: <strong>${notate2(player.money.chance)}%</strong>`;
    document.getElementById("trymoney").innerHTML = `Try to earn ${notate(player.money.receive)}$.`;
    document.getElementById("upgrade1").innerHTML = `Decrease target value <br> Cost: ${notate(player.upgrade1.cost)}$ <br> Level: ${player.upgrade1.level}`;
    if (player.money.sleep > 1000) {
        document.getElementById("wait").innerHTML = `Wait ${(player.money.sleep/1000).toFixed(2)} seconds to try again <p style="font-size: 75%; position: relative; bottom: 5px;"> Times tried: ${Math.floor(player.times).toLocaleString("pt-PT")}`;
    } else {
        document.getElementById("wait").innerHTML = `Wait ${Math.floor(player.money.sleep)}ms to try again <p style="font-size: 75%; position: relative; bottom: 5px;"> Times tried: ${Math.floor(player.times).toLocaleString("pt-PT")}`;
    };
    if (player.upgrade2.effect > 1000) {
        document.getElementById("upgrade2").innerHTML = `Decrease waiting time (${(player.upgrade2.effect/1000).toFixed(2)} seconds) <br> Cost: ${notate(player.upgrade2.cost)}$ <br> Level: ${player.upgrade2.level}`;
    } else {
        document.getElementById("upgrade2").innerHTML = `Decrease waiting time (${Math.floor(player.upgrade2.effect)}ms) <br> Cost: ${notate(player.upgrade2.cost)}$ <br> Level: ${player.upgrade2.level}`;
    };
    if (player.upgrade3.bought == false) {
        document.getElementById("upgrade3").innerHTML = `Automatically tries to earn money <br> <br> Cost: ${notate(1000)}$`;
    } else {
        document.getElementById("upgrade3").innerHTML = `Automatically tries to earn money <br> <br> Upgraded!`;
        document.getElementById("upgrade3").style.backgroundColor = `lightgreen`;
    };

    if ((player.upgrade4.cost >= 60) && (player.upgrade4.cost < 3600)) {
        document.getElementById("upgrade4").innerHTML = `Increase money receivement <br> Requirement: ${Math.floor(player.upgrade4.cost / 60)} min ${Math.floor(player.upgrade4.cost % 60)} s <br> Level: ${Math.floor(player.upgrade4.level).toLocaleString("pt-PT")}`;
    } else if ((player.upgrade4.cost >= 3600) && (player.upgrade4.cost < 86400)) {
        document.getElementById("upgrade4").innerHTML = `Increase money receivement <br> Requirement: ${Math.floor(player.upgrade4.cost / 3600)} hr, ${Math.floor((player.upgrade4.cost / 60) % 60)} min and ${Math.floor(player.upgrade4.cost % 60)} sec <br> Level: ${Math.floor(player.upgrade4.level).toLocaleString("pt-PT")}`;
    } else if ((player.upgrade4.cost >= 86400) && (player.upgrade4.cost < 31536000)) {
        document.getElementById("upgrade4").innerHTML = `Increase money receivement <br> Requirement: ${Math.floor(player.upgrade4.cost / 86400)} d ${Math.floor((player.upgrade4.cost / 3600) % 24)} hr ${Math.floor((player.upgrade4.cost / 60) % 60)} min and ${Math.floor(player.upgrade4.cost % 60)} sec <br> Level: ${Math.floor(player.upgrade4.level).toLocaleString("pt-PT")}`;
    } else {
        document.getElementById("upgrade4").innerHTML = `Increase money receivement <br> Requirement: ${Math.floor(player.upgrade4.cost / 31536000)} y, ${Math.floor(player.upgrade4.cost / 86400) % 365} d, ${Math.floor((player.upgrade4.cost / 3600) % 24)} hr, ${Math.floor((player.upgrade4.cost / 60) % 60)} min and ${Math.floor(player.upgrade4.cost % 60)} sec <br> Level: ${Math.floor(player.upgrade4.level).toLocaleString("pt-PT")}`;
    }
}, 0);

(() => {
    const tooltip = document.getElementById('tooltip');
    
    document.querySelectorAll('[tooltip]').forEach(x => {

        x.addEventListener('mouseenter', function(e) {
            tooltip.innerHTML = this.getAttribute('tooltip');

            tooltip.style.top = (Math.min(this.offsetTop + this.offsetHeight + 10, window.innerHeight - 10 - tooltip.offsetHeight)) + 'px';
            tooltip.style.left = (Math.min(Math.max(this.offsetLeft + this.offsetWidth / 2), window.innerWidth - tooltip.offsetWidth - 10)) + 'px';

            tooltip.classList.add('active');
        });

        x.addEventListener('mouseout', function(e) {
            tooltip.classList.remove('active');
        });
    });
})();

function notate(n = new OmegaNum(0)) {
    n = new OmegaNum(n);

    if (n.sign == -1) { return `-${n.abs()}`; }
    if (isNaN(n.array[0])) { return "NaN"; }
    if (!isFinite(n.array[0])) { return Infinity; }

    if (!n.array[1]) {
        let e = Math.floor(Math.log10(n.array[0]));
        let m = n.array[0] / 10 ** e;
        return e < 3 ? n.toPrecision(3) : `${Math.floor(n).toLocaleString("pt-BR")}`;
    } else if (n.array[1] < 2) { 
        return `${Math.pow(10, n.array[0] - Math.floor(n.array[0])).toPrecision(3)}x10<sup>${Math.floor(n.array[0]).toLocaleString("pt-BR")}</sup>`;
    } else {
        return `${"e".repeat(n.array[1])}${Math.floor(n.array[0])}`;
    };
};

function notate2(n = new OmegaNum(0)) {
    n = new OmegaNum(n);

    if (n.sign == -1) { return `-${n.abs()}`; }
    if (isNaN(n.array[0])) { return "NaN"; }
    if (!isFinite(n.array[0])) { return Infinity; }

    if (!n.array[1]) {
        let e = Math.floor(Math.log10(n.array[0]));
        let m = n.array[0] / 10 ** e;
        return e < 3 ? n.toFixed(2) : `${Math.floor(n).toLocaleString("pt-BR")}`;
    } else if (n.array[1] < 2) { 
        return `${Math.pow(10, n.array[0] - Math.floor(n.array[0])).toPrecision(3)}x10<sup>${Math.floor(n.array[0]).toLocaleString("pt-BR")}</sup>`;
    } else {
        return `${"e".repeat(n.array[1])}${Math.floor(n.array[0])}`;
    };
};
