/// <reference path="../lib/jquery/dist/jquery.js" />


function TablaJQDT(idtabla, idcolumOrden, tipoOrden, arrayColumn, bscrollx) {
    var table = $("#" + idtabla).DataTable({
        orderCellsTop: true,       
        "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "Todo"]],
        "pageLength": 20,
        "order": [[idcolumOrden, tipoOrden]],
        scrollX: bscrollx,
        language: {
            "selectAll": "Procesando...",
            "processing": "Procesando...",
            "lengthMenu": "Mostrar _MENU_",
            "zeroRecords": "No se encontraron resultados",
            "emptyTable": "Ningún dato disponible en esta tabla",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "infoPostFix": "",
            "search": "Buscar: ",
            "Url": "",
            "infoThousands": ",",
            "loadingRecords": "Cargando...",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "buttons": {
                "selectAll": 'Seleccionar todos',
                "selectNone": 'Deseleccionar',
                'pageLength': "Mostrar por página"
            },
            "aria": {
                "sortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
    });
    return table;
}

//function OrdenarTabla(objInputS, table) {
//    var valor = objInputS.value;
//    var ColumnOrder = objInputS.attributes["data-ColumnSearch"].value;
//    if (table.column(ColumnOrder).search() !== valor) {
//        table.column(ColumnOrder).search(valor).draw();
//    }
//}
