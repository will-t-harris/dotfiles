# TmTheme Guide

---

## meta.at-rule.css

### meta.at-rule.ID.css

- The complete `@import url("hello")` as `meta.at-rule.import.css`
- The complete `@font-face { font-family: custom; }` as `meta.at-rule.font-face.css`

#### meta.at-rule.ID.header.css

- The `@media (max-width: 320px)` within `@media (max-width: 320px) {}`

#### meta.at-rule.ID.body.css

- The `{}` within `@media (max-width: 320px) {}`, `@supports (display: grid) {}`, etc

## meta.feature-query.css

The `(display: grid)` in `@supports (display: grid) {}`

## meta.function.css

### meta.function.ID.css

- The complete `calc(50px * 2)` as `meta.function.calc.css`
- The complete `hsl()`, `lab()`, `rgb()`, etc as `meta.function.calc.css`
- The complete `conic-gradient(red, yellow)`, `linear-gradient(red, yellow)` as `meta.function.gradient.css`
- The complete `attr()`, `brightness()` as `meta.function.misc.css`
- The complete `circle()`, `ellipse()`, `inset()` as `meta.function.shape.css`
- The complete `var()` as `meta.function.variable.css`
- The complete `domain()`, `url-prefix` as `meta.function.document-rule.css`

## meta.property-list.css

- The `{ display: grid }` in `body { display: grid }`

### meta.property-name.css

- The `display` in `display: grid`

### meta.property-value.css

- The `grid` in `display: grid`

## meta.selector

---

# keyword.css

## keyword.operator.css

## keyword.operator.ID.css

- keyword.operator.arithmetic.css `*` `/` `-` `+`
- keyword.operator.combinator.css `>>` `>`, `+`, `~
- keyword.operator.comparison.css `>=`, `<=`, `=`, `<`, `>`
- keyword.operator.gradient.css `at` `from` `to`
- keyword.operator.pattern `~` `|` `^` `$` `*` `?` `=`
- keyword.operator.shape.css `at` `round`
- keyword.other.important.css `!important`

## keyword.control.at-rule.css

- The `@unknown` within `@unknown something;` or `@unknown something {}`

### keyword.control.at-rule.ID.css

- The `@import`, `@media`, etc in `@import "/path";`, `@media (min-width: 320px) {}`, etc

## keyword.control.from.css-modules.css

- The `from` in `@value: red, blue, green from "/path"`, `@composes: aClass from "/path"`
- The `from` in `@value: red, blue, green from colors`

---

# punctuation

## punctuation.terminator.rule.css

- The `;` in `@import "path";`, `display: grid;`, etc

---

# support.css

## support.constant.css

### support.constant.css

#### support.constant.color.css

##### support.constant.color.ID.css

- The `aqua` in `color: aqua` as `support.constant.color.w3c-standard-color-name.css`

#### support.constant.media.css

- The `all`, `screen` in `@media all {}`, `@media screen {}`

#### support.constant.property-value.css

- The `no-preference` in `@media (prefers-color-scheme: no-preference)` as `support.constant.property-value.css`

#### support.constant.font-name.css

- The `monospace`, `system-ui` as `support.constant.font-name.css`

## support.function.css

### support.function.ID.css

- The `calc` within `calc(50px * 2)` as `support.function.calc.css`
- The `hsl`, `lab()`, `rgb()`, etc within `hsl()`, `lab()`, `rgb()` as `support.function.color.css`
- The `conic-gradient`, `linear-gradient` within `conic-gradient(red, yellow)`, `linear-gradient(red, yellow)` as `support.function.gradient.css`
- The `attr`, `brightness` within `attr()`, `brightness()` as `support.function.misc.css`
- The `circle()`, `ellipse()`, `inset()` as `support.function.shape.css`
- The `var(--name)` as `support.function.variable.css`
- The `domain`, `url-prefix` within `domain()`, `url-prefix()` as `support.function.document-rule.css`

#### support.type.property-name.media.css

- The `prefers-color-scheme` in `@media (prefers-color-scheme: no-preference)` as `support.type.property-name.media.css`

### support.type.property-name.css

### support.type.property-name.ID.css

The `composes` in `composes: aClass` as `support.type.property-name.composes.css`
The `min-width` in `@media (min-width: 320px) {}` as `support.type.property-name.media.css`
