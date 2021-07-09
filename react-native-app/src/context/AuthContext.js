import React,{useState, useEffect,useContext} from 'react';



const AuthContext = React.createContext();

export const AuthProvider = ({children})=>{
    const [isLogin, setIsLogin] = useState(false);
    const [isCompleteLogin, setIsCompelteLogin] = useState(false);

 /**
      //check if user was login and compelte login process 
      useEffect(()=>{
       
         *  (async ()=>{
          try {
            const value = await AsyncStorage.getItem('token_login')
            
            if(value !== null) {
              console.log('value: ', value);
              setIsCompelteLogin(true);
            }
    
          } catch(error) {
            console.log(error);
        }})()

       
      },[])
               * 
         */
    
    
    
    
/**
 *     const setToken = (token)=>{
        try {
            const value = await AsyncStorage.setItem('token_login', token);
            setIsCompelteLogin(true)

        } catch (error) {
            console.log(error);
        }
    }
 */


    const setIsLogedUser = (bool)=>{
        setIsLogin(bool)
    }

    return(
        <AuthContext.Provider value={{
            isLogin,
            isCompleteLogin,
            setIsLogedUser,
            setIsCompelteLogin
        }}>
            {children}
        </AuthContext.Provider>
  
    );

}

export const useAuth = () => useContext(AuthContext);
