require 'algorithms'
include Containers
class Edge
    attr_accessor :vtx,:wt
    def initialize(vtx,wt)
        @vtx=vtx
        @wt=wt
    end
    def to_s()
        return vtx.to_s+" @ "+wt.to_s
    end
end
graph=[]
graph[0]=[Edge.new(1,10),Edge.new(3,40)]
graph[1]=[Edge.new(0,10),Edge.new(2,10)]
graph[2]=[Edge.new(1,10),Edge.new(3,10)]
graph[3]=[Edge.new(0,40),Edge.new(4,2),Edge.new(2,10)]
graph[4]=[Edge.new(3,2),Edge.new(6,5),Edge.new(5,3)]
graph[5]=[Edge.new(4,3),Edge.new(6,3)]
graph[6]=[Edge.new(5,3),Edge.new(4,5)]
def display(graph)
    for vtx in (0..graph.length-1)
        print vtx.to_s+" -> "
        for ed in (0..graph[vtx].length-1)
            print graph[vtx][ed].to_s+" , "
        end
        puts
    end
end
class Dpair
    attr_accessor :vtx,:psf,:csf
    def initialize(vtx,psf,csf)
        @vtx=vtx
        @psf=psf
        @csf=csf
    end
    def to_s
        return "#{@vtx.to_s} - #{@psf.to_s} - #{@csf.to_s}"
    end
end
def dijakstra(graph,srcvtx)
    pd=PriorityQueue.new()
    pd.push(Dpair.new(srcvtx,srcvtx.to_s,0),0)
    hash={}
    while pd.size()>0
        rem=pd.pop()
        if(hash.key?(rem.vtx))
            next
        end
        hash[rem.vtx]=true
        puts rem
        for ei in(0..graph[rem.vtx].length-1)
            edge=graph[rem.vtx][ei]
            if(hash.key?(edge.vtx)==false)
                pd.push(Dpair.new(edge.vtx,rem.psf+edge.vtx.to_s,rem.csf+edge.wt),-(rem.csf+edge.wt))
            end
        end
    end
end
dijakstra(graph,0)
#display(graph)