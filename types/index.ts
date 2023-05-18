export { };

declare global {
  interface User {
    id: number
    login: string,
    role: Role,
  }
  
  interface Role {
    id: number,
    name: string,
  }
  
  
  interface Category {
    id: number;
    name: string;
  }
  
  interface Post {
    id: number,
    title: string,
    interaction_date: string,
    description?: string,
    rating: number,
    count: number,
    image: File | null | string, 
    user_id: number,
    category_id: number,
  }
  
}