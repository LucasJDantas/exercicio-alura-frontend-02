//Variável referente ao botão Carregar imagem
const uploadBtn = document.getElementById("upload-btn");
//Variável referente ao input file que está escondido no html
const inputUpload = document.getElementById("image-upload");

//Ação que vincula o botão Carregar imagem com o input escondido
// - O input está escondido mas ainda funciona, logo é possível vinculá-lo com outro elemento
//Então quando o botão Carregar imagem receber um click, ele vai executar a função do input
uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})


//Função que irá ler o arquivo que foi carregado e conferir se ele é uma imagem
function lerConteudoDoArquivo(arquivo) {
    //Irá retornar uma promise - Promise é algo que ainda não foi definido e que precisará ser verificado
    //Resolve é o que vai acontecer se estiver tudo certo com o arquivo
    //Reject é o que vai acontecer se não estiver tudo certo com o arquivo e interromperá a ação
    return new Promise((resolve, reject) => {
        //Variável que cria um leitor de arquivo para verificar o que foi carregado
        const leitor = new FileReader();
        //Ao carregar a imagem e dar tudo certo (onload), vai executar o resolve: criar a url e mostrar o nome do arquivo
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name })
        }
       //Quando não dar certo (onerror), executar o reject: mostrar a mensagem de erro na leitura
        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        //Então o resultado do resolve/reject será lido com uma url
        leitor.readAsDataURL(arquivo)
    })
}

//Variável que pega a classe da imagem inserida
const imagemPrincipal = document.querySelector(".main-imagem");
//Variável que pega o nome da imagem inserida
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

//Quando houver uma mudança no input da imagem, vai acontecer a leitura do arquivo
//O estado inicial do input é vazio, então quando selecionar uma imagem ele irá mudar para preenchido
//Essa alteração do estado é a ação do change do addEventListener
//async faz com que a função espere outra função ser resolvida primeiro - virou uma função assíncrona
//Para o async funcionar, é preciso definir também qual função ele está esperando resolver para ser executada e essa definição é feita com o comando await
inputUpload.addEventListener("change", async (evento) => {
    //Variável que vai entrar no evento e pegar o arquivo que está sendo enviado
    const arquivo = evento.target.files[0];
    //Se existir um arquivo selecionado...
    if(arquivo) {
        //...tentar fazer upload do arquivo.
        try {
            //Variável que vai receber a leitura do arquivo
            //Valor que será executado primeiro, antes do change/async
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            //Comando para alterar a página na tela
            imagemPrincipal.src = conteudoDoArquivo.url;
            //Comando para alterar o nome da imagem na tela
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        //Se der errado, pegar (catch) o erro e mostrar no console
        } catch (erro) {
            console.error("Erro na leitura do arquivo")
        }
    }
})

//Para inserir tags

//Variável que recebe o valor inserido no input das tags
const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

//Para apagar as tags inseridas
listaTags.addEventListener("click", (evento) => {
    //Se o evento/click tiver sido em um elemento que contenha a classe remove-tag (x)
    if (evento.target.classList.contains("remove-tag")) {
        //se tiver a classe remove-tag, selecionar seu elemento pai (a li)
        const tagQueQueremosRemover = evento.target.parentElement;
        //remover a criança
        listaTags.removeChild(tagQueQueremosRemover);
    }
})

//Para criar a lista de possíveis tags
const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full stack", "HTML", "CSS", "JavaScript"];
//Definiu a função como async para poder usar o Promise na sequência
async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        //define um tempo para a função ser executada - 1000ms = 1seg
        setTimeout(() => {
            //Verifica se tagTexto (input das tags) tem algum dos valores que foi definido na variável tagsDisponíveis
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000)
    })
}

//Ação que acontecerá quando uma tecla for pressionada - keypress
inputTags.addEventListener("keypress", async (evento) => {
    //Para executar a ação somente quando o enter for apertado
    if (evento.key === "Enter") {
        //Para prevenir o evento padrão quando o enter for clicado
        evento.preventDefault();
        //Variável que recebe o valor do input
        //Trim remove os espaços em brancos antes e depois da palavra
        const tagTexto = inputTags.value.trim();
        //Se tiver algo dentro da tagTexto - for diferente de strings vazias
        if (tagTexto !== "") {
            try {
            const tagExiste = await verificaTagsDisponiveis(tagTexto);
            if (tagExiste) {            
            const tagNova = document.createElement("li");
            tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
            listaTags.appendChild(tagNova);
            inputTags.value = "";
            } else {
                alert("Tag não foi encontrada.");
            }
            } catch (error) {
                console.error("Erro ao verificar existência da tag");
                alert("Erro ao verificar a existência da tag. Verfique o console")
            }
        }
    }
})

const botaoPublicar = document.querySelector(".botao-publicar");

//Função que simular a publicação do projeto, reunindo as variáveis de nome, descrição e tags
async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        //Tempo de execução (simulação de envio à um banco de dados)
        setTimeout(() => {
            //Geração de número aleatório que indica que deu tudo certo ou não baseado no número
            const deuCerto = Math.random() > 0.5;

            //Se deu certo, vai mostrar o texto e o alert ali de baixo
            if (deuCerto) {
                resolve("Projeto publicado com sucesso")
            } else {
            //Se deu errado, vai mostrar o texto e o outro alert ali de baixo
                reject("Erro ao publicar o projeto")
            }
        }, 2000)
    })
}

//Ação de clique no botão Publicar
botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    //Variável que pega o valor inserido na input de nome do projeto
    const nomeDoProjeto = document.getElementById("nome").value;
    //Variável que pega o valor inserido na input de descrição do projeto
    const descricaoDoProjeto = document.getElementById("descricao").value;
    //Variável que pega o conteúdo de texto (p) inserido em toda a lista (ul) de tags
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);
    //Usa-se value para receber o valor inserido. No caso das tags, o valor retornado já está especificado com o text.Content, então não precisa do .value.

    try {
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto);
        console.log(resultado)
        alert("Deu tudo certo!")
    } catch (error) {
        console.log("Deu errado: ", error);
        alert("Deu tudo errado");
    }
})

const botaoDescartar = document.querySelector(".botao-descartar");

botaoDescartar.addEventListener("click", (evento) => {
    evento.preventDefault();
        //Seleciona o formulário do html, que contém todas as informações inseridas
    const formulario = document.querySelector("form");
    //Função padrão que reseta o formulário
    formulario.reset();
    //Troca a imagem inserida para a imagem padrão do html
    imagemPrincipal.src = "./img/imagem1.png";
    //Troca o nome da imagem para o nome padrão do html
    nomeDaImagem.textContent = "image_projeto.png";
    //Troca a lista de tags por uma string vazia
    listaTags.innerHTML = "";    
})

// let promessaDePizza = new Promise((resolve, reject) => {
//     let pizzaEntregue = true;
//     if (pizzaEntregue) {
//         resolve('Pizza entregue com sucesso!');
//     } else {
//         reject('Entrega da pizza falhou.');
//     }
// })

// console.log(promessaDePizza);