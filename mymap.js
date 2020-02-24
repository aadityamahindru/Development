function mymap(arr,cb)
{let b=[];
    for(let i=0;i<arr.length;i++)
    {
        b[i]=cb(arr[i])

    }
    return(b);
}
function myfilter(arr,cb)
{ let b=[],j=0;
    for(let i=0;i<arr.length;i++)
    {
        if(cb(arr[i])!=undefined)
        {
            b[j]=arr[i];
            j++;
        }

    } 
    return(b)
}
function prime(x)
{ let flag=0
    for(let i=2;i*i<=x;i++)
    {
        if(x%i==0)
        flag=1;
    }
    if(flag==0)
    return x
}
function square(x)
{
    return x*x;
}
let arr=[2,6,17,28,46,68]
var b=mymap(arr,square)
var c=myfilter(arr,prime)
console.log("square of NO's in arrayis:["+b+"]")
console.log("prime no in array is:["+c+"]")