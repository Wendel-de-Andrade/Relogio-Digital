let cCode;

function fazerRequisicao() {
  return new Promise((resolve, reject) => {
    fetch("https://timezoneapi.io/api/ip/?token=ayoMNmWjTzAFguEpXmvn")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Erro na requisição. Código de status: " + response.status);
        }
      })
      .then(resposta => {
        var apiHour = parseInt(resposta.data.datetime.hour_24_wilz);
        var apiMin = parseInt(resposta.data.datetime.minutes);
        var apiSec = parseInt(resposta.data.datetime.seconds);

        cCode = resposta.data.country_code;

        criarRelogio(apiHour, apiMin, apiSec);
        resolve(cCode);
      })
      .catch(error => {
        reject(error);
      });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fazerRequisicao()
    .then(() => {
      //console.log(cCode);
      // Atribuir o valor de cCode a uma variável global para uso em outro script
      //ToDo - refazer esse sistema para que não precise ser armazenado no localStorage
      localStorage.setItem('cCode', cCode);
    })
    .catch(error => {
      console.error(error);
    });
});


function criarRelogio(hora, minuto, segundo) {

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

        // Pega o elemento no Index.html
        const horas = document.getElementById('horas');
        const minutos = document.getElementById('minutos');
        const segundos = document.getElementById('segundos');

        // Adiciona o 0 nos números únicos
        horas.textContent = adicionarZero(hora);
        minutos.textContent = adicionarZero(minuto);
        segundos.textContent = adicionarZero(segundo);

    }

    // Inicia a atualização do relógio
    atualizarRelogio();
}