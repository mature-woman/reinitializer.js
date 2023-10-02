"use strict";

if (typeof window.reinitializer !== "function") {
  // Not initialized

  // Initialize of the class in global namespace
  window.reinitializer = class reinitializer {
    /**
     * Parent element for location <link> elements
     */
    css = document.head;
    
    /**
     * Parent element for location <script> elements
     */
    js = document.body;

    /**
     * Target element for searching new <link> and <script> elements
     */
    root = document.getElementsByTagName("main")[0];

    /**
     * Instance of the observer
     */
    observer = new MutationObserver(() => this.handle(this.root));

    /**
     * Construct
     *
     * @param {object} root Entry point
     */
    constructor(root) {
      // Initialize of the root element
      this.root = root ?? this.root;
    }

    /**
     * Reinitialize <link> and <script> elements
     *
     * @return {bool} Processing status
     */
    handle() {
      // Check for a dublicate execute launch
      if (this.started) return false;

      // Initialization an observation status
      this.started = true;

      for (
        let links;
        (links = this.root.getElementsByTagName("link")).length > 0;
      ) {
        // Enumeration <link> elements

        // Initialization of the <link> element
        const link = links[0];

        // Initialization link of the <link> element
        const href = link.getAttribute("href");

        // Stop listening
        this.stop();

        // Delete outdated <link> element from the document
        link.remove();

        // Start listening
        this.start();

        // Deleting outdated elements
        for (
          const element of this.css.querySelectorAll(
            `script[href="${href}"]`,
          )
        ) element.remove();

        // Initialization of new <link> element
        const element = document.createElement("link");
        element.setAttribute("href", href);
        element.setAttribute("rel", "stylesheet");

        // Write new element
        this.css.appendChild(element);
      }

      for (
        let scripts;
        (scripts = this.root.getElementsByTagName("script")).length > 0;
      ) {
        // Enumeration of <script> elements

        // Initialization of the <script> element
        const script = scripts[0];

        // Initialization link of the <script> element
        const src = script.getAttribute("src");

        // Initialization text of the <script> element
        const text = script.textContent;

        // Stop listening
        this.stop();

        // Delete outdated <script> element from the document
        script.remove();

        // Start listening
        this.start();

        // Initialization of new <script> element
        const element = document.createElement("script");

        if (typeof src === "string") {
          // File

          // Deleting outdated elements
          for (
            const element of this.js.querySelectorAll(
              `script[src="${src}"]`,
            )
          ) element.remove();

          // Copy link from outdated <script> element
          element.setAttribute("src", src);
        } else {
          // Script

          // Deleting outdated elements
          for (
            const element of Array.from(
              this.js.getElementsByTagName("script"),
            )
              .filter((e) => e.textContent === text)
          ) {
            element.remove();
          }

          // Copy text from outdated <script> element
          element.textContent = text;
        }

        // Write new <script> element to end of <body> element
        this.js.appendChild(element);
      }

      // Initialize of observation status
      this.started = false;

      // Return (success)
      return true;
    }

    /**
     * Start observation
     *
     * @return {void}
     */
    start() {
      this.observer.observe(this.root, {
        childList: true,
      });
    }

    /**
     * Stop observation
     *
     * @return {void}
     */
    stop() {
      this.observer.disconnect();
    }
  };
}

// Вызов события: "инициализировано"
document.dispatchEvent(
  new CustomEvent("reinitializer.initialized", {
    detail: { reinitializer: window.reinitializer },
  }),
);