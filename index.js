const path = require('path')

const rp = require('request-promise').defaults({json: true})
const dl = require('image-downloader')
const minimist = require('minimist')

const SUBREDDIT_URL = "https://www.reddit.com/r"
const args = minimist(process.argv.slice(2))

const help = args.help || args.h
const sub = args.subreddit || args.s
let dest = args.destination || args.d
const limit = args.limit || args.l || 100
const filter = args.filter || args.f || "top"

const helpText = "This should be helpful!"

if (help) {
	console.log(helpText)
	process.exit(0)
}

if (!sub || !dest) {
	console.error('Must provide a --subreddit and a --destination')
	console.log(helpText)
	process.exit(1)
}

dest = path.resolve(dest)

rp(`${SUBREDDIT_URL}/${sub}/${filter}.json?t=all&limit=${limit}`)
	.then((response)=> {
		const posts = response.data.children.map(e => e.data)
		console.log('Total posts:', posts.length)
		const imagePosts = posts.filter(post => {
			console.log(post.post_hint)
			return post.post_hint === "image"
		})
		console.log("Posts with post hint image:", imagePosts.length)
		const imageUrls = imagePosts.map(image => image.url)
		console.log('Imageurls length:', imageUrls.length)
		const dlPromises = Promise.all(
			imageUrls.map(url => dl.image({url, dest}).catch(err => console.log(err)))
	)

		dlPromises.then(result = console.log("Done!"))
	})
