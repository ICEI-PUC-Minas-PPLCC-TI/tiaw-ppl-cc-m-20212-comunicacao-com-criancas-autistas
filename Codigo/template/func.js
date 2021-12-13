/*
----------------------------------------- Botao -----------------------------------------
*/
$(document).ready(function () {
    $('.material-button-toggle').on("click", function () {
        $(this).toggleClass('open');
        $('.option').toggleClass('scale-on');
    });
});

/*-------------------------------------- Calendario --------------------------------*/

const treatDate = (date)=>{
    moment.locale('pt-br')
    return moment(date).format('LLLL'); 
}
// declara um conjunto inicial de crises
var db_crises_inicial = {
    "data": [
        {
          "id": 1,
          "data": "2021-11-17T21:46",
          "OQueAcalmou": "Esperar um tempo e tentar a refeição novamente",
          "motivo": "Não queria um legume do prato",
          "tempoDeDuracao": "15",
          "reacaoDelx": "moderada",
          "suaReacao": "Jogou o prato no chão"
        },
        {
          "id": 2,
          "data": "2021-11-19T15:02",
          "OQueAcalmou": " Jogou o controle da TV na janela",
          "motivo": "O desenho acabou",
          "tempoDeDuracao": "45",
          "reacaoDelx": "moderada",
          "suaReacao": "desligar a tv e distrai-lo com o gato"
        },
        {
          "id": 3,
          "data": "2021-11-22T17:05",
          "OQueAcalmou": "Deixá-lo chorar até se acalmar e finalmente dormir",
          "motivo": "Estava com sono",
          "tempoDeDuracao": "60",
          "reacaoDelx": "leve",
          "suaReacao": "Chorou bastante até dormir"
        },
        {
          "id": 4,
          "data": "2021-11-24T08:02",
          "OQueAcalmou": "Pegar o brinquedo dos dois irmãos e guardar até que fizessem as pazes",
          "motivo": "Brigou por um brinquedo com o irmão",
          "tempoDeDuracao": "60",
          "reacaoDelx": "grave",
          "suaReacao": " Gritou com o irmão e chorou"
        },
        {
          "id": 5,
          "data": "2021-11-22T20:03",
          "OQueAcalmou": "Se jogou no chão",
          "motivo": "Queria pegar o gato e ele fugiu",
          "tempoDeDuracao": "30",
          "reacaoDelx": "moderada",
          "suaReacao": "Dar um ursinho com pelo semelhante para ele brincar"
        }
      ]
}

// Caso os dados já estejam no Local Storage, caso contrário, carrega os dados iniciais
var db = JSON.parse(localStorage.getItem('db_crise'));
if (!db) {
    db = db_crises_inicial
};

// Exibe mensagem em um elemento de ID msg
function displayMessage(msg) {
    $('#msg').html('<div class="alert alert-warning">' + msg + '</div>');
}

function insertcrise(crise) {
    // Calcula novo Id a partir do último código existente no array (PODE GERAR ERRO SE A BASE ESTIVER VAZIA)
    let novoId = 1;
    if (db.data.length != 0) 
      novoId = db.data[db.data.length - 1].id + 1;
    let novocrise = {
        "id": novoId,
        "data": crise.data,
        "OQueAcalmou" : crise.OQueAcalmou,
        "motivo": crise.motivo,
        "tempoDeDuracao" : crise.tempoDeDuracao,
        "reacaoDelx": crise.reacaoDelx,
        "suaReacao": crise.suaReacao
    };

    // Insere o novo objeto no array
    db.data.push(novocrise);
    displayMessage("Crise inserida com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_crise', JSON.stringify(db));
}

function updatecrise(id, crise) {
    // Localiza o indice do objeto a ser alterado no array a partir do seu ID
    let index = db.data.map(obj => obj.id).indexOf(id);

    // Altera os dados do objeto no array
    db.data[index].data = crise.data,
    db.data[index].OQueAcalmou = crise.OQueAcalmou,
    db.data[index].motivo = crise.motivo,
    db.data[index].tempoDeDuracao = crise.tempoDeDuracao,
    db.data[index].reacaoDelx = crise.reacaoDelx,
    db.data[index].suaReacao = crise.suaReacao

    displayMessage("crise alterado com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_crise', JSON.stringify(db));
}

function deletecrise(id) {    
    // Filtra o array removendo o elemento com o id passado
    db.data = db.data.filter(function (element) { return element.id != id });

    displayMessage("Crise removida com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_crise', JSON.stringify(db));
}