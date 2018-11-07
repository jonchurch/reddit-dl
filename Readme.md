# reddit-dl
Download top images from a subreddit. Command Line tool to scrape images from image posts on reddit. Uses Reddit's JSON formatted [API](https://www.reddit.com/dev/api/) for subreddit listings.

### Prerequisites

Requires that Node and NPM are installed.

### Install
Install with npm (the recommended way):

`npm install -g reddit-dl`

And reddit-dl will be installed globally to your system path.

You can also install reddit-dl as a development dependency:

`npm install --save-dev reddit-dl`

### Usage
Uses a subreddit's JSON feed to look for image posts, and download reddit's preview image. 

Takes a subreddit name and output directory as arugments, directory will be created if it doesn't already exist. Sort options include sorting by hot, top, new, rising, controversial, or random. You can also sort across time with the time option and choosing hour, day, week, month, year, or all.

The limit option is for how many posts to check, not all may have an image associated with them.

```
Usage: reddit-dl [options] <subreddit> <output_dir>

Options:
  -V, --version         output the version number
  -s, --sort <string>   Sort filter, one of hot, new, top, rising, controversial, random. Default is top
  -t, --time <string>   Time, one of hour, day, week, month, year, all. Default is all
  -l, --limit <number>  Limit, number of posts to check. Default is 100
  -h, --help            output usage information
```
### Examples:

Check the first 200 posts sorted by "hot" posted in the past "day", of subreddit wallpapers and download image to folder wallpapers in current directory.
```
reddit-dl -s hot -t day -l 200 wallpapers ./wallpapers
```

Check the first 100 posts sorted by "top" posted of all time, of subreddit pics and download image to folder reddit_pics in current directory.

```
reddit-dl -t all pics ./reddit_pics
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
