/* 

export const splitAlgorithm = (I: number[], w:number) => {

    //list of substrips
    let S = [];

    let s = {
        xposition: 0,
        width: 0,
        lower: 0,
        upper: 0,
        itemWidth: 0,
    }

    S.push(s);

    while (I.length > 0) {
        let i = I.pop();

        let S_2 = [];   

        for (let j = 0; j < S.length; j++) {
            let s = S[j];
            if (s.width + i.width <= w) {
                let s_2 = {
                    xposition: s.xposition,
                    width: s.width + i.width,
                    lower: s.lower,
                    upper: s.upper,
                    itemWidth: i.width,
                }

                S_2.push(s_2);
            }

            if (s.width + i.width <= w) {
                let s_2 = {
                    xposition: s.xposition + s.width,
                    width: i.width,
                    lower: s.lower,
                    upper: s.upper,
                    itemWidth: i.width,
                }

                S_2.push(s_2);
            }

            if (s.width + i.width <= w) {
                let s_2 = {
                    xposition: s.xposition + s.width + i.width,
                    width: s.width,
                    lower: s.lower,
                    upper: s.upper,
                    itemWidth: i.width,
                }

                S_2.push(s_2);
            }
        }

        if (S_2.length === 0) {
            // colocar o item no topo tlgd (bruh parace furada esse algoritmo)
        } else {
            // coloca o item do lado do outro e da o split da lista
            
        }
    }




}
 */

/* function Split Algorithm (SP) is
    while I not empty do
        
        Define new list S_2 containing all the substrips with s.width - s.itemWidth ≥ i.width; 
        S_2 contains all sub-strips where i fits next to the already placed item
        if S_2 is empty then
            In this case, place the item on top of another one.
            Find the sub-strip s in S with smallest s.upper; i.e. the least filled sub-strip
            Place i at position (s.xposition, s.upper);
            Update s: s.lower := s.upper; s.upper := s.upper+i.height; s.itemWidth := i.width;
        else 
            In this case, place the item next to another one at the same level and split the corresponding sub-strip at this position.
            Find s ∈ S_2 with the smallest s.lower;
            Place i at position (s.xposition + s.itemWidth, s.lower);
            Remove s from S;
            Define two new sub-strips s1 and s2 with 
            s1.xposition = s.xposition, s1.yposition = s.upper, s1.width = s.itemWidth, s1.lower = s.upper, s1.upper = s.upper, s1.itemWidth = s.itemWidth;
            s2.xposition = s.xposition+s.itemWidth, s2.yposition = s.lower, s2.width = s.width - s.itemWidth, s2.lower = s.lower, s2.upper = s.lower + i.height, s2.itemWidth = i.width;
            S.add(s1,s2);
    return 
end function */
