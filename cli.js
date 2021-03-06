#!/usr/bin/env node
const program = require('commander')
const chalk = require('chalk')

const redditDl = require('./')

program
    .version('0.0.0')
    .arguments('<subreddit> <output_dir>')
    .option('-s, --sort <string>', 'Sort filter, one of hot, new, top, rising, controversial, random. Default is top')
    .option('-t, --time <string>', 'Time, one of hour, day, week, month, year, all. Default is all')
    .option('-l, --limit <number>', 'Limit, number of posts to check. Default is 100')
    // .option('-p, --preview', 'Download preview image. Default false')
    // .option('-a, --after <value>', 'After value to start at from the Reddit api')
    .parse(process.argv)

const {sort = "top", limit = 100, time = "day", after} = program
const [subreddit, destination] = program.args
// console.log({subreddit, sort, limit, time, destination})

const sortTypes = ['hot', 'new', 'top', 'rising', 'controversial', 'random']
const timeTypes = ['hour', 'day', 'week', 'month', 'year', 'all']

if (!sortTypes.includes(sort)) {
    console.log(chalk.red('Error: sort must be one of ' + sortTypes.join(', ')))
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
redditDl(subreddit, destination, sort, limit, time, after)
