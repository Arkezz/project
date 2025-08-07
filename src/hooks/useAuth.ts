import { useState, useEffect, createContext, useContext } from "react";
import {
  User,
  AuthState,
  LoginCredentials,
  RegisterCredentials,
} from "../types/auth";
import { toast } from "sonner";

const AuthContext = createContext<{
  auth: AuthState;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  loginWithPasskey: () => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  logout: () => void;
  verifyEmail: (token: string) => Promise<boolean>;
  resendVerification: () => Promise<boolean>;
  setupPasskey: () => Promise<boolean>;
  removePasskey: () => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
} | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useAuthProvider() {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (token) {
          // Validate token and get user data
          const user = await validateToken(token);
          setAuth({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setAuth((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        localStorage.removeItem("auth_token");
        setAuth((prev) => ({ ...prev, isLoading: false }));
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setAuth((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (
        credentials.email === "test@example.com" &&
        credentials.password === "password"
      ) {
        const user: User = {
          id: "1",
          email: credentials.email,
          username: "testuser",
          displayName: "Test User",
          emailVerified: true,
          passkeyEnabled: false,
          createdAt: new Date().toISOString(),
        };

        localStorage.setItem("auth_token", "mock_token");
        setAuth({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        toast.success("Login successful!");
        return true;
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Login failed",
      }));
      toast.error("Invalid email or password");
      return false;
    }
  };

  const loginWithPasskey = async (): Promise<boolean> => {
    setAuth((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      if (!window.PublicKeyCredential) {
        throw new Error("Passkeys are not supported in this browser");
      }

      // Simulate WebAuthn authentication
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const user: User = {
        id: "1",
        email: "test@example.com",
        username: "testuser",
        displayName: "Test User",
        emailVerified: true,
        passkeyEnabled: true,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("auth_token", "mock_token");
      setAuth({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      toast.success("Passkey authentication successful!");
      return true;
    } catch (error) {
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Passkey authentication failed",
      }));
      toast.error("Passkey authentication failed");
      return false;
    }
  };

  const register = async (
    credentials: RegisterCredentials
  ): Promise<boolean> => {
    setAuth((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const user: User = {
        id: "1",
        email: credentials.email,
        username: credentials.username,
        displayName: credentials.username,
        emailVerified: false,
        passkeyEnabled: false,
        createdAt: new Date().toISOString(),
      };

      setAuth({
        user,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });

      toast.success(
        "Registration successful! Please check your email for verification."
      );
      return true;
    } catch (error) {
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Registration failed",
      }));
      toast.error("Registration failed");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setAuth({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    toast.success("Logged out successfully");
  };

  const verifyEmail = async (token: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (auth.user) {
        const updatedUser = { ...auth.user, emailVerified: true };
        localStorage.setItem("auth_token", "mock_token");
        setAuth((prev) => ({
          ...prev,
          user: updatedUser,
          isAuthenticated: true,
        }));
        toast.success("Email verified successfully!");
        return true;
      }
      return false;
    } catch (error) {
      toast.error("Email verification failed");
      return false;
    }
  };

  const resendVerification = async (): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Verification email sent!");
      return true;
    } catch (error) {
      toast.error("Failed to send verification email");
      return false;
    }
  };

  const setupPasskey = async (): Promise<boolean> => {
    try {
      if (!window.PublicKeyCredential) {
        throw new Error("Passkeys are not supported in this browser");
      }

      // Simulate WebAuthn registration
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (auth.user) {
        const updatedUser = { ...auth.user, passkeyEnabled: true };
        setAuth((prev) => ({
          ...prev,
          user: updatedUser,
        }));
        toast.success("Passkey setup successful!");
        return true;
      }
      return false;
    } catch (error) {
      toast.error("Passkey setup failed");
      return false;
    }
  };

  const removePasskey = async (): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (auth.user) {
        const updatedUser = { ...auth.user, passkeyEnabled: false };
        setAuth((prev) => ({
          ...prev,
          user: updatedUser,
        }));
        toast.success("Passkey removed successfully!");
        return true;
      }
      return false;
    } catch (error) {
      toast.error("Failed to remove passkey");
      return false;
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Password reset email sent!");
      return true;
    } catch (error) {
      toast.error("Failed to send password reset email");
      return false;
    }
  };

  return {
    auth,
    login,
    loginWithPasskey,
    register,
    logout,
    verifyEmail,
    resendVerification,
    setupPasskey,
    removePasskey,
    resetPassword,
  };
}

// Mock function to validate token
async function validateToken(token: string): Promise<User> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id: "1",
    email: "test@example.com",
    username: "testuser",
    displayName: "Test User",
    emailVerified: true,
    passkeyEnabled: false,
    createdAt: new Date().toISOString(),
  };
}

export { AuthContext };
