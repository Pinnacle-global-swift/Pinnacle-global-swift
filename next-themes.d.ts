declare module "next-themes" {
    import * as React from "react";
  
    export interface ThemeProviderProps {
      attribute?: string;
      defaultTheme?: string;
      enableSystem?: boolean;
      themes?: string[];
      value?: string | undefined;
      children?: React.ReactNode;
    }
  
    export const ThemeProvider: React.FC<ThemeProviderProps>;
    export const useTheme: () => {
      theme: string | undefined;
      setTheme: (theme: string) => void;
      systemTheme: string | undefined;
    };
  }
  