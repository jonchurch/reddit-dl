const path = require('path')
const fs = require('fs')

const rp = require('request-promise').defaults({json: true})
const dl = require('image-downloader')
const chalk = require('chalk')

const SUBREDDIT_URL = "https://www.reddit.com/r"

module.exports = (sub, destination, sort, limit, time, after) => {
    let neededReqs = Math.ceil(limit / 100)
    let currentRequest = 1
    let downloadedCount = 0
    const dest = path.resolve(destination)
    // console.log(`Queuing ${neededReqs} requests to check ${limit} posts`)

    if (!fs.existsSync(dest)){
        fs.mkdirSync(dest);
    }

    getPosts(after).catch(err => console.log(chalk.red("Error occurred:", err.message)))

    function getPosts(after) {
        if (after === null) { return }
        // console.log({neededReqs})
        // console.log(`Making request #${currentRequest}`)
        return rp({
            url:`${SUBREDDIT_URL}/${sub}/${sort}.json`,
            qs: {
                raw_json: 1,
                limit: limit < 100 ? limit : 100,
                t: time,
                after
            }
        })

            .then((response)=> {
                const nextPage = response.data.after
                if (!nextPage) {
                    console.log({nextPage})
                }
                const posts = response.data.children.map(e => e.data)
                // console.log('Total posts:', posts.length)
                const imagePosts = posts.filter(post => post.post_hint === "image")
                console.log(`Found ${imagePosts.length} posts with image`)
                downloadedCount += imagePosts.length
                const imageUrls = imagePosts.map(image => image.preview.images[0].source.url)
                // console.log('Imageurls length:', imageUrls.length)
                const dlPromises = Promise.all(
                    imageUrls.map(url => getImage(url, dest))
            )

                return dlPromises.then(result => {
                    neededReqs--
                    currentRequest++
                    if (neededReqs < 1) {
                        console.log(`Downloaded ${downloadedCount} images to ${dest}`)
                        return
                    }
                    getPosts(nextPage)
                })
            })
    }

    function getImage(url, dest) {
        const redditImageRegex = /https:\/\/?(?:external-preview|preview)\.redd\.it\/(.*)\.(jpg|png|gif)/
        const match = url.match(redditImageRegex)
        const fileName = match[1]
        const ext = '.' + match[2]
        const destinationPath = path.join(dest, fileName + ext)
        // downloadImage(url, filename + ext, callback)
        return dl.image({url, dest: destinationPath})
                .then(() => console.log(`${url} - ${chalk.green('Download Complete')}`))
                .catch(err => console.log(chalk.red(`Error downloading ${url} to ${dest}`),err))
    }

}
