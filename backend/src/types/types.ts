export interface Chats {
    role : string,
    parts : [ { text : string } ]
}

export interface ChatSchema {
    user_id : string,
    title : string,
    chats : Chats
}

export interface User {
    user_id : string,
    username : string,
    email : string,
    password : string
}