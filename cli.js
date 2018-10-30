#!/usr/bin/env node
const program = require('commander')
const chalk = require('chalk')

const redditDl = require('./')

program
    .version('0.0.0')
    .arguments('<subreddit> <output_dir>')
    // .option('-s, --subreddit <name>', 'Subreddit name, ie pics')
    .option('-f, --filter [hot, new, top, rising, controversial, random]', 'Sort filter. Default is top')
    .option('-t, --time <value>', 'Time, one of hour, day, week, month, year, all. Default is all')
    .option('-l, --limit <value>', 'Limit, number of posts to check')
    // .option('-d, --destination <value>', 'Destination folder')
    .parse(process.argv)

console.log({program})
const {filter = "top", limit = 100, time = "all"} = program
// console.log({subreddit, filter, limit, time, destination})

const [subreddit, destination] = program.args

if (!subreddit) {
    console.log({subreddit})
    console.log(chalk.red('Error: --subreddit is required\n'))
    program.help()
    process.exit(1)
}
if (!destination) {
    console.log(chalk.red('Error: --destination is required\n'))
    program.help()
    process.exit(1)
}
redditDl(subreddit, filter, limit, destination)
