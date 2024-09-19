export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface PostMutation {
  title: string;
  description: string;
  image: File | null;
}

export interface CommentsMutation {
  post: string;
  text: string;
}

export interface PostsData {
  _id: string;
  user: {
    username: string;
  }
  title: string;
  image: string | null;
  datetime: string;
}

export interface OnePostData {
  _id: string;
  user: {
    username: string;
  }
  title: string;
  description: string | null;
  image: string | null;
  datetime: string;
}

export interface CommentsData {
  _id: string;
  user: {
    _id: string;
    username: string;
  }
  post: string;
  text: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}