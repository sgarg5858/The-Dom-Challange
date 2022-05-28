/*
 * Creates star rating functionality
 * @param el DOM Element
 * @param count Number of stars
 * @param callback Returns selected star count to callback
 */


function registerMouseOverEvent(starContainer,count)
{
    starContainer.addEventListener('mouseover',(event)=>{

        console.log(event.target);

           let position = Number(event.target.dataset.position);

           if(!isNaN(position))
           {
            let mystarContainer = document.getElementById('star');
             let childNodes = mystarContainer.children;

             for(let i=0;i<position;i++)
             {
                 childNodes[i].classList.remove("fa-star-o");
                 childNodes[i].classList.add("fa-star");
             }

             //This is useful when we go from higher to lower number of stars!
             ///Can be optimized by using memoization store the last hovered position
             for(let i=count-1;i>=position;i--)
             {
                 if(childNodes[i].classList.contains("fa-star"))
                 {
                    childNodes[i].classList.add("fa-star-o");
                    childNodes[i].classList.remove("fa-star");
                 }
             }
           }
    })
}
function registerMouseLeaveEvent(starContainer)
{
    starContainer.addEventListener('mouseleave',(event)=>{
        starContainer = document.getElementById('star');
        let childNodes = starContainer.children;
        let size = childNodes.length;
        for(let i=0;i<size;i++)
        {
            childNodes[i].classList.add("fa-star-o");
            childNodes[i].classList.remove("fa-star");
        }
})
}
function registerOnClickEvent(starContainer,callback)
{
    starContainer.addEventListener('click',(event)=>{
        let position = Number(event.target.dataset.position);
        if(!isNaN(position))
        {
            callback(position);
        }
})
}
function Star(el, count, callback) {
    let selectedStars=-1;
    const starContainer = document.querySelector(el);
    if(starContainer != null)
    {
        let fragment = new DocumentFragment();
        for(let i=0;i<count;i++)
        {
            let iElement = document.createElement('i');
            iElement.classList.add("fa");
            iElement.classList.add("fa-star-o");
            iElement.dataset.ratingValue=i+1;
            fragment.appendChild(iElement);
        }
        starContainer.append(fragment);

        starContainer.addEventListener("mouseover",onMouseOver)
        starContainer.addEventListener("mouseleave",onMouseLeave)
        starContainer.addEventListener("click",onClick)

        function fill(ratingVal)
        {
            let children = starContainer.children;
            for(let i=0;i<count;i++)
                {
                    if(i < ratingVal)
                    {
                        children[i].classList.add('fa-star')
                    }
                    else
                    {
                        children[i].classList.remove('fa-star');
                    }
                }
        }

        //Registering MouseOver 
        function onMouseOver(event)
        {
            const targetElement = event.target;
            const ratingValue = Number(targetElement.dataset.ratingValue);
            console.log(ratingValue);
            if(!isNaN(ratingValue))
            {
                fill(ratingValue);
            }
        }
        function onMouseLeave(event)
        {
            console.log(selectedStars)
            fill(selectedStars)
        }
        function onClick(event)
        {
            const targetElement = event.target;
            const ratingValue = Number(targetElement.dataset.ratingValue);
            if(!isNaN(ratingValue)){
                selectedStars=ratingValue;
                fill(selectedStars);
                callback(selectedStars);
            }
        }

    }


   
}

function getStar(value){
    document.getElementById("display-star").innerHTML = value;
}
new Star("#star", 5, getStar);