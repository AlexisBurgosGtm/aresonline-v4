$( document ).ready(function() {

	$("#btn-buscar").click(function(event) {
				
		ajaxGet();
	});

	function ajaxGet(){

		var filtro = document.getElementById('filtro').value;

			$.ajax({
				type : "GET",
				url : window.location + "api/productos/all" + "?filtro=" + filtro,
					success: function(result){
					$('#tbody').empty();
						
					//$('#tabla').html(result);
					document.getElementById('tbody').innerHTML = result;

					console.log("Success: ", result);
				},
				error : function(e) {
					
					console.log("ERROR: ", e);
					var error = document.createElement('label');
					error.className="text-center text-primary";
					error.innerText ="No se pudieron cargar los datos";
					document.getElementById('tbody').appendChild(error);
				}
			});	

	}
})