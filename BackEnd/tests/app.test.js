
const supertest = require('supertest')
const app = require('../app')

describe('GET /ObtenerUsuarios', () => {
    it('Deberia retornar una lista de los usuarios', async () =>{
        const response = await supertest(app).get('/ObtenerUsuarios')
        expect(response.statusCode).toBe(200);
        expect(response.body).not.toBe(null);
    });
});