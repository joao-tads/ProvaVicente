var getUrl = "https://tads-kitchen.herokuapp.com/items";

$(document).ready(function () {
    $.get(
        getUrl,
        function (data) {
            preencherLista(data);
        }
    );
})


function preencherLista(data) {
    var lista = $("#tab")[0];
    data.map(function (dado) {
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