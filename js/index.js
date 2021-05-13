//Certamen 1 - Nicolás Astudillo Díaz - 301

tinymce.init({
    selector: '#descripcion-txt',
    height: 200,
    menubar: false,
    plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
});

//Cargar con JS
let horarios = ["Desayuno", "Almuerzo", "Once", "Cena"];

let horarioselect = document.querySelector("#horario-select");

for (let i = 0; i < horarios.length; ++i) {
    let opcion = document.createElement("option");
    opcion.innerText = horarios[i];
    horarioselect.appendChild(opcion);
}



const pedidos = [];

const cargarTabla = () => {
    let tbody = document.querySelector("#tabla-tbody");

    tbody.innerHTML = "";

    for (let i = 0; i < pedidos.length; ++i) {
        let m = pedidos[i];

        let tr = document.createElement("tr");


        //nro
        let tdNro = document.createElement("td");
        tdNro.innerText = (i + 1);

        //nombre
        let tdNombre = document.createElement("td");
        tdNombre.innerText = m.nombre;

        //horario
        let tdHorario = document.createElement("td");
        tdHorario.innerText = m.horarios_select;

        //valor
        let tdValor = document.createElement("td");
        tdValor.innerText = "$ " + m.valor;

        //descripcion
        let tdDesc = document.createElement("td");
        tdDesc.innerHTML = m.descripcion;

        //oferta
        let tdOferta = document.createElement("td");
        let icono = document.createElement("i");


        if(m.horarios_select == "Desayuno" && m.valor < 5000){
            icono.classList.add("fas", "fa-cloud-upload-alt", "text-warning", "fa-3x");
        }else if(m.horarios_select == "Almuerzo" && m.valor < 15000){
            icono.classList.add("fas", "fa-cloud-upload-alt", "text-warning", "fa-3x");
        }else if(m.horarios_select == "Once" && m.valor < 10000){
            icono.classList.add("fas", "fa-cloud-upload-alt", "text-warning", "fa-3x");
        }else if(m.horarios_select == "Cena" && m.valor < 20000){
            icono.classList.add("fas", "fa-cloud-upload-alt", "text-warning", "fa-3x");
        }else{
            icono.classList.add("fas","fa-cloud-download-alt","text-danger","fa-3x");
        }

        tdOferta.classList.add("text-center");
        tdOferta.appendChild(icono);


        tr.appendChild(tdNro);
        tr.appendChild(tdNombre);
        tr.appendChild(tdHorario);
        tr.appendChild(tdValor);
        tr.appendChild(tdDesc);
        tr.appendChild(tdOferta);

        tbody.appendChild(tr);

    }
};

document.querySelector("#registrar-btn").addEventListener("click", () => {
    let nombre = document.querySelector("#nombre-txt").value;
    let horarios_select = document.querySelector("#horario-select").value;
    let valor = document.querySelector("#valor").value;
    let descripcion = tinymce.get("descripcion-txt").getContent();

    let menu = {};
    menu.nombre = nombre;
    menu.horarios_select = horarios_select;
    menu.valor = valor;
    menu.descripcion = descripcion;


    if(horarios_select == "Desayuno" && valor < 1000 || horarios_select == "Desayuno" && valor > 10000){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El valor ingresado de Desayuno es inválido.',
          });
          return;
    }else if(horarios_select == "Almuerzo" && valor < 10000 || horarios_select == "Almuerzo" && valor > 20000){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El valor ingresado de Almuerzo es inválido.',
          });
          return;
    }else if(horarios_select == "Once" && valor < 5000 || horarios_select == "Once" && valor > 15000){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El valor ingresado de Once es inválido.',
          });
          return;
    }else if(horarios_select == "Cena" && valor < 15000){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El valor ingresado de Cena es inválido.',
          });
          return;
    }

    pedidos.push(menu);
    cargarTabla();
    Swal.fire("Exito!", "Registro de Menú realizado", "success");
    //console.log(horarios_select);

});


document.querySelector("#limpiar-btn").addEventListener("click", () => {
    document.querySelector("#nombre-txt").value = "";
    document.querySelector("#horario-select").value = "Desayuno";
    document.querySelector("#valor").value = "";
    tinymce.get("descripcion-txt").setContent("");

});