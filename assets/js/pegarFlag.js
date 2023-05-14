// Recuperar o valor de cCode do localStorage
const cCode = localStorage.getItem('cCode');

// Utilizar o valor de cCode
console.log(cCode);

const country_code = cCode; // Código do país desejado (exemplo: Estados Unidos)
//console.log(country_code);

fetch(`https://restcountries.com/v3.1/alpha/${country_code}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Não foi possível obter a bandeira.');
        }
    })
    .then(function (resposta) {
        var flag_url = resposta[0].flags.svg;
        const flagImage = document.getElementById('flag');
        flagImage.src = flag_url;
    })
    .catch(error => {
        console.error(error);
    });