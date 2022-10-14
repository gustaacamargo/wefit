export interface IRepo {
  id: number;
  full_name: string;
  description: string;
  owner: {
    avatar_url: string
  };
  stargazers_count: number;
  language: string;
  html_url: string;
}