export interface ThemeColors {
  primary: string;
  secondary: string;
  background: {
    primary: string;
    secondary: string;
    danger: string;
    disabled: string;
    placeholder: string;
  };
  status: {
    booked: string;
    available: string;
    selected: string;
  };
  success: string;
  error: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    placeholder: string;
  };
  overlay:string;
  border: string;
  shadow: string;
}

export interface ThemeContextType {
  theme: ThemeColors;
}
