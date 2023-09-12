document.addEventListener("DOMContentLoaded", function() {
    // Conexión al servidor Socket.io
    const socket = io.connect('http://localhost:3000');

    const checkboxOpcion1 = document.getElementById("option1");
    const checkboxOpcion2 = document.getElementById("option2");
    const voteButton = document.getElementById("voteButton");
    const option1Bar = document.getElementById("option1Bar");
    const option2Bar = document.getElementById("option2Bar");
    const percentageText = document.getElementById("percentageText");
  
    // Función para desmarcar el otro checkbox al seleccionar uno
    checkboxOpcion1.addEventListener("click", function() {
      if (checkboxOpcion1.checked) {
        checkboxOpcion2.checked = false;
      }
    });
  
    checkboxOpcion2.addEventListener("click", function() {
      if (checkboxOpcion2.checked) {
        checkboxOpcion1.checked = false;
      }
    });
  
    // Función para manejar el evento del botón de Votar
    voteButton.addEventListener("click", function() {
      let votedOption = null;

      if (checkboxOpcion1.checked) {
        votedOption = 'option1';
      } else if (checkboxOpcion2.checked) {
        votedOption = 'option2';
      }
    
      if (votedOption) {
        socket.emit('vote', { option: votedOption });
      }
  
      // Desmarcamos los checkboxes para el siguiente voto
      checkboxOpcion1.checked = false;
      checkboxOpcion2.checked = false;
    });

    // Cuando reciba datos actualizados desde el servidor
    socket.on('updateVotes', function(data) {
      const { votosOpcion1, votosOpcion2, totalVotos } = data;

      // Calculamos los porcentajes
      let porcentajeOpcion1;
      let porcentajeOpcion2;

      if(totalVotos == 0){
        porcentajeOpcion1 = 0;
        porcentajeOpcion2 = 0;
      }else{
        porcentajeOpcion1 = (votosOpcion1 / totalVotos) * 100;
        porcentajeOpcion2 = (votosOpcion2 / totalVotos) * 100;
      }
      
      // Actualizamos las barras de porcentaje
      option1Bar.style.width = `${porcentajeOpcion1}%`;
      option2Bar.style.width = `${porcentajeOpcion2}%`;
  
      // Actualizamos el texto de porcentaje
      percentageText.textContent = `Gatos: ${porcentajeOpcion1.toFixed(2)}% | Perros: ${porcentajeOpcion2.toFixed(2)}%`;
  
      // Desmarcamos los checkboxes para el siguiente voto
      checkboxOpcion1.checked = false;
      checkboxOpcion2.checked = false;
    });
  });
  