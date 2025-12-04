// O URL do endpoint de login do seu backend
// 💡 CORREÇÃO 1: Mudar a rota de "/" para "/login"
const API_LOGIN_URL = "https://backend-do-edutec-wyvt.vercel.app/login";

// 1. Obtém o formulário
const formLogin = document.getElementById('formulario'); 
const button = document.querySelector("button"); 

// 2. Adiciona o Listener
if (formLogin) {
    formLogin.addEventListener('submit', handleLogin);
} else if (button) {
    button.addEventListener('click', handleLogin);
}


/**
 * Função principal para lidar com o login.
 * Realiza validações e envia as credenciais para a API.
 */
async function handleLogin(e) {
    e.preventDefault(); 
    
    // Obtém os valores dos campos
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#senha").value.trim();
    
    // Validação de campos
    if (!email || !password) {
        alert("🚨 Por favor, preencha todos os campos.");
        return;
    }

    // Cria o objeto de usuário no formato esperado pela API
    const user = {
        email,
        password
    };
    
    try {
        // Envia a requisição POST para a API
        const response = await fetch(API_LOGIN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user }) // Envia o objeto aninhado 'user'
        });
        
        // 💡 CORREÇÃO 2: Trata a resposta antes de tentar ler o JSON, especialmente para erros 401/500/503/404
        if (!response.ok) {
            let errorData = { message: "Ocorreu um erro desconhecido." };
            const contentType = response.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
                try {
                    // Tenta ler o JSON de erro do backend (ex: 401 Unauthorized)
                    errorData = await response.json(); 
                } catch (e) {
                    errorData.message = `Erro ${response.status}: Resposta JSON inválida.`;
                }
            } else if (response.status === 404) {
                 errorData.message = `Erro ${response.status}: Rota da API não encontrada. Verifique o URL.`;
            } else if (response.status >= 500) {
                 // Captura o erro 500/503 causado pela falha do DB
                 errorData.message = `Erro Interno do Servidor (${response.status}). Verifique as variáveis de ambiente (DB) no Vercel.`;
            } else {
                 errorData.message = `Erro ${response.status}: Falha na requisição.`;
            }

            alert(`❌ Falha no Login: ${errorData.message}`);
            return;
        }


        const data = await response.json(); // Se chegou aqui, o status é 2xx (Sucesso)
        
        // Se o seu backend retorna { message: "Usuário ou senha incorretos!" } com status 200 (não recomendado), 
        // o bloco abaixo trata isso. O ideal é que o backend use status 401.
        if (data.message) {
             alert(`❌ Falha no Login: ${data.message}`);
             return; 
        }

        // Se não há "message", o login foi bem-sucedido e a API retornou { id, name, score, ... }
        const { id, name, email: userEmail, score } = data; // Pegando o score também
        
        // Armazena as informações do usuário logado no sessionStorage
        sessionStorage.setItem("user", JSON.stringify({ id, name, email: userEmail, score })); 
        sessionStorage.setItem('usuarioAtivo', userEmail);
        
        alert(`✅ Login realizado com sucesso! Bem-vindo(a), ${name}.`);

        // Redireciona para a página principal
window.location.href = "/index.html";
        
    } catch (error) {
        console.error("Erro ao conectar ou processar a resposta da API:", error);
        alert("⚠️ Erro de rede ou erro fatal no servidor. Verifique o console.");
    }
}