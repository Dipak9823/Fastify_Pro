const fp=require('fastify-plugin');
const SQL=require('@nearform/sql');

module.exports=fp((fastify,options,next)=>{
    const insert = async(brand) =>{
        const data={
            id:brand.id,
            name:brand.name,
            description:brand.description,
            isPublished:brand.isPublished
        }

        const sql = SQL`INSERT INTO brand(
                id,
                name,
                description,
                isPublished
        )values(
                ${data.id},
                ${data.name},
                ${data.description},
                ${data.isPublished}
        )`;

        try{
                const result=await fastify.pg.query(sql);
                fastify.log.debug({
                    message: "Brand Insert/Update Request completed"
                });
                return result;
        }catch(err) {
            
        }
    }
    const getAll=async()=>{
        const sql= SQL`SELECT * FROM brand;`

        try{
            const result=await fastify.pg.query(sql);
            fastify.log.debug({
                message:"All brands are here"
            });
            return result.rowCount<=0 ? null:result.rows[0];
        }catch(err) {
            console.log(err);
        }
    }

    fastify.decorate("brandRepository",{insert,getAll});
    next();
});
