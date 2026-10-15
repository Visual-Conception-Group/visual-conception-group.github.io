# Visual Conception Group website

Source for <https://vcg.iiitd.edu.in>, the website of the Visual Conception Group at IIIT Delhi.
It is a [Jekyll](https://jekyllrb.com) site: build it with `./build.sh` and copy `_site/` to the
web server (see [Publishing](#publishing)).

## Everyday updates

Almost everything on the site comes from the YAML files in `_data/`. Each file starts with a
commented template you can copy.

| To… | Edit |
| --- | --- |
| Add a news item | `_data/news.yml`, add at the top |
| Add a published paper | `_data/publications.yml`, add at the top |
| Add a preprint or paper under review | `_data/publications.yml` with `type: preprint` (and optionally `status: "Under review"`) |
| Mark a preprint as published | change `type` to `conference` or `journal`, add `venue`, `short`, `year` |
| Add or update a person | `_data/people.yml` |
| Add a current master's or bachelor's student | `_data/people.yml`: `role: masters` (or `bachelors`), `status: current`, `program: MTech (Research)` |
| Move a student to alumni | `_data/people.yml`: set `status: alumni`, add `until`, `thesis`, `now` |
| Add a project | `_data/projects.yml` |
| Advertise an open position (RA, PhD, intern…) | `_data/openings.yml`: copy the template; it shows on the Join us page |
| Edit the notes for BTech/MTech/PhD/RA applicants | `_pages/join.md` (plain Markdown) |
| Change research themes | `_data/topics.yml` |
| Change the photo behind the top of the home page | `hero: background:` (about 1600×800) and `background_small:` (about 960×480) in `_config.yml`; photos go in `images/campus/` |
| Tune the home page word cloud | `_data/wordcloud.yml` (number of words, words to leave out, spellings to merge) |
| Change the menu, or the links in the "Useful links" drop-down | `_data/navigation.yml` (a longer menu may need the header breakpoint raised; see the note there) |
| Change the address, links, hero text | `_config.yml` |

Files go here:

- Paper PDFs, slides and posters: `downloads/`, linked as `pdf: /downloads/file.pdf`
- Team photos: `images/teampic/`, square-ish, about 400×400 px. People without a photo get initials.

### What happens automatically

- **Word cloud.** The cloud on the home page is built from the titles of all published papers,
  so new papers change it automatically. Each word links to the papers that contain it.
- **Counts.** Publication totals, the papers-per-year chart and the paper count for each research
  theme are all calculated from the data files.
- **Lab members in author lists** are bolded. If a paper spells a name differently
  (`A.V. Subramanyam`, `K. Kansal`), add that spelling to the person's `aliases` in `_data/people.yml`.
  Put `*` after names for equal contribution (`Shivank Rajput*, Himanshu Singh*`); the note is added for you.
- **BibTeX.** Every paper gets a "BibTeX" button whose entry is built from its fields. To use your
  own, add a `bibtex:` block to the paper.
- **Abstracts.** Add `abstract:` to a paper and an "Abstract" button appears.
- **Citations.** Papers with a `doi` (or an `arxiv` link) show a citation badge from
  [Dimensions](https://badge.dimensions.ai) once they have at least one citation. Switch it off with `citations: dimensions: false` in `_config.yml`.
- **Preprints** are listed in their own group, but the publications page shows published papers
  by default. Visitors see preprints with the "Preprints" filter.
  Preprints are left out of the home page and of all counts.
- **Open positions.** The Join us page lists the positions in `_data/openings.yml`, or says there
  are none. A position is hidden once its deadline has passed (the next time the site is rebuilt),
  and each one is marked up as a job posting so it can appear in Google's job search.
- **Team page.** Current members come first (faculty, PhD, master's, bachelor's), then alumni.
  Empty sections are hidden, and the order is set in `_data/team_sections.yml`. Anyone whose
  `role`/`status` doesn't match a section shows up under "Other members", so a typo never hides a person.

### Example: adding a paper

```yaml
- title: "Our New Paper"
  authors: "Himanshu Singh, A V Subramanyam"
  venue: "European Conference on Computer Vision (ECCV)"
  short: ECCV
  year: 2026
  type: conference
  topics: [adversarial]
  links:
    doi: 10.1007/978-3-032-00000-0_1
    arxiv: https://arxiv.org/abs/2601.01234
    code: https://github.com/Visual-Conception-Group/our-new-paper
```

YAML is picky about indentation. Use spaces, not tabs, and copy the shape of an existing entry.
Put text that contains a colon (`:`) in quotes. `year` must be a four-digit number; a paper
without one is listed under "Year not set".

DOIs are easiest to copy from the lab's dblp page: <https://dblp.org/pid/232/6141.html>.

## Search engines and link previews

The site is set up for search engines with the plugins GitHub Pages provides
(`jekyll-seo-tag`, `jekyll-sitemap`, `jekyll-redirect-from`):

- Each page has its own title and a `description:` in its front matter (keep it under ~160 characters).
  The home page's title and description are `home_title` and `description` in `_config.yml`.
- `/sitemap.xml` and `/robots.txt` are generated automatically. Paper PDFs in `downloads/` are listed too.
- Shared links show `assets/img/og-image.jpg` (1200×630). A page can use its own with `image:` in its front matter.
- Structured data (schema.org) describes the lab, its members and every published paper. It is built
  from the data files by `_includes/schema-*.html`, so it stays up to date by itself.
- A page with `robots: noindex` is hidden from search results (the 404 page uses this).
- To move or rename a page without breaking old links, add `redirect_from: [/old-url/]` to its front matter.

- Datasets on the Resources page also carry schema.org `Dataset` data (at the bottom of
  `_pages/resources.md`), so they can appear in Google Dataset Search. Keep it in step with the text.
- Paper `summary:` lines show under each paper and are used as its description for search engines,
  so a one-sentence plain-language summary is worth adding to every paper.

After publishing, register the site in [Google Search Console](https://search.google.com/search-console)
(and optionally Bing Webmaster Tools), submit `https://vcg.iiitd.edu.in/sitemap.xml`, and put the
verification code under `webmaster_verifications:` in `_config.yml`.

## Publishing

The live site, <https://vcg.iiitd.edu.in>, is served from the `www` folder on the IIIT Delhi web
server. It is built on your own computer and copied there:

1. Make the changes and check them in the preview (below).
2. Stop the preview (Ctrl+C), then run `./build.sh`. It builds the site into `_site/` with the live
   address and production settings (which also switch on Google Analytics), and stops with a
   message if any local preview address is left in it.
3. Copy the contents of `_site/` to the `www` folder on the server. Replace the old files rather
   than copying on top of them; otherwise pages and files that were removed from the site stay
   online. With rsync that is `rsync -av --delete _site/ <user>@<server>:<path-to-www>/`, after
   checking that `www` holds nothing else that has to stay.

Don't copy `_site/` straight after a preview: `jekyll serve` writes the preview address
(`http://localhost:4000`) into links, the sitemap and the tags search engines read.

To check the live site after copying: `https://vcg.iiitd.edu.in/sitemap.xml` and `/robots.txt`
should load, and the home page source should contain `<link rel="canonical" href="https://vcg.iiitd.edu.in/">`.

The repository is also on GitHub (`gh-pages` branch), where GitHub Pages builds its own copy;
the `CNAME` file sends visitors of `visual-conception-group.github.io` on to `vcg.iiitd.edu.in`.
The `Gemfile` uses the same versions as GitHub Pages, so both builds come out the same.

Server settings to raise with IIIT Delhi IT (they are not part of this repository):

- The `http://` → `https://` redirect drops the slash after the host name, so
  `http://vcg.iiitd.edu.in/team/` goes to `https://vcg.iiitd.edu.inteam/`, which doesn't exist.
  Only the home page redirects correctly. The fix in the port-80 site configuration is
  `Redirect permanent / https://vcg.iiitd.edu.in/` (with the final slash). Afterwards,
  `curl -sIL http://vcg.iiitd.edu.in/team/` should end in `200`.
- Optional: `ErrorDocument 404 /404.html`, so a missing page shows the site's own "Page not found"
  page, and compression and caching (`mod_deflate`, `mod_expires`) for faster loading.

## Preview locally

The Gemfile pins the same versions GitHub Pages uses (the `github-pages` gem, Jekyll 3.10).

```sh
bundle config set --local path vendor/bundle   # once: keep gems inside the project
bundle install                                 # once, and after the Gemfile changes
bundle exec jekyll serve
# open http://localhost:4000
```

Restart `jekyll serve` after editing `_config.yml`; it does not reload that file on its own.
The preview is only for looking: build with `./build.sh` before copying anything to the server.

## How the site is put together

```
_config.yml          site-wide settings (title, contact, hero text, citations, analytics)
_data/               all content lists (see above)
_pages/              one file per page: home, publications, team, projects, resources, news, join us, 404
_layouts/            default.html (page frame) and page.html (title + content)
_includes/           reusable pieces: pub.html (one paper), bibtex.html, authors.html,
                     person.html, role-label.html, news-item.html, header, footer
assets/css/main.css  all styles; colours and fonts are variables at the top
assets/js/           word-cloud.js (home page word cloud), publications.js (search and filters),
                     pub-details.js (Abstract/BibTeX buttons), scroll-strip.js (sideways rows
                     on the home page), theme.js (light/dark switch)
images/, downloads/  photos, logos and PDFs
```

The site uses no custom plugins and no CSS framework, so it builds on GitHub Pages as is.
The site has a light and a dark theme. It follows the visitor's system setting until they use the
switch in the header; their choice is then remembered in that browser. The dark colours are in the
"Dark theme" block near the top of `main.css` (that file starts with two `---` lines so Jekyll can
reuse the block; keep them).
