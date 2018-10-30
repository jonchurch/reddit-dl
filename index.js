const path = require('path')

const rp = require('request-promise').defaults({json: true})
const dl = require('image-downloader')
const chalk = require('chalk')

const SUBREDDIT_URL = "https://www.reddit.com/r"

module.exports = (sub, filter, limit, destination) => {
    let neededReqs = Math.ceil(limit / 100)
    const dest = path.resolve(destination)

    getPosts().catch(err => console.log(chalk.red("Error occurred:", err.message)))

    function getPosts(after) {
        // console.log({neededReqs})
        return rp({
            url:`${SUBREDDIT_URL}/${sub}/${filter}.json`,
            qs: {
                raw_json: 1,
                limit: limit < 100 ? limit : 100,
                t: "all",
                after
            }
        })

            .then((response)=> {
                const nextPage = response.data.after
                const posts = response.data.children.map(e => e.data)
                // console.log('Total posts:', posts.length)
                const imagePosts = posts.filter(post => post.post_hint === "image")
                console.log("Posts with post hint image:", imagePosts.length)
                const imageUrls = imagePosts.map(image => image.preview.images[0].source.url)
                // console.log('Imageurls length:', imageUrls.length)
                const dlPromises = Promise.all(
                    imageUrls.map(url => getImage(url, dest))
            )

                return dlPromises.then(result => {
                    neededReqs--
                    if (neededReqs < 1) {
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
