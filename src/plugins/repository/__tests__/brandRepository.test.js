const Fastify = require('fastify');
const brandRepository = require('../brandRepository');
const Ajv = require('ajv');

describe("Insert Brands", () => {
    let fastify;

    beforeAll(async() => {
        fastify = Fastify();
        fastify.register(brandRepository);
        await fastify.ready();
        fastify.pg = {
            query: jest.fn()
          };
    });
    afterAll(async()=>{
        fastify.close();
    })
    afterEach(() => {
        fastify.pg.query.mockReset();
      });
    it("fastify.brandRepository should exists", () => {
        expect(fastify.hasDecorator("brandRepository")).toBe(true);
    });
    describe("Insert",async()=>{
        const data={
            id:"101",
            name:"Dipak patil",
            description:"The Brand",
            isPublished:false
        }
        it("should return brand on success", async () => {
            fastify.pg.query.mockResolvedValueOnce({
              rows: [{ ...data }]
            });
        });
        const result=await fastify.brandRepository.insert(data);
        console.log(result);
        const expectedResult={...data};
        expect(fastify.pg.query).toHaveBeenCalled();
        expect(result).toEqual(expectedResult);
    }); 
    
    describe("Get all brands",async()=>{
        it("should return null",async()=>{
            fastify.pg.query.mockResolvedValueOnce({rows:[],rowCount:0});
            const response=await fastify.brandRepository.getAll();
            expect(fastify.pg.query).toHaveBeenCalled();
            expect(response).toBeNull();
        })

        it("should return all brands",async()=>{
            const brandOne={id:"101",brand:"Nike"};
            const brandTwo={id:"102",brand:"Sparx"};
            const brands={brandOne,brandTwo};
            fastify.pg.query.mockResolvedValueOnce({rows:[brands],rowCount:2});
            const response=await fastify.brandRepository.getAll();
            console.log(response);
            expect(response).toEqual(brands);
        })
    });

});


