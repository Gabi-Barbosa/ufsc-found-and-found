import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { listItems, subscribeConnection, type Connection } from "@/services/api";
import type { Item, Role } from "@/data/types";
interface AppState {
  role: Role;
  setRole: (r: Role) => void;
  items: Item[];
  refresh: () => Promise<void>;
  loading: boolean;
  connection: Connection;
  error: string;
}
const AppContext = createContext<AppState | null>(null);
export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>("visitante");
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [connection, setConnection] = useState<Connection>("conectando");
  const [error, setError] = useState("");
  const refresh = useCallback(async () => {
    try {
      setItems(await listItems());
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível carregar os objetos.");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    const saved = window.localStorage.getItem('ufscachados-role');
    if (saved === 'usuario' || saved === 'operador') setRoleState(saved);
  }, []);
  const setRole = useCallback((next: Role) => {
    setRoleState(next);
    window.localStorage.setItem('ufscachados-role', next);
  }, []);
  useEffect(() => {
    const unsub = subscribeConnection(setConnection);
    void refresh();
    return unsub;
  }, [refresh]);
  return (
    <AppContext.Provider value={{ role, setRole, items, refresh, loading, connection, error }}>
      {children}
    </AppContext.Provider>
  );
}
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("AppProvider não encontrado");
  return ctx;
}
