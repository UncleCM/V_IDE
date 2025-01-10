import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// Theme configuration object
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
} as const;

// Color palette
const colors = {
  brand: {
    // Background colors
    bg: {
      primary: "#F4F6F8",    // Soft light gray background
      secondary: "#FFFFFF",   // Pure white for cards
      hover: "#EDF2F7",      // Light blue-gray hover
      active: "#E2E8F0",     // Slightly darker active state
    },
    // Text colors
    text: {
      primary: "#2D3748",    // Dark gray for main text
      secondary: "#4A5568",  // Medium gray for secondary text
      disabled: "#A0AEC0",   // Light gray for disabled text
      inverse: "#FFFFFF",    // White text
    },
    // Accent colors
    accent: {
      primary: "#805AD5",    // Softer purple
      secondary: "#6B46C1",  // Darker purple
      success: "#48BB78",    // Soft green
      warning: "#F6AD55",    // Soft orange
      error: "#FC8181",      // Soft red
      info: "#63B3ED",       // Soft blue
    },
    // Border colors
    border: {
      light: "#EDF2F7",     // Very light border
      medium: "#E2E8F0",    // Light border
      dark: "#CBD5E0",      // Medium border
    }
  }
};

// Global styles
const styles = {
  global: {
    body: {
      bg: "brand.bg.primary",
      color: "brand.text.primary",
      lineHeight: "tall",
    }
  }
};

// Component-specific styles
const components = {
  Button: {
    variants: {
      solid: {
        bg: "brand.accent.primary",
        color: "brand.text.inverse",
        _hover: {
          bg: "brand.accent.secondary",
          _disabled: {
            bg: "brand.accent.primary",
          }
        }
      },
      outline: {
        borderColor: "brand.accent.primary",
        color: "brand.accent.primary",
        _hover: {
          bg: "brand.bg.hover"
        }
      }
    },
    defaultProps: {
      variant: "solid",
    }
  },
  Menu: {
    baseStyle: {
      list: {
        bg: "brand.bg.secondary",
        borderColor: "brand.border.light",
        boxShadow: "lg",
      },
      item: {
        bg: "brand.bg.secondary",
        _hover: {
          bg: "brand.bg.hover"
        },
        _focus: {
          bg: "brand.bg.active"
        }
      }
    }
  },
  Card: {
    baseStyle: {
      container: {
        bg: "brand.bg.secondary",
        borderColor: "brand.border.light",
        boxShadow: "sm"
      }
    }
  },
  Heading: {
    baseStyle: {
      color: "brand.text.primary",
      fontWeight: "semibold"
    }
  },
  Text: {
    variants: {
      secondary: {
        color: "brand.text.secondary"
      },
      disabled: {
        color: "brand.text.disabled"
      }
    }
  },
  Input: {
    variants: {
      outline: {
        field: {
          borderColor: "brand.border.light",
          _hover: {
            borderColor: "brand.border.medium"
          },
          _focus: {
            borderColor: "brand.accent.primary",
            boxShadow: "0 0 0 1px var(--chakra-colors-brand-accent-primary)"
          }
        }
      }
    }
  },
  Textarea: {
    variants: {
      outline: {
        borderColor: "brand.border.light",
        _hover: {
          borderColor: "brand.border.medium"
        },
        _focus: {
          borderColor: "brand.accent.primary",
          boxShadow: "0 0 0 1px var(--chakra-colors-brand-accent-primary)"
        }
      }
    }
  }
};

// Create and export the theme
export const theme = extendTheme({ 
  config,
  colors,
  styles,
  components
});