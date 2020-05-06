n=gets.chomp.to_i
i=1
nstar=1
nspace=n/2
while(i<=n)
    ispace=1
    while(ispace<=nspace)
        print("\t")
        ispace +=1        
    end
    istar=1
    while(istar<=nstar)
        print("*\t")
        istar +=1
    end
    if(i<=n/2)
        nstar +=2;
        nspace -=1
    else
        nstar -=2
        nspace +=1
    end
    puts
    i +=1
end