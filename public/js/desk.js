//HTML Refs
const lblDesk = document.querySelector('h1');
const btnTake = document.querySelector('button');
const lblTicket = document.querySelector('small');
const alertDiv = document.querySelector('.alert');
const lblPendings = document.querySelector('#lblPending');

const searchParams = new URLSearchParams(window.location.search);

if( !searchParams.has('desk') ){
    window.location = 'index.html';
    throw new Error('Desk is required');
}

const desk = searchParams.get('desk')
console.log(desk)
lblDesk.innerText = desk;

alertDiv.style.display = "none";

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');

    btnTake.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnTake.disabled = true;
});


socket.on('pending-tickets', ( pendings ) => {
    if( pendings === 0 ){
        lblPendings.style.display = 'none';
    }else{
        lblPendings.style.display = '';
        console.log( pendings );
        lblPendings.innerText = pendings;
    }
})

btnTake.addEventListener( 'click', () => {

    socket.emit('pick-ticket', { desk }, ( { ok, ticket, msg } )=>{
        if( !ok ){
            lblTicket.innerText = `No one`;
            return alertDiv.style.display = '';
        }

        lblTicket.innerText = `Ticket ${ticket.number}`;
    });
    // socket.emit( 'next-ticket', null, ( ticket ) => {
    //     lblNuevoTicket.innerText = ticket;
    // });

});