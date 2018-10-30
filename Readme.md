# reddit-dl

## Download top images from a subreddit

```
reddit-dl -f hot -t day -l 200 wallpapers ./wallpapers
```

```
Usage: reddit-dl [options] <subreddit> <output_dir>

Options:
  -V, --version                                                output the version number
  -f, --filter [hot, new, top, rising, controversial, random]  Sort filter. Default is top
  -t, --time <value>                                           Time, one of hour, day, week, month, year, all. Default is all
  -l, --limit <value>                                          Limit, number of posts to check
  -h, --help                                                   output usage information
```
