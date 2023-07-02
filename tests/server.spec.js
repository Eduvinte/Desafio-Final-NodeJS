const request = require("supertest")
const server = require("../index")

describe("Teste rutas futscript", () => {
    it("Obteniendo equipos código status 200", async () => {
        const response = await request(server).get('/equipos').send()
        const status = response.statusCode

        expect(status).toBe(200)
    })

    it("Verifica si hay un objecto al enviar credenciales", async () => {
        const response = await request(server)
        .post("/login")
        .send({
            username: 'admin',
            password: '123456'
        })
        expect(typeof response.body).toBe('object')
    })

    it("Verifica el código de estado al enviar una credencial inválida", async () => {
        const response = await request(server)
            .post("/login")
            .send({
                username: 'admin',
                password: 'incorrect-password'
            });
    
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Credenciales inválidas');
    });

    it("Verifica el código de estado al enviar un nuevo jugador con token válido", async () => {
        // Obtén un token válido (puedes generar uno usando jwt.sign)
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW8xIiwiaWF0IjoxNjg4Mjc4MDYxfQ._UhIuHW5CXcl6EkFToLaCsqzTbDLqUl6kCTCZoeQLyQ";
    
        // Envía la solicitud con el token en las cabeceras
        const response = await request(server)
            .post("/equipos/3/jugadores/3")
            .set("Authorization", `Bearer ${token}`)
            .send({
                // Datos del nuevo jugador
                id_equipo: 2,
                nombre: "Nuevo Jugador",
                position: 3,
                // ...
            });
    
        expect(response.status).toBe(201);
    });

})