// const { constant } = require('lodash');
const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const { getInfoData, getInfoDataOmit } = require('../utils');

class PostController {
    getPosts = async (req, res) => {
        try {
            console.log('[GET]::getPosts::');
            const { userId } = req.user;
            const { page = 1, limit = 20 } = req.query;

            // console.log(req.body)
            // console.log('files::', req?.files)

            if (!userId) {
                return res.status(404).json({
                    success: false,
                    message: 'No right'
                })
            }

            const user = await UserModel.findById(userId).lean();

            if (!userId) {
                return res.status(404).json({
                    success: false,
                    message: 'No right'
                })
            }

            const friendIds = user?.friends?.map(friend => friend?.userId);
            const posts = await PostModel.find({
                userId: { $in: [userId, ...friendIds] }
            })
                .sort({ createdAt: -1})
                .skip((page - 1) * limit)
                .limit(Number(limit))
                .lean();

            const postsWithAuthors = await Promise.all(
                posts.map(async (post) => {
                    const author = await UserModel.findById(post.userId)
                        .select('profilePicture name')
                        .lean();
                    return {
                        ...post,
                        author: author || null
                    };
                })
            );

            return res.status(200).json({
                success: !!posts,
                message: posts ? 'create post successfully' : 'Something went wrong!',
                posts: postsWithAuthors
            })
        } catch (error) {

        }
    }

    create = async (req, res) => {
        try {
            console.log('[POST]::create::');
            const { userId } = req.user;
            const { content } = req.body;

            // console.log(req.body)
            // console.log('files::', req?.files)

            if (!userId) {
                return res.status(200).json({
                    status: false,
                    message: 'No right'
                })
            }

            console.log({content})

            const images = req?.files?.map(item => item.path);

            let post;
            if (content || images.length > 0) {
                post = await PostModel.create({
                    userId,
                    content,
                    images
                });
            }

            return res.status(200).json({
                success: !!post,
                message: post ? 'create post successfully' : 'Something went wrong!',
                post
            })
        } catch (error) {

        }
    }


}

module.exports = new PostController();