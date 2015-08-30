window.onload = function() {
	wrapWords();
};

function wrapWords() {

	var containers = document.getElementsByClassName('text');
	var children = [];
	var text = [];
	var pieces = [];

	for (index = 0; index < containers.length; index++) {
		// console.log(containers[index]);

		text[index] = containers[index].innerHTML;

		pieces[index] = text[index].split(' ');

		text[index] = pieces[index].join('</span> <span>');

		text[index] = '<span>' + text[index] + '</span>';

		containers[index].innerHTML = text[index];

		child = containers[index].children;

		for (j = 0; j < child.length; j++) {
			children.push(child[j]);
		}

	}
	
	for (index = 0; index < children.length; index++) {
		children[index].addEventListener('mouseover', moisteriseMe, false);
		children[index].addEventListener('mouseout', dryMe, false);
	}

}

function moisteriseMe(event) {
	event.target.className = "over";
}

function dryMe(event) {
	event.target.className = "";
}

