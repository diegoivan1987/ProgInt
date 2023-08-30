function sumar() {
    let numero1 = parseFloat(document.getElementById("numero1").value);
    let numero2 = parseFloat(document.getElementById("numero2").value);
    let resultado = numero1 + numero2;
    document.getElementById("resultado").innerText = resultado;
}

function restar() {
    let numero1 = parseFloat(document.getElementById("numero1").value);
    let numero2 = parseFloat(document.getElementById("numero2").value);
    let resultado = numero1 - numero2;
    document.getElementById("resultado").innerText = resultado;
}

function multiplicar() {
    let numero1 = parseFloat(document.getElementById("numero1").value);
    let numero2 = parseFloat(document.getElementById("numero2").value);
    let resultado = numero1 * numero2;
    document.getElementById("resultado").innerText = resultado;
}

function dividir() {
    let numero1 = parseFloat(document.getElementById("numero1").value);
    let numero2 = parseFloat(document.getElementById("numero2").value);
    if (numero2 === 0) {
        alert("No se puede dividir por cero");
        return;
    }
    let resultado = numero1 / numero2;
    document.getElementById("resultado").innerText = resultado;
}

function raizCuadrada() {
    let numero1 = parseFloat(document.getElementById("numero1").value);
    if (numero1 < 0) {
        alert("No se puede calcular la raíz cuadrada de un número negativo");
        return;
    }
    let resultado = Math.sqrt(numero1);
    document.getElementById("resultado").innerText = resultado;
}

function potencia() {
    let numero1 = parseFloat(document.getElementById("numero1").value);
    let numero2 = parseFloat(document.getElementById("numero2").value);
    let resultado = Math.pow(numero1, numero2);
    document.getElementById("resultado").innerText = resultado;
}
