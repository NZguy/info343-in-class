# Git In-Class Exercise

Now that you know something about git and GitHub, let's see if you can complete the following exercise. You can work together with a partner or work alone. You can also refer to the [Essential Git Tutorial](../essential-git.md) or any other resource on the web, but try to rely on your memory first---you want this to become second-nature. If you get stuck, raise your hand and the TA or I will come by to help.

If you don't finish this before the end of class, come back for the lab section and finish it then.

## Fork and Clone

1. If you were in class, you already forked this repo into your own account, but if you haven't done that yet, [fork this repo](https://guides.github.com/activities/forking/) so that you have your own copy of it and can make changes to it. You will do all in-class exercises in your forked copy of this repo.
1. [Clone this repo](https://help.github.com/articles/cloning-a-repository/) to your development machine if you haven't already done so.

## Add Some Files to Develop Branch

1. Using the terminal on your development machine, create a new `develop` branch within this repository and switch to it.
1. Within this `git/exercises/` directory, create a new `index.html` file. Populate that file with the HTML necessary for a [basic web page](../../html-css/essential-html.md). Put something in the `<body>` section so you can see something on-screen.
1. Add and commit the new file to the `develop` branch.

## Create a Pull Request and Merge

1. Create a new pull request on GitHub to pull commits from the `develop` branch to the `master` branch. If you are working with a partner, have your partner review your code and approve it. If not, pretend like you are a different developer reviewing your pull request. After reviewing, accept the changes by merging the pull request.
1. Back in your terminal, switch back to the `master` branch and pull the new commits from the merged pull request into your local development repo.

## Publish to GitHub Pages

1. Ensure you are on the `master` branch (use `git status` or `git branch` to see which branch you are on).
1. Create a new `gh-pages` branch in your repo and switch to it. The new branch will automatically inherit all previous commits you've made to the `master` branch.
1. Push the new `gh-pages` branch to GitHub to publish this repo as a public web site.
1. Open a new browser tab and navigate to the following URL, replacing `your-user-name` with your GitHub username: `https://your-user-name.github.io/info343-modules/git/exercises/`. You should see your web page. If you don't, check your repository settings to ensure that your GitHub Pages site was published.

## Add Some More Files to Develop Branch

1. Back in your terminal, switch to your `develop` branch.
1. Within this `/git/exercises` directory, create a new sub-directory named `css` and put a file named `index.css` in that new directory.
1. Add a style rule that changes the [`background-color`](http://www.w3schools.com/cssref/pr_background-color.asp) of the [body element](http://www.w3schools.com/cssref/sel_element.asp) to `#F0F0F0` (light grey) or some other color that you will easily notice.
1. In your `index.html` file, add the appropriate element to the `<head>` section to [link](http://www.w3schools.com/tags/tag_link.asp) your `index.css` to this page. Open your local `index.html` file in your browser to ensure that the body background color has changed.
1. Add, commit, and push to GitHub.

## Pull Request to Master

1. Over on GitHub, create another pull request to merge your new commits from `develop` into `master`. Pretend like you have done a code review, and then Merge the pull request.
1. This time, also create a [new release](https://help.github.com/articles/creating-releases/) named `v1.0` based on the current state of the `master` branch. Releases are a way you can signal to others that the code at this point is ready to be used in production. It also creates a mnemonic tag that you can use to easily check out a previous release to see what the code looked like at that point. 
1. Back in your terminal, switch to the `master` branch and pull the new commits from GitHub.

## Merge into gh-pages

1. Your changes are now in `master` but they won't yet be visible on the web because they haven't been merged into the `gh-pages` branch. Switch to the `gh-pages` branch and merge the new commits from the `master` branch.
1. After the new commits are merged, push them up to GitHub.
1. Refresh your browser to see the updated page with the different background color!

