const Fastify=require('fastify');
const path=require('path');
const autoload=require('autoload');

const init=()=>{
    const fastify=Fastify();
    fastify.register(autoload,{
        dir: path.join(__dirname,'plugins/repository'),
        ignorePattern: /^(__tests__)/
    });
    return fastify;
}

module.exports={
    init
};