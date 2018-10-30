#!/usr/bin/env node
const program = require('commander')
const chalk = require('chalk')

const redditDl = require('./')

program
    .version('0.0.0')
    .option('-s, --subreddit <name>', 'Subreddit name, ie pics')
    .option('-f, --filter [hot, new, top]', 'Filter, hot, new, top. Default is top')
    .option('-t, --time <value>', 'Time, one of hour, day, week, month, year, all. Default is all')
    .option('-l, --limit <value>', 'Limit, number of posts to check')
    .option('-d, --destination <value>', 'Destination folder')
    .parse(process.argv)

const {subreddit, filter = "top", limit = 100, time = "all", destination} = program
console.log({subreddit, filter, limit, time, destination})

if (!subreddit) {
    console.log(chalk.red('--subreddit is required'))
    program.help()
    process.exit(1)
}
if (!destination) {
    console.log(chalk.red('--destination is required'))
    program.help()
    process.exit(1)
}
redditDl(subreddit, filter, limit, destination)
