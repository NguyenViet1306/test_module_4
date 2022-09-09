getAllProvince();
let idProvince;
getAllCountry();

function getAllProvince() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/provinces",
        success: function (data) {
            displayTable(data)
        }
    })
}

function getAllCountry() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/provinces/country",
        success: function (data) {
            let result = ""
            for (let i = 0; i < data.length; i++) {
                result += "<option value='" + data[i].id + "'>" + data[i].name
                    + "</option>"
            }
            document.getElementById("departments").innerHTML = result;
        }
    })
}

function displayTable(data) {
    let result = ""
    result += "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\">"
    for (let i = 0; i < data.length; i++) {
        result += "<tr>"
        result += "<td>" + (i + 1) + "</td>"
        result += "<td>" + data[i].name + "</td>"
        result += "<td>" + data[i].popular + "</td>"
        result += "<td>" + data[i].areas + "</td>"
        result += "<td>" + data[i].gdp + "</td>"
        result += "<td>" + data[i].description + "</td>"
        result += "<td>" + data[i].country.name + "</td>"
        result += "<td><button type=\"button\" class=\"btn btn-danger\" onclick='updateForm(" + data[i].id + ")'>Update</button>"
        result += "<button type=\"button\" class=\"btn btn-danger\" onclick='deleteProvince(" + data[i].id + ")'>Detail</button>"
        result += "<button type=\"button\" class=\"btn btn-danger\" onclick='deleteProvince(" + data[i].id + ")'>Delete</button>"
        result += "</tr>"
    }
    result += "</table>"
    document.getElementById("list-customers").innerHTML = result;
}

function detailProvince() {

}

function displayCreateForm() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/provinces/country",
        success: function (data) {
            let result = ""
            for (let i = 0; i < data.length; i++) {
                result += "<option value='" + data[i].id + "'>" + data[i].name
                result += "</option>"
            }
            document.getElementById("departments").innerHTML = result;
        }
    })

    formCreate()
    document.getElementById("titleFrom").innerHTML = "Create new customer"
    document.getElementById("button").innerHTML = "Create"
    document.getElementById("button").setAttribute("onclick", "createCustomer()")
    // onclick="createHuman()"
    $('#myModal').modal('show');
}

function formCreate() {
    document.getElementById("name").value = ""
    document.getElementById("popular").value = ""
    document.getElementById("area").value = ""
    document.getElementById("gdp").value = ""
    document.getElementById("description").value = ""
    document.getElementById("country").value = ""
}


function createProvince() {
    getAllCountry()
    let name = $('#name').val()
    let popular = $('#popular').val()
    let area = $('#area').val()
    let gdp = $('#gdp').val()
    let description = $('#description').val()
    let country = $('#country').val()
    let province = {
        name: name,
        popular: popular,
        area: area,
        gdp: gdp,
        description: description,
        country: {
            id: country
        }
    };


    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(province),
        //tên API
        url: "http://localhost:8080/api/provinces",
        //xử lý khi thành công
        success: function () {
            formCreate()
            document.getElementById("messageCreate").innerHTML = "Create successfully!";
            getAllProvince();
        }
    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function setFormUpdate(data) {
    document.getElementById("name").value = data.name
    document.getElementById("popular").value = data.popular
    document.getElementById("area").value = data.area
    document.getElementById("gdp").value = data.gdp
    document.getElementById("description").value = data.description
    document.getElementById("country").value = data.country

}

function updateForm(id) {
    // $.ajax({
    //     type: "GET",
    //     url: "http://localhost:8080/api/provinces/country",
    //     success: function (data) {
    //         let result = ""
    //         for (let i = 0; i < data.length; i++) {
    //             result += "<option value='" + data[i].id + "'>" + data[i].name
    //             result += "</option>"
    //         }
    //         document.getElementById("departments").innerHTML = result;
    //     }
    // })
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/provinces/" + id,
        success: function (data) {
            idCustomer = id
            setFormUpdate(data)
            document.getElementById("messageCreate").innerHTML = ""
        }
    })

    document.getElementById("button").innerHTML = "Update"
    document.getElementById("button").setAttribute("onclick", "updateCustomer()")
    $('#myModal').modal("show")
}

function updateProvince() {

    let name = $('#name').val()
    let popular = $('#popular').val()
    let area = $('#area').val()
    let gdp = $('#gdp').val()
    let description = $('#description').val()
    let country = $('#country').val()
    let province = {
        id: idProvince,
        name: name,
        popular: popular,
        area: area,
        gdp: gdp,
        description: description,
        country: {
            id: country
        }
    };

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/api/provinces",
        data: JSON.stringify(province),
        success: function (data) {
            setFormUpdate(data)
            document.getElementById("messageCreate").innerHTML = "Update successfully!"
            getAllProvince()
        }
    })
    event.preventDefault()
}


function deleteForm(id) {
    idProvince = id
    document.getElementById("messageDelete").innerHTML = ""
    $('deleteModal').modal("show")
}

function deleteProvince(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/api/provinces/" + id,
        success: function () {
            document.getElementById("messageDelete").innerHTML = "Delete successfully!"
            getAllProvince()
        }
    })
    event.preventDefault()
}