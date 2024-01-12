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

