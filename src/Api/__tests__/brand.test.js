const Fastify=require('fastify');
const {BAD_REQUEST,OK,NOT_FOUND}=require('http-status-code');
const Ajv=require('ajv');
const brandApi=require('../brandApi');

describe("Brands Api",()=>{
    let fastify;
    const ajv=new Ajv({
        removeAdditional:false,
        useDefaults:true,
        coerceTypes:false,
        allErrors:true
    });

    const data={
        id:"101",
        name:"Dipak patil",
        description:"brand",
        isPublished:true
    };

    beforeAll(()=>{
        fastify=Fastify();
        fastify.register(brandApi);
    });

    describe("schema validation",()=>{
        it("it should return status code 200(OK)",()=>{

            const response= fastify.inject({
                method:"post",
                url:"/brand",
                payload:data
            });
            expect(response.statusCode).toBe(OK);
        })
    })
})
