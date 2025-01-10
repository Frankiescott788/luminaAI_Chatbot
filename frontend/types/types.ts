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