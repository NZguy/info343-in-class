# Deploying Static Web Sites to Production

So far you've published your challenges to the web using GitHub Pages, which is a very easy and convenient mechanism for deploying a static web site. But there are several other options for hosting static websites, and this lecture will show you how to use two of them: the UW Student Web Hosting infrastructure; and the Amazon Web Services (AWS) S3 service.

## UW Student Web Hosting

The UW offers every student a free account on their student Linux server infrastructure, which includes optional web site hosting. To activate these services, follow the instructions on the [Activating Shared Web Hosting](https://itconnect.uw.edu/connect/web-publishing/shared-hosting/activating-shared-web-hosting/) page. You will need to enable **both** the Dante/Virgil Account and the Student Web Publishing service.

To connect to your Linux server, use the `ssh` command. Windows users will need to use this command from the Git Bash shell. Mac OS X users can execute `ssh` directly from the Terminal. Use `ssh` to connect to your account at `vergil.u.washington.edu` (replace `your-netid` with your UW NetID).

```bash
ssh your-netid@vergil.u.washington.edu
```

You will be prompted for your UW NetID Password. As you type, you typically won't see anything echoed to the terminal (not even stars), but it will be register what you type. so just type your password and hit the `Enter` (or `Return`) key.

Once connected, your command prompt will change and you will now be able to execute commands directly against the Linux server you just connected to. Execute the standard `ls` command to see what's in your account's home directory:

```bash
ls
```

Now here is where it can get complicated. If you are only a student, you should see a directory named `public_html`. But if you have multiple affiliations (e.g., you work for the University in some capacity), you may see two directories, one named `public_html` and one named `student_html`. If you only see `public_html` and not `student_html`, then that's the one you want to use. But if you see both `public_html` **and** `student_html`, you want to use the `student_html` directory. Change into that now:

```bash
cd public_html # (or student_html if you see that directory)
```

This directory is the root of your student web site. Anything in this directory will be addressable and visible on the web. Use `ls` to list the contents of the current folder. If you just setup your account, you won't see anything.

To deploy a website that is managed using git and GitHub, just clone the repo to the current directory:

```bash
git clone https://github.com/info343-a16/info343-in-class.git
```

This will create a new directory named `info343-in-class` and clone your repository files to it. You can then request those via a web browser, using a URL like this (replace `your-netid` with your UW NetID):

```
https://students.washington.edu/your-netid/info343-in-class/deploy/
```

This cloned repo will be just like the cloned repo you have on your development machine. Anytime you make changes to the files on GitHub, just `cd` into your repo directory, and use `git pull` to pull those new changes into this clone of the repo.

```bash
cd info343-in-class
git pull
```

To close your `ssh` connection to the server and return to your machine's command prompt, simply use the `exit` command:

```bash
exit
```

### Cloning Private Repositories

The version of git installed on the UW Student Web Hosts is very old, so it won't prompt you for a GitHub username and password if you try to clone a private repo. But you can include your GitHub username in the clone URL, and git will then prompt you for your password. Alter the clone URL like this, replacing `your-github-username` with your GitHub username:

```bash
git clone https://your-github-username@github.com/path/to/your/private/repo
```

Notice how your GitHub username is added before `github.com` with a `@` character separator. This is similar to how you connected to the UW Web Host via `ssh`.

## AWS S3 Hosting

If you are willing to pay a little money each month to host your website, an even easier option is to use Amazon's Simple Storage Service (S3), which is part of Amazon Web Services (AWS).

S3 is like a big file server in the sky. You can create one or more "buckets," each with a distinct name, and store any number of files you want in each bucket. If you turn on a few options, those files can then be requested via a web browser.

AWS has recently updated their UI and they now offer a dead-simple [new website quick-start interface](https://console.aws.amazon.com/quickstart-website/new). Simply give your site a name, and upload a `.zip` file containing all of your files. AWS will create a new S3 bucket for your files, enable web access for them, and replicate them throughout their Content Delivery Network, known as "CloudFront." Like other CDNs, this replicates your files to various regions of the world, so that they download quickly regardless of where the client happens to be.

An S3-hosted web site typically costs about $1 a month, but if your site becomes popular and gets tons of requests, or if your files are especially large, the [S3 costs](https://aws.amazon.com/s3/pricing/) and [CloudFront costs](https://aws.amazon.com/s3/pricing/) can quickly increase.

You can also [associate a custom domain](http://docs.aws.amazon.com/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html) with your S3 site, or even buy one through Amazon.