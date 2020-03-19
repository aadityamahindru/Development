Array.prototype.myreduce=function (cb)
{ 
    let sum=cb(this[0],this[1])
    for(let i=2;i<this.length;i=i+2)
    {   if(this[i+1]==null)
        {
            sum=cb(sum,this[i])
        }
        else{

            sum=cb(sum,cb(this[i],this[i+1]));
        }
    }
    return sum;
}
function add(x,y)
{
    return(x+y)
}
let array1 = [1, 2, 3, 4,5]
let d=array1.myreduce(add);
console.log(d)