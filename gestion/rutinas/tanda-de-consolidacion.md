# Rutina: ejecutar una tanda de consolidación

**Cuándo**: con el plan de consolidación ya aprobado por Sebastian, para ejecutar **una**
tanda. Nunca para ejecutar el plan entero de una.

**Precondición innegociable**: la tanda sale del plan aprobado. Si algo no está en el plan,
no entra en la tanda.

---

## Prompt

```
Ejecutá la tanda <N> del plan de consolidación aprobado.

Antes de tocar nada, mostrame:
- Qué páginas se tocan en esta tanda (lista completa)
- Qué redirect 301 le corresponde a cada baja o fusión
- Cuántos archivos van a cambiar

Reglas:
- El redirect va PRIMERO, en vercel.json. Ninguna URL se cae antes de que su 301 exista.
- Nada de borrado seco. Si no tiene redirect definido, no se toca.
- La tanda tiene que ser legible en el diff. Si pasa de ~15 archivos, partila.
- Un solo commit por tanda, con mensaje que diga qué se fusionó en qué.

Después de aplicar, corré el gate completo:
  pnpm check && pnpm build && pnpm test:e2e && pnpm check:links

Mostrame el resultado del gate y el diff resumido. NO pushees.
El push a master es deploy a producción y lo apruebo yo.
```

---

## Checklist post-tanda

- [ ] `pnpm check` sin errores
- [ ] `pnpm build` completa y el conteo de páginas bajó lo esperado (si bajó de más, parar)
- [ ] `pnpm test:e2e` verde
- [ ] `pnpm check:links` sin rotos, sin huérfanas nuevas
- [ ] Ningún 301 apunta a otra URL que a su vez redirige (cadenas de redirect)
- [ ] Ningún 301 apunta a una URL que se dio de baja en esta misma tanda
- [ ] El diff se lee de arriba a abajo sin perderse

## Si el gate falla

Un intento de arreglo puntual. Si sigue fallando, se revierte la tanda y se documenta el
motivo. No se avanza a la tanda siguiente con el gate roto, y no se saltean tests para
que pase.

## Push

Solo con el OK explícito de Sebastian, y avisando que va a producción.
