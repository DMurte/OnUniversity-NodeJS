const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const utils = require('../../tools/utils');
const userModel = require('../../models/user');
const postModel = require('../../models/post');

var request= {};

request.getAll = async ( (data) =>  {
    return new Promise( (resolve, reject) => {
        const posts = await (postModel.post.findAll());
        posts.sort((obj, obj2) => { return obj2.id - obj.id });
        resolve(posts)
   });
    
});

request.getPost = async ((data) => {
    return new Promise( (resolve , reject ) => {
        const publication = await (postModel.post.find({ where: { id: data.id } }));
        if(!publication) {
            reject('No post with that Id');
        }
        const responses = await (postModel.post.find({ where: { postOrigin: post.id } }));

        let post = {};
        post.publication = publication
        post.responses = responses

        resolve(post);
    })
});

request.moreVoted = async ((data) => {
    return new Promise( (resolve , reject ) => {
        const posts = await (postModel.post.findAll());
        posts.sort((obj, obj2) => { return obj2.votes - obj.votes });
        resolve(posts);
    })
});

request.lessVoted = async ((data) => {
    return new Promise( (resolve , reject ) => {
        const posts = await (postModel.post.findAll());
        posts.sort((obj, obj2) => { return obj.votes - obj2.votes });
        resolve(posts);
    })
});

request.create = async ((data) => {
    return new Promise( (resolve , reject ) => {
        await ( postModel.post.create(
            { 
                text: data.text, 
                postOrigin: data.postOrigin, 
                lessonId: data.lessonId, 
                creatorId: data.userId,
                votes: 0,                                    
            }
        ));
     
        const post = await (postModel.post.find({ where: { text: data.text, creatorId: data.userId  } }));
        resolve(post)

    });
    
});

request.update = async ((data) => {
    return new Promise( (resolve, reject) => {
      
        await (postModel.post.update(
            {
                text: data.text,
            },
            {
                where: { 
                    id: data.id
                }
            }
        ));
     
        const post = await (postModel.post.find({ where: { id: data.id } }));
        resolve(post)

    });
    
});

request.delete = async ((data) => {
    return new Promise( (resolve, reject) => {
        const post = await (postModel.post.find({ where: { id: data.id } }));
        if(!post){
            reject('Post not found')
            return;
        }
        if (post.creatorId != data.userId){
            reject('Incorrect credentials')
            return;
        }

      
        await (postModel.post.destroy(
            {
                where: { 
                    id: data.id
                }
            }
        ));

        await (userModel.userVote.destroy(
            {
                where: { 
                    postId: data.id
                }
            }
        ));
     
        resolve('Post deleted')

    });
    
});

request.vote = async ((data) => {
    return new Promise( (resolve, reject) => {
        const post = await (postModel.post.find({ where: { id: data.id } }));
        const userVote = await (userModel.userVote.find({ where: { postId: data.id, userId:data.userId } }));
        if(userVote) {
            reject('Already voted')
            return;
        }

        await (postModel.post.update(
            {
                votes: post.votes+1,
            },
            {
                where: { 
                    id: data.id
                }
            }
        ));

        await ( userModel.userVote.create(
            { 
                userId: data.userId, 
                postId: data.id
            }
        ));

        resolve('Vote')

    });
    
});

request.deleteVote = async ((data) => {
    return new Promise( (resolve, reject) => {
        const post = await (postModel.post.find({ where: { id: data.id } }));
        if(!post){
            reject('Post not found')
            return;
        }

        await (userModel.userVote.destroy(
            {
                where: { 
                    postId: data.id,
                    userId : data.userId
                }
            }
        ));
     
        resolve('Vote deleted')

    });
    
});



module.exports = request;


