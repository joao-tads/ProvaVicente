var getUrl = "https://tads-kitchen.herokuapp.com/cards";
var urlToggle = "https://tads-kitchen.herokuapp.com/card/toggle/";


$(document).ready(function() {
    $.get(
        getUrl,
        function(data) {
            preencherLista(data);
        }
    );
});

function alternar(valor) {
    $.get(urlToggle + valor);
    atualizarPagina();
}

function atualizarPagina() {
    limparLista();
    $.get(
        getUrl,
        function(data) {
            preencherLista(data);
        }
    );
}

function limparLista() {
    $("#tab").empty();
}

function preencherLista(data) {
    var lista = $("#tab")[0];
    data.map(function(dado) {
        var item = criarItem(dado);
        lista.innerHTML = item + lista.innerHTML;
    });
}

function criarItem(data) {
    var string = "";
    var classe = "";

    if (data.status == "off") {
        classe = "danger";
    } else {
        classe = "success";
    }

    string = template(data.number, data.status, classe);

    return string;
}

function template(number, status, classe) {
    return `
    <tr>
        <th name="number" scope="row">${number}</th>
        <td name="status" class="list-group-item-${classe}"><button class="btn-${classe}" onclick="alternar(${number})">${status}</button></td>
    </tr>
    `;
}