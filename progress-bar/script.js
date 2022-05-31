function CreateProgressBar(el,buttonEl,time)
{
    let progressBar = document.getElementById(el);
    let runButton = document.getElementById(buttonEl);
    let count=0; // Number of progress bars in queue!

    function updateButtonText(count)
    {
        runButton.innerHTML = count > 0 ? `Run ${count}` : `Run`;
    }
    function setupProgress(n)
    {
        progressBar.style.width = `${n}%`

    }

    function setupProgressBar()
    {
        let total =time * 1000;
        let current =0;

        let interval = setInterval(()=>{
            current+=100;
            let percentage = (current * 100)/total;
            if(percentage > 100)
            {
                count--;
                clearInterval(interval);
                setupProgress(0);
                RunAllPendingLoadingBars();
            }
            else
            {
                setupProgress(percentage)
            } 
        },100)
    }

    function RunAllPendingLoadingBars()
    {
        updateButtonText(count);
        if(count>0)
        {
            setupProgressBar();
        }
    }

    function onClicked(event)
    {
        count++;
        updateButtonText(count);
        //Only to trigger if count = 1, otherwisw multiple intervals will start in parallel
       if(count ==1)
       {
        setupProgressBar();
       }
        
    }

    runButton.addEventListener('click',onClicked);

  
}

CreateProgressBar("progressbar","run",4);