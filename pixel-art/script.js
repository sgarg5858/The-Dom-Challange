
function createPixelGrid(gridElement,rows,cols)
{
    let documentFragment = new DocumentFragment();
        for(let i=0;i<rows;i++)
        {
            let rowElement = document.createElement('div');
            rowElement.classList.add('row');

            for(let j=0;j<cols;j++)
            {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.isItColorPicker=false;
                rowElement.append(cell);
            }
            documentFragment.append(rowElement);
        }

        let colorRowElement = document.createElement('div');
        colorRowElement.classList.add('row');
        colorRowElement.classList.add('colors');

        let colorClasses=['red','black','green','yellow','grey','pink','maroon','aqua','dodgerblue','aqua'];
        for(let i=0;i<colorClasses.length;i++)
        {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.classList.add(colorClasses[i]);
            cell.dataset.isItColorPicker=true;
            cell.dataset.color=colorClasses[i];
            colorRowElement.append(cell);
        }
        gridElement.append(documentFragment);
        gridElement.append(colorRowElement);

}

function PixelArt(el,rows,cols)
{
    const gridElement = document.querySelector(el);
    let currentColor = "";

    if(gridElement!==null)
    {
        createPixelGrid(gridElement,rows,cols);

        gridElement.addEventListener('click',onClick);

        function onClick(event)
        {
            if(event.target.dataset.isItColorPicker === "true")
            {
                this.currentColor=event.target.dataset.color;
            }
            else
            {
                event.target.style.background=this.currentColor;
                // event.target.classList=[];
                // event.target.classList.add("cell");
                // event.target.classList.add(this.currentColor);
            }
        }
    }

}


 new PixelArt("#grid", 10, 10);