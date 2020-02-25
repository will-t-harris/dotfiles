# PostCSS Language Support

Test PostCSS Language Support within a Code Block:

```pcss

$highlight: blue;

%button {
	@extend strong, .bold;

	border-color: $highlight;
}

```

```pcss
@custom-env --env-var 50px;
@custom-media --sm (width >= 30em);
@custom-selector :--heading h1, h2, h3, h4, h5, h6;

$sass-var: blue;
$sass-var: blue $sass-var green;

body :--heading {
	$sass-var: blue $sass-var green;
	--prop-var: blue $sass-var green;
	color: blue;

	@media screen (--sm) {
		color: env(--blue, blue);
	}
}

a.css:is(code.selector) {
	color: blue;

	&.css:is(code.selector) {
		composes: dark-red from "./colors.css";
	}

	@nest a.css:is(code.selector) & {
		composes: normalLink linkButton;

		&.then:is(code.deeper) {
			@nest a.css:is(code.selector) {
				color: blue;
			}
		}
	}
}

.otherClassName {
	@media (--foo) {
		color: green;
	}

	color: blue;
	composes: dark-red from "./colors.css";
	composes: normalLink linkButton;
	composes: className from "./style.css";
	composes: dark-red from "./colors.css";
	composes: normalLink linkButton;
	composes: mediaContainer from '../../../public/scss/layout.scss';
	color: blue;

	@media (--foo) {
		color: green;
	}
}

```

---

# PostCSS Language Support

Test PostCSS Language Support within a Style Tag:

<style>

$highlight: blue;

%button {
  @extend strong, .bold;

  border-color: $highlight;
}

@custom-env --env-var 50px;
@custom-media --sm (width >= 30em);
@custom-selector :--heading h1, h2, h3, h4, h5, h6;

$sass-var: blue;
$sass-var: blue $sass-var green;

body :--heading {
	$sass-var: blue $sass-var green;
	--prop-var: blue $sass-var green;
	color: blue;

	@media screen (--sm) {
		color: env(--blue, blue);
	}
}

a.css:is(code.selector) {
	color: blue;

	&.css:is(code.selector) {
		composes: dark-red from "./colors.css";
	}

	@nest a.css:is(code.selector) & {
		composes: normalLink linkButton;

		&.then:is(code.deeper) {
			@nest a.css:is(code.selector) {
				color: blue;
			}
		}
	}
}

.otherClassName {
	@media (--foo) {
		color: green;
	}

	color: blue;
	composes: dark-red from "./colors.css";
	composes: normalLink linkButton;
	composes: className from "./style.css";
	composes: dark-red from "./colors.css";
	composes: normalLink linkButton;
	composes: mediaContainer from '../../../public/scss/layout.scss';
	color: blue;

	@media (--foo) {
		color: green;
	}
}

</style>

---

# PostCSS Language Support

Test PostCSS Language Support within a Style Tag:
