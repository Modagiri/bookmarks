const linksSection = document.querySelector('.links');
const errorMessage = document.querySelector('.error-message');
const newLinkForm = document.querySelector('.new-link-form');
const newLinkUrl = document.querySelector('.new-link-url');
const newLinkSubmit = document.querySelector('.new-link-submit');
const clearStorageButton = document.querySelector('.clear-storage');
const parser = new DOMParser();

// Skru paa submitknappen dersom urlen er gyldig
newLinkUrl.addEventListener('keyup', () => {
	console.log(newLinkUrl);
	newLinkSubmit.disabled = !newLinkUrl.validity.valid;
});


// Resett inputfeltet
const clearForm = () => {
	newLinkUrl.value = null;
};


newLinkForm.addEventListener('submit', (event) => {
	event.preventDefault(); //ikke send forespørsel til server

	const url = newLinkUrl.value;


	fetch(url)
		.then(response => response.text())
		.then(parseResponse)
		.then(findTitle)
		.then(title => storeLink(title, url))
		.then(clearForm)
		.then(renderLinks);

});

const parseResponse = (text) => {
	return parser.parseFromString(text, 'text/html');
}

// finn <title>-elementet og returner teksten i det
const findTitle = (nodes) => {
	return nodes.querySelector('title').innerText;
}


// Gjoer tittel- og urlparet til et JSON-objekt og lagre
// det i localStorage med url som noekkel
const storeLink = (title, url) => {
	localStorage.setItem(url, JSON.stringify({title: title, url: url}));
}

// hent alle noeker fra localStorage
// og deretter hent deres verdi og opprett nytt objekt
const getLinks = () => {
	keylist = Object.keys(localStorage);
	return keylist.map(key => JSON.parse(localStorage.getItem(key)));
}

// Tar et link-objekt og returnerer
// en html-streng med verdier og attributter fra objektet
const convertToElement = (link) => {
	return `<div class="link">
	<h3>${link.title}</h3>
	<p>
	  <a href="${link.url}">${link.url}</a>
	</p>
  </div>`;
}


const addLink = (link) => {
	let templt = document.querySelector("#linklist");
	console.log(templt);
	let clonee = document.importNode(templt.content, true);
	console.log(clonee.querySelector("p"));


	clonee.querySelector("h3").innerHTML = `${link.title}`;
	clonee.querySelector("p").innerHTML = `${link.url}`;
	linksSection.appendChild(clonee);

}

/*
const renderLinks = () => {
	const linkElements = getLinks().map(convertToElement).join('');
	console.log(linkElements);
	linksSection.innerHTML = linkElements;
}
*/

const renderLinks = () => {
	let links = getLinks();
	for(let i = 0; i < links.length; i++) {
		addLink (links[i]);
	}
}

;
clearStorageButton.addEventListener('click', () => {
	localStorage.clear();
	linksSection.innerHTML = '';
});

renderLinks();