var getUrl = "https://tads-kitchen.herokuapp.com/items";
var postUrl = "https://tads-kitchen.herokuapp.com/item/create";

$(document).ready(function() {
    $.get(
        getUrl,
        function(data) {
            preencherLista(data);
        }
    );
});

$("#InsereElemento").on("click", function() {
    adicionaItem();
});

$("#AtualizaLista").on("click", function() {
    limparLista();
    atualizaDados();
});

function adicionaItem() {
    var descricaoItem = $("#descricao")[0].value;
    var precoItem = $("#preco")[0].value;
    var obj = JSON.stringify({ description: descricaoItem, price: precoItem });
    $.post(
        postUrl,
        obj,
        function() {
            limparLista();
            atualizaDados();
        }
    );
    $("#descricao")[0].value = "";
    $("#preco")[0].value = "";
}

function limparLista() {
    $("#tab").empty();
}

function atualizaDados() {
    $.get(
        getUrl,
        function(data) {
            preencherLista(data);
        }
    );
}

function preencherLista(data) {
    var lista = $("#tab")[0];
    data.map(function(dado) {
        var item = criarItem(dado);
        lista.innerHTML = item + lista.innerHTML;
    });
}

function criarItem(data) {
    var string = templat(data);
    return string;
}

function templat(data) {
    return `
    <tr id="linha">
        <th name="id" scope="row">${data.id}</th>
        <td name="description">${data.description}</td>
        <td name="price">${data.price}</td>
        
    </tr>
    `;
}