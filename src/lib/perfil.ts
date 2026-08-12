type ObligacionParaPerfil = {
  id: string;
  destinatarioNombre: string;
  montoEsperadoCentavos: number;
  emailReceptora: string | null;
  emailPagador: string | null;
  tokenReceptora: string;
  tokenPagador: string;
};

export function acuerdosParaEmail(email: string, acuerdos: ObligacionParaPerfil[]) {
  return acuerdos.flatMap((a) => {
    const rol = a.emailReceptora === email ? "Receptora" : a.emailPagador === email ? "Pagador" : null;
    if (!rol) return [];
    const token = rol === "Receptora" ? a.tokenReceptora : a.tokenPagador;
    return [
      {
        id: a.id,
        destinatarioNombre: a.destinatarioNombre,
        montoEsperadoCentavos: a.montoEsperadoCentavos,
        rol,
        token,
      },
    ];
  });
}
