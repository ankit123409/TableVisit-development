export const addCartdata=(data )=>{
   return{
    type: "ADDCARTDATA",
    payload:data
   }
}
export const delCartdata=(data )=>{
    return{
     type: "DELCARTDATA",
     payload:data
    }
 }
 export const addfooddata=(data )=>{
   return{
    type: "ADDFOODDATA",
    payload:data
   }
}
export const delfooddata=(data )=>{
    return{
     type: "DELFOODDATA",
     payload:data
    }
 }
 export const Removealldata=( )=>{
   return{
    type: "CLEAR_ALL_DATA",
   }
}