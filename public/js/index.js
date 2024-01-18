document.addEventListener('DOMContentLoaded', function () {
    var symbols = document.querySelectorAll('.symbol-choice');

    symbols.forEach(function(symbol) {
        symbol.addEventListener('click', function() {
            symbols.forEach(function(sym) {
                sym.classList.remove('selected');
            });
            this.classList.add('selected');
            document.getElementById('symbol' + this.dataset.symbol).checked = true;
        });
    });
});

