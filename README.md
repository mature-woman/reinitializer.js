# reinitializer.js

A library for tracking and reinitializing `<link>` and `<script>` elements so that the browser downloads them. 

Used when developing any dynamic requests via JS where links to third-party documents are supplied along with HTML content.


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