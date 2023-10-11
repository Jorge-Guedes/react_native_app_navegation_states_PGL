import { create } from "zustand";

export const useLoginStore=create<LoginStoreType>((set,get)=>({
    user:"",
    pass:"",
    isLoggedIn:false,

    login:(user,pass)=>{
        console.log("Usuario: ",user, "Contraseña: ",pass);
        if(user==="user" && pass==="pass"){
            set({user, pass, isLoggedIn:true});
            console.log("logeao");
        }else{
            set({user:"", pass:""})
            console.log("Fallo al iniciar");
        }
    },

    logout:()=>{
       set({user:"",pass:"",isLoggedIn:false});
       console.log("Cerrao"); 
    },

}));