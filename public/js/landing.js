document.addEventListener('DOMContentLoaded', function () {
    var symbols = document.querySelectorAll('.symbol-choice');

    symbols.forEach(function(symbol) {
        symbol.addEventListener('click', function() {
            // Remove 'selected' class from all symbols
            symbols.forEach(function(sym) {
                sym.classList.remove('selected');
            });

            // Add 'selected' class to the clicked symbol
            this.classList.add('selected');

            // Update the actual radio input value
            document.getElementById('symbol' + this.dataset.symbol).checked = true;
        });
    });
});


////////store the player's name in local storage

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('startGame').addEventListener('click', function () {
        var playerName = document.getElementById('playerName').value;

        // Store the player's name in local storage
        localStorage.setItem('playerName', playerName);
    });
});