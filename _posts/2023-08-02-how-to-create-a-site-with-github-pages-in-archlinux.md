---
layout: post
comments: true
permalink: 2023/08/02/how-to-create-a-site-with-github-pages-in-archlinux/
title: How to create a site with Github Pages (in ArchLinux) - Definitive and Simple Guide
---

Hello, today I will explain how to make a site on GitHub Pages easily in Archlinux.
**NOTE**: this article will be updated if the procedure changes.

First, you need *Ruby*. Install it with:
`sudo pacman -Syu ruby gcc make git`

Then you need *Bundler*. Install it after you have insalled Ruby.
`gem install bundler`

### Creating a repository

Now, go to [GitHub](https://github.com).
 1. In the upper-right corner of any page of GitHub, use the + drop-down menu, and select **New repository**.

![Create a new repository](https://docs.github.com/assets/cb-31554/mw-1440/images/help/repository/repo-create.webp)

2. Type a name for your repository and an optional description. The username must match `<username>.github.io`, and are allowed only lowercase letters.

![Repository name](https://docs.github.com/assets/cb-48482/mw-1440/images/help/pages/create-repository-name-pages.webp)

### Creating the site

 1. Open a terminal (*QTerminal*, *Konsole*, *Gnome Terminal*, etc.)

 2. You need to make a local copy of your repository.
`$ mkdir <username>.github.io`

 3. Enter the folder.
`$ cd THE-FOLDER-YOU-CREATED`

4. Launch the command:
`$ git init`
`# Initialize the repository`

5. The site can be published in the `master` branch, but personally, it is better to use the `gh-pages` branch. So, let's create and checkout the `gh-pages` branch.
`$ git checkout --orphan gh-pages`

6. Now, install Jekyll. Unfortunately, Jekyll, if installed from "gem", will not run on ArchLinux. Thus, we will install it from the [AUR](https://aur.archlinux.org/packages/jekyll).

7. After we installed Jekyll, we must create a new Jekyll site with the command:
`$ jekyll new --skip-bundle .`

8. Open the Gemfile that Jekyll created.

9. Add "#" to the beginning of the line that starts with `gem "jekyll"` to comment out this line.

10. Add the `github-pages` gem by editing the line starting with `# gem "github-pages"`. Change this line to:
`gem "github-pages", "~> 228", group :jekyll_plugins`

11. Save and close the Gemfile.

12. from the command line, run `bundle install`.

13. Optionally, make any necessary edits to the `_config.yml` file. This is required for relative paths when the repository is hosted in a subdirectory.
`domain: my-site.github.io - # if you want to force HTTPS, specify the domain without the http at the start, e.g. example.com`
`url: https://my-site.github.io - # the base hostname and protocol for your site, e.g. http://example.com`
`baseurl: /REPOSITORY-NAME/ - # place folder name if the site is served in a subfolder`

14. Add and commit your work.
`$ git add .`
`$ git commit -m "Initial GitHub Pages site with Jekyll"`

15. Add your repository on GitHub.com as a remote, replacing USER with the account that owns the repository and REPOSITORY with the name of the repository.
`$ git remote add origin git@github.com:USER/REPOSITORY.git`

16. Push the repository to GitHub.
`$ git push -u origin gh-pages`

**Completed!** Your site is now at `https://<username>.github.io`.
See you soon for the guide on how to set up a theme for Jekyll. **Bye!**
