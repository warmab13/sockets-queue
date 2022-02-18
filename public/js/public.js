const lblTicket1      = document.querySelector('#lblTicket1') ;
const lblDesk1  = document.querySelector('#lblDesk1');
const lblTicket2      = document.querySelector('#lblTicket2');
const lblDesk2  = document.querySelector('#lblDesk2');
const lblTicket3      = document.querySelector('#lblTicket3');
const lblDesk3  = document.querySelector('#lblDesk3');
const lblTicket4      = document.querySelector('#lblTicket4');
const lblDesk4  = document.querySelector('#lblDesk4');

const socket = io();

socket.on('actual-status', ( payload ) => {
    
    const audio = new Audio('./audio/new-ticket.mp3');
    audio.play();

    const [ ticket1, ticket2, ticket3, ticket4 ] = payload;

    if(ticket1){
        lblTicket1.innerText = 'Ticket ' + ticket1.number;
        lblDesk1.innerText = ticket1.desk;
    }
    if(ticket2){
        lblTicket2.innerText = 'Ticket ' + ticket2.number;
        lblDesk2.innerText = ticket2.desk;
    }
    if(ticket3){
        lblTicket3.innerText = 'Ticket ' + ticket3.number;
        lblDesk3.innerText = ticket3.desk;
    }
    if(ticket4){
        lblTicket4.innerText = 'Ticket ' + ticket4.number;
        lblDesk4.innerText = ticket4.desk;
    }
});