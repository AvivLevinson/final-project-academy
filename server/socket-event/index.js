module.exports = (io)=>{

    connection:

    io.on('connection', (socket) => {
        console.log(`Connection has been made!! id:${socket.id}`);

        let newUser = {
          name:'aviv',
          id:'test'
        }

        socket.emit('newUser', newUser);


        socket.emit('medicalReport', medical);


        socket.emit('locationReport', newUser);


      
      });


    

}