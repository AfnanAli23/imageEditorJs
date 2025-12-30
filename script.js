// Image Editor

// Creating Filter/s
const filters = {
	brightness: {
		value: 100,
		default: 100,
		min: 0,
		max: 200,
		unit: "%",
	},
	contrast: {
		value: 100,
		default: 100,
		min: 0,
		max: 200,
		unit: "%",
	},
	saturation: {
		value: 100,
		default: 100,
		min: 0,
		max: 200,
		unit: "%",
	},
	hueRotate: {
		value: 0,
		default: 0,
		min: 0,
		max: 360,
		unit: "deg",
	},
	blur: {
		value: 0,
		default: 0,
		min: 0,
		max: 20,
		unit: "px",
	},
	grayscale: {
		value: 0,
		default: 0,
		min: 0,
		max: 100,
		unit: "%",
	},
	sepia: {
		value: 0,
		default: 0,
		min: 0,
		max: 100,
		unit: "%",
	},
	invert: {
		value: 0,
		default: 0,
		min: 0,
		max: 100,
		unit: "%",
	},
};
const filtersContainer = document.querySelector(".filters");
function createFilterElement(name, unit = "%", value, min, max) {
	const div = document.createElement("div");
	div.classList.add("filter");

	const p = document.createElement("p");
	p.innerText = name.charAt(0).toUpperCase() + name.slice(1);

	const input = document.createElement("input");
	input.type = "range";
	input.value = value;
	input.min = min;
	input.max = max;
	input.id = name;

	div.appendChild(p);
	div.appendChild(input);

	input.addEventListener("input", (e) => {
		filters[name].value = e.target.value;
		applyFilters();
	});

	return div;
}
Object.keys(filters).forEach((key) => {
	const filterElement = createFilterElement(
		key,
		filters[key].unit,
		filters[key].value,
		filters[key].min,
		filters[key].max,
	);
	filtersContainer.appendChild(filterElement);
});

// Adding Canvas Functionality/Logic
const imageCanvas = document.querySelector("#image-canvas");
const imageInput = document.querySelector("#imageInput");
const canvasCtx = imageCanvas.getContext("2d");
let file = null;
let image = null;
imageInput.addEventListener("change", (e) => {
	file = e.target.files[0];
	const imagePlaceholder = document.querySelector(".placeholder");
	imagePlaceholder.style.display = "none";

	imageCanvas.style.display = "initial";

	const img = new Image();
	img.src = URL.createObjectURL(file);

	img.onload = () => {
		image = img;
		imageCanvas.width = img.width;
		imageCanvas.height = img.height;
		canvasCtx.drawImage(img, 0, 0);
	};
});
function applyFilters() {
	canvasCtx.filter =
		`brightness(${filters.brightness.value}${filters.brightness.unit}) ` +
		`contrast(${filters.contrast.value}${filters.contrast.unit}) ` +
		`saturate(${filters.saturation.value}${filters.saturation.unit}) ` +
		`hue-rotate(${filters.hueRotate.value}${filters.hueRotate.unit}) ` +
		`blur(${filters.blur.value}${filters.blur.unit}) ` +
		`grayscale(${filters.grayscale.value}${filters.grayscale.unit}) ` +
		`sepia(${filters.sepia.value}${filters.sepia.unit}) ` +
		`invert(${filters.invert.value}${filters.invert.unit})`;

	canvasCtx.drawImage(image, 0, 0);
}

// Reset Button Logic
const resetBtn = document.querySelector("#reset-btn");
resetBtn.addEventListener("click", () => {
	Object.keys(filters).forEach((key, index) => {
		filters[key].value = filters[key].default;
		document.querySelectorAll(".filter input")[index].value =
			filters[key].default;
	});

	applyFilters();
});

// Download Button Logic
const downloadBtn = document.querySelector("#download-btn");
downloadBtn.addEventListener("click", () => {
	if (!image) return;

	const imageURL = imageCanvas.toDataURL("image/png");

	const link = document.createElement("a");
	link.href = imageURL;
	link.download = "edited-image.png";

	link.click();
});

// Creating Preset/s Filter/s
// Preset Filter Values
const presets = {
	vintage: {
		brightness: 110,
		contrast: 120,
		saturation: 80,
		hueRotate: 0,
		blur: 0,
		grayscale: 20,
		sepia: 30,
		invert: 0,
	},
	cinema: {
		brightness: 90,
		contrast: 140,
		saturation: 90,
		hueRotate: 0,
		blur: 0,
		grayscale: 0,
		sepia: 10,
		invert: 0,
	},
	home: {
		brightness: 100,
		contrast: 100,
		saturation: 100,
		hueRotate: 0,
		blur: 0,
		grayscale: 0,
		sepia: 0,
		invert: 0,
	},
	noir: {
		brightness: 90,
		contrast: 150,
		saturation: 0,
		hueRotate: 0,
		blur: 0,
		grayscale: 100,
		sepia: 0,
		invert: 0,
	},
	warm: {
		brightness: 110,
		contrast: 110,
		saturation: 120,
		hueRotate: 10,
		blur: 0,
		grayscale: 0,
		sepia: 15,
		invert: 0,
	},
	cool: {
		brightness: 100,
		contrast: 100,
		saturation: 100,
		hueRotate: 180,
		blur: 0,
		grayscale: 0,
		sepia: 0,
		invert: 0,
	},
	bright: {
		brightness: 130,
		contrast: 120,
		saturation: 110,
		hueRotate: 0,
		blur: 0,
		grayscale: 0,
		sepia: 0,
		invert: 0,
	},
	dramatic: {
		brightness: 90,
		contrast: 160,
		saturation: 80,
		hueRotate: 0,
		blur: 0,
		grayscale: 10,
		sepia: 20,
		invert: 0,
	},
	dreamy: {
		brightness: 120,
		contrast: 100,
		saturation: 150,
		hueRotate: 10,
		blur: 2,
		grayscale: 0,
		sepia: 10,
		invert: 0,
	},
	retro: {
		brightness: 100,
		contrast: 110,
		saturation: 90,
		hueRotate: 20,
		blur: 0,
		grayscale: 0,
		sepia: 25,
		invert: 0,
	},
	monochrome: {
		brightness: 100,
		contrast: 130,
		saturation: 0,
		hueRotate: 0,
		blur: 0,
		grayscale: 100,
		sepia: 0,
		invert: 0,
	},
	cinematic_cool: {
		brightness: 95,
		contrast: 140,
		saturation: 80,
		hueRotate: 200,
		blur: 0,
		grayscale: 0,
		sepia: 5,
		invert: 0,
	},
};
function applyPreset(presetName) {
	if (!presets[presetName]) return;

	const preset = presets[presetName];

	Object.keys(preset).forEach((key, index) => {
		if (filters[key]) {
			filters[key].value = preset[key];
			document.querySelectorAll(".filter input")[index].value = preset[key];
		}
	});

	applyFilters();
}
