document.getElementById("botonIn").addEventListener("click", iniciar);
document.getElementById("botonReg").addEventListener("click", register);
window.addEventListener("resize", fTodo);


const formLogin = document.querySelector(".formin");
const formRegister = document.querySelector(".formRegister");
const divLogReg = document.querySelector(".loginRegistro");
const CTLogin = document.querySelector(".divbackin");
const CTRegister = document.querySelector(".divbackres");
function fTodo(){

    if (window.innerWidth > 850){
        CTRegister.style.display = "block";
        CTLogin.style.display = "block";
    }else{
        CTRegister.style.display = "block";
        CTRegister.style.opacity = "1";
        CTLogin.style.display = "none";
        formLogin.style.display = "block";
        divLogReg.style.left = "0px";
        formRegister.style.display = "none";   
    }
}

fTodo();


    function iniciar(){
        if (window.innerWidth > 850){
            formLogin.style.display = "block";
            divLogReg.style.left = "10px";
            formRegister.style.display = "none";
            CTRegister.style.opacity = "1";
            CTLogin.style.opacity = "0";
        }else{
            formLogin.style.display = "block";
            divLogReg.style.left = "0px";
            formRegister.style.display = "none";
            CTRegister.style.display = "block";
            CTLogin.style.display = "none";
        }
    }

    function register(){
        if (window.innerWidth > 850){
            formRegister.style.display = "block";
            divLogReg.style.left = "410px";
            formLogin.style.display = "none";
            CTRegister.style.opacity = "0";
            CTLogin.style.opacity = "1";
        }else{
            formRegister.style.display = "block";
            divLogReg.style.left = "0px";
            formLogin.style.display = "none";
            CTRegister.style.display = "none";
            CTLogin.style.display = "block";
            CTLogin.style.opacity = "1";
        }
}