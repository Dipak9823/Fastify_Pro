
const postBodySchema={
    id:String,
    name:String,
    description:String,
    isPublished:Boolean
}

module.exports={
    postSchema: {body:postBodySchema}
}