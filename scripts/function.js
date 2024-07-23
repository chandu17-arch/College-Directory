//======Declare Global Variables=====/
var directory = new Directory(new Array());

var txtName = document.getElementById("txtName");
var txtTitle = document.getElementById("txtTitle");
var txtPhone = document.getElementById("txtPhone");
var txtEmail = document.getElementById("txtEmail");
var txtWebsite = document.getElementById("txtWebsite");
var hidListingId = document.getElementById("hidListingId");
var modalTitle = document.getElementById("modalTitle");
var myForm = document.getElementById("myForm");
var jInputForm = $('#inputForm'); //declare jQuery variable

// GetTestData();

validateInit();
wireEventHandlers();

function AddNewListing(){
    validateInit(); //reset validation, remove all error labels if any

    modalTitle.innerHTML = "Add New <span>Directory Listing</span>";

    //clear all values if any (from previous edit)
    myForm.reset();
    txtName.value="";
    txtTitle.value="";
    txtPhone.value="";
    txtEmail.value="";
    txtWebsite.value="";
    modalTitle.value="";
    hidListingId.value ="";

    jInputForm.modal('show');
}

function AddUpdateListing(){
    var form = document.getElementById("myForm");
    let jForm = $(form);

    if (!jForm.valid())
        return;
    
    if(hidListingId.value == "" || hidListingId.value == undefined){
        let listing = new Listing(getNextId(), txtName.value, txtTitle.value, txtEmail.value, 
                    txtPhone.value, txtWebsite.value);
        directory.add(listing);
    } else {
        let listing = new Listing(hidListingId.value, txtName.value, txtTitle.value, txtEmail.value,
                    txtPhone.value, txtWebsite.value);
        directory.updateListing(listing);

    }

    //re-render the directory onto the web page;
    document.getElementById("directory-listing-row").innerHTML = directory.toHtml();

    jInputForm.modal('hide');

}

function getNextId(){
    if (directory.getListings()==null)
        return 1;
    else {
        return directory.getListings().length + 1;
    }
}

function wireEventHandlers() {
    document.getElementById("btnSave").addEventListener("click", AddUpdateListing);
    document.getElementById("btnAddNewListingForm").addEventListener("click", AddNewListing);

    document.getElementById("btnSortByName").addEventListener("click", function(button){sortDirectory(this)});
    document.getElementById("btnSortByTitle").addEventListener("click", function(button){sortDirectory(this)});
    document.getElementById("btnSortByPhone").addEventListener("click", function(button){sortDirectory(this)});
    document.getElementById("btnSortByEmail").addEventListener("click", function(button){sortDirectory(this)});
}

function validateInit() {
    var validator = $("#myForm").validate({
        rules: {
            txtPhone: {
                required: true,
                phoneUS: true
            },
            txtWebsite: {
                required: false,
                url: true 
            }
        }
    });
    validator.resetForm();
    $(".error").removeClass("error");
}

function GetTestData() {
    directory = PopulateDirectory(directory);

    renderDirectory();
}

function editListing(id){ // show the form to edit specific listing

    validateInit();

    hidListingId.value = id;

    let listing = directory.getListing(id);
    
    modalTitle.innerHTML = "Update <span>" + listing.getName() + "</span>";
    document.getElementById("btnSave").innerHTML = "Update Listing";

    // put the data into controls
    txtName.value = listing.getName();
    txtTitle.value = listing.getTitle();
    txtPhone.value = listing.getPhone();
    txtEmail.value = listing.getEmail();
    txtWebsite.value = listing.getWebsite();

    jInputForm.modal('show'); // show modal form

}

function deleteListing(id){
    directory.deleteListing(id);
    renderDirectory();
}

function renderDirectory(){
    let allListingsHtml = directory.toHtml();
    document.getElementById("directory-listing-row").innerHTML = allListingsHtml;
}

function sortDirectory(button){
    let sortOrderAsc = true;
    let span = $(button).find('span');
    let sortBy = span.text().trim().toLowerCase(); //name, title, phone

    if(!span.hasClass("ascending"))
        sortOrderAsc = true;
    else
        sortOrderAsc = false;

    if(sortBy=="name"){
        directory.sortByName(sortOrderAsc);
    }

    if(sortBy=="title"){
        directory.sortByTitle(sortOrderAsc);
    }

    if(sortBy=="phone"){
        directory.sortByPhone(sortOrderAsc);
    }

    if(sortBy=="email"){
        directory.sortByEmail(sortOrderAsc);
    }

    if(sortOrderAsc) {
        span.removeClass("descending");
        span.addClass("ascending");
        $(button).attr("title", "Sort by name in descending order");
    } else{
        span.removeClass("ascending");
        span.addClass("descending");
        $(button).attr("title", "Sort by name in ascending order");
    }

    renderDirectory();
}

