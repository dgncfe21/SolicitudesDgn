// =============  Data Table - (Start) ================= //

$(document).ready(function(){
    
    // var table = $('#tablaINSTMEDS_OTE').DataTable({
        
     //buttons:['copy', 'csv', 'excel', 'pdf', 'print']
        
    // });
    
    
    // table.buttons().container()
    // .appendTo('#tablaINSTMEDS_OTE_wrapper .col-md-6:eq(0)');


//FIREBASE CONNECTION//

const config = {
    //           apiKey: "AIzaSyBRVBJuvk-Mbxzv2DTx2a18jPaope7gBPY",
    // authDomain: "usrsmty.firebaseapp.com",
    // databaseURL: "https://usrsmty.firebaseio.com",
    // projectId: "usrsmty",
    // storageBucket: "usrsmty.appspot.com",
    // messagingSenderId: "840900135873",
    // appId: "1:840900135873:web:cbcc627858630c625ebd40",
    // measurementId: "G-47LEFJRJCX"
  
    apiKey: "AIzaSyBc6Lj0zAFxKisC-8NzDgid1OHmkTG8vdE",
  authDomain: "orientetotal-d7de4.firebaseapp.com",
  databaseURL: "https://orientetotal-d7de4-default-rtdb.firebaseio.com",
  projectId: "orientetotal-d7de4",
  storageBucket: "orientetotal-d7de4.appspot.com",
  messagingSenderId: "478374303861",
  appId: "1:478374303861:web:884704e884c5031d0fc03c",
  measurementId: "G-SZLNLRFQVT"
  
      };    
      firebase.initializeApp(config); //inicializamos firebase
      
      var filaEliminada; //para capturara la fila eliminada
      var filaEditada; //para capturara la fila editada o actualizada
  
      //creamos constantes para los iconos editar y borrar    
      const iconoEditar = '<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>';
      const iconoBorrar = '<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';
  
      var db = firebase.database();
      var coleccionINSTMEDS_OTE = db.ref().child("INSTMEDS_OTE");

      


      var dataSet = [];//array para guardar los valores de los campos inputs del form
 
      var table = $('#tablaINSTMEDS_OTE').DataTable({
                  pageLength : 5,
                  lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todos']],
                  data: dataSet,
                  columnDefs: [
                      {
                          targets: [0], 
                          visible: false, //ocultamos la columna de ID que es la [0]                        
                      },
                      {
                          targets: -1,        
                        //   defaultContent: "<div class='wrapper text-center'><div class='btn-group'><button class='btnEditar btn btn-primary' data-toggle='tooltip' title='Editar'>"+iconoEditar+"</button><button class='btnBorrar btn btn-danger' data-toggle='tooltip' title='Borrar'>"+iconoBorrar+"</button></div></div>"
                      }
                  ]	  
              
              });
       
  
      coleccionINSTMEDS_OTE.on("child_added", datos => {        
          dataSet = [datos.key, datos.child("medidor").val().substring(1,7), datos.child("instalo").val().slice(1,-1), datos.child("orden").val().slice(1,-1),datos.child("sello").val().slice(1,-1),datos.child("comentarios").val().slice(1,-1),datos.child("fecha_hora").val().slice(1,-1),datos.child("latitud").val(),datos.child("longitud").val()];
          table.rows.add([dataSet]).draw();
          
      });


      coleccionINSTMEDS_OTE.on('child_changed', datos => {           
          dataSet = [datos.key, datos.child("medidor").val(), datos.child("instalo").val(), datos.child("orden").val(),datos.child("sello").val(),datos.child("comentarios").val(),datos.child("fecha_hora").val(),datos.child("latitud").val(),datos.child("longitud").val()];
          table.row(filaEditada).data(dataSet).draw();
      });
      coleccionINSTMEDS_OTE.on("child_removed", function() {
          table.row(filaEliminada.parents('tr')).remove().draw();                     
      });

     
      
      $('form').submit(function(e){                         
          e.preventDefault();
          let id = $.trim($('#id').val());        
          let medidor = $.trim($('#medidor').val());
          let instalo = $.trim($('#instalo').val());         
          let orden = $.trim($('#orden').val());
          let sello = $.trim($('#sello').val());
          
          let comentarios = $.trim($('#comentarios').val());  
          let fecha_hora = $.trim($('#fecha_hora').val());
         
        //   let latitud = $.trim($('#latitud').val());  
        //   let longitud = $.trim($('#longitud').val());                               
          let idFirebase = id;        
          if (idFirebase == ''){                      
              idFirebase = coleccionINSTMEDS_OTE.push().key;
          };                
          data = {medidor:medidor, instalo:instalo, orden:orden, sello:sello, comentarios:comentarios, fecha_hora:fecha_hora, latitud:latitud, longitud:longitud};             
          actualizacionData = {};
          actualizacionData[`/${idFirebase}`] = data;
          coleccionINSTMEDS_OTE.update(actualizacionData);
          id = '';        
          $("form").trigger("reset");
          $('#modalAltaEdicion').modal('hide');
      });

      
      //Botones
/*       $('#btnNuevo').click(function() {
          $('#id').val('');
          $('#medidor').val('');
          $('#instalo').val('');
          $('#orden').val('');
             
          $('#comentarios').val('');
          $('#fecha_hora').val(''); 
        
        //   $('#latitud').val('');
        //   $('#longitud').val('');      
          $("form").trigger("reset");
          $('#modalAltaEdicion').modal('show');
      });  
  
       //export csv
  
    
  
    ///
  
  
      $("#tablaINSTMEDS_OTE").on("click", ".btnEditar", function() {    
          filaEditada = table.row($(this).parents('tr'));           
          let fila = $('#tablaINSTMEDS_OTE').dataTable().fnGetData($(this).closest('tr'));               
          let id = fila[0];
          console.log(id);
          let medidor = $(this).closest('tr').find('td:eq(0)').text(); 
          let instalo = $(this).closest('tr').find('td:eq(1)').text();        
          let orden = parseInt($(this).closest('tr').find('td:eq(2)').text());       
        
          let comentarios = parseInt($(this).closest('tr').find('td:eq(3)').text()); 
          let fecha_hora = parseInt($(this).closest('tr').find('td:eq(4)').text()); 
         
        //   let latitud = parseInt($(this).closest('tr').find('td:eq(5)').text()); 
        //   let longitud = parseInt($(this).closest('tr').find('td:eq(6)').text());   
          $('#id').val(id);        
          $('#medidor').val(medidor);
          $('#instalo').val(instalo);                
          $('#orden').val(orden);   
       
          $('#comentarios').val(comentarios); 
          $('#fecha_hora').val(fecha_hora);
         
        //   $('#latitud').val(latitud);
        //   $('#longitud').val(longitud);                 
          $('#modalAltaEdicion').modal('show');
      });  
    
      $("#tablaINSTMEDS_OTE").on("click", ".btnBorrar", function() {   
          filaEliminada = $(this);
          Swal.fire({
          title: '¿Está seguro de eliminar el servicio?',
          text: "¡Está operación no se puede revertir!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Borrar'
          }).then((result) => {
          if (result.value) {
              let fila = $('#tablaINSTMEDS_OTE').dataTable().fnGetData($(this).closest('tr'));            
              let id = fila[0];            
              db.ref(`INSTMEDS_OTE/${id}`).remove()
              Swal.fire('¡Eliminado!', 'El servicio ha sido eliminado.','success')
          }
          })        
      });  */

      $('#tablaINSTMEDS_OTE').DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'print',
                footer: true,
                exportOptions: {
                    columns: ':visible'
                }
            },
            'colvis'
        ],
        columnDefs: [ {
            targets: -1,
            visible: false
        } ]
    } );

    function printData() {
        var divToPrint = document.getElementById("tablaINSTMEDS_OTE");
        newWin = window.open("");
        newWin.document.write(divToPrint.outerHTML);
        newWin.print();
        newWin.close();
      }

      function printCertificate() {
        const printContents = document.getElementById('tablaINSTMEDS_OTE').outerHTML;
        const originalContents = document.body.outerHTML;
        document.body.outerHTML = printContents;
        window.print();
        document.body.outerHTML = originalContents;
    }


      
      $('#print').on('click', function() {
       // printData();
        printCertificate();
        //window.location = 'Header.html';
      });

   

     
});

// =============  Data Table - (End) ================= //
