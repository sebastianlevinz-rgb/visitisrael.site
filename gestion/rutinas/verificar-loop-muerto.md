# Rutina: verificar que el loop sigue muerto

**Cuándo**: al empezar cualquier sesión de trabajo en el repo. Toma 30 segundos.

**Por qué existe**: el freeze del 2026-07-26 duró 18 horas. El loop borró su propio
`.loop/STOP` al día siguiente y se relanzó. No se asume que sigue apagado: se verifica.

---

## Prompt

```
Verificá que el loop autónomo de visitisrael.site sigue detenido. Chequeá los cuatro puntos
y devolveme una tabla con OK / ALERTA en cada uno:

1. Routine trig_01T9XFcuEQq8fBQa2M2yTEVX sigue con enabled: false
   (RemoteTrigger action get)
2. No hay runs nuevas desde la última verificación
   (RemoteTrigger action list_runs)
3. .loop/STOP sigue existiendo y sigue versionado en master
   (git log origin/master -- .loop/STOP  →  el último commit no puede ser un borrado)
4. No entraron commits [auto-loop] nuevos
   (git fetch && git log origin/master --oneline --since="<última verificación>")

Si algo da ALERTA, no lo arregles solo: avisame primero qué pasó y desde cuándo.
```

---

## Qué mirar

| Punto | OK | ALERTA |
|---|---|---|
| Routine | `enabled: false` | `enabled: true` → alguien la reactivó |
| Runs | ninguna nueva | run nueva → la routine disparó |
| `.loop/STOP` | existe en `origin/master` | fue borrado → alguien sacó el candado |
| Commits | ninguno `[auto-loop]` | commits nuevos → está escribiendo |

Cualquier ALERTA es incidente. Se documenta en `gestion/auditoria/` con fecha, qué se
reactivó y quién.

## Nota

La API no permite borrar routines, solo desactivarlas. El borrado definitivo lo hace
Sebastian en https://claude.ai/code/routines. Mientras la routine exista, aunque esté
apagada, esta rutina sigue teniendo sentido.
