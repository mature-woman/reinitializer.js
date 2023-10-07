# reinitializer.js

If you use AJAX technology, you probably noticed that by passing HTML-code and writing it into a document (for example, via `element.outherHTML = someHTML`), browsers does not perform semantic analysis and does not download documents connected using `<link> ` and `<script>` elements.

This program observed `<link>` and `<script>` elements, and recreates them in the right places so that the browser recognizes and downloads them.



# Instruction
By default, observation occurs on the first `<main>` element, but you can change this behavior by passing the first argument in `{HTMLElement}` format to `new e.detail.reinitializer()`

	document.addEventListener('reinitializer.initialized', function (e) {
		// Initialized reinitializer

		// Initialize of instance of reinitializer
		const reinitializer = new e.detail.reinitializer();
		
		// First reinitialization with prevented downloading
		reinitializer.handle(false);

		// Start observation
		reinitializer.start();
	});

By default, after reinitialization, `<link>` elements are moved to the end of the `<head>` element, and `<script>` elements are moved to the end of the `<body>` element. You can override this behavior by changing the `reinitializer.js` and `reinitializer.css` properties.

### Arguments
1. `data-reinitializer-ignore="true"` - The program will ignore this element
2. `data-reinitializer-once="true"` - The program will trigger the download only if there is no duplicate in the registry