# Changes from css.tmLanguage.json

## Changes "rule-list-innards"

Adds support for nesting `rule-list` patterns within `rule-list`.

**Details**:

- Adds `rule-list` to `patterns` of `rule-list-innards`

```json
{
  "include": "#rule-list"
}
```

---

## Adds "nesting-selector"

Adds support for the nesting `&` selector and the nesting `@nest` at-rule.

**Details**:

- Adds pattern named `entity.name.tag.nesting` to `selector-innards`

```json
{
  "match": "&",
  "name": "entity.name.tag.nesting.pcss"
}
```

- Adds `nesting-selector` named `meta.selector.nesting`, based on `#selector`
  - Creates pattern #1
    - Requires starting `&` named `entity.name.tag.nesting`
    - Adds `selector-innards` to `patterns` of pattern #1
  - Creates pattern #2
    - Requires starting `@` and `nest` named `keyword.control.at-rule.nest` and `punctuation.definition.keyword`
    - Adds `selector-innards` to `patterns` of pattern #2

```json
{
  "nesting-selector": {
    "name": "meta.selector.nesting.pcss",
    "patterns": [
      {
        "begin": "(&)(?=(?:\\|)?(?:[-\\[:.*\\#a-zA-Z_]|[^\\x00-\\x7F]|\\\\(?:[0-9a-fA-F]{1,6}|.)))",
        "beginCaptures": {
          "1": {
            "name": "entity.name.tag.nesting.pcss"
          }
        },
        "end": "(?=\\s*[/@{)])",
        "patterns": [
          {
            "include": "#selector-innards"
          }
        ]
      },
      {
        "begin": "(?i)(@)(nest)",
        "beginCaptures": {
          "0": {
            "name": "keyword.control.at-rule.nest.pcss"
          },
          "1": {
            "name": "punctuation.definition.keyword.pcss"
          }
        },
        "end": "\\s*(?={)",
        "patterns": [
          {
            "include": "#selector-innards"
          }
        ]
      }
    ]
  }
}
```

- Adds `nesting-selector` to `patterns` of `rule-list-innards`

```json
{
  "include": "#nesting-selector"
}
```

---

## Adds `nesting-at-rule-header`

Adds support for nesting `@media` and `@supports` at-rules.

**Details**:

- Adds `nesting-at-rule-header`
  - Creates pattern #1
    - Requires starting `@` and `media` named `keyword.control.at-rule.media.nesting` and `punctuation.definition.keyword`
    - Adds `media-query-list` to `patterns` of pattern #1, based on the pattern named `meta.at-rule.media.header`
  - Creates pattern #2
    - Requires starting `@` and `supports` named `keyword.control.at-rule.supports.nesting` and `punctuation.definition.keyword`
    - Adds `feature-query-operators`, `feature-query`, `comment-block`, and `escapes` to `patterns` of pattern #2, based on the pattern named `meta.at-rule.supports.header`

```json
{
  "nesting-at-rule-header": {
    "patterns": [
      {
        "begin": "(?i)(@)(media)",
        "beginCaptures": {
          "0": {
            "name": "keyword.control.at-rule.media.nesting.pcss"
          },
          "1": {
            "name": "punctuation.definition.keyword.pcss"
          }
        },
        "end": "\\s*(?={)",
        "patterns": [
          {
            "include": "#media-query-list"
          }
        ]
      },
      {
        "begin": "(?i)(@)(supports)",
        "beginCaptures": {
          "0": {
            "name": "keyword.control.at-rule.supports.nesting.pcss"
          },
          "1": {
            "name": "punctuation.definition.keyword.pcss"
          }
        },
        "end": "\\s*(?={)",
        "patterns": [
          {
            "include": "#feature-query-operators"
          },
          {
            "include": "#feature-query"
          },
          {
            "include": "#comment-block"
          },
          {
            "include": "#escapes"
          }
        ]
      }
    ]
  }
}
```

- Adds `nesting-at-rule-header` to `patterns` of `rule-list-innards`

```json
{
  "include": "#nesting-at-rule-header"
}
```

---

## Adds `custom-at-rules`

Adds support for `@custom-media` and `@custom-selector` at-rules.

- Adds `custom-at-rules` named `meta.at-rule.custom-media`
  - Creates pattern #1
    - Requires starting `@` and `custom-media` named `keyword.control.at-rule.custom-media` and `punctuation.definition.keyword`
    - Adds `custom-media-variable` and `media-query-list` to `patterns` of pattern #1
  - Creates pattern #2
    - Requires starting `@` and `custom-selector` named `keyword.control.at-rule.custom-selector` and `punctuation.definition.keyword`
    - Adds `custom-selector-variable` and `selector-innards` to `patterns` of pattern #1
- Adds `custom-media-variable` named `variable.argument.custom-media.pcss`
- Adds `custom-media-variable` to `patterns` of pattern #1
- Adds `custom-media-variable` to `patterns` of a pattern in `media-query`
- Adds `custom-selector-variable` named `variable.argument.custom-selector.pcss`
- Adds `custom-selector-variable` to `patterns` of pattern #2

```json
{
  "custom-at-rules": {
    "name": "meta.at-rule.custom-media.pcss",
    "begin": "(?i)(?=@(custom-media|custom-selector)(\\s|/\\*|$))",
    "end": "(?<=;)(?!\\G)",
    "patterns": [
      {
        "begin": "(?i)\\G(@)(custom-media)",
        "beginCaptures": {
          "0": {
            "name": "keyword.control.at-rule.custom-media.pcss"
          },
          "1": {
            "name": "punctuation.definition.keyword.scss"
          }
        },
        "end": ";",
        "endCaptures": {
          "0": {
            "name": "punctuation.terminator.rule.pcss"
          }
        },
        "patterns": [
          {
            "begin": "\\s+(--[-a-zA-Z_][\\w-]*)",
            "beginCaptures": {
              "1": {
                "patterns": [
                  {
                    "include": "#custom-media-variable"
                  }
                ]
              }
            },
            "end": "(?=;)(?!\\G)",
            "patterns": [
              {
                "include": "#media-query-list"
              }
            ]
          }
        ]
      },
      {
        "begin": "(?i)\\G(@)(custom-selector)",
        "beginCaptures": {
          "0": {
            "name": "keyword.control.at-rule.custom-selector.pcss"
          },
          "1": {
            "name": "punctuation.definition.keyword.scss"
          }
        },
        "end": ";",
        "patterns": [
          {
            "begin": "\\s+(:--[-a-zA-Z_][\\w-]*)",
            "beginCaptures": {
              "1": {
                "patterns": [
                  {
                    "include": "#custom-selector-variable"
                  }
                ]
              }
            },
            "end": "(?=;)(?!\\G)",
            "patterns": [
              {
                "include": "#selector-innards"
              }
            ]
          }
        ]
      }
    ]
  },
  "custom-media-variable": {
    "match": "--[-a-zA-Z_][\\w-]*",
    "captures": {
      "0": {
        "name": "variable.argument.custom-media.pcss"
      }
    }
  },
  "custom-selector-variable": {
    "match": ":--[-a-zA-Z_][\\w-]*",
    "captures": {
      "0": {
        "name": "variable.argument.custom-selector.pcss"
      }
    }
  }
}
```

- Adds `custom-at-rules` to `patterns`

```json
{
  "include": "#custom-at-rules"
}
```

---

## Adds `env-function`

Adds support for Environment Variables.

**Details**:

- Adds `env-function`

```json
{
  "env-function": {
    "begin": "(?i)(?<![\\w-])(env)(\\()",
    "beginCaptures": {
      "1": {
        "name": "support.function.misc.pcss"
      },
      "2": {
        "name": "punctuation.section.function.begin.bracket.round.pcss"
      }
    },
    "end": "\\)",
    "endCaptures": {
      "0": {
        "name": "punctuation.section.function.end.bracket.round.pcss"
      }
    },
    "patterns": [
      {
        "match": "([-a-zA-Z_][\\w-]*)(?:,([^)]+))?",
        "captures": {
          "1": {
            "name": "variable.argument.pcss"
          },
          "2": {
            "patterns": [
              {
                "include": "#property-values"
              }
            ]
          }
        }
      }
    ]
  }
}
```

- Adds `env-function` to `patterns` within `media-query`
- Adds `env-function` to `patterns` of `functions`

---

## Adds `is` and `where` pseudo-classes

- Adds `is` and `where` to `begin` of patterns within `functional-pseudo-classes`

```json
{
  "begin": "(?i)((:)(?:not|has|is|matches|where))(\\()",
}
```

## Adds `blank` pseudo-class

- Adds `blank` to `pseudo-classes`

```json
{
  "match": "(?xi)\n(:)(:*)\n(?: active|any-link|blank|checked|default|defined|disabled|empty|enabled|first\n  | (?:first|last|only)-(?:child|of-type)|focus|focus-visible|focus-within\n  | fullscreen|host|hover|in-range|indeterminate|invalid|left|link\n  | optional|out-of-range|placeholder-shown|read-only|read-write\n  | required|right|root|scope|target|unresolved\n  | valid|visited\n)(?![\\w-]|\\s*[;}])"
}
```

---

## Add `prefers-color-scheme` and `prefers-reduced-motion`

- Adds `prefers-color-scheme` and `prefers-reduced-motion` to `media-features`

```json
{
  "match": "(?i)(?<=^|\\s|\\(|\\*/)(?:((?:min-|max-)?(?:height|width|aspect-ratio|color|color-index|monochrome|resolution)|grid|scan|orientation|prefers-(?:color-scheme|reduced-motion)|display-mode)|((?:min-|max-)?device-(?:height|width|aspect-ratio))|((?:[-_](?:webkit|apple|khtml|epub|moz|ms|o|xv|ah|rim|atsc|hp|tc|wap|ro)|(?:mso|prince))-[\\w-]+(?=\\s*(?:/\\*(?:[^*]|\\*[^/])*\\*/)?\\s*[:)])))(?=\\s|$|[><:=]|\\)|/\\*)"
}
```

- Adds `dark`, `light`, `no-preference`, and `reduce` to `media-feature-keywords`

```json
{
  "match": "(?i)(?<=^|\\s|:|\\*/)(?:browser|dark|fullscreen|interlace|landscape|light|minimal-ui|no-preference|portrait|progressive|reduce|standalone)(?=\\s|\\)|$)"
}
```

---

## Adds missing logical properties

- Adds `border-block`, `border-inline`, `margin-block`, `margin-inline`, `padding-block`, and `padding-inline` to `property-names`
- Removes all `offset` properties

---

## Adds `place-self`

- Adds `place-self` to `property-names`

---

## Adds color functions

- Adds `hwb`, `lab`, and `lch` to the pattern named `meta.function.color.pcss` within `functions`

---

## Update font names

- Adds `emoji`, `fangsong`, and `system-ui` to `patterns` within `property-keywords`
- Removes `arial`, `century`, `comic`, `courier`, `garamond`, `georgia`, `helvetica`, `impact`, `lucida`, `symbol`, `system`, `tahoma`, `times`, `trebuchet`, `utopia`, `verdana`, and `webdings` from `patterns` within `property-keywords`

```json
{
  "name": "support.constant.font-name.pcss",
  "match": "(?<![\\w-])(?i:cursive|emoji|fangsong|fantasy|math|monospace|sans-serif|serif|system-ui)(?![\\w-])"
}
```
