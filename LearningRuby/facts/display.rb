m = gets.chomp.to_i
n= gets.chomp.to_i
arr=[]
for i in (0..m-1)
    row=[]
    for j in (0..n-1)
        val=gets.chomp.to_i
        row.push(val)
    end
    arr.push(row)
end
def display(arr)
    for i in (0..arr.length)
        print(arr[i])
        puts
    end
end
display(arr)