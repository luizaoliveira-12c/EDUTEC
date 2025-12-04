const formulariodeLogin = document.getElementById('formulario');

if (formulariodeLogin) {
    formulariodeLogin.addEventListener('submit', handleLogin);
}

function handleLogin(e) {
    e.preventDefault(); 
    
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    
    if (!email || !senha) {
        alert("Preencha todos os campos.");
        return;
    }

    
    const usuariosGuardadosJSON = sessionStorage.getItem('appUsers');
    const users = usuariosGuardadosJSON ? JSON.parse(usuariosGuardadosJSON) : [];
    
   
    const usuarioEncontrado = users.find(user => 
        user.email === email && user.senha === senha
    );

    if (usuarioEncontrado) {
     
        alert(` Login realizado com sucesso! Bem-vindo(a)!`);
        
       
        sessionStorage.setItem('usuarioAtivo', email);
        
        
        window.location.href = '../../index.html'; 
        
    } else {
        
        alert(" E-mail ou senha incorretos ou não cadastrados! Tente novamente.");
    }
}