const fs = require('fs');
const https = require('https');

const updateCssTmLanguage = async () => {
	const getJSON = url => new Promise((resolve, reject) => {
		https.get(url, response => {
			let data = '';

			response.on('data', chunk => {
				data += chunk;
			}).on('end', () => {
				resolve(JSON.parse(data));
			});
		}).on('error', reject);
	});

	// get a hashmap of object property names and the order they should appear in
	const names = ['name', 'scopeName', 'begin', 'beginCaptures', 'end', 'endCaptures', 'match', 'captures', 'contentName', 'patterns', 'repository'].reduce(
		(names, name, index) => {
			names[name] = index;

			return names;
		},
		Object.create(null)
	);

	// return an object with its keys sorted by `names` or alphabetically
	const getSortedObject = unsortedObject => {
		const sortedObject = Array.isArray(unsortedObject) ? [] : {};
		const sortedNames = Object.keys(unsortedObject).sort((a, b) => (
			a in names && b in names
				? names[a] - names[b]
			: compareAlphabetical(a, b)
		));

		sortedNames.forEach(name => {
			const value = unsortedObject[name];

			sortedObject[name] = typeof value === 'object'
				? getSortedObject(value)
			: value;
		});

		return sortedObject;
	};

	const getFilteredObject = object => {
		Object.keys(object).forEach(name => {
			const value = object[name];

			object[name] = typeof value === 'string'
				? getSortedPipes(getUnextendedRegExp(value))
			: typeof value === 'object'
				? getFilteredObject(value)
			: value;
		});

		return object;
	};

	// strip extended regexes because they map poorly within JSON
	const getUnextendedRegExp = value => /^\(\?x.*\)/.test(value)
		? value.replace(/^\(\?x\)/, '').replace(/^(\(\?)x(.+\))/, '$1$2').replace(/\s+(# [^\n]+)?\s*/g, '')
	: value;

	// compare alphabetical
	const compareAlphabetical = (a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : a.toLowerCase() < b.toLowerCase() ? -1 : 0;

	// sort keys in a wrapped pipe
	const getSortedPipes = value => value.replace(
		/\((\?i?[\:\=\>]+)?([\w-?]+(\|[\w-?]+)+)\)/g,
		($0, $1, $2, $3) => `(${$1 || ''}${$2.split('|').sort(compareAlphabetical).join('|')})`
	);

	// replace something in an object
	const replace = (object, key, replacee, replacer) => {
		object[key] = object[key].replace(replacee, replacer);
	};

	// write object to file
	const write = (name, object) => fs.writeFileSync(name, JSON.stringify(object, null, '\t'));

	// get an object within the language by its name value
	const getObjectByName = name => {
		const _getObjectByName = object => {
			if (typeof object === 'object') {
				if (object.name === name) {
					return [object];
				}

				for (const objectName in object) {
					const returnValue = _getObjectByName(object[objectName]);

					if (returnValue.length) {
						return [returnValue[0], returnValue[1] || objectName, returnValue[2] || object];
					}
				}
			}

			return [];
		};

		return _getObjectByName(tmLanguageJson);
	}

	let tmLanguageJson = await getJSON('https://raw.githubusercontent.com/microsoft/vscode/master/extensions/css/syntaxes/css.tmLanguage.json');

	// update name
	tmLanguageJson.name = 'PostCSS';

	// delete unused metadata
	delete tmLanguageJson.information_for_contributors;
	delete tmLanguageJson.version;

	// sort the keys
	tmLanguageJson = getSortedObject(tmLanguageJson);

	// filter the regexes
	tmLanguageJson = getFilteredObject(tmLanguageJson);

	write('syntaxes/css.tmLanguage.json', tmLanguageJson);

	// move at-rule-header-media
	let [mediaHeaderGrammar, mediaHeaderName, mediaHeaderParent] = getObjectByName('meta.at-rule.media.header.css');
	tmLanguageJson.repository['at-rule-header-media'] = mediaHeaderGrammar;
	mediaHeaderParent[mediaHeaderName] = { include: '#at-rule-header-media' };

	// move at-rule-header-supports
	let [supportsHeaderGrammar, supportsHeaderName, supportsHeaderParent] = getObjectByName('meta.at-rule.supports.header.css');
	tmLanguageJson.repository['at-rule-header-supports'] = supportsHeaderGrammar;
	supportsHeaderParent[supportsHeaderName] = { include: '#at-rule-header-supports' };

	// add at-rule-header-nest
	const nestHeaderGrammar = require(__dirname + '/at-rule-header-nest.json');
	tmLanguageJson.repository['at-rule-header-nest'] = nestHeaderGrammar;

	// add at-rule-header-extend
	const extendHeaderGrammar = require(__dirname + '/at-rule-header-extend.json');
	tmLanguageJson.repository['at-rule-header-extend'] = extendHeaderGrammar;

	// add nesting-rules
	const nestingRulesGrammar = require(__dirname + '/nesting-rules.json');
	tmLanguageJson.repository['nesting-rules'] = nestingRulesGrammar;
	tmLanguageJson.repository['rule-list-innards'].patterns.splice(2, 0, { include: '#nesting-rules' });

	// add custom at-rules
	const customAtRules = require(__dirname + '/custom-at-rules.json');
	const customMediaVariable = require(__dirname + '/custom-media-variable.json');
	const customSelectorVariable = require(__dirname + '/custom-selector-variable.json');
	tmLanguageJson.repository['custom-at-rules'] = customAtRules;
	tmLanguageJson.repository['custom-media-variable'] = customMediaVariable;
	tmLanguageJson.repository['custom-selector-variable'] = customSelectorVariable
	tmLanguageJson.patterns.splice(4, 0, { include: '#custom-at-rules' });
	tmLanguageJson.repository['media-query'].patterns[7].patterns.unshift({ include: '#env-function' });
	tmLanguageJson.repository.functions.patterns.push({ include: '#env-function' });

	// Update selector regexp to allow trailing semicolons
	const [invalidIllegalBadIdentifier] = getObjectByName('invalid.illegal.bad-identifier.css');
	replace(invalidIllegalBadIdentifier, 'match', '!"\'%&(*;<?@^`|\\]}', '!"\'%&(*<?@^`|\\]}');

	// Update selectors to allow proceeding semicolons
	const [entityNameTag] = getObjectByName('entity.name.tag.css');
	const [entityOtherClass] = getObjectByName('entity.other.attribute-name.class.css');
	const [entityOtherId] = getObjectByName('entity.other.attribute-name.id.css');
	replace(entityNameTag,    'match', '+~>\\s,.\\#|){:\\[', '+~>\\s,.;\\#|){:\\[')
	replace(entityOtherClass, 'match', '\\s,.\\#)\\[:{>+~|', '\\s,.;\\#)\\[:{>+~|');
	replace(entityOtherId, 'match', '\\s,.\\#)\\[:{>+~|', '\\s,.;\\#)\\[:{>+~|');

	// Update Selector Grammar to support & and %
	let [metaSelectorGrammar] = getObjectByName('meta.selector.css');
	const updateSelector = value => value.replace(':.*\\#', '&%:.*\\#');
	metaSelectorGrammar.begin = updateSelector(metaSelectorGrammar.begin);
	replace(tmLanguageJson.repository['tag-names'], 'match', '?:a|', '?:&|a|');

	// Update Grammer to support `env()` function
	const envFunctionGrammar = require(__dirname + '/env-function.json');
	tmLanguageJson.repository['env-function'] = envFunctionGrammar;

	// Update Pseudo-Classes to add `:blank`
	replace(tmLanguageJson.repository['pseudo-classes'], 'match', 'any-link|checked', 'any-link|blank|checked');

	// Add `:is()` and `:where()` functional-pseudo-class
	replace(tmLanguageJson.repository['functional-pseudo-classes'].patterns[2], 'begin', 'has|matches|not', 'has|is|matches|not|where');

	// Add `prefers-color-scheme` and `prefers-reduced-motion`
	replace(tmLanguageJson.repository['media-features'], 'match', 'grid|scan|orientation|display-mode', 'display-mode|grid|orientation|prefers-color-scheme|prefers-reduced-motion|scan');

	// Add `dark`, `light`, `no-preference`, `reduce`
	replace(tmLanguageJson.repository['media-feature-keywords'], 'match', 'browser|fullscreen|interlace|landscape|minimal-ui|portrait|progressive|standalone', 'browser|dark|fullscreen|interlace|landscape|light|minimal-ui|no-preference|portrait|progressive|reduce|standalone');
	replace(tmLanguageJson.repository['property-keywords'].patterns[0], 'match', 'cyclic|darken', 'cyclic|dark|darken');
	replace(tmLanguageJson.repository['property-keywords'].patterns[0], 'match', 'left|lighten', 'left|light|lighten');
	replace(tmLanguageJson.repository['property-keywords'].patterns[0], 'match', 'left|lighten', 'left|light|lighten');
	replace(tmLanguageJson.repository['property-keywords'].patterns[0], 'match', 'no-open-quote|no-repeat', 'no-open-quote|no-preference|no-repeat');
	replace(tmLanguageJson.repository['property-keywords'].patterns[0], 'match', 'recto|region', 'recto|reduce|region');

	// Add `hwb()`, `lab()`, and `lch()` color functions
	let [metaFunctionColor] = getObjectByName('meta.function.color.css');
	replace(metaFunctionColor, 'begin', 'hsla?|rgba?', 'hsla?|hwb|lab|lch|rgba?');

	// Change font names to `cursive`, `emoji`, `fangsong`, `fantasy`, `math`, `monospace`, `sans-serif`, `serif`, and `system-ui`
	let [supportConstantFontName] = getObjectByName('support.constant.font-name.css');
	replace(supportConstantFontName, 'match', 'arial|century|comic|courier|cursive|fantasy|garamond|georgia|helvetica|impact|lucida|monospace|sans-serif|serif|symbol|system|tahoma|times|trebuchet|utopia|verdana|webdings', 'cursive|emoji|fangsong|fantasy|math|monospace|sans-serif|serif|system-ui');

	// Add border-block, border-inline, margin-block, margin-inline, padding-block, padding-inline
	let [supportTypePropertyName] = getObjectByName('support.type.property-name.css');
	replace(supportTypePropertyName, 'match', 'border|border-block-end', 'border|border-block|border-block-end');
	replace(supportTypePropertyName, 'match', 'border-image-width|border-inline-end', 'border-image-width|border-inline|border-inline-end');
	replace(supportTypePropertyName, 'match', 'margin|margin-block-end', 'margin|margin-block|margin-block-end');
	replace(supportTypePropertyName, 'match', 'margin-bottom|margin-inline-end', 'margin-bottom|margin-inline|margin-inline-end');
	replace(supportTypePropertyName, 'match', 'padding|padding-block-end', 'padding|padding-block|padding-block-end');
	replace(supportTypePropertyName, 'match', 'padding-bottom|padding-inline-end', 'padding-bottom|padding-inline|padding-inline-end');

	// Support `:global` psuedo-class
	replace(tmLanguageJson.repository['pseudo-classes'], 'match', 'fullscreen|host', 'fullscreen|global|host');

	// Support `composes` property
	replace(tmLanguageJson.repository['property-names'].patterns[0], 'match', 'columns|contain', 'columns|composes|contain');

	// Support 'place-self` property
	replace(tmLanguageJson.repository['property-names'].patterns[0], 'match', 'place-items|play-count', 'place-items|place-self|play-count');

	// Remove `offset` properties
	replace(supportTypePropertyName, 'match', '|offset-block-end|offset-block-start|offset-inline-end|offset-inline-start|offset-position|', '|');

	// sort the language
	tmLanguageJson = getSortedObject(tmLanguageJson);

	write('syntaxes/postcss.tmLanguage.json', tmLanguageJson);

	console.log('Done.');

	return;
};

updateCssTmLanguage();
