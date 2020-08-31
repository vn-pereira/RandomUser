const fetch = require ('node-fetch');
const pacoteFs = require('fs');

async function randomUser (){
    
    pacoteFs.stat("./data", (err) => { 
        if (err){
            pacoteFs.mkdir("./data", (err) => { 
                if(err)
                throw err;
            })
         }
                pacoteFs.writeFile("./data/User.csv", "Name, Last Name, E-mail, Age, Gender, login, password  \n", "utf8", err =>{
                if(err)
                throw err;   
        })
    })
    const response = await fetch ("https://randomuser.me/api/?results=1000");
    const responseJson = await response.json();

    responseJson.results.forEach( usuario => {
        const text = pacoteFs.createWriteStream("./data/User.csv", {flags: "a"})
        text.write(`${usuario.name.first}, ${usuario.name.last}, ${usuario.email}, ${usuario.dob.age}, ${usuario.gender}, ${usuario.login.username}, ${usuario.login.password}\n`);
    });
}

randomUser();
