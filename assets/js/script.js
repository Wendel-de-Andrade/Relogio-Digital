document.addEventListener("DOMContentLoaded", function () {
    fetch("https://timezoneapi.io/api/ip/?token=ayoMNmWjTzAFguEpXmvn")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Erro na requisição. Código de status: " + response.status);
            }
        })
        .then(function (resposta) {
            //var respostaJs = JSON.parse(resposta);
            var apiHour = parseInt(resposta.data.datetime.hour_24_wilz);
            var apiMin = parseInt(resposta.data.datetime.minutes);
            var apiSec = parseInt(resposta.data.datetime.seconds);

            criarRelogio(apiHour, apiMin, apiSec); // Chama a função para criar o relógio

        })
        .then(function (error) {
            console.log(error);
        })
});



function criarRelogio(hora, minuto, segundo) {
    // Solicita a hora, minuto e segundo
    //var hora = apiHour;
    //var minuto = parseInt(prompt("Digite o minuto (0-59):"));
    //var segundo = parseInt(prompt("Digite o segundo (0-59):"));
    //console.log(hora);
    //console.log(minuto);
    //console.log(segundo);



    // Verifica se os valores estão dentro do intervalo válido
    if (hora < 0 || hora > 23 || minuto < 0 || minuto > 59 || segundo < 0 || segundo > 59) {
        console.log("Valores inválidos.");
        return;
    }

    // Função para adicionar um zero à esquerda dos números menores que 10
    function adicionarZero(numero) {
        if (numero < 10) {
            return "0" + numero;
        }
        return numero;
    }

    // Função para atualizar o relógio a cada segundo
    function atualizarRelogio() {
        segundo++;
        if (segundo == 60) {
            segundo = 0;
            minuto++;
            if (minuto == 60) {
                minuto = 0;
                hora++;
                if (hora == 24) {
                    hora = 0;
                }
            }
        }

        // Exibe o relógio no formato HH:MM:SS
        //console.log(adicionarZero(hora) + ":" + adicionarZero(minuto) + ":" + adicionarZero(segundo));

        // Exibe o relógio separadamente
        /*console.log(adicionarZero(hora));
        console.log(adicionarZero(minuto));
        console.log(adicionarZero(segundo));*/

        // Aguarda 1 segundo antes de chamar a função novamente
        setTimeout(atualizarRelogio, 1000);



        const horas = document.getElementById('horas');
        const minutos = document.getElementById('minutos');
        const segundos = document.getElementById('segundos');

        horas.textContent = adicionarZero(hora);
        minutos.textContent = adicionarZero(minuto);
        segundos.textContent = adicionarZero(segundo);

    }

    // Inicia a atualização do relógio
    atualizarRelogio();
}




/*const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');

const relogio = setInterval(function time() {
    let dateToday = new Date();
    let hr = dateToday.getHours();
    let min = dateToday.getMinutes();
    let sec = dateToday.getSeconds();

    if (hr < 10) hr = '0' + hr;
    if (min < 10) min = '0' + min;
    if (sec < 10) sec = '0' + sec;

    horas.textContent = hr;
    minutos.textContent = min;
    segundos.textContent = sec;
})*/