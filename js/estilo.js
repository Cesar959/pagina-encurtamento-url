function menu()
{
    var navegacao = document.getElementById("navegacao")
    navegacao.classList.toggle("active")
}

function url()
{
    // Capturando valores e passando para variaveis

    var url = document.getElementById('url').value
    var urlEncurtada = document.getElementById('urlEncurtada')
    var urlEndereco = document.getElementById('urlEndereco')
    var linksEncurtados = document.querySelector('.links-encurtados')
    var loader = document.querySelector('.celula-loader')
    var fundoCongelado = document.querySelector('.fundo-congelado')
    var mensagemErro = document.querySelector('.mensagem-url')

    // Exibido o loader

    loader.style.display = "block"
    fundoCongelado.style.display = "block"

    // Verificando ser o campo url esta vazio

    if (url == "" || url == null) 
    {
        mensagemErro.innerHTML = "O campo esta vazio!"

        // Exibindo a mensagem de erro

        document.getElementById('url').classList.add("alerta")
        mensagemErro.style.display = "block"

        // Escondendo o loader

        loader.style.display = "none"
        fundoCongelado.style.display = "none"
        linksEncurtados.style.display = 'none'

    } 
    else 
    {
        // Iniciando a requisição a api pelo ajax

        var ajax = new XMLHttpRequest()

        ajax.open('GET', 'https://api.shrtco.de/v2/shorten?url=' + url)
    
        ajax.onreadystatechange = function() 
        {
    
            if(ajax.readyState == 4 && ajax.status == 201) 
            {
                // Convertendo a resposta da requisição para json

                let dadosJSONText = ajax.responseText;
                let dadosJSONObj = JSON.parse(dadosJSONText);
    
                url.value = ""

                // Exibindo as respostas do servidor
    
                urlEncurtada.innerHTML = dadosJSONObj['result'].full_short_link
                urlEncurtada.setAttribute("href", dadosJSONObj['result'].full_short_link)
    
                urlEndereco.innerHTML = dadosJSONObj['result'].original_link
                urlEndereco.setAttribute("href", dadosJSONObj['result'].original_link)
    
                // Exibindo o links encurtado ao usuario

                linksEncurtados.style.display = 'block'
                
                // Escondendo a Mensagem de alerta

                document.getElementById('url').classList.remove("alerta")
                mensagemErro.style.display = "none"
                
                // Escondendo o loader

                loader.style.display = "none"
                fundoCongelado.style.display = "none"
            }
    
             if (ajax.readyState == 4 && ajax.status == 400)
            {
                // Convertendo a resposta da requisição para json

                let dadosJSONText = ajax.responseText;
                let dadosJSONObj = JSON.parse(dadosJSONText);

                // Exibição de mensagens de erros
    
                if (dadosJSONObj.error_code == 1) 
                {
                    mensagemErro.innerHTML = "Nenhum URL especificado."
                }
                else if (dadosJSONObj.error_code == 2)
                {
                    mensagemErro.innerHTML = "URL inválido."
                }
                else if (dadosJSONObj.error_code == 3)
                {
                    mensagemErro.innerHTML = "Limite de taxa atingido, tente novamente."
                    mensagemErro.style.marginTop = "10px"
                    
                }
                else if (dadosJSONObj.error_code == 4)
                {
                    mensagemErro.innerHTML = "O endereço IP foi bloqueado por violar nossos termos de serviço."
                    mensagemErro.style.marginTop = "10px"
                }
                else if (dadosJSONObj.error_code == 10)
                {
                    mensagemErro.innerHTML = "Tentando encurtar um link não permitido."
                    mensagemErro.style.marginTop = "10px"
                }
                else
                {
                    mensagemErro.innerHTML = "Erro desconhecido, Tente de novo mais tarde!"
                    mensagemErro.style.marginTop = "10px"
                }
    
                // Exibindo a mensagem de erro

                document.getElementById('url').classList.add("alerta")
                mensagemErro.style.display = "block"
    
                // Escondendo o loader

                loader.style.display = "none"
                fundoCongelado.style.display = "none"
                linksEncurtados.style.display = 'none'
            }
    
        }
    
        // Enviando a requisição ajax
        
        ajax.send()
        
    }
}


