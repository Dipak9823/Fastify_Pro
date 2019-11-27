const {OK,NOT_FOUND,BAD_REQUEST} =require('http-status-code');
const brandSchema=require('./schema/brandSchema');
const {postSchema}=require('./schema/brandSchema');

const brandApi=async fastify=>{

    fastify.post("/brand",{ schema:postSchema },  (req,reply)=>{
        
        const brand={...req.body};

        const data= fastify.brandRepository.insert(brand);

        reply.code(OK).send();
    });

    fastify.get("")
}

module.exports=brandApi;
