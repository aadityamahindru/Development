str=gets.chomp;
puts "*********************************************************"
val=[".;","abc","def","ghi","jkl","mno","pqrs","tu","vwx","yz"]
def getKPC(str,val)
    if(str.length()==0)
        arr=[]
        arr.push("")
        return arr
    end
    ros=str[1,str.length()-1]
    res=getKPC(ros,val)
    mres=[]
    ch=str[0]
    n=ch.to_i();
    s1=val[n]
    for i in (0..s1.length()-1)
        ch1=s1[i]
        for j in (0..res.length-1)
            mres.push(ch1+res[j])
        end
    end
    return mres
end
puts getKPC(str,val)