// O URL do endpoint DE CADASTRO do seu backend
const API_CADASTRO_URL = "https://backend-do-edutec-wyvt.vercel.app/cadastrar"; // ROTA CORRETA

// 1. Obtém o formulário e o botão
const formCadastro = document.getElementById('formulariodeCadastro'); 
const button = document.querySelector("button"); 

// 2. Adiciona o Listener ao formulário ou botão
if (formCadastro) {
    formCadastro.addEventListener('submit', handleCadastro);
} else if (button) {
    button.addEventListener('click', handleCadastro);
}


/**
 * Função principal para lidar com o envio do formulário de cadastro.
 */
async function handleCadastro(e) {
    e.preventDefault(); 
    
    // Obtém os valores dos campos
    const name = document.querySelector("#nome") ? document.querySelector("#nome").value.trim() : "";
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#senha").value.trim();
    
    // Validação de campos
    if (!name || !email || !password) {
        alert("🚨 Por favor, preencha todos os campos (Nome, E-mail e Senha).");
        return; // Retorna antes de enviar 
    }

    // Cria o objeto de usuário no formato esperado pela API
    const user = {
        name, 
        email,
        password
    };
    
    try {
        // Envia a requisição POST para a API
        const response = await fetch(API_CADASTRO_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // O frontend envia o objeto 'user' diretamente, o backend espera user: {name, email, password}
            body: JSON.stringify({ user }) // 💡 Tente enviar o objeto aninhado se o backend esperar.
        });

        // ... o restante do tratamento de erro (implementado anteriormente)
        // Se a resposta não for OK (400, 409, 500, 503)
        if (!response.ok) {
            let errorData = { message: "Ocorreu um erro desconhecido." };
            const contentType = response.headers.get("content-type");
            
            if (contentType && contentType.includes("application/json")) {
                try {
                    errorData = await response.json(); 
                } catch (e) {
                    errorData.message = `Erro ${response.status}: A resposta do servidor não é um JSON válido.`;
                }
            } else if (response.status === 500 || response.status === 503) {
                 errorData.message = `Erro de Servidor (${response.status}). **Verifique as VARIÁVEIS DE AMBIENTE (DB) no VERCEL.**`;
            } else {
                 errorData.message = `Erro ${response.status}: Falha na requisição.`;
            }

            alert(`❌ Falha no Cadastro: ${errorData.message}`);
            return;
        }

        // Sucesso
        const data = await response.json();
        alert(`✅ Sucesso! ${data.message || "Usuário cadastrado com sucesso!"}`);
        window.location.href = "./login.html";

    } catch (error) {
        console.error("Erro de rede:", error);
        alert("⚠️ Erro de rede. Verifique sua conexão ou se o servidor Vercel está ativo.");
        return; 
    }
}