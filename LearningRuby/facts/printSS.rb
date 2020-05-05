def print_Subsequence(str, s)
    if (str.length()==0)
        puts s;
        return;
    end
    ch = str[0,1]
    ros = str[1,str.length-1]
    print_Subsequence(ros,s)
    print_Subsequence(ros,s+ch)
end
print_Subsequence("abc","")