class Directory{
    constructor(listings){
        this.listings = listings;
    }

    getListings(){
        return this.listings;
    } 

    add(listing){
        this.listings.unshift(listing);
    }

    getListing(id){
        let listing;

        for(listing of this.listings){
            if (listing.getId() == id)
                return listing;
        }

        return null;
    }

    updateListing(newListing){
        let existing = this.getListing(newListing.getId());
        existing.updateListing(newListing);
    }

    deleteListing(id){
        for(let i=0; i<this.listings.length; i++){
            if(this.listings[i].getId()==id){
                this.listings.splice(i,1);
                return;
            }
        }
    }

    sortByName(asc){
        this.listings.sort(function(a,b){
            var nameA = a.getName().toUpperCase();
            var nameB = b.getName().toUpperCase();
        
        if (nameA < nameB && asc)
            return -1;
        
        if (nameA > nameB && asc)
            return 1;
        
        if (nameA < nameB && !asc)
            return 1;
        
        if (nameA > nameB && !asc)
            return -1;

        return 0;
        });
    }

    sortByTitle(asc){
        this.listings.sort(function(a,b){
            var nameA = a.getTitle().toUpperCase();
            var nameB = b.getTitle().toUpperCase();
        
        if (nameA < nameB && asc)
            return -1;
        
        if (nameA > nameB && asc)
            return 1;
        
        if (nameA < nameB && !asc)
            return 1;
        
        if (nameA > nameB && !asc)
            return -1;

        return 0;
        });

    }

    sortByPhone(asc){
        this.listings.sort(function(a,b){
            var nameA = a.getPhone().toUpperCase();
            var nameB = b.getPhone().toUpperCase();
        
        if (nameA < nameB && asc)
            return -1;
        
        if (nameA > nameB && asc)
            return 1;
        
        if (nameA < nameB && !asc)
            return 1;
        
        if (nameA > nameB && !asc)
            return -1;

        return 0;
        });

    }

    sortByEmail(asc){
        this.listings.sort(function(a,b){
            var nameA = a.getEmail().toUpperCase();
            var nameB = b.getEmail().toUpperCase();
        
        if (nameA < nameB && asc)
            return -1;
        
        if (nameA > nameB && asc)
            return 1;
        
        if (nameA < nameB && !asc)
            return 1;
        
        if (nameA > nameB && !asc)
            return -1;

        return 0;
        });
        
    }

    toHtml(){
        let listing;
        let html="";

        for(listing of this.listings){
            html+=listing.toHtml();
        }

        return html;

    }
}