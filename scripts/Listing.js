class Listing {
    constructor(id, name, title, email, phone, website) {
        this.id = id;
        this.name = name.trim();
        this.title = title.trim();
        this.email = email.trim();
        this.phone = phone.trim();

        if (website == null || website == undefined)
            website = "";

        this.website = website;
    }

    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    getTitle(){
        return this.title;
    }

    getEmail(){
        return this.email;
    }

    getPhone(){
        return this.phone;
    }

    getWebsite(){
        return this.website;
    }

    toHtml(){
        let template = ' <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 listing" id="@@id">'
            + '     <div class="listing-item-parent-container"> '
            + '         <h2>@@Name</h2>'
            + '         <div class="listing-details"> '
            + '             <span class="item position">@@Position</span> '
            + '             <span class="item phone">@@Phone</span> '
            + '             <span class="item email">@@Email</span> '
            + '             @@WebsiteHtml '
            + '         </div> '
            + '         <div class="edit-controls"> '
            + '             <i class="far fa-trash-alt" onclick=deleteListing(@@id)></i> '
            + '             <i class="far fa-edit" onclick="editListing(@@id)"></i>'
            + '         </div> '
            + '     </div> '
            + ' </div> ';


        template = template.replace("@@Name", this.name);
        template = template.replace("@@Phone", this.phone);
        template = template.replace("@@Email", this.email);
        template = template.replace("@@Position", this.title);
        template = template.replace(/@@id/g, this.id);

        let link = "";
        if (this.website.length > 3)
         {
            let sTitle = "Go to " + this.name + " website.";
            link = '<span class="item website">'
                +'<a target="_blank" title= "'
                + sTitle + '" href =' + this.website +' >Profile</a></span>'
        }

        template = template.replace("@@WebsiteHtml", link);
        return template;
    }

    updateListing(newListing){
        this.name = newListing.getName();
        this.title = newListing.getTitle();
        this.website = newListing.getWebsite();
        this.phone = newListing.getPhone();
        this.email = newListing.getEmail();
    }
    
}
