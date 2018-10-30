# reddit-dl

## Download top images from a subreddit

Example:
```
reddit-dl -f hot -t day -l 200 wallpapers ./wallpapers
```
Uses a subreddit's JSON feed to look for image posts, and download reddit's preview image. 

Takes a subreddit name and output directory as arugments. Sort options include sorting by hot, top, new, rising, controversial, or random. You can also sort across time with the time option and choosing hour, day, week, month, year, or all.

The limit option is for how many posts to check, not all may have an image associated with them.

```
Usage: reddit-dl [options] <subreddit> <output_dir>

Options:
  -V, --version                                                output the version number
  -s, --sort [hot, new, top, rising, controversial, random]  Sort filter. Default is top
  -t, --time <value>                                           Time, one of hour, day, week, month, year, all. Default is all
  -l, --limit <value>                                          Limit, number of posts to check
  -h, --help                                                   output usage information
```
