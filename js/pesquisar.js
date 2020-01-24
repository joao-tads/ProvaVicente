var getUrl = "https://tads-kitchen.herokuapp.com/items";
var urlPOST = "https://tads-kitchen.herokuapp.com/item/create";
var urlREMOVE = "https://tads-kitchen.herokuapp.com/item/remove/";

$(document).ready(function() {
    $.get(
        getUrl,
        function(data) {
            preencherLista(data);
        }
    );
})

function removeItem(item) {
    var num = item.textContent[0];
    $.get(urlREMOVE + num, function() {
        esvaziaLista();
        atualizaDados();
    });
}

function adicionaItem() {
    var descricaoItem = $("#descricao")[0].value;
    var precoItem = $("#preco")[0].value;
    var obj = JSON.stringify({ description: descricaoItem, price: precoItem });
    $.post(
        urlPOST,
        obj,
        function() {
            esvaziaLista();
            atualizaDados();
        }
    );
    $("#descricao")[0].value = "";
    $("#preco")[0].value = "";
}

function esvaziaLista() {
    $("#lista").empty();
}

function atualizaDados() {
    $.get(
        getUrl,
        function(data) {
            preencheLista(data);
        }
    );
}

function preencherLista(data) {
    var lista = $("#tab")[0];
    var texto = template(data);
    lista.innerHTML = texto;
}

function criaItem(data) {
    var string = "";

    string = template(data.id, data.description, data.price);

    return string;
}

function template(data) {
    return data.map((item) => `<tr><td><span>${item.id}</span></td><td><span>${item.description}</span></td><td><span class="badge badge-primary badge-pill">R$ ${item.price}</span></td></tr>`).join("");
}
$("#descricao").on("input", function() {
    var filtro = event.target.value;
    if (filtro.length > 0) {
        var exp = new RegExp("^" + filtro, "i");
        $("tr").each(function(index) {
            var item = $("tr")[index];
            testaExpressao(item, exp);
        });
    } else {
        $("tr").each(function(index) {
            console.log("chegou");
            var item = $("tr")[index];
            item.classList.add("d-none");
            item.classList.remove("d-none");
        });
    }
});


function testaExpressao(item, exp) {
    if (exp.test(item.childNodes[1].textContent)) {
        item.classList.add("d-none");
        item.classList.remove("d-none");
    } else {
        item.classList.remove("d-none");
        item.classList.add("d-none");
    }
}