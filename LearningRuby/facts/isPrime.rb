def is_prime(num)
    div=2
    while(div*div<=num)
        if(num%div==0)
            return false
        end
        div +=1;
    end
    return true
end
a=is_prime(11)
puts "the no 11 is:"+a.to_s();
def all_primes(num)
    for i in (2..num)
        is_status=is_prime(i)
        if(is_status)
            puts(i)
        end
    end
end
all_primes(100)