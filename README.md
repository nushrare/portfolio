# Ms. Anushka Jain — portfolio

A plain HTML, CSS and JavaScript portfolio. No build step or dependencies.
Open index.html directly, or run `python3 -m http.server 8000` from this folder
and visit http://localhost:8000.

- `index.html` holds the page structure, project stories and biography.
- `styles.css` holds layout, type and the three palettes. It follows the device's light/dark setting.
- `site.js` holds the optional links, local preferences and check-in demo.
- `assets/` holds the vector artwork and can hold an approved public résumé PDF.

Before publishing: review the bio, choose the visual direction, replace project
placeholders with verified work, and fill in the public links in site.js. Keep
private documents out of the repository. A contact form that sends mail needs a
backend or a form service; an email link needs neither.

To host on GitHub Pages, upload the contents of this folder to the repository root
(including .nojekyll). In repository Settings → Pages, select Deploy from a branch,
then main and /(root). Review the deployed URL when Pages finishes.
