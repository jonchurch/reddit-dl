# reddit-dl

## Download top images from a subreddit

### Install
Requires that Node and NPM are installed.

Run `npm i -g reddit-dl`

### Usage
Uses a subreddit's JSON feed to look for image posts, and download reddit's preview image. 

Takes a subreddit name and output directory as arugments, directory will be created if it deosn't alreayd exist. Sort options include sorting by hot, top, new, rising, controversial, or random. You can also sort across time with the time option and choosing hour, day, week, month, year, or all.

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
### Example:
```
reddit-dl -f hot -t day -l 200 wallpapers ./wallpapers
```
