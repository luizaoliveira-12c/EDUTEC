// login.js (USANDO sessionStorage - CORRIGIDO)

const formLogin = document.getElementById('form-login');

if (formLogin) {
    formLogin.addEventListener('submit', handleLogin);
}

function handleLogin(e) {
    e.preventDefault(); 
    
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    
    if (!email || !senha) {
        alert("Preencha todos os campos.");
        return;
    }

    // 1. Busca a lista de usuários armazenada
    const storedUsersJSON = sessionStorage.getItem('appUsers');
    const users = storedUsersJSON ? JSON.parse(storedUsersJSON) : [];
    
    // 2. Tenta encontrar o usuário
    const foundUser = users.find(user => 
        user.email === email && user.senha === senha
    );

    if (foundUser) {
     // 3. 🚨 FEEDBACK DE SUCESSO
        alert(`✅ Login local realizado com sucesso! Bem-vindo(a), ${email}.`);
    
        
    } else {
        // 6. 🚨 FEEDBACK DE FALHA
        alert("❌ Falha no Login: E-mail ou senha incorretos ou não cadastrados.");
    }
}