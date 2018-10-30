const path = require('path')

const rp = require('request-promise').defaults({json: true})
const dl = require('image-downloader')
// const minimist = require('minimist')

// const args = minimist(process.argv.slice(2))

// const help = args.help || args.h
// const sub = args.subreddit || args.s
// let dest = args.destination || args.d
// let limit = args.limit || args.l || 100
// const filter = args.filter || args.f || "top"

// const helpText = "This should be helpful!"

// if (help) {
// 	console.log(helpText)
// 	process.exit(0)
// }

// if (!sub || !dest) {
// 	console.error('Must provide a --subreddit and a --destination')
// 	console.log(helpText)
// 	process.exit(1)
// }

// console.log({dest})

// console.log({neededReqs})

// console.log(subreddit, filter, limit, destination)

const SUBREDDIT_URL = "https://www.reddit.com/r"

module.exports = (sub, filter, limit, destination) => {
    let neededReqs = Math.ceil(limit / 100)
    const dest = path.resolve(destination)

    getPosts()

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
                const imageUrls = imagePosts.map(image => image.url)
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
        return dl.image({url, dest})
                .catch(err => console.log(`Error downloading ${url} to ${dest}`,err))
    }

}
