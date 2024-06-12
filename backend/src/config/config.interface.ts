interface ApiConfigProps {
  apiUrl: string;
}

interface JwtConfigProps {
    secret: string;
    expires: string;
}

export interface ConfigProps {
  port: number;
  jwt: JwtConfigProps;
  api: ApiConfigProps;
}
