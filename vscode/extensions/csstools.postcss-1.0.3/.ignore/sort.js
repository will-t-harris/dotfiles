const fs = require('fs');

const updateCssTmLanguage = async () => {
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

	let tmLanguageJson;

	tmLanguageJson = fs.readFileSync('./syntaxes/pcss.tmLanguage.json', 'utf8');
	tmLanguageJson = JSON.parse(tmLanguageJson);

	tmLanguageJson = getSortedObject(tmLanguageJson);
	tmLanguageJson = getSortedObject(tmLanguageJson);
	tmLanguageJson = getFilteredObject(tmLanguageJson);

	tmLanguageJson = JSON.stringify(tmLanguageJson, null, '  ');

	fs.writeFileSync('./syntaxes/pcss.tmLanguage.json', tmLanguageJson);

	console.log(tmLanguageJson);

	return;

	// let tmLanguageJson = await getJSON('https://raw.githubusercontent.com/csstools/postcss-language/master/syntaxes/pcss.tmLanguage.json');

	// update name
	tmLanguageJson.name = 'PostCSS';

	// delete unused metadata
	delete tmLanguageJson.information_for_contributors;
	delete tmLanguageJson.version;

	// sort the keys
	tmLanguageJson = getSortedObject(tmLanguageJson);

	// filter the regexes
	tmLanguageJson = getFilteredObject(tmLanguageJson);

	write('syntaxes/postcss.tmLanguage.current.json', tmLanguageJson);

	return;
};

updateCssTmLanguage();
