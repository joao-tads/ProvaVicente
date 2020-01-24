var getUrl = "https://tads-kitchen.herokuapp.com/items";
var removeUrl = "https://tads-kitchen.herokuapp.com/item/remove/";

$(document).ready(function() {
    $.get(
        getUrl,
        function(data) {
            preencherLista(data);
        }
    );
});

var tbody = document.querySelector("tbody");

tbody.addEventListener("dblclick", function(event) {
    event.target.parentNode.remove();
})

function removeItem(item) {
    $.get(removeUrl + item);
    atualizaDados();
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
    var string = templat(data);
    return string;
}

function templat(data) {
    return `
    <tr ondblclick="removeItem(${data.id})">
        <th id="id" scope="row">${data.id}</th>
        <td name="description">${data.description}</td>
        <td name="price">${data.price}</td>
    </tr>
    `;
}