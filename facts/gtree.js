let root={
    data:10,
    children: [
        {data:20,
        children:[
            {
                data:50,
                children:[
                    {
                        data:120,
                        children:[]
                    }
                ]
            },
            {
                data:60,
                children:[
                    {
                        data:130,
                        children:[]
                    }
                ]
            }
        ]
        },
        {
            data:30,
            children:[
                {
                    data:70,
                    children:[
                        {
                            data:140,
                            children:[]
                        }
                    ]
                },
                {
                    data:80,
                    children:[
                        {
                            data:150,
                            children:[]
                        }
                    ]
                },
                {
                    data:90,
                    children:[
                        {
                            data:160,
                            children:[]
                        }
                    ]
                }
            ]
        },
        {
            data:40,
            children:[
                {
                    data:100,
                    children:[
                        {
                            data:170,
                            children:[]
                        }
                    ]
                },
                {
                    data:110,
                    children:[
                        {
                            data:180,
                            children:[]
                        }
                    ]
                }
            ]
        }
    ]

}
function disp(root){
    let str=""+root.data+"=>"
    for(let i=0;i<root.children.length;i++)
    {
        str+=root.children[i].data+","
    }
    console.log(str)
    for(let i=0;i<root.children.length;i++)
    {
        disp(root.children[i])
    }
}
disp(root)