export interface User  {
  username: string;
  email: string;
  password: string;
};

export interface SignupErr {
  
    response: {
      data: {
        
        validation : {
          user_id: string;
          username: string;
          email: string;
          password: string;
        };
      };
    };
  };

export interface ApiResUser {
    username?: string;
    email: string;
    password: string;
    token? : string
}

export interface AuthContextTypes {
  currentUser : User | null,
  isAuthenticated : boolean,
  setIsAuthenticated : React.Dispatch<React.SetStateAction<boolean>>,
  isLoading : boolean
}

export interface NewChat {
  chat_id : string,
  message : string
}
export interface Chats {
  role : "user" | "model",
  message : string
}