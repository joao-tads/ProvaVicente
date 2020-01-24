var getUrl = "https://tads-kitchen.herokuapp.com/cards";

$(document).ready(function() {
    $.get(
        getUrl,
        function(data) {
            preencherLista(data);
        }
    );
})


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
        classe = "list-group-item-danger";
    } else {
        classe = "list-group-item-success";
    }

    string = template(data.number, data.status, classe);

    return string;
}

function template(number, status, classe) {
    return `
    <tr id="linha">
        <th name="number" scope="row">${number}</th>
        <td name="status" class="${classe}">${status}</td>
    </tr>
    `;
}