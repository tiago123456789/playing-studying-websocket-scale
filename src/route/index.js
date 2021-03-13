module.exports = (app) => {

    app.get("/room-full/:room", (request, response) => {
        response.render("roomFull", { room: request.params.room });
    })

    app.get('/rooms/:room', function (req, res) {
        let room = req.params.room;
        res.render('index', { room: { id: room } })
    })

}