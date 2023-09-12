const express = require('express')
const router = express.Router()
const User = require('../modules/User')
const Post = require('../modules/Post')
const { v4: uuidv4 } = require('uuid');
const path = require('path')
const config = require('../config.json')
const fetchuser = require('../middlewares/fetchuser')

let imgList = ['.png', '.jpg', '.jpeg', '.gif'];

router.post('/addpost', fetchuser, async (req, res) => {
    if (req.user) {
        const { title, desc, tags } = req.body;
        const filelist = []
        const tags_arr = tags.split(',')
        if (title.length < 1 || desc.length < 1) {
            return res.json({ error: 'Invalid title or description' })
        }
        else {
            if (req.files) {
                for (let i = 0; i < Object.keys(req.files).length; i++) {
                    var fileforloop = req.files[Object.keys(req.files)[i]]
                    var extname = path.extname(fileforloop.name).toLowerCase()
                    if (fileforloop.size > 1048576) {
                        return res.json({ 'error': "File is too Large" });
                    }
                    else if (!imgList.includes(extname)) {
                        return res.json({ 'error': 'only png, jpg, jpeg amd gif files allowed' })
                    }
                    else {
                        const onlyname = uuidv4();
                        const final_name = onlyname + extname;
                        filelist.push(config.host_server + '/post_pics/' + final_name)
                        fileforloop.mv(path.join(__dirname, '../static/post_pics', final_name))
                    }
                }
            }

            const author = await User.findById(req.user.id).select('name profile_pic')
            await Post.create({ title: title, description: desc, tags: tags_arr, photos: filelist, author: author })
            return res.json({ success: true })
        }




    }


})

router.get('/getposts', async (req, res) => {
    const count = req.query.count;
    const posts = await Post.find().skip(count-1).limit(1) //skips first count-1 and gives only one after them
    const maxlength = await Post.count()
    // console.log(posts)
    return res.json({ 'posts': posts, 'maxlength': maxlength })
})

router.get('/getuserposts', async(req,res)=>{
    const author_name = req.query.author_name.toLowerCase()
    const search = await User.findOne({'name':author_name})
    if(!search.name){
        return res.json({'error':'No such user found'})
    }
    else{
        const all_posts = await Post.find()
        const user_posts = []
        all_posts.map((post)=>{
            if(post.author.name == author_name){
                user_posts.push(post)
            }
        })
        return res.json({ 'posts': user_posts, 'author':search, 'success':true})
    }
})

router.get('/getpostbyid',async(req,res)=>{
    const id = req.query.id;
    const search = await Post.findById(id)
    if(search){
        var arr = []
        arr.push(search)
        return res.json({'success':true,'post':arr})
    }
    else{
        return res.json({'error':'No Post Found'})
    }
})

router.post('/like',fetchuser,async(req,res)=>{
    // const liked = req.body.liked;
    const id = req.body.id;
    const userid = req.user.id;
    const user = await User.findById(userid)
    const user_like_list = user.liked_posts
    // console.log(id)
    const current_post = await Post.findById(id);
    const current_like_count = current_post.likes;
    if(user_like_list.includes(id)){
        const updated_user_like_list = user_like_list.remove_by_value(id)
        await User.findByIdAndUpdate(userid,{'liked_posts':updated_user_like_list})
        await Post.findByIdAndUpdate(id,{'likes':current_like_count-1})
        return res.json({'success':true,'like_count':current_like_count-1})
    }
    else{
        user_like_list.push(id)
        await User.findByIdAndUpdate(userid,{'liked_posts':user_like_list})
        await Post.findByIdAndUpdate(id,{'likes':current_like_count+1})
        return res.json({'success':true,'like_count':current_like_count+1})
    }
})

// router.get('/getauthor', async(req,res)=>{
//     const id = req.query.id;
//     const author = await User.findById(id).select('-password')
//     if(author){
//         return res.json({'author':author,'success':true})
//     }
//     else{
//         return res.json({'success':flase})
//     }
// })


Array.prototype.remove_by_value = function(val) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] === val) {
        this.splice(i, 1);
        i--;
      }
    }
    return this;
  }

module.exports = router;