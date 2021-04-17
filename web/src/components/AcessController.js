import React, { useState } from "react";

export default function Acess({ Role }) {
  const [RenderItem, setRenderItem] = useState()
  useEffetch(() => {
    function CardByPerm() {
      const Itens = [
        {
          Name: "Oficiona",
          Permissions: ["Oficiona", "Admin"],
          Href: "/kanban",
        },
        {
          Name: "Gestion",
          Permissions: ["Gestion", "Admin"],
          Href: "/kanban",
        },
      ];

      for (let i = 0; i < Itens.length; i++) {
        const element = Itens[i];
        if (element.Permissions.indexOf(Role) > -1) {
          setRenderItens([...RenderItens, element]);
        }
      }
      console.log()
    }
    CardByPerm("Admin");
  }, [Role]);
  return <></>;
}
