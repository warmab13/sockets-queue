const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.on('disconnect', () => {});
    
    socket.emit( 'last-ticket', ticketControl.last );
    socket.emit( 'actual-status',  ticketControl.lastFour);
    socket.emit( 'pending-tickets', ticketControl.tickets.length );

    socket.on('next-ticket', ( payload, callback ) => {

        const next = ticketControl.nextTicket();

        callback( next );

        socket.broadcast.emit( 'pending-tickets', ticketControl.tickets.length );

    })

    socket.on('pick-ticket', ( { desk }, callback ) => {

        if(!desk){
            return callback({
                ok:false,
                msg: 'Desk is required'
            })
        }

        const ticket = ticketControl.takeTicket( desk );

        socket.broadcast.emit( 'actual-status', ticketControl.lastFour )
        socket.emit( 'pending-tickets', ticketControl.tickets.length );
        socket.broadcast.emit( 'pending-tickets', ticketControl.tickets.length );

        if( !ticket ){
            callback({
                ok:false,
                msg: 'No pending tickets'
            })
        }else{
            callback({
                ok: true,
                ticket
            })
        }

    })
}



module.exports = {
    socketController
}

