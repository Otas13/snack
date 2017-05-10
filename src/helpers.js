/**
 * Created by Ota on 07.05.2017.
 */

let counter = 0;
class Helpers
{
    constructor(){
    }

    getOid(){
        return counter++;
    }
}

export default new Helpers();