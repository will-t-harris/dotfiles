In JS, where `const foo = x`, there `foo` is:
- `variable.other.constant`
- `meta.definition.variable`
- `meta.var-single-variable.expr`
- `meta.var.expr`

---

In JS, where `const x = foo`, there `foo` is:
- `variable.other.readwrite`
- `meta.var.expr`

---

In Sass, there `$x` is:
- `variable`
- `meta.definition.variable`

---

In Less, there `@x` is:
- `variable.other`:
  - there `@` is:
    - `punctuation.definition.variable`

---

In Ruby, where `$x = 10`, there `$x` is:
- `variable.other.readwrite.global`
  - there `$` is:
    - `punctuation.definition.variable`

---

In Ruby, where `@x = id`, there `@x` is:
- `variable.other.readwrite.instance`
  - there `@` is:
    - `punctuation.definition.variable`

---

Across all of these patterns, there `@x` is:
- `variable.other`
  - there `@` is:
    - `punctuation.definition.variable`

---

In CSS, where `var(--foo)` is:
- `meta.function.variable`
