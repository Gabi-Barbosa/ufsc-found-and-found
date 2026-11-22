import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, GraduationCap, ShieldCheck, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { logo } from "@/data/assets";
import { metadata } from "@/features/common";
import { useApp } from "@/features/app-context";
import type { Role } from "@/data/types";
export const Route = createFileRoute("/acesso")({
  head: () =>
    metadata(
      "Acesso à comunidade",
      "Entre no UFSCAchados como membro da comunidade UFSC ou explore o mural público de objetos.",
    ),
  component: Access,
});
function Access() {
  const [open, setOpen] = useState(false);
  const { setRole } = useApp();
  const navigate = useNavigate();
  function login(role: Role) {
    setRole(role);
    void navigate({ to: "/" });
  }
  return (
    <>
      <main className="welcome fade-in">
        <img src={logo} alt="Logotipo UFSCAchados" />
        <div>
          <h1>
            UFSC<span className="text-primary">Achados</span>
          </h1>
          <p className="mt-2 flex items-center justify-center gap-2 text-xs">
            <Globe size={13} />
            https://ufscachados.ufsc.br
          </p>
        </div>
        <p>
          Encontre o que procura.
          <br />
          Ajude alguém a reencontrar o que importa.
        </p>
        <div className="welcome-actions">
          <Button size="lg" className="h-12 justify-between" onClick={() => setOpen(true)}>
            Login <ArrowRight />
          </Button>
          <span className="text-[10px] text-muted-foreground">
            Você será direcionado para um navegador web
          </span>
          <Button variant="outline" className="mt-3 h-11" onClick={() => login("visitante")}>
            Explorar mural <ArrowRight />
          </Button>
        </div>
        <div className="pagination-dots" aria-label="Etapa 2 de 2">
          <span />
          <span className="active" />
        </div>
      </main>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="modal-content">
          <DialogTitle className="modal-title">Como você quer entrar?</DialogTitle>
          <DialogDescription className="modal-subtitle">
            Simulação de acesso idUFSC. Escolha um perfil para esta sessão.
          </DialogDescription>
          <Button variant="ghost" className="role-option" onClick={() => login("usuario")}>
            <GraduationCap />
            <div>
              <strong>Comunidade UFSC</strong>
              <small>Ana Carolina · Publicar e reivindicar objetos</small>
            </div>
            <ArrowRight className="ml-auto" />
          </Button>
          <Button variant="ghost" className="role-option" onClick={() => login("operador")}>
            <ShieldCheck />
            <div>
              <strong>Operador do Protocolo</strong>
              <small>Lucas Mendes · Conferências, devoluções e relatórios</small>
            </div>
            <ArrowRight className="ml-auto" />
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
