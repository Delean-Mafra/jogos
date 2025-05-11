const jogoForca = {
    "Países": [
        "Brasil", "Argentina", "Canadá", "Estados Unidos", "México", "França", "Alemanha", "Japão", "Itália", "Reino Unido"
    ],
    "Objetos": [
        "Cadeira", "Mesa", "Computador", "Caderno", "Relógio", "Telefone", "Lâmpada", "Ferro", "Espelho", "Ventilador"
    ],
    "Elogios": [
        "Inteligente", "Criativo", "Amável", "Gentil", "Engraçado", "Educado", "Carismático", "Honesto", "Simpático", "Competente"
    ],
    "Animais": [
        "Cachorro", "Gato", "Cavalo", "Elefante", "Leão", "Tigre", "Águia", "Baleia", "Macaco", "Girafa"
    ],
    "Cores": [
        "Vermelho", "Azul", "Amarelo", "Verde", "Preto", "Branco", "Laranja", "Rosa", "Cinza", "Roxo"
    ],
    "Sentimentos": [
        "Felicidade", "Tristeza", "Raiva", "Medo", "Esperança", "Amor", "Saudade", "Confiança", "Alívio", "Solidão"
    ],
    "Alimentos": [
        "Arroz", "Feijão", "Pão", "Macarrão", "Carne", "Frango", "Peixe", "Batata", "Maçã", "Banana"
    ],
    "FLV": [
        "Alface", "Cenoura", "Tomate", "Pepino", "Abóbora", "Brócolis", "Espinafre", "Abacate", "Berinjela", "Couve"
    ]
};

let palavraAleatoria = '';
let categoriaAleatoria = '';
let letrasChutadas = [];
let erros = 0;
let palavraEscondida = [];
let maxErros = 7;

function escolherPalavra() {
    const categorias = Object.keys(jogoForca);
    categoriaAleatoria = categorias[Math.floor(Math.random() * categorias.length)];
    const palavras = jogoForca[categoriaAleatoria];
    palavraAleatoria = palavras[Math.floor(Math.random() * palavras.length)].toUpperCase();
    
    palavraEscondida = Array(palavraAleatoria.length).fill('_');
    mostrarPalavra();
}

function mostrarPalavra() {
    const palavraElement = document.getElementById('palavra');
    palavraElement.innerHTML = palavraEscondida.join(' ');

    const dicaElement = document.getElementById('dica');
    dicaElement.innerHTML = `Categoria: ${categoriaAleatoria}`;

    const letrasElement = document.getElementById('letras');
    letrasElement.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const letra = String.fromCharCode(i);
        const letraElement = document.createElement('span');
        letraElement.classList.add('letra');
        letraElement.innerHTML = letra;
        if (letrasChutadas.includes(letra)) {
            letraElement.classList.add('letra-chutada');
        }
        letraElement.addEventListener('click', () => verificarLetra(letra));
        letrasElement.appendChild(letraElement);
    }
}

function verificarLetra(letra) {
    if (letrasChutadas.includes(letra)) return;
    letrasChutadas.push(letra);
    
    if (palavraAleatoria.includes(letra)) {
        for (let i = 0; i < palavraAleatoria.length; i++) {
            if (palavraAleatoria[i] === letra) {
                palavraEscondida[i] = letra;
            }
        }
        mostrarPalavra();
        if (palavraEscondida.join('') === palavraAleatoria) {
            setTimeout(() => {
                alert('Parabéns! Você ganhou!');
                reiniciarJogo();
            }, 100);
        }
    } else {
        erros++;
        desenharForca();
        document.getElementById('erros').innerText = `Erros: ${erros}`;
        if (erros === maxErros) {
            setTimeout(() => {
                alert(`Você perdeu!`);
                reiniciarJogo();
            }, 100);
        }
    }
}

function desenharForca() {
    const canvas = document.getElementById('forcaCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;

    // Base da forca
    ctx.beginPath();
    ctx.moveTo(20, 230);
    ctx.lineTo(180, 230);
    ctx.stroke();

    // Poste vertical
    ctx.beginPath();
    ctx.moveTo(40, 230);
    ctx.lineTo(40, 20);
    ctx.stroke();

    // Topo
    ctx.beginPath();
    ctx.moveTo(40, 20);
    ctx.lineTo(120, 20);
    ctx.stroke();

    // Corda
    ctx.beginPath();
    ctx.moveTo(120, 20);
    ctx.lineTo(120, 40);
    ctx.stroke();

    if (erros >= 1) {
        // Cabeça
        ctx.beginPath();
        ctx.arc(120, 60, 20, 0, Math.PI * 2, true);
        ctx.stroke();
    }
    if (erros >= 2) {
        // Corpo
        ctx.beginPath();
        ctx.moveTo(120, 80);
        ctx.lineTo(120, 150);
        ctx.stroke();
    }
    if (erros >= 3) {
        // Braço esquerdo
        ctx.beginPath();
        ctx.moveTo(120, 100);
        ctx.lineTo(80, 120);
        ctx.stroke();
    }
    if (erros >= 4) {
        // Braço direito
        ctx.beginPath();
        ctx.moveTo(120, 100);
        ctx.lineTo(160, 120);
        ctx.stroke();
    }
    if (erros >= 5) {
        // Perna esquerda
        ctx.beginPath();
        ctx.moveTo(120, 150);
        ctx.lineTo(90, 190);
        ctx.stroke();
    }
    if (erros >= 6) {
        // Perna direita
        ctx.beginPath();
        ctx.moveTo(120, 150);
        ctx.lineTo(150, 190);
        ctx.stroke();
    }
    if (erros >= 7) {
        // X nos olhos
        ctx.beginPath();
        ctx.moveTo(110, 55);
        ctx.lineTo(120, 65);
        ctx.moveTo(120, 55);
        ctx.lineTo(110, 65);
        ctx.moveTo(120, 55);
        ctx.lineTo(130, 65);
        ctx.moveTo(130, 55);
        ctx.lineTo(120, 65);
        ctx.stroke();
    }
}

function reiniciarJogo() {
    palavraAleatoria = '';
    categoriaAleatoria = '';
    letrasChutadas = [];
    erros = 0;
    palavraEscondida = [];
    document.getElementById('erros').innerText = '';
    escolherPalavra();
    desenharForca();
}

// Iniciar o jogo
escolherPalavra();
desenharForca();