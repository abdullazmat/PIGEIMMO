"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext(null);

const demoAccounts = [
  {
    id: "demo-agent",
    email: "agent@pigeimmo.fr",
    password: "demo123",
    name: "Marc Dupont",
    role: "Agent Senior",
    avatar: "MD",
    plan: "Pro",
  },
  {
    id: "demo-admin",
    email: "admin@pigeimmo.fr",
    password: "admin123",
    name: "Sophie Martin",
    role: "Super Admin",
    avatar: "SM",
    plan: "Enterprise",
  },
  {
    id: "demo-manager",
    email: "manager@pigeimmo.fr",
    password: "manager123",
    name: "Lucas Bernard",
    role: "Manager",
    avatar: "LB",
    plan: "Pro",
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const savedUser = localStorage.getItem("pigeimmo_user");
    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch {
      localStorage.removeItem("pigeimmo_user");
      return null;
    }
  });
  const [isLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    const publicRoutes = ["/", "/login", "/signup"];
    const isPublic = publicRoutes.includes(pathname);

    if (!user && !isPublic) {
      router.push("/login");
    }
  }, [user, pathname, isLoading, router]);

  const login = (email, password) => {
    const account = demoAccounts.find(
      (a) => a.email === email && a.password === password,
    );
    if (account) {
      const userData = { ...account };
      delete userData.password;
      setUser(userData);
      localStorage.setItem("pigeimmo_user", JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: "Email ou mot de passe incorrect" };
  };

  const signup = (name, email, password) => {
    const exists = demoAccounts.find((a) => a.email === email);
    if (exists) {
      return { success: false, error: "Cet email est déjà utilisé" };
    }
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: "Agent",
      avatar: name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
      plan: "Starter",
    };
    setUser(newUser);
    localStorage.setItem("pigeimmo_user", JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pigeimmo_user");
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, isLoading, demoAccounts }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export { demoAccounts };
