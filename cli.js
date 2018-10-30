#!/usr/bin/env node
const program = require('commander')
const chalk = require('chalk')

const redditDl = require('./')

program
    .version('0.0.0')
    .arguments('<subreddit> <output_dir>')
    .option('-f, --filter [hot, new, top, rising, controversial, random]', 'Sort filter. Default is top')
    .option('-t, --time <value>', 'Time, one of hour, day, week, month, year, all. Default is all')
    .option('-l, --limit <value>', 'Limit, number of posts to check')
    .parse(process.argv)

const {filter = "top", limit = 100, time = "all"} = program
const [subreddit, destination] = program.args
// console.log({subreddit, filter, limit, time, destination})

const filterTypes = ['hot', 'new', 'top', 'rising', 'controversial', 'random']
const timeTypes = ['hour', 'day', 'week', 'month', 'year', 'all']

if (!filterTypes.includes(filter)) {
    console.log(chalk.red('Error: filter must be one of ' + filterTypes.join(', ')))
    program.help()
    process.exit(1)
}

if (!timeTypes.includes(time)) {
    console.log(chalk.red('Error: time must be one of ' + timeTypes.join(', ')))
    program.help()
    process.exit(1)
}

if (!subreddit) {
    console.log({subreddit})
    console.log(chalk.red('Error: subreddit is required\n'))
    program.help()
    process.exit(1)
}
if (!destination) {
    console.log(chalk.red('Error: destination is required\n'))
    program.help()
    process.exit(1)
}
redditDl(subreddit, filter, limit, destination)
