import $ from ;

class task {
    constructor (name){
        this.name = name;
    }
    del (){
        $(this.parent().remove(this));
    }
}

export task;