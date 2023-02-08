const express = require('express');
const app = express();
//incriptacion
const bcryptjs = require('bcryptjs');

//formato legible
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//dotenv
const dovenv = require('dotenv');
dovenv.config({path:'./env/.env'});

// css, js, img y mas
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'))

//platillas (ejs)
app.set('view engine', 'ejs');

//sessíon
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized:true
}));

//datos del .env (base de datos)
const connection = require('./database/db');


//rutas

app.get('/login-register', (req, res)=>{
    res.render('login-register');
});

//enviar datos para registrar y conexion a la base de datos
app.post('/login-register', async (req, res)=>{
    const usuarioR = req.body.usuario;
    const correoR = req.body.correo;
    const passwordR = req.body.password; 
    let passwordHaash = await bcryptjs.hash(passwordR, 8);
    connection.query('INSERT INTO users SET ?', {user: usuarioR, correo:correoR, pass:passwordHaash}, async(error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.render('login-register',{
                alert: true,
                alertTitle: "Registro exitoso",
                alertMessage: "Ya puede iniciar sesión",
                alertIcon: 'success',
                showConfirmButton:true,
                timer:4500,
                ruta:'login-register'
            })
        }
    });

})

//enviar datos para validar
app.post('/auth', async(req, res)=>{

    const usuarioL = req.body.loginCorreo;
    const passwordL = req.body.loginPassword;

    let passwordHaash = await bcryptjs.hash(passwordL, 8);

    if (usuarioL && passwordL){
        connection.query('SELECT * FROM users WHERE user = ?', [usuarioL], async (error,results)=>{
            if(results.length == 0 || !(await bcryptjs.compare(passwordL, results[0].pass))){
                res.render('login-register',{
                    alert: true,
                    alertTitle: "ERROR",
                    alertMessage: "usuario o contraseña incorrecta",
                    alertIcon: 'error',
                    showConfirmButton:false,
                    timer:4500,
                    ruta:'login-register'
                })
            }else{
                req.session.loggedin = true;
                req.session.usuario = results[0].user
                res.render('login-register',{
                    alert: true,
                    alertTitle: "Conexion exitosa",
                    alertMessage: "inicio de sesión exitoso",
                    alertIcon: 'success',
                    showConfirmButton:true,
                    timer:4500,
                    ruta:''
                })
            }
        });
    }else{
        res.render('login-register',{
            alert: true,
            alertTitle: "ERROR",
            alertMessage: "Por favor de ingresar un usuario y/o contraseña",
            alertIcon: 'warning',
            showConfirmButton:true,
            timer:4500,
            ruta:'login-register'
        })
    }
});


//autenticar 
app.get('/', (req, res)=>{
    if ( req.session.loggedin) {
        res.render('home',{
            login: true,
            name: req.session.usuario
        })
    }else{
        res.render('index', {
            
        })
    }
});

//salir

app.get('/salir', (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    });
});


//activar puerto
app.listen(3000, (req, res)=>{
    console.log("servidor activado");
});