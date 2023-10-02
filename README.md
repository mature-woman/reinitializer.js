# js-reinitializer

A library for tracking and reinitializing `<link>` and `<script>` elements so that the browser downloads them. 

Used when developing any dynamic requests via JS where links to third-party documents are supplied along with HTML content.

# Instruction
By default, the library is observe the first `<main>` element, but you can reassign it by passing an argument of type `{HTMLElement|null}` to `new e.detail.reinitializer();`


    document.addEventListener('reinitializer.initialized', function (e) {
        // Initialized reinitializer

	    // Initialize of instance of reinitializer
	    const reinitializer = new e.detail.reinitializer();

	    // Start observation
	    reinitializer.start();
    });

By default, after reinitialization, `<link>` elements are moved to the end of the `<head>` element, and `<script>` elements are moved to the end of the `<body>` element. You can override this behavior by changing the `reinitializer.js` and `reinitializer.css` properties.