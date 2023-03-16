const router = require("express").Router()
const Post = require("../model/postj")


router.post("/", async (req, res) => {
    const newPost = new Post(req.body)

    try {
        const savePost = await newPost.save()
        res.status(200).json(savePost)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (post.username === req.body.username) {
            try {
                const updatePost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    {
                        new: true,
                    },                    
                )
                res.status(200).json(updatePost)
            } catch (error) {
                res.status(200).json(error)
            }
        } else {
            res.status(401).json("You can update only your post!")           
        }
    } catch (error) {
        res.status(500).json(error)
    }
    
})

router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.username === req.body.username) {
        try {
            await post.delete()
            res.status(200).json("Post has been deleted")
        } catch (error) {
            res.status(500).json(error) 
        }
    } 
    else{ 
        res.status(401).json("You can delete only your post!")
        }
    } catch (error) {
        res.status(500).json(error)
    }    
})


router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json(error)
    }
})


router.get("/", async (req, res) => {
    const username = req.query.user
    const catName = req.query.cat
    try {
        if (username)
        {
            posts = await Post.find({ username: username })
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName],
                },
            })
        } else {
            posts = await Post.find()
        }
        res.status(404).json(error)
    } catch (error) {
        res.status(404).json(error)
    }
})
module.exports = router