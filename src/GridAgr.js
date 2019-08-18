
/**
 * agrs
 *  - Columns: []
 *  - Filters: [] // fxs(item)
 *  - 
 * 
 * 
 */


function GridAgr(agr){
    let store = {
        Columns: [],
        Filters: []
    }   

    Object.defineProperties(this,{
        columns: {
            get:()=>{
                return store.Columns;
            },
            set:(value)=>{
                if(value && Array.isArray(value))
                    store.Columns = value;
            }
        },
        filters: {
            get:()=>{
                return store.Filters;
            },
            set:(value)=>{
                if(value && Array.isArray(value))
                    store.Filters = value;                
            }
        }
    })
}

export default GridAgr;