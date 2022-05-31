function CreateChessBoard(element,rows,cols)
{
    const chessboard = document.querySelector(element);
    if(chessboard !==  null)
    {
        let diagonals=[];
        let lastClickedTileId="";
        let documentFragment = new DocumentFragment();
        for(let i=0;i<rows;i++)
        {
            let row = document.createElement('div');
            row.classList.add('row');
            row.dataset.rowNumber=i;

            for(let j=0;j<cols;j++)
            {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row=i;
                cell.dataset.col=j;
                cell.id=String(i)+String(j);
                const colorOfCell = isTileWhite(i,j) ? 'bg-white' : 'bg-black';
                cell.classList.add(colorOfCell)
                row.append(cell);
            }
            documentFragment.append(row);
        }
        chessboard.append(documentFragment);

        chessboard.addEventListener('click',onClick);

        function isTileWhite(i,j)
        {
            return (i+j) % 2 == 0
        }

        function resetDiagonals()
        {
            //Resetting the previous diagonals
            if(diagonals.length>0)
            {
                for(let i=0;i<diagonals.length;i++)
            {
                if(isTileWhite(Number(diagonals[i].dataset.row),Number(diagonals[i].dataset.col)))
                {
                    diagonals[i].classList.toggle('bg-white');
                }
                else
                {
                    diagonals[i].classList.toggle('bg-black');
                }
                diagonals[i].classList.remove('bg-red');
            }
            diagonals=[];
            }
        }

        function onClick(event)
        {
            let currId =event.target.id;
            if(lastClickedTileId === currId)
            {
                console.log("DONE")
                return;
            }
            else
            {
                lastClickedTileId=currId;
                resetDiagonals();
            }


            let row = Number(event.target.dataset.row);
            let col = Number(event.target.dataset.col);


            let diagonalIDs=[];
            diagonalIDs.push(event.target.id);
            

            //left upper diagonal
            let x=row-1,y=col-1;
            while(x>=0 && y>=0)
            {
                diagonalIDs.push(String(x)+String(y))
                x--;
                y--;
            }
            //right upper diagonal
             x=row-1,y=col+1;
            while(x>=0 && y<8)
            {
                diagonalIDs.push(String(x)+String(y))
                x--;
                y++;
            }
            //left lower diagonal
             x=row+1,y=col-1;
            while(x<8 && y>=0)
            {
                diagonalIDs.push(String(x)+String(y))
                x++;
                y--;
            }
             //right lower diagonal
              x=row+1,y=col+1;
             while(x<8 && y<8)
             {
                 diagonalIDs.push(String(x)+String(y))
                 x++;
                 y++;
             }
             //Querying all the  diagonals
            for(let i=0;i<diagonalIDs.length;i++)
            {
                diagonals.push(document.getElementById(diagonalIDs[i]));
            }

            //Painting RED
            for(let i=0;i<diagonals.length;i++)
            {
                if(isTileWhite(Number(diagonals[i].dataset.row),Number(diagonals[i].dataset.col)))
                {
                    diagonals[i].classList.toggle('bg-white');
                }
                else
                {
                    diagonals[i].classList.toggle('bg-black');
                }
                diagonals[i].classList.add('bg-red');

            }

        }

    }
}
new CreateChessBoard("#chessboard",8,8);