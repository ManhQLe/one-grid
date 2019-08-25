function OneGrid(agrs) {    
    this.agrs = agrs
    let root = document.createElement("div")
    this._root = root    

    root.setAttribute("class","one-grid");
    root.innerHTML = "<div class='head' host-section></div><div class='body' host-section></div><div class='footer' host-section></div>"
        
}

OneGrid.prototype.setData = function(data){
    this.agrs.Data = data;    
}

OneGrid.prototype.render = function(toDom) {
    toDom.appendChild(this._root);
}


module.exports = OneGrid