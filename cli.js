#!/usr/bin/env node
const program = require('commander')
const redditDl = require('./')

program
    .version('0.0.0')
    .option('-s, --subreddit <name>', 'Subreddit name, ie pics')
    .option('-f, --filter [hot, new, top]', 'Filter, hot, new, top. Default is top')
    .option('-l, --limit <value>', 'Limit, number of posts to check')
    .option('-d, --destination <value>', 'Destination folder')
    .parse(process.argv)

const {subreddit, filter, limit, destination} = program
redditDl(subreddit, filter, limit, destination)
